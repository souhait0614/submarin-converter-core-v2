# submarin-converter-core-v2

高い拡張性と使いやすさを重視した TypeScript 製文字変換補助ライブラリ(になる予定)

## Example

```typescript
const exampleConverter1 = (source: string) => source.toUpperCase()
const exampleConverter2 = (source: string) => source.replaceAll("O", "OOOOO")

const source = "This is a very cool library."

const converter = new Converter({
  pluginList: makePluginList([
    new Plugin({ id: "example1", converter: [exampleConverter1] }),
    new Plugin({ id: "example2", converter: [exampleConverter2] }),
  ]),
})

const { convertedText } = await converter.convert(source, [
  { pluginId: "example1" },
  { pluginId: "example2" },
])

console.log(convertedText) // THIS IS A VERY COOOOOOOOOOL LIBRARY.
```

## [Docs](https://souhait0614.github.io/submarin-converter-core-v2/)

詳細は[こちら](https://souhait0614.github.io/submarin-converter-core-v2/)

## Development

```shell
git clone https://github.com/souhait0614/submarin-converter-core-v2.git
cd submarin-converter-core-v2
pnpm i
pnpm test
```
