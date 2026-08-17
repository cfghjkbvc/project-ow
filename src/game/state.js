import { BUILTIN, pairKey } from "../data/packs.js";
import { EXTRAS, PRESETS, POINTS, SIGILS } from "../ui/sigils.jsx";
import { t } from "../data/strings.js";
import { uid, shuffle, isClose, store, KEY } from "./helpers.js";
import { SIGIL_ART } from "../config.js";

const GAPS = { wide: { test: (p) => p.sim <= 3 }, mixed: { test: () => true }, tight: { test: (p) => p.sim >= 4 } };

/* ------------------------------- state -------------------------------- */

const allPacks = (s) => [...BUILTIN, ...s.packs];
const activePairs = (s) => {
  const retired = new Set(s.retired);
  return allPacks(s).filter((p) => s.settings.active.includes(p.id))
    .flatMap((p) => p.pairs).filter((p) => !retired.has(pairKey(p)));
};
const seated = (s) => s.players.filter((p) => p.in !== false);

function makeInitial() {
  const saved = store.get(KEY) || {};
  const guess = typeof navigator !== "undefined" && /^hu/i.test(navigator.language || "") ? "hu" : "en";
  // sim was 1-5 in v1 packs; the 5 band is gone, so clamp on read.
  const packs = (saved.packs || []).map((p) => ({ ...p, pairs: (p.pairs || []).map((x) => ({ ...x, sim: Math.min(4, x.sim || 3) })) }));
  return {
    phase: "home",
    // No placeholder roster. Example names on a fresh install read as unfinished.
    players: saved.players || [],
    settings: {
      impostors: 1, gap: "mixed", preset: "white", revealOnVote: true, haptics: true,
      ui: guess, active: [guess === "hu" ? "core-hu" : "core-en"],
      ...(saved.settings || {}),
    },
    packs, retired: saved.retired || [],
    // A night you start and finish. Scores, history and used pairs belong to
    // the session; packs and retired pairs are deck preferences and outlive it.
    session: saved.session || { active: false },
    scores: saved.scores || {}, history: saved.history || [],
    editingId: null, peekId: null, usedPairs: [], roundNo: 0, round: null, result: null, guess: null, past: [],
  };
}

function assignRoles(players, settings) {
  const ids = shuffle(players.map((p) => p.id));
  const n = players.length;
  const roles = {}; ids.forEach((id) => (roles[id] = "civilian"));
  let budget = Math.max(1, n - 3), cursor = 0;
  const take = (role) => {
    if (budget <= 0 || cursor >= ids.length) return null;
    roles[ids[cursor]] = role; budget--; return ids[cursor++];
  };
  const cap = Math.max(1, Math.ceil(n / 2) - 1);
  const impostors = [];
  for (let i = 0; i < Math.min(settings.impostors, cap, budget); i++) impostors.push(take("undercover"));
  for (const role of PRESETS[settings.preset]) if (n >= EXTRAS[role]) take(role);
  const accompliceOf = Object.values(roles).includes("accomplice")
    ? players.find((p) => p.id === impostors[0])?.name : null;
  return { roles, accompliceOf };
}

/* Seats are fixed for the whole round: dealOrder defines seat I to N, the card
   numerals match, and the board lists them in that order. What moves is the
   opener — a token that advances to the next living seat after every vote,
   exactly like passing it round a real table.

   There is deliberately no Mr White guard here. With a deterministic rotation,
   skipping them would be observable: if the opener jumps from III to IV,
   everyone knows III is Mr White. Seat I is covered instead, by never dealing
   Mr White the first card. */
function nextOpener(dealOrder, alive, current) {
  const i = dealOrder.indexOf(current);
  for (let k = 1; k <= dealOrder.length; k++) {
    const id = dealOrder[(i + k) % dealOrder.length];
    if (alive.includes(id)) return id;
  }
  return alive[0];
}

function dealRound(state) {
  const all = activePairs(state);
  const players = seated(state);
  if (!all.length || players.length < 4) return state;
  let deck = all.filter(GAPS[state.settings.gap].test);
  if (!deck.length) deck = all;
  let pool = deck.filter((p) => !state.usedPairs.includes(pairKey(p)));
  if (!pool.length) pool = deck;
  const pair = pool[Math.floor(Math.random() * pool.length)];
  const flip = Math.random() < 0.5;
  const { roles, accompliceOf } = assignRoles(players, state.settings);
  const alive = players.map((p) => p.id);
  // Mr White must not be dealt first. Whoever gets card one sets the pace of
  // the pass-around, and Mr White stops to read a longer plate and think —
  // that pause on card one is a tell from timing alone.
  const dealOrder = shuffle(alive);
  if (dealOrder.length > 1 && roles[dealOrder[0]] === "mrwhite") {
    const j = 1 + Math.floor(Math.random() * (dealOrder.length - 1));
    [dealOrder[0], dealOrder[j]] = [dealOrder[j], dealOrder[0]];
  }
  const sigilCount = SIGIL_ART ? SIGIL_ART.length : SIGILS.length;

  return {
    ...state, phase: "deal", roundNo: state.roundNo + 1, past: [],
    usedPairs: [...state.usedPairs, pairKey(pair)], result: null, guess: null,
    round: {
      pairKey: pairKey(pair),
      civWord: flip ? pair.a : pair.b, ucWord: flip ? pair.b : pair.a,
      roles, accompliceOf, alive,
      sigil: Math.floor(Math.random() * sigilCount),
      dealOrder, dealIndex: 0,
      opener: dealOrder[0], skips: 0, peeks: {},
    },
  };
}

/* Mr White is a third party, not an impostor. Counting them as both — an
   impostor for parity and a solo role for winning — is what produced states
   like "The Strangers take it" with no impostors left alive.

   Parity counts undercovers against everyone else. Mr White has their own
   parity: alone against one civilian, nobody can be reliably voted out, so
   Mr White takes it without needing to guess. */
function evaluate(round) {
  const roleOf = (id) => round.roles[id];
  const uc = round.alive.filter((id) => roleOf(id) === "undercover").length;
  const white = round.alive.filter((id) => roleOf(id) === "mrwhite").length;
  const others = round.alive.length - uc - white;

  if (uc === 0 && white === 0) return "civilians";
  if (uc > 0 && uc >= others + white) return "impostors";
  if (uc === 0 && white >= others) return "mrwhite";
  return null;
}

function award(state, winner) {
  const { round } = state;
  const scores = { ...state.scores };
  const add = (id, n) => (scores[id] = (scores[id] || 0) + n);
  seated(state).forEach((p) => {
    const r = round.roles[p.id];
    // Only civilians score a civilian win. The Jester and Mr White are neutral
    // roles — they score on their own win or not at all.
    if (winner === "civilians" && r === "civilian") add(p.id, POINTS.civilian);
    if (winner === "impostors" && r === "undercover") add(p.id, POINTS.undercover);
    // The Accomplice has to be alive at the end. Without a failure state the
    // role scored for doing nothing, which is why it felt weightless.
    if (winner === "impostors" && r === "accomplice" && round.alive.includes(p.id)) add(p.id, POINTS.accomplice);
    if (winner === "mrwhite" && r === "mrwhite") add(p.id, POINTS.whiteWin);
    if (winner === "jester" && r === "jester") add(p.id, POINTS.jesterWin);
  });
  return scores;
}

const logRound = (s, round, winner) => [
  ...s.history,
  {
    n: s.roundNo, civ: round.civWord, uc: round.ucWord, winner,
    who: seated(s).map((p) => ({ name: p.name, role: round.roles[p.id] })),
  },
].slice(-40);

const snapshot = (s) => ({ round: s.round, scores: s.scores, result: s.result, phase: s.phase, guess: s.guess, history: s.history });
const pushPast = (s) => [...s.past, snapshot(s)].slice(-12);

function reducer(state, action) {
  switch (action.type) {
    case "ADD_PLAYER": {
      const name = action.name.trim();
      if (!name || state.players.length >= 20) return state;
      return { ...state, players: [...state.players, { id: uid(), name, in: true }] };
    }
    case "REMOVE_PLAYER":
      return { ...state, players: state.players.filter((p) => p.id !== action.id) };
    case "TOGGLE_SEAT":
      return { ...state, players: state.players.map((p) => p.id === action.id ? { ...p, in: p.in === false } : p) };
    case "SET": {
      const settings = { ...state.settings, [action.key]: action.value };
      // Switching the interface language swaps the core deck with it. Custom
      // packs are left alone — only the built-in pair is exchanged.
      if (action.key === "ui") {
        const from = action.value === "hu" ? "core-en" : "core-hu";
        const to = action.value === "hu" ? "core-hu" : "core-en";
        const active = [...new Set(settings.active.map((x) => (x === from ? to : x)))];
        settings.active = active.length ? active : [to];
      }
      return { ...state, settings };
    }
    case "TOGGLE_PACK": {
      const a = state.settings.active;
      const next = a.includes(action.id) ? a.filter((x) => x !== action.id) : [...a, action.id];
      return { ...state, settings: { ...state.settings, active: next.length ? next : a } };
    }
    case "NEW_PACK": {
      const p = { id: uid(), name: t("newPack"), lang: state.settings.ui, pairs: [] };
      return { ...state, packs: [...state.packs, p], editingId: p.id, phase: "editor" };
    }
    case "IMPORT_PACK":
      return { ...state, packs: [...state.packs, action.pack],
        settings: { ...state.settings, active: [...state.settings.active, action.pack.id] } };
    case "EDIT_PACK": return { ...state, editingId: action.id, phase: "editor" };
    case "PATCH_PACK":
      return { ...state, packs: state.packs.map((p) => p.id === action.id ? { ...p, ...action.patch } : p) };
    case "DELETE_PACK": {
      const rest = state.settings.active.filter((x) => x !== action.id);
      return { ...state, packs: state.packs.filter((p) => p.id !== action.id), editingId: null, phase: "packs",
        settings: { ...state.settings, active: rest.length ? rest : ["core-en"] } };
    }
    case "RETIRE": return { ...state, retired: [...new Set([...state.retired, action.key])] };
    case "RESTORE_ALL": return { ...state, retired: [] };
    case "GOTO": return { ...state, phase: action.phase };
    case "RESET_SCORES": return { ...state, scores: {}, history: [] };
    case "TOGGLE_ALL_SEATS":
      return { ...state, players: state.players.map((p) => ({ ...p, in: action.value })) };
    case "DEAL": {
      // Dealing is what starts a night, so the counters reset here rather than
      // needing a separate "new game" step the player has to remember.
      const fresh = state.session.active
        ? state
        : { ...state, session: { active: true, startedAt: Date.now() },
            scores: {}, history: [], usedPairs: [], roundNo: 0 };
      return dealRound(fresh);
    }
    case "FINISH_NIGHT": return { ...state, phase: "final" };
    case "CLOSE_NIGHT":
      return { ...state, phase: "home", session: { active: false },
        scores: {}, history: [], usedPairs: [], roundNo: 0,
        round: null, result: null, guess: null, past: [] };
    // Same as DEAL, but the round number does not advance — the thrown-away
    // pair stays in usedPairs so it can't come back tonight.
    case "REDEAL": return { ...dealRound(state), roundNo: state.roundNo };
    case "NEXT_CARD": {
      const i = state.round.dealIndex + 1;
      if (i >= state.round.dealOrder.length) return { ...state, phase: "board" };
      return { ...state, round: { ...state.round, dealIndex: i } };
    }
    // Peeking is public on purpose: the table picks the name, so nobody can
    // quietly look at someone else's card and learn which side they're on.
    case "PEEK": {
      const peeks = { ...(state.round.peeks || {}) };
      peeks[action.id] = (peeks[action.id] || 0) + 1;
      return { ...state, phase: "peek", peekId: action.id, round: { ...state.round, peeks } };
    }
    case "PEEK_DONE": return { ...state, phase: "board", peekId: null };
    case "PREV_CARD":
      return { ...state, round: { ...state.round, dealIndex: Math.max(0, state.round.dealIndex - 1) } };
    case "SKIP_VOTE":
      return { ...state, past: pushPast(state),
        round: { ...state.round, skips: state.round.skips + 1,
          opener: nextOpener(state.round.dealOrder, state.round.alive, state.round.opener) } };
    case "UNDO": {
      if (!state.past.length) return state;
      const prev = state.past[state.past.length - 1];
      return { ...state, ...prev, past: state.past.slice(0, -1) };
    }
    case "ELIMINATE": {
      const { round } = state;
      const role = round.roles[action.id];
      const alive = round.alive.filter((id) => id !== action.id);
      const next = { ...round, alive, opener: nextOpener(round.dealOrder, alive, round.opener) };
      const name = state.players.find((p) => p.id === action.id).name;
      const past = pushPast(state);
      if (role === "jester")
        return { ...state, past, phase: "result", round: next,
          scores: award({ ...state, round: next }, "jester"),
          history: logRound(state, next, "jester"), result: { name, role, winner: "jester" } };
      if (role === "mrwhite")
        return { ...state, past, phase: "result", round: next, result: { name, role, winner: null, guessNext: true } };
      const winner = evaluate(next);
      return { ...state, past, phase: "result", round: next,
        scores: winner ? award({ ...state, round: next }, winner) : state.scores,
        history: winner ? logRound(state, next, winner) : state.history,
        result: { name, role, winner } };
    }
    case "CONTINUE": {
      const r = state.result;
      if (r.guessNext) return { ...state, phase: "guess" };
      return r.winner ? { ...state, phase: "end" } : { ...state, phase: "board", result: null };
    }
    case "SUBMIT_GUESS":
      return { ...state, phase: "guessResult", guess: { text: action.text, auto: isClose(action.text, state.round.civWord) } };
    case "JUDGE_GUESS": {
      if (action.correct)
        return { ...state, phase: "end", scores: award(state, "mrwhite"),
          history: logRound(state, state.round, "mrwhite"), result: { ...state.result, winner: "mrwhite" } };
      const winner = evaluate(state.round);
      if (winner) return { ...state, phase: "end", scores: award(state, winner),
        history: logRound(state, state.round, winner), result: { ...state.result, winner } };
      return { ...state, phase: "board", result: null, guess: null };
    }
    case "TO_HOME": return { ...state, phase: "home", round: null, result: null, guess: null, past: [] };
    default: return state;
  }
}

export { GAPS, allPacks, activePairs, seated, makeInitial, reducer };
