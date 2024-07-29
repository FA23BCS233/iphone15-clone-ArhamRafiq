import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sentryVitePlugin({
    org: "jsm-x9",
    project: "javascript-react"
  }), sentryVitePlugin({
    org: "jsm-vu",
    project: "javascript-react"
  })],
  // base : "/iphone-15-pro-clone/",
  build: {
    sourcemap: true
  },

})