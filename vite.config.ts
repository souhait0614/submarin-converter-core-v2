import path from "path"
import { defineConfig } from "vite"

export default defineConfig({
  build: {
    target: "es2020",
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "SCCoreV2",
      fileName: (format) => `index.${format}.js`,
    },
  },
})
