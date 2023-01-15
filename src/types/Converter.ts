import type { PluginConvertOptions, PluginList } from "./Plugin"

export interface ConvertOrder<T extends string> {
  pluginId: T
  convertOptions?: PluginConvertOptions
}

export interface ConvertResult<T extends string> {
  convertedText: string
  order: ConvertOrder<T>
  conversionError?: Error | Error[]
}

export interface FullConvertResult<T extends string> {
  convertedText: string
  conversionResults: ConvertResult<T>[]
}

export interface ConverterConfig<T extends string> {
  pluginList: PluginList<T>
}
