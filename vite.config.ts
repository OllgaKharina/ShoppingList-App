// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  base: "/ShoppingList-App/", // название  репозитория
  build: {
    minify: "esbuild",
    sourcemap: false,
    rollupOptions: {
      treeshake: true,
    },
  },
});
