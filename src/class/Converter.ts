import type { ConversionOrder, ConverterConfig, FullConversionResult } from "../types/Converter"
import type { PluginList } from "../types/Plugin"

export class Converter<T extends string> {
  #pluginList: PluginList<T>

  constructor(config: ConverterConfig<T>) {
    this.#pluginList = config.pluginList
  }

  get pluginList() {
    return this.#pluginList
  }

  async convert(source: string, orderList: ConversionOrder<T>[]) {
    const initValue: FullConversionResult<T> = {
      convertedText: source,
      conversionResults: [],
    }
    return orderList.reduce<Promise<FullConversionResult<T>>>(async (prev, current) => {
      const { convertedText, conversionResults } = await prev
      const { pluginId, convertOptions } = current
      const plugin = this.#pluginList.get(pluginId)

      if (!plugin) {
        const conversionResult = {
          convertedText,
          order: current,
          error: new Error(`The plugin "${pluginId}" was not found`),
        }
        const result: FullConversionResult<T> = {
          convertedText,
          conversionResults: [...conversionResults, conversionResult],
        }
        return result
      }

      const tempConvertedText = await plugin.convert(convertedText, convertOptions)

      const conversionResult = {
        convertedText: tempConvertedText,
        order: current,
      }
      const result: FullConversionResult<T> = {
        convertedText: tempConvertedText,
        conversionResults: [...conversionResults, conversionResult],
      }
      return result
    }, Promise.resolve(initValue))
  }
}
