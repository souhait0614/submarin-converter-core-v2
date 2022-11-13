export type ConvertFunction = (source: string, config: unknown) => string

export interface ConvertFunctionArgs {
  source: string
  config: unknown
}

export type ConverterList<T> = Map<T, ConvertFunction>

export interface ConverterConfig<T extends string> {
  converter: ConverterList<T>
}

export type ConvertConfig<T extends string> = [T, unknown?]
