import { PluginConvertOptions, Plugins } from "./Plugin"

export interface ConversionOrder<T extends string> {
  converterId: T
  convertOptions?: PluginConvertOptions
}

export interface ConversionResult<T extends string> {
  resultText: string
  order: ConversionOrder<T>
  error?: Error
}

export interface FullConversionResult<T extends string> {
  resultText: string
  conversionResults: ConversionResult<T>[]
}

export interface ConverterConfig<T extends string> {
  plugins: Plugins<T>
}
