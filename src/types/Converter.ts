import type { PluginList } from "./Plugin"

export interface ConvertOrder<T extends PluginList, U extends keyof PluginList> {
  pluginId: U
  convertOptions?: Parameters<T[U]["convert"]>[1]
}

export interface ConvertResult<T extends PluginList> {
  convertedText: string
  order: ConvertOrder<T, keyof PluginList>
  conversionError?: Error | Error[]
}

export interface FullConvertResult<T extends PluginList> {
  convertedText: string
  conversionResults: ConvertResult<T>[]
}

export interface ConverterConfig<T extends PluginList> {
  pluginList: T
}
