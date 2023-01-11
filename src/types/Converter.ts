import type { PluginConvertOptions, PluginList } from "./Plugin"

export interface ConversionOrder<T extends string> {
  pluginId: T
  convertOptions?: PluginConvertOptions
}

export interface ConversionResult<T extends string> {
  convertedText: string
  order: ConversionOrder<T>
  error?: Error
}

export interface FullConversionResult<T extends string> {
  convertedText: string
  conversionResults: ConversionResult<T>[]
}

export interface ConverterConfig<T extends string> {
  pluginList: PluginList<T>
}
