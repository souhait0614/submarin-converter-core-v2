import { ConvertConfig, ConverterConfig } from "../types/Converter"

const defaultConfig: ConverterConfig<string> = {
  converter: new Map(),
}

export class Converter<T extends string> {
  #config: ConverterConfig<T>

  constructor(config: ConverterConfig<T>) {
    this.#config = { ...defaultConfig, ...config }
  }

  convert(source: string, convertConfigList: ConvertConfig<T>[]) {
    const { converter: converterList } = this.#config
    let tempResultText = source
    const convertResultList = convertConfigList.map(([converterName, converterConfig]) => {
      const converter = converterList.get(converterName)

      // TODO エラー処理考える
      if (!converter) return [""]

      tempResultText = converter(tempResultText, converterConfig)
      const result: [string, ConvertConfig<T>] = [tempResultText, [converterName, converterConfig]]
      return result
    })
  }
}
