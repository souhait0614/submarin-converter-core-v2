import path from "path"
import { defineConfig } from "vite"

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "SCCoreV2",
      fileName: (format) => `index.${format}.js`,
    },
  },
})
