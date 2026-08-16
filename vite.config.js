import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The repo path only applies to the built site. Serving dev from the same
// sub-path means every wrong URL 404s silently, so dev stays at the root.
// This must match the repository name exactly, keeping both slashes.
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/project-ow/" : "/",
  plugins: [react()],
}));
