import { defineConfig } from 'vite'

// Separate build target for the embeddable Preact widget. Outputs a single
// self-contained ES bundle to public/widget/v1/widget.js so it can be served as
// a static CDN asset and embedded on third-party pages. publicDir is disabled
// because the output lives inside the app's public/ folder.
export default defineConfig({
  publicDir: false,

  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'preact',
  },

  build: {
    outDir: 'public/widget/v1',
    emptyOutDir: false,
    target: 'es2019',
    minify: 'esbuild',
    lib: {
      entry: 'src/widget/index.ts',
      formats: ['es'],
      fileName: () => 'widget.js',
    },
    rollupOptions: {
      output: {
        entryFileNames: 'widget.js',
      },
    },
  },
})
