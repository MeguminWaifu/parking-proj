import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'mcl-parking-yep.loca.lt', 
      '.loca.lt'                   
    ]
  },
  preview: {
    allowedHosts: ['.loca.lt'] 
  }
})
