import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Change this to match your repository name, keeping both slashes.
// Wrong value here is the usual cause of a blank page on GitHub Pages.
export default defineConfig({
  base: "/odd-word/",
  plugins: [react()],
});
