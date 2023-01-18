import type { Plugin } from "../class/Plugin"

// TODO #1 オプション周りの型定義をいい感じ™にしたい
export type PluginConvertOptions = unknown

export interface PluginConvertResult {
  convertedText: string
  conversionError?: Error[]
}

export type PluginConvertFunction = (
  source: string,
  options?: PluginConvertOptions
) => string | Promise<string>

export type PluginList<T extends string> = ReadonlyMap<T, Plugin<T>>
