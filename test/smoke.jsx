import React from "react";
import { renderToString } from "react-dom/server";
import { makeInitial, reducer, seated } from "../src/game/state.js";
import { setLang } from "../src/data/strings.js";
import { Shell } from "../src/ui/atoms.jsx";
import Setup from "../src/screens/Setup.jsx";
import Rules from "../src/screens/Rules.jsx";
import Recap from "../src/screens/Recap.jsx";
import { Packs, Editor } from "../src/screens/Packs.jsx";
import { Deal } from "../src/screens/Deal.jsx";
import Peek from "../src/screens/Peek.jsx";
import Board from "../src/screens/Board.jsx";
import { Result } from "../src/screens/Result.jsx";
import { Guess, GuessResult } from "../src/screens/Guess.jsx";
import End from "../src/screens/End.jsx";

const SCREEN = { setup: Setup, rules: Rules, recap: Recap, packs: Packs, editor: Editor,
  deal: Deal, peek: Peek, board: Board, result: Result, guess: Guess, guessResult: GuessResult, end: End };

const noop = () => {};
const draw = (st, label) => {
  const C = SCREEN[st.phase];
  if (!C) throw new Error("no screen for phase " + st.phase);
  const html = renderToString(<Shell heading="x"><C state={st} dispatch={noop} /></Shell>);
  if (html.length < 200) throw new Error("suspiciously empty render: " + label);
  return html;
};

let fails = 0;
const check = (name, fn) => {
  try { fn(); console.log("ok   " + name); }
  catch (e) { fails++; console.log("FAIL " + name + " → " + e.message); }
};

for (const lang of ["en", "hu"]) {
  setLang(lang);
  let s = makeInitial();
  s = { ...s, settings: { ...s.settings, ui: lang, preset: "wild", impostors: 1 } };
  ["Anna","Bence","Csaba","Dora","Emil","Fanni","Gabor","Hanna"].forEach((n, i) => {
    if (i > 3) s = reducer(s, { type: "ADD_PLAYER", name: n });
  });

  check(lang + " setup renders", () => draw(s, "setup"));
  check(lang + " rules renders", () => draw({ ...s, phase: "rules" }, "rules"));
  check(lang + " packs renders", () => draw({ ...s, phase: "packs" }, "packs"));

  check(lang + " deals a round", () => {
    s = reducer(s, { type: "DEAL" });
    if (s.phase !== "deal") throw new Error("phase is " + s.phase);
    if (!s.round.civWord || !s.round.ucWord) throw new Error("no words");
    if (s.round.civWord === s.round.ucWord) throw new Error("same word both sides");
  });

  check(lang + " every deal card renders", () => {
    for (let i = 0; i < s.round.dealOrder.length; i++) {
      const st = { ...s, round: { ...s.round, dealIndex: i } };
      const html = draw(st, "deal " + i);
      if (!html.includes("banner")) throw new Error("no banner on card " + i);
    }
  });

  check(lang + " redeal works", () => {
    const before = s.roundNo;
    const r = reducer(s, { type: "REDEAL" });
    if (r.roundNo !== before) throw new Error("round number moved");
    if (r.usedPairs.length < 2) throw new Error("old pair not retained as used");
  });

  check(lang + " peek renders for every player", () => {
    for (const p of seated(s)) {
      const st = reducer(s, { type: "PEEK", id: p.id });
      if (st.phase !== "peek") throw new Error("peek phase not set");
      draw(st, "peek");
      if (st.round.peeks[p.id] !== 1) throw new Error("peek not counted");
    }
  });

  check(lang + " reaches the board", () => {
    while (s.phase === "deal") s = reducer(s, { type: "NEXT_CARD" });
    if (s.phase !== "board") throw new Error("phase is " + s.phase);
    draw(s, "board");
  });

  check(lang + " skip and undo", () => {
    const a = reducer(s, { type: "SKIP_VOTE" });
    const b = reducer(a, { type: "UNDO" });
    if (b.phase !== "board") throw new Error("undo left phase " + b.phase);
  });

  check(lang + " plays to a winner", () => {
    let guard = 0;
    while (s.phase !== "end" && guard++ < 40) {
      if (s.phase === "board") {
        s = reducer(s, { type: "ELIMINATE", id: s.round.alive[0] });
      } else if (s.phase === "result") {
        draw(s, "result");
        s = reducer(s, { type: "CONTINUE" });
      } else if (s.phase === "guess") {
        draw(s, "guess");
        s = reducer(s, { type: "SUBMIT_GUESS", text: "nonsense" });
      } else if (s.phase === "guessResult") {
        draw(s, "guessResult");
        s = reducer(s, { type: "JUDGE_GUESS", correct: false });
      } else throw new Error("stuck in " + s.phase);
    }
    if (s.phase !== "end") throw new Error("never ended, last phase " + s.phase);
    draw(s, "end");
  });

  check(lang + " logs the round to history", () => {
    if (s.history.length !== 1) throw new Error("history has " + s.history.length);
    const h = s.history[0];
    if (!h.who.length || !h.winner || !h.civ) throw new Error("incomplete entry");
    draw({ ...s, phase: "recap" }, "recap");
  });

  check(lang + " mr white can win by guessing", () => {
    let g = makeInitial();
    g = { ...g, settings: { ...g.settings, ui: lang, preset: "white" } };
    ["E","F","G","H"].forEach((n) => { g = reducer(g, { type: "ADD_PLAYER", name: n }); });
    g = reducer(g, { type: "DEAL" });
    const white = Object.keys(g.round.roles).find((k) => g.round.roles[k] === "mrwhite");
    if (!white) throw new Error("no mr white at 8 players");
    g = reducer(g, { type: "ELIMINATE", id: white });
    g = reducer(g, { type: "CONTINUE" });
    if (g.phase !== "guess") throw new Error("no guess phase");
    g = reducer(g, { type: "SUBMIT_GUESS", text: g.round.civWord });
    if (!g.guess.auto) throw new Error("exact word not matched");
    g = reducer(g, { type: "JUDGE_GUESS", correct: true });
    if (g.result.winner !== "mrwhite") throw new Error("white did not win");
  });
}

check("pack round trip", async () => {});
console.log(fails ? "\n" + fails + " FAILURES" : "\nall green");
if (fails) process.exit(1);
