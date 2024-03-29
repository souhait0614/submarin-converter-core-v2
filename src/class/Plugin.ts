import type {
  PluginConvertFunction,
  PluginConvertOptions,
  PluginConvertResult,
} from "../types/Plugin"

export class Plugin<T extends string> {
  #id: T

  #description: string | undefined

  #version: string | undefined

  #converter: PluginConvertFunction[]

  constructor(props: {
    id: T
    description?: string
    version?: string
    converter: PluginConvertFunction[]
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

  async convert(source: string, options?: PluginConvertOptions): Promise<PluginConvertResult> {
    const conversionError: Error[] = []

    // TODO もっといい方法を見つけたら置き換える
    // eslint-disable-next-line no-restricted-syntax
    for await (const converter of this.#converter) {
      try {
        const result: PluginConvertResult = {
          convertedText: await converter(source, options),
        }
        if (conversionError.length) result.conversionError = conversionError
        return result
      } catch (e) {
        const error = e instanceof Error ? e : new Error("Unknown Error")
        conversionError.push(error)
      }
    }
    return {
      convertedText: source,
      conversionError,
    }
  }
}
