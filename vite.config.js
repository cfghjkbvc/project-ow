import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/* base has to match where the site is actually served from.
 *
 *   build    -> GitHub Pages serves it under /<repo-name>/
 *   preview  -> serves the built output, so it needs the same path
 *   dev      -> served from the root, so a sub-path here just means every
 *               wrong URL 404s silently
 *
 * `command` is "serve" for BOTH dev and preview, so it cannot tell them apart
 * on its own — checking it alone is what made `npm run preview` come up blank.
 * `isPreview` is the flag that actually distinguishes them.
 *
 * Change "/project-ow/" if you rename the repository, keeping both slashes.
 */
export default defineConfig(({ command, isPreview }) => ({
  base: command === "build" || isPreview ? "/project-ow/" : "/",
  plugins: [react()],
}));
