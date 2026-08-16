import React, { useState } from "react";
import { Btn } from "../ui/atoms.jsx";
import { BlankSigil } from "../ui/sigils.jsx";
import { t, buzz } from "../data/strings.js";

/* -------------------------------- Guess ------------------------------- */

function Guess({ state, dispatch }) {
  const [text, setText] = useState("");
  return (
    <>
      <div className="eyebrow">{t("whiteOne")}</div>
      <div className="stage">
        <BlankSigil style={{ width: 62, color: "var(--bone)" }} />
        <div className="fat" style={{ fontSize: 27, lineHeight: 1.18, textAlign: "center", textTransform: "uppercase" }}>{t("whatWord")}</div>
        <p className="quiet" style={{ textAlign: "center", maxWidth: 260 }}>{t("nameIt")}</p>
        <input className="field" style={{ textAlign: "center", fontSize: 22, marginTop: 4 }} value={text} autoFocus
          placeholder={t("typeWord")} onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && text.trim() && dispatch({ type: "SUBMIT_GUESS", text })} />
      </div>
      <Btn disabled={!text.trim()} onClick={() => { buzz(14); dispatch({ type: "SUBMIT_GUESS", text }); }}>{t("lockIn")}</Btn>
    </>
  );
}

function GuessResult({ state, dispatch }) {
  const { guess, round } = state;
  return (
    <>
      <div className="eyebrow">{t("whiteGuessed")}</div>
      <div className="stage">
        <div className="fat" style={{ fontSize: 30, textTransform: "uppercase" }}>{guess.text}</div>
        <div className="rule-dbl" style={{ width: 70 }} />
        <div className="eyebrow">{t("theWordWas")}</div>
        <div className="fat" style={{ fontSize: 36, textTransform: "uppercase", color: guess.auto ? "var(--celadon)" : "var(--bone)" }}>
          {round.civWord}
        </div>
        <p className="quiet" style={{ textAlign: "center", maxWidth: 265 }}>{guess.auto ? t("closeEnough") : t("notMatch")}</p>
      </div>
      <Btn onClick={() => { buzz([40, 60, 40]); dispatch({ type: "JUDGE_GUESS", correct: true }); }}>{t("tableYes")}</Btn>
      <div style={{ height: 9 }} />
      <Btn kind="btn-ghost" onClick={() => dispatch({ type: "JUDGE_GUESS", correct: false })}>{t("tableNo")}</Btn>
    </>
  );
}

export { Guess, GuessResult };
