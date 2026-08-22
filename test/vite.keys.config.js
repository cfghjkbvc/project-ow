import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({ plugins: [react()],
  build: { ssr: "test/keys.jsx", outDir: "test/kdist", rollupOptions: { output: { entryFileNames: "k.mjs" } } } });
