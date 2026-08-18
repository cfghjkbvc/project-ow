import { uid } from "./helpers.js";

/* ------------------------------- transfer ------------------------------ *
 *  Two jobs, both of which take data from outside the app and put it into
 *  state, so both validate hard rather than trusting the input.
 *
 *  1. Whole-app backup: everything that lives in localStorage, as a file.
 *  2. Bulk pair paste: turning a list someone typed into pack entries.
 * --------------------------------------------------------------------- */

export const BACKUP_VERSION = 1;
const TAG = "odd-word";

export function buildBackup(state) {
  return JSON.stringify({
    app: TAG,
    v: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    data: {
      players: state.players,
      packs: state.packs,
      retired: state.retired,
      settings: state.settings,
      scores: state.scores,
      history: state.history,
      session: state.session,
    },
  }, null, 2);
}

export const backupFilename = () =>
  `odd-word-backup-${new Date().toISOString().slice(0, 10)}.json`;

/* Everything below is defensive on purpose. A backup file is user-editable
   text, and a malformed pack would otherwise crash the deal rather than fail
   politely. */

const str = (v, max) => (typeof v === "string" ? v.slice(0, max) : "");
const clampSim = (v) => Math.min(4, Math.max(1, Math.round(Number(v)) || 3));

const cleanPairs = (arr) =>
  (Array.isArray(arr) ? arr : [])
    .map((p) => ({ a: str(p?.a, 40).trim(), b: str(p?.b, 40).trim(), sim: clampSim(p?.sim) }))
    .filter((p) => p.a && p.b && p.a.toLowerCase() !== p.b.toLowerCase());

const cleanPacks = (arr) =>
  (Array.isArray(arr) ? arr : [])
    .map((p) => ({
      id: str(p?.id, 24) || uid(),
      name: str(p?.name, 40).trim() || "Pack",
      lang: p?.lang === "hu" ? "hu" : "en",
      pairs: cleanPairs(p?.pairs),
    }))
    // built-in ids must never be shadowed by an imported pack
    .filter((p) => p.id !== "core-en" && p.id !== "core-hu");

const cleanPlayers = (arr) =>
  (Array.isArray(arr) ? arr : [])
    .map((p) => ({ id: str(p?.id, 24) || uid(), name: str(p?.name, 20).trim(), in: p?.in !== false }))
    .filter((p) => p.name)
    .slice(0, 40);

const KNOWN_SETTINGS = ["impostors", "gap", "preset", "revealOnVote", "haptics", "ui", "active"];

export function parseBackup(text) {
  let raw;
  try { raw = JSON.parse(text); } catch (_) { throw new Error("unreadable"); }
  if (!raw || raw.app !== TAG || !raw.data) throw new Error("notOurs");
  if (Number(raw.v) > BACKUP_VERSION) throw new Error("tooNew");

  const d = raw.data;
  const settings = {};
  for (const k of KNOWN_SETTINGS) if (d.settings && k in d.settings) settings[k] = d.settings[k];
  if (!Array.isArray(settings.active) || !settings.active.length) delete settings.active;

  const data = {
    players: cleanPlayers(d.players),
    packs: cleanPacks(d.packs),
    retired: (Array.isArray(d.retired) ? d.retired : []).filter((k) => typeof k === "string").slice(0, 2000),
    settings,
    scores: d.scores && typeof d.scores === "object" ? d.scores : {},
    history: Array.isArray(d.history) ? d.history.slice(-40) : [],
    session: d.session && typeof d.session === "object" ? d.session : { active: false },
  };

  return {
    data,
    exportedAt: typeof raw.exportedAt === "string" ? raw.exportedAt.slice(0, 10) : null,
    summary: {
      players: data.players.length,
      packs: data.packs.length,
      pairs: data.packs.reduce((n, p) => n + p.pairs.length, 0),
      rounds: data.history.length,
    },
  };
}

/* Bulk paste. Deliberately forgiving about separators, because whatever people
   paste will not be in the format we asked for:
     Kávé / Tea      Bor, Sör 4      Alma - Körte      Foci | Kézilabda
   A trailing 1-4 is read as the similarity; anything else defaults to 3. */
const SEPARATOR = /\s*(?:\/|\||;|,|\t|\s[–—-]\s)\s*/;

export function parsePairList(text, existingKeys = new Set()) {
  const pairs = [];
  const seen = new Set(existingKeys);
  let skipped = 0, dupes = 0;

  for (const line of String(text).split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    // pull a trailing similarity digit off the end before splitting
    let body = trimmed, sim = 3;
    const m = /^(.*?)[\s,;|]+([1-4])$/.exec(trimmed);
    if (m) { body = m[1].trim(); sim = Number(m[2]); }

    const parts = body.split(SEPARATOR).map((s) => s.trim()).filter(Boolean);
    if (parts.length < 2) { skipped++; continue; }

    const a = parts[0].slice(0, 40), b = parts[1].slice(0, 40);
    if (a.toLowerCase() === b.toLowerCase()) { skipped++; continue; }

    const key = `${a}|${b}`.toLowerCase();
    if (seen.has(key)) { dupes++; continue; }
    seen.add(key);
    pairs.push({ a, b, sim });
  }

  return { pairs, skipped, dupes };
}
