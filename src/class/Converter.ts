import { ConversionOrder, ConversionResult, ConverterConfig } from "../types/Converter"
import { Plugins } from "../types/Plugin"

export class Converter<T extends string> {
  plugins: Plugins<T>

  constructor(config: ConverterConfig<T>) {
    this.plugins = config.plugins
  }

  async convert(source: string, orderList: ConversionOrder<T>[]) {
    let resultText = source
    const results: ConversionResult<T>[] = await Promise.all(
      orderList.map(async (order) => {
        const { converterId, convertOptions } = order
        const plugin = this.plugins.get(converterId)
        if (!plugin) {
          const result: ConversionResult<T> = {
            resultText,
            order,
            error: new Error(`The plugin "${converterId}" was not found`),
          }
          return result
        }
        resultText = await plugin.convert(resultText, convertOptions)
        const result: ConversionResult<T> = {
          resultText,
          order,
        }
        return result
      })
    )

    return results
  }
}
