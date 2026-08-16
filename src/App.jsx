import React, { useReducer, useState, useEffect, useRef } from "react";

import { ENABLE_SW, BASE } from "./config.js";
import { makeInitial, reducer } from "./game/state.js";
import { decodePack } from "./game/share.js";
import { store, KEY } from "./game/helpers.js";
import { t, setLang, setHaptics } from "./data/strings.js";
import { Shell, Btn, Sheet } from "./ui/atoms.jsx";

import Setup from "./screens/Setup.jsx";
import Rules from "./screens/Rules.jsx";
import Recap from "./screens/Recap.jsx";
import { Packs, Editor } from "./screens/Packs.jsx";
import { Deal } from "./screens/Deal.jsx";
import Peek from "./screens/Peek.jsx";
import Board from "./screens/Board.jsx";
import { Result } from "./screens/Result.jsx";
import { Guess, GuessResult } from "./screens/Guess.jsx";
import End from "./screens/End.jsx";

/* --------------------------------- App -------------------------------- */

const HEADING = {
  setup: "title", rules: "rulesTitle", recap: "recap", packs: "packs", editor: "packName",
  deal: "dealing", peek: "peek", board: "tapVote", result: "votedOut",
  guess: "whiteOne", guessResult: "whiteGuessed", end: "whoWas",
};

export default function OddWord() {
  const [state, dispatch] = useReducer(reducer, undefined, makeInitial);
  const [pending, setPending] = useState(null);
  const [importErr, setImportErr] = useState(false);
  const mainRef = useRef(null);

  setLang(state.settings.ui);           // read by t() in every child below
  setHaptics(state.settings.haptics);

  useEffect(() => {
    store.set(KEY, { players: state.players, settings: state.settings, scores: state.scores,
      packs: state.packs, retired: state.retired, history: state.history });
  }, [state.players, state.settings, state.scores, state.packs, state.retired, state.history]);

  // Screen readers need to be told the screen changed; a router would do
  // this for us, but the whole app is one reducer.
  useEffect(() => { mainRef.current?.focus({ preventScroll: true }); }, [state.phase]);

  useEffect(() => {
    if (!ENABLE_SW || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register(BASE + "sw.js").catch(() => {});
  }, []);

  useEffect(() => {
    const m = /[#&]pack=([^&]+)/.exec(window.location.hash || "");
    if (!m) return;
    try { history.replaceState(null, "", window.location.pathname + window.location.search); } catch (_) {}
    decodePack(m[1]).then((p) => (p.pairs.length ? setPending(p) : setImportErr(true))).catch(() => setImportErr(true));
  }, []);

  useEffect(() => {
    let lock = null, dead = false;
    (async () => {
      try {
        if (["deal", "peek", "board", "result", "guess", "guessResult"].includes(state.phase) && "wakeLock" in navigator) {
          const l = await navigator.wakeLock.request("screen");
          dead ? l.release() : (lock = l);
        }
      } catch (_) {}
    })();
    return () => { dead = true; try { lock?.release(); } catch (_) {} };
  }, [state.phase]);

  const view = {
    setup: <Setup state={state} dispatch={dispatch} />,
    rules: <Rules dispatch={dispatch} />,
    recap: <Recap state={state} dispatch={dispatch} />,
    packs: <Packs state={state} dispatch={dispatch} />,
    editor: <Editor state={state} dispatch={dispatch} />,
    deal: <Deal state={state} dispatch={dispatch} />,
    peek: <Peek state={state} dispatch={dispatch} />,
    board: <Board state={state} dispatch={dispatch} />,
    result: <Result state={state} dispatch={dispatch} />,
    guess: <Guess state={state} dispatch={dispatch} />,
    guessResult: <GuessResult state={state} dispatch={dispatch} />,
    end: <End state={state} dispatch={dispatch} />,
  }[state.phase];

  return (
    <Shell mainRef={mainRef} heading={t(HEADING[state.phase] || "title")}>
      {view}
      {pending && (
        <Sheet onClose={() => setPending(null)} label={t("importBtn")}>
          <div className="fat" style={{ fontSize: 24, textTransform: "uppercase", lineHeight: 1.15 }}>{t("importTitle", pending.name)}</div>
          <p className="quiet" style={{ margin: "10px 0 20px" }}>{t("importBody", pending.pairs.length)}</p>
          <Btn onClick={() => { dispatch({ type: "IMPORT_PACK", pack: pending }); setPending(null); }}>{t("importBtn")}</Btn>
          <div style={{ height: 9 }} />
          <Btn kind="btn-ghost" onClick={() => setPending(null)}>{t("cancel")}</Btn>
        </Sheet>
      )}
      {importErr && (
        <Sheet onClose={() => setImportErr(false)}>
          <div className="fat" style={{ fontSize: 22, textTransform: "uppercase" }}>{t("importBad")}</div>
          <div style={{ height: 18 }} />
          <Btn kind="btn-ghost" onClick={() => setImportErr(false)}>{t("cancel")}</Btn>
        </Sheet>
      )}
    </Shell>
  );
}
