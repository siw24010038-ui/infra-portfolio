import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/infra-portfolio/',
  define: {
    // ビルド実行時（= GitHub Actionsでのデプロイ時）の日時を自動で埋め込む
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },
})
