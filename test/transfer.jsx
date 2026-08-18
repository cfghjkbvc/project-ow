import { buildBackup, parseBackup, parsePairList } from "../src/game/transfer.js";
import { makeInitial, reducer } from "../src/game/state.js";

/* Backup and bulk paste both take text from outside the app and put it into
   state, so this suite is mostly about hostile input rather than happy paths. */

let fail = 0;
const ok = (c, m) => { if (!c) fail++; console.log((c ? "ok   " : "FAIL ") + m); };
const throws = (fn, want, m) => {
  try { fn(); ok(false, m + " (no throw)"); }
  catch (e) { ok(e.message === want, m + (e.message === want ? "" : " got '" + e.message + "'")); }
};

// ---- build a state worth backing up -------------------------------------
let s = makeInitial();
["Anna", "Bence", "Csaba", "Dora"].forEach((n) => { s = reducer(s, { type: "ADD_PLAYER", name: n }); });
s = reducer(s, { type: "NEW_PACK" });
const packId = s.editingId;
s = reducer(s, { type: "PATCH_PACK", id: packId, patch: { name: "Belsos", pairs: [{ a: "Kávé", b: "Tea", sim: 3 }] } });
s = reducer(s, { type: "RETIRE", key: "alma|körte" });

console.log("=== round trip ===");
const round = parseBackup(buildBackup(s));
ok(round.summary.players === 4, "players survive (" + round.summary.players + ")");
ok(round.summary.packs === 1, "packs survive");
ok(round.summary.pairs === 1, "pairs survive");
ok(round.data.packs[0].pairs[0].a === "Kávé", "accents survive");
ok(round.data.retired.includes("alma|körte"), "retired survives");

console.log("\n=== rejects bad input ===");
throws(() => parseBackup("not json"), "unreadable", "garbage");
throws(() => parseBackup('{"a":1}'), "notOurs", "wrong shape");
throws(() => parseBackup('{"app":"something-else","data":{}}'), "notOurs", "wrong app tag");
throws(() => parseBackup('{"app":"odd-word","v":99,"data":{}}'), "tooNew", "future version");

console.log("\n=== sanitises hostile input ===");
const nasty = parseBackup(JSON.stringify({
  app: "odd-word", v: 1, data: {
    players: [{ name: "x".repeat(200) }, { name: "" }, "junk", null],
    packs: [
      { id: "core-en", name: "hijack", pairs: [{ a: "A", b: "B" }] },
      { name: "ok", lang: "zz", pairs: [
        { a: "Same", b: "same", sim: 3 },
        { a: "Good", b: "Pair", sim: 99 },
        { a: "", b: "Empty" },
        "junk",
      ] },
    ],
    retired: ["fine", 42, null],
    settings: { ui: "hu", evil: "payload", active: [] },
    history: "not an array",
  },
}));
ok(nasty.data.players.length === 1, "drops nameless and non-object players");
ok(nasty.data.players[0].name.length === 20, "clamps long names");
ok(!nasty.data.packs.some((p) => p.id === "core-en"), "cannot shadow a built-in pack id");
ok(nasty.data.packs[0].pairs.length === 1, "drops self-pairs, empties and junk");
ok(nasty.data.packs[0].pairs[0].sim === 4, "clamps sim into range");
ok(nasty.data.packs[0].lang === "en", "unknown lang falls back");
ok(nasty.data.retired.length === 1, "drops non-string retired keys");
ok(!("evil" in nasty.data.settings), "drops unknown settings keys");
ok(!("active" in nasty.data.settings), "drops an empty active list");
ok(Array.isArray(nasty.data.history), "history is always an array");

console.log("\n=== merge vs replace ===");
const backup = parseBackup(buildBackup(s)).data;
let host = makeInitial();
["Anna", "Zoltan"].forEach((n) => { host = reducer(host, { type: "ADD_PLAYER", name: n }); });
host = { ...host, scores: { keep: 5 } };
const merged = reducer(host, { type: "IMPORT_BACKUP", data: backup, mode: "merge" });
ok(merged.players.length === 5, "merge adds only new names (" + merged.players.length + ")");
ok(merged.players.filter((p) => p.name === "Anna").length === 1, "no duplicate Anna");
ok(merged.packs.length === 1, "merge brings the pack");
ok(merged.packs[0].id !== packId, "imported pack gets a fresh id");
ok(merged.scores.keep === 5, "merge leaves your scores alone");
const replaced = reducer(host, { type: "IMPORT_BACKUP", data: backup, mode: "replace" });
ok(replaced.players.length === 4, "replace uses the file's roster");
ok(!replaced.scores.keep, "replace drops your scores");
ok(replaced.phase === "home", "lands on home");

console.log("\n=== bulk paste ===");
const parsed = parsePairList(`
# a comment
Kávé / Tea
Bor, Sör 4
Alma - Körte
Foci | Kézilabda
Toll;Ceruza 2
onlyoneword
Same / same
Kávé / Tea
`, new Set(["hó|homok"]));
ok(parsed.pairs.length === 5, "reads 5 pairs (" + parsed.pairs.length + ")");
ok(parsed.pairs[1].sim === 4, "trailing digit sets sim");
ok(parsed.pairs[0].sim === 3, "defaults to 3");
ok(parsed.pairs[4].sim === 2, "semicolon plus digit");
ok(parsed.skipped === 2, "skips one-word and self-pair lines (" + parsed.skipped + ")");
ok(parsed.dupes === 1, "catches the repeat");
const dedupe = parsePairList("Hó / Homok", new Set(["hó|homok"]));
ok(dedupe.pairs.length === 0 && dedupe.dupes === 1, "respects pairs already in the pack");

console.log(fail ? "\n" + fail + " FAILED" : "\nall green");
process.exit(fail ? 1 : 0);
