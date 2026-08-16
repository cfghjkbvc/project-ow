import React from "react";
import { Btn } from "../ui/atoms.jsx";
import { ROLE } from "../ui/sigils.jsx";
import { ROLE_ART } from "../config.js";
import { t } from "../data/strings.js";

/* ------------------------------- Result ------------------------------- */

function RevealCard({ role }) {
  const r = ROLE[role];
  const S = r.Sig;
  if (ROLE_ART?.[role]) return <img className="reveal-img" src={ROLE_ART[role]} alt={t(r.cardKey)} />;
  return (
    <div className="reveal">
      <div className="pane"><S className="sig" style={{ color: r.tone }} /></div>
      <div className="cap">{t(r.cardKey)}</div>
    </div>
  );
}

function Result({ state, dispatch }) {
  const { result, settings } = state;
  const show = settings.revealOnVote || ["mrwhite", "jester"].includes(result.role);
  return (
    <>
      <div className="eyebrow">{t("votedOut")}</div>
      <div className="stage">
        <div className="fat" style={{ fontSize: 34, textTransform: "uppercase" }}>{result.name}</div>
        {show ? <RevealCard role={result.role} /> : (
          <div className="reveal"><div className="pane" style={{ padding: "56px 10px" }} /><div className="cap">{t("sealed")}</div></div>
        )}
        {result.winner === "jester" && <p className="quiet" style={{ textAlign: "center", maxWidth: 250 }}>{t("jesterNote")}</p>}
      </div>
      <Btn onClick={() => dispatch({ type: "CONTINUE" })}>
        {result.guessNext ? t("whiteGuesses") : result.winner ? t("turnOver") : t("keepPlaying")}
      </Btn>
      {!!state.past.length && (
        <button className="eyebrow" style={{ padding: "14px 0 0", alignSelf: "center" }}
          onClick={() => dispatch({ type: "UNDO" })}>{t("undo")}</button>
      )}
    </>
  );
}

export { Result, RevealCard };
