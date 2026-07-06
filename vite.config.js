import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const watsonUrl = env.VITE_WATSON_URL || 'https://api.au-syd.watson-orchestrate.cloud.ibm.com';
  
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/ibm-iam': {
          target: 'https://iam.cloud.ibm.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/ibm-iam/, '')
        },
        '/api/watson': {
          target: watsonUrl,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/watson/, '')
        }
      }
    }
  }
})
