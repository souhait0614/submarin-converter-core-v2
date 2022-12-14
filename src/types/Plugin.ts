import type { Plugin } from "../class/Plugin"

export type PluginConvertOptions = Record<string, unknown>

export type PluginConvertFunction = (
  source: string,
  options?: PluginConvertOptions
) => string | Promise<string>

export type PluginList<T extends string> = ReadonlyMap<T, Plugin<T>>
