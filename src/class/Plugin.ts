import type {
  PluginConvertFunction,
  PluginConvertResult,
} from "../types/Plugin"

export class Plugin<T> {
  #name: string | undefined

  #description: string | undefined

  #version: string | undefined

  #converter: PluginConvertFunction<T>[]

  constructor(props: {
    name?: string
    description?: string
    version?: string
    converter: PluginConvertFunction<T>[]
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

  async convert(source: string, options?: T): Promise<PluginConvertResult> {
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
