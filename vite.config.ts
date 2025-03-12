import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Importa el módulo 'path'

export default defineConfig({
  plugins: [react()],
  base: "/React_Table_With_Filters/",
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Configura el alias manualmente
    },
  },
});