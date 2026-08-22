import fs from "fs";
import { setLang, t } from "../src/data/strings.js";

/* Two static audits. Both catch the same class of bug: a screen shipped ahead
   of the data behind it. Neither shows up as a crash at runtime — a missing
   string renders its own key on screen, and an action with no reducer case
   falls through `default: return state` and silently does nothing. Both have
   shipped on this project, so they are checked in CI now. */

const files = [];
(function walk(d) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = d + "/" + f.name;
    if (f.isDirectory()) walk(p); else if (/\.jsx?$/.test(f.name)) files.push(p);
  }
})("src");

let fail = 0;

/* 1. Every t("literal") resolves in both languages.
   Prefix calls like t("r_" + role) are skipped: the captured text ends in an
   underscore and is not a key on its own. */
const keys = new Set();
for (const f of files)
  for (const m of fs.readFileSync(f, "utf8").matchAll(/\bt\("([A-Za-z0-9_]+)"/g))
    if (!m[1].endsWith("_")) keys.add(m[1]);

for (const lang of ["en", "hu"]) {
  setLang(lang);
  for (const k of [...keys].sort()) {
    if (t(k, 1, 2, 3) === k) { console.log("FAIL missing string  " + lang + "  " + k); fail++; }
  }
}
console.log("ok   " + keys.size + " string keys resolve in en and hu");

/* 2. Every dispatched action has a reducer case. */
const st = fs.readFileSync("src/game/state.js", "utf8");
const cases = new Set([...st.matchAll(/case "([A-Z_]+)"/g)].map((m) => m[1]));
const dispatched = new Set();
for (const f of files)
  for (const m of fs.readFileSync(f, "utf8").matchAll(/type:\s*"([A-Z_]+)"/g)) dispatched.add(m[1]);

for (const a of [...dispatched].sort())
  if (!cases.has(a)) { console.log("FAIL no reducer case  " + a); fail++; }
console.log("ok   " + dispatched.size + " dispatched actions all have a reducer case");

console.log(fail ? "\n" + fail + " FAILED" : "\nall green");
process.exit(fail ? 1 : 0);
