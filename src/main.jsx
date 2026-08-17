import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

/* Self-hosted fonts via Fontsource. Vite fingerprints the woff2 files, so a
   font change can never be served stale from the service worker cache, and
   there is no runtime dependency on Google.

   latin-ext is not optional: it carries U+0100–02BA, which is where Hungarian's
   ő and ű live. Without it the Hungarian deck renders in a fallback face. */
import "@fontsource/abril-fatface/latin-400.css";
import "@fontsource/abril-fatface/latin-ext-400.css";
import "@fontsource-variable/bodoni-moda/wght.css";
import "@fontsource-variable/jost/wght.css";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
