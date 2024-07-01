import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Use port 3000 unless you have a specific reason to change it
    host: true, // Expose server to the network if needed
  },
});
