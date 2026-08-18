/* The two built-in decks live in their own files — they are the part of this
   project that changes most often, and the curation rules that govern them are
   documented at the top of each.

     pairs-en.js  two tiers, sim 3 and 4
     pairs-hu.js  one curated tier, every pair carrying its distinguishing axis
*/

import { CORE_EN } from "./pairs-en.js";
import { CORE_HU } from "./pairs-hu.js";

const BUILTIN = [
  { id: "core-en", name: "Core deck", lang: "en", builtin: true, pairs: CORE_EN },
  { id: "core-hu", name: "Alappakli", lang: "hu", builtin: true, pairs: CORE_HU },
];

const pairKey = (p) => `${p.a}|${p.b}`.toLowerCase();

export { CORE_EN, CORE_HU, BUILTIN, pairKey };
