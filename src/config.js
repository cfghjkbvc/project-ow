  /* ==================================================================== *
 *  ODD WORD
 *
 *  ART: ROLE_ART holds full generated cards (frame and title baked in),
 *  rendered full-bleed. SIGIL_ART holds bare square panels for the deal
 *  card, where the frame and word banner are drawn in HTML.
 *
 *  SECRECY: one sigil per deal, shared by every card. Role art appears
 *  only on public screens.
 * ==================================================================== */

export const BASE = import.meta.env.BASE_URL;
export const ART = (f) => BASE + "art/" + f;
export const ENABLE_SW = true; // public/sw.js precaches the shell for offline play

export const SIGIL_ART = Array.from({ length: 6 }, (_, i) =>
  ART(`sigil/${i + 1}.webp`)
);
export const ROLE_ART = {
  civilian: ART("role-civilian.webp"),
  undercover: ART("role-undercover.webp"),
  mrwhite: ART("role-mrwhite.webp"),
  jester: ART("role-jester.webp"),
  accomplice: ART("role-accomplice.webp"),
};

/* Fonts are self-hosted through Fontsource and imported in main.jsx, so Vite
   bundles and fingerprints them. Nothing is left to inject at runtime, but
   theme.js still concatenates FONT_CSS, so it stays as an empty string rather
   than disappearing. */
export const FONT_CSS = "";
