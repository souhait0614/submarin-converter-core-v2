import type { Plugin } from "../class/Plugin"

export interface PluginConvertResult {
  convertedText: string
  conversionError?: Error[]
}

export type PluginConvertFunction<T> = (
  source: string,
  options?: T
) => string | Promise<string>

export type PluginList = { [pluginId: PropertyKey]: Plugin<any> }
