import { whop } from '@whop/cli/vite'
import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { cloudflare } from '@cloudflare/vite-plugin'

const isPreview = process.env.PREVIEW_BUILD === 'true'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    whop({ disableTanstackDevtools: true }),
    devtools(),
    // Only use cloudflare for Whop deployment, not Vercel previews
    ...(!isPreview ? [cloudflare({ viteEnvironment: { name: 'ssr' } })] : []),
    tailwindcss(),
    tanstackStart({ 
      // For preview builds, use static export
      ...(isPreview ? { ssr: false, static: true } : {})
    }),
    viteReact(),
  ],
})

export default config