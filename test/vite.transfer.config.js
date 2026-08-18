import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({ plugins: [react()],
  build: { ssr: "test/transfer.jsx", outDir: "test/tdist", rollupOptions: { output: { entryFileNames: "t.mjs" } } } });
