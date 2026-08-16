import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({ plugins: [react()],
  build: { ssr: "test/smoke.jsx", outDir: "test/dist", rollupOptions: { output: { entryFileNames: "smoke.mjs" } } } });
