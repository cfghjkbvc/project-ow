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
export const ENABLE_SW = false; // flip to true once public/sw.js exists

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

/* Fonts. Flip SELF_HOSTED once the woff2 files are in public/fonts/ —
   Google Fonts is a network dependency and the game gets played in gardens.
   See OFFLINE.md for the four files to download. */
export const SELF_HOSTED_FONTS = false;

const GOOGLE_FONTS =
  "@import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Bodoni+Moda:opsz,wght@6..96,400;6..96,600;6..96,800&family=Jost:wght@400;500&display=swap');";

const LOCAL_FONTS = `
@font-face{font-family:'Abril Fatface'; src:url('${BASE}fonts/abril-fatface-400.woff2') format('woff2');
  font-weight:400; font-style:normal; font-display:swap;}
@font-face{font-family:'Bodoni Moda'; src:url('${BASE}fonts/bodoni-moda-600.woff2') format('woff2');
  font-weight:600; font-style:normal; font-display:swap;}
@font-face{font-family:'Bodoni Moda'; src:url('${BASE}fonts/bodoni-moda-800.woff2') format('woff2');
  font-weight:800; font-style:normal; font-display:swap;}
@font-face{font-family:'Jost'; src:url('${BASE}fonts/jost-400.woff2') format('woff2');
  font-weight:400 500; font-style:normal; font-display:swap;}
`;

export const FONT_CSS = SELF_HOSTED_FONTS ? LOCAL_FONTS : GOOGLE_FONTS;
