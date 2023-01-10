import type { PluginConvertFunction, PluginConvertOptions } from "../types/Plugin"

export class Plugin<T extends string> {
  #name: T

  #description: string | undefined

  #version: string | undefined

  #converter: PluginConvertFunction

  constructor(props: {
    name: T
    description?: string
    version?: string
    converter: PluginConvertFunction
  }) {
    this.#name = props.name
    this.#description = props.description
    this.#version = props.version
    this.#converter = props.converter
  }

  get name() {
    return this.#name
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