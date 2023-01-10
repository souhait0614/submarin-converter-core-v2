import type { ConversionOrder, ConverterConfig, FullConversionResult } from "../types/Converter"
import type { PluginList } from "../types/Plugin"

export class Converter<T extends string> {
  #pluginList: PluginList<T>

  constructor(config: ConverterConfig<T>) {
    this.#pluginList = config.pluginList
  }

  async convert(source: string, orderList: ConversionOrder<T>[]) {
    const initValue: FullConversionResult<T> = {
      resultText: source,
      conversionResults: [],
    }
    return orderList.reduce<Promise<FullConversionResult<T>>>(async (prev, current) => {
      const { resultText, conversionResults } = await prev
      const { converterId, convertOptions } = current
      const plugin = this.#pluginList.get(converterId)

      if (!plugin) {
        const conversionResult = {
          resultText,
          order: current,
          error: new Error(`The plugin "${converterId}" was not found`),
        }
        const result: FullConversionResult<T> = {
          resultText,
          conversionResults: [...conversionResults, conversionResult],
        }
        return result
      }

      const convertedText = await plugin.convert(resultText, convertOptions)

      const conversionResult = {
        resultText: convertedText,
        order: current,
      }
      const result: FullConversionResult<T> = {
        resultText: convertedText,
        conversionResults: [...conversionResults, conversionResult],
      }
      return result
    }, Promise.resolve(initValue))
  }
}
