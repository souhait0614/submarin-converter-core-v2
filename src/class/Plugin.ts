import type { PluginConvertFunction, PluginConvertOptions } from "../types/Plugin"

export class Plugin<T extends string> {
  #id: T

  #description: string | undefined

  #version: string | undefined

  #converter: PluginConvertFunction

  constructor(props: {
    id: T
    description?: string
    version?: string
    converter: PluginConvertFunction
  }) {
    this.#id = props.id
    this.#description = props.description
    this.#version = props.version
    this.#converter = props.converter
  }

  get id() {
    return this.#id
  }

  get description() {
    return this.#description
  }

  get version() {
    return this.#version
  }

  convert(source: string, options?: PluginConvertOptions) {
    return this.#converter(source, options)
  }
}
