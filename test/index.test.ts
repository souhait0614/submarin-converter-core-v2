import { generate as cjpGenerate } from "cjp"
import { generate as genheraGenerate } from "genhera"
import { describe, expect, it } from "vitest"

import { Converter, Plugin, makePluginList } from "../src"

describe("Converter", () => {
  it("Convert", async () => {
    const pluginList = makePluginList([
      new Plugin({ id: "cjp", converter: (source: string) => cjpGenerate(source) }),
      new Plugin({ id: "genhera", converter: (source: string) => genheraGenerate(source) }),
    ])
    const converter = new Converter({
      pluginList,
    })
    const { convertedText } = await converter.convert("こんにちは。いい感じになりますか？", [
      { pluginId: "cjp" },
      { pluginId: "genhera" },
    ])

    expect(convertedText).toEqual("ごんにさゎ。。。ぃぃ感じになﾘまずｶ???")
  })
})
