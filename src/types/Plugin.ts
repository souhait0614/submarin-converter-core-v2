import type { Plugin } from "../class/Plugin"

export type PluginConvertOptions = Record<string, unknown>

export interface PluginConvertResult {
  convertedText: string
  conversionError?: Error[]
}

export type PluginConvertFunction = (
  source: string,
  options?: PluginConvertOptions
) => string | Promise<string>

export type PluginList<T extends string> = { [pluginId in T]: Plugin }
