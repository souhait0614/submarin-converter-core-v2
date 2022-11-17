export type PluginConvertOptions = Record<string, unknown>

export type PluginConvertFunction = (
  source: string,
  options?: PluginConvertOptions
) => string | Promise<string>

export interface Plugin {
  name?: string
  description?: string
  version?: string
  convert: PluginConvertFunction
}

export type Plugins<T extends string> = ReadonlyMap<T, Plugin>
