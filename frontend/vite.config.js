import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default ({ mode }) => {
  process.env = Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  return defineConfig({
    plugins: [react()],
    server: {
      port: process.env.VITE_PORT || 3000,
      proxy: {
        '/api': {
          target: `${process.env.VITE_PROXY}`,
          changeOrigin: true,
          secure: process.env.VITE_ENV === 'production',
        },
      },
    },
  })
}
