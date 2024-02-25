import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: "dist",
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, '../src/main.ts'),
      name: 'luckyexcel',
      // the proper extensions will be added
      fileName: 'luckyexcel',
    }
  },
})