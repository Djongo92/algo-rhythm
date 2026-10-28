import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Served at https://djongo92.github.io/algo-rhythm/ — base must match the repo name.
export default defineConfig({
  base: '/algo-rhythm/',
  plugins: [react(), tailwindcss()],
});
