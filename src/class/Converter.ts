import type {
  ConvertOrder,
  ConvertResult,
  ConverterConfig,
  FullConvertResult,
} from "../types/Converter"
import type { PluginList } from "../types/Plugin"

export class Converter<T extends string> {
  #pluginList: PluginList<T>

  constructor(config: ConverterConfig<T>) {
    this.#pluginList = config.pluginList
  }

  get pluginList() {
    return this.#pluginList
  }

  async convert(source: string, orderList: ConvertOrder<T>[]) {
    const initValue: FullConvertResult<T> = {
      convertedText: source,
      conversionResults: [],
    }
    return orderList.reduce<Promise<FullConvertResult<T>>>(async (prev, current) => {
      const { convertedText, conversionResults } = await prev
      const { pluginId, convertOptions } = current
      const plugin = this.#pluginList.get(pluginId)

      if (!plugin) {
        const conversionResult: ConvertResult<T> = {
          convertedText,
          order: current,
          conversionError: new Error(`The plugin "${pluginId}" was not found`),
        }
        const result: FullConvertResult<T> = {
          convertedText,
          conversionResults: [...conversionResults, conversionResult],
        }
        return result
      }

      const { convertedText: tempConvertedText, conversionError } = await plugin.convert(
        convertedText,
        convertOptions
      )

      const conversionResult: ConvertResult<T> = {
        convertedText: tempConvertedText,
        order: current,
      }
      if (conversionError) conversionResult.conversionError = conversionError
      const result: FullConvertResult<T> = {
        convertedText: tempConvertedText,
        conversionResults: [...conversionResults, conversionResult],
      }
      return result
    }, Promise.resolve(initValue))
  }
}
