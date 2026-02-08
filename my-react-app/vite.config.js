import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        logLevel: 'debug', // ⭐ 必开
          configure(proxy) {
          proxy.on('proxyReq', (proxyReq, req) => {
            const host = proxyReq.getHeader('host') // localhost:3001
            const port = host?.split(':')[1]

            console.log('➡️ 原始请求:', req.method, req.url)
            console.log('➡️ proxy host:', host)
            console.log('➡️ proxy port:', port)
            console.log('➡️ proxy url:', `http://${host}${proxyReq.path}`)
            console.log('➡️ proxy query:', req.req)
          })
        }
      }
    }
  }
})