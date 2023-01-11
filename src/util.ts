import type { Plugin } from "./class/Plugin"
import type { PluginList } from "./types/Plugin"

export const makePluginList = <T extends string>(plugins: Plugin<T>[]): PluginList<T> =>
  new Map(plugins.map((plugin) => [plugin.id, plugin] as const))
