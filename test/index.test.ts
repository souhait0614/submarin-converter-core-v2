import { describe, expect, it } from "vitest"

import { Converter, Plugin, makePluginList } from "../src"

describe("Converter", () => {
  it("NormalConvert", async () => {
    const exampleConverter1 = (source: string) => source.toUpperCase()
    const exampleConverter2 = (source: string) => source.replaceAll("O", "OOOOO")

    const source = "This is a very cool library."

    const converter = new Converter({
      pluginList: makePluginList([
        new Plugin({ id: "example1", converter: exampleConverter1 }),
        new Plugin({ id: "example2", converter: exampleConverter2 }),
      ]),
    })

    const result = await converter.convert(source, [
      { pluginId: "example1" },
      { pluginId: "example2" },
    ])

    expect(result.convertedText).toEqual("THIS IS A VERY COOOOOOOOOOL LIBRARY.")
  })
  it("FallbackConvert", async () => {
    const errorConverter = () => {
      throw new Error("dummy error")
    }
    const exampleConverter1 = (source: string) => source.toUpperCase()
    const exampleConverter2 = (source: string) => source.replaceAll("O", "OOOOO")

    const source = "This is a very cool library."

    const converter = new Converter({
      pluginList: makePluginList([
        new Plugin({ id: "example1", converter: [errorConverter, exampleConverter1] }),
        new Plugin({ id: "example2", converter: [exampleConverter2] }),
      ]),
    })

    const result = await converter.convert(source, [
      { pluginId: "example1" },
      { pluginId: "example2" },
    ])

    expect(result.convertedText).toEqual("THIS IS A VERY COOOOOOOOOOL LIBRARY.")
    expect(result.conversionResults[0]?.conversionError).toEqual([new Error("dummy error")])
  })
})
