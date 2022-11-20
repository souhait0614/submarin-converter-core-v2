import { generate as cjpGenerate } from "cjp"
import { generate as genheraGenerate } from "genhera"
import { describe, expect, it } from "vitest"

import { Converter } from "../src"

describe("Converter", () => {
  it("Convert", async () => {
    const plugins = new Map([
      ["cjp", { convert: (source: string) => cjpGenerate(source) }],
      ["genhera", { convert: (source: string) => genheraGenerate(source) }],
    ] as const)
    const converter = new Converter({
      plugins,
    })
    const { resultText } = await converter.convert("こんにちは。いい感じになりますか？", [
      { converterId: "cjp" },
      { converterId: "genhera" },
    ])
    expect(resultText).toEqual("ごんにさゎ。。。ぃぃ感じになﾘまずｶ???")
  })

  // it("get", () => {
  //   const values = [str, 0, false, undefined]
  //   const targets = values.map((val) => createStore(val))
  //   expect(targets.map((store) => store.get())).toEqual(values)
  // })
})
