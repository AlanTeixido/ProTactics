import { fileURLToPath, URL } from 'node:url'
import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// GitHub Pages serves 404.html for any unknown path, so a copy of index.html
// lets deep links such as /ProTactics/dashboard boot the SPA router.
function spaFallback() {
  let outDir
  return {
    name: 'spa-404-fallback',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      copyFileSync(resolve(outDir, 'index.html'), resolve(outDir, '404.html'))
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ command, isPreview }) => ({
  // Production builds (and `vite preview` of them) are published at
  // https://<user>.github.io/ProTactics/; the dev server keeps using '/'.
  base: command === 'build' || isPreview ? '/ProTactics/' : '/',
  plugins: [
    vue(),
    vueDevTools(),
    spaFallback(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
}))
