import React, { useState } from "react";
import { Btn, Sheet } from "../ui/atoms.jsx";
import { ROLE } from "../ui/sigils.jsx";
import { seated } from "../game/state.js";
import { t } from "../data/strings.js";
import { roman } from "../game/helpers.js";

/* -------------------------------- Night ------------------------------- */

const TONE = {
  civilians: "var(--celadon)", impostors: "var(--vermilion)",
  mrwhite: "var(--bone)", jester: "var(--marigold)",
};

/* Scores and Recap were two screens describing the same session, so they are
   one screen: standings on top, what happened below. */
function Night({ state, dispatch }) {
  const [finishing, setFinishing] = useState(false);
  const ranked = [...seated(state)].sort((a, b) => (state.scores[b.id] || 0) - (state.scores[a.id] || 0));
  const rounds = [...state.history].reverse();

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="eyebrow">{t("theNight")}</span>
        <button className="eyebrow tap" onClick={() => dispatch({ type: "TO_HOME" })}>{t("back")}</button>
      </div>

      <div className="scroll" style={{ flex: 1, paddingTop: 18 }}>
        <div className="eyebrow">{t("session", state.roundNo)}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12 }}>
          {ranked.map((p, i) => (
            <div className="row" key={p.id}>
              <span className="num">{roman(i + 1)}</span>
              <span className="nm">{p.name}</span>
              <span className="pts" style={{ marginLeft: "auto" }}>{state.scores[p.id] || 0}</span>
            </div>
          ))}
        </div>

        <div className="rule-dbl" />

        {!rounds.length && <p className="quiet">{t("recapEmpty")}</p>}

        {rounds.map((r) => (
          <div key={r.n} style={{ marginBottom: 18, borderTop: "1px solid var(--hair)", paddingTop: 13 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
              <span className="eyebrow">{t("dealNo")} {roman(r.n)}</span>
              <span className="serif" style={{ fontSize: 13, color: TONE[r.winner], textAlign: "right" }}>
                {t("b_" + r.winner)}
              </span>
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 9 }}>
              <div className="mini" style={{ padding: "7px 6px 6px" }}>
                <div className="k">{t("mostHeld")}</div>
                <div className="v" style={{ fontSize: 16 }}>{r.civ}</div>
              </div>
              <div className="mini" style={{ padding: "7px 6px 6px", borderBottomWidth: 4, borderBottomColor: "var(--vermilion)" }}>
                <div className="k">{t("impHeld")}</div>
                <div className="v" style={{ fontSize: 16 }}>{r.uc}</div>
              </div>
            </div>

            <p style={{ marginTop: 10, fontSize: 12.5, lineHeight: 1.8 }}>
              {r.who.map((w, i) => (
                <span key={i}>
                  {i > 0 && <span style={{ color: "var(--hair)" }}> · </span>}
                  <span style={{
                    color: w.role === "civilian" ? "var(--muted)" : ROLE[w.role].tone,
                    fontFamily: "var(--f-serif)", fontWeight: 600, fontSize: 14,
                  }}>{w.name}</span>
                  {w.role !== "civilian" && (
                    <span className="quiet" style={{ fontSize: 10.5 }}> {t("r_" + w.role)}</span>
                  )}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 12 }}>
        <Btn onClick={() => dispatch({ type: "DEAL" })}>{t("dealAnother")}</Btn>
        <div style={{ height: 9 }} />
        <Btn kind="btn-ghost" onClick={() => setFinishing(true)}>{t("finishNight")}</Btn>
      </div>

      {finishing && (
        <Sheet onClose={() => setFinishing(false)} label={t("finishNight")}>
          <div className="fat" style={{ fontSize: 25, textTransform: "uppercase", lineHeight: 1.12 }}>{t("finishNight")}</div>
          <p className="quiet" style={{ margin: "10px 0 20px" }}>{t("finishNightBody")}</p>
          <Btn onClick={() => dispatch({ type: "FINISH_NIGHT" })}>{t("finishNight")}</Btn>
          <div style={{ height: 9 }} />
          <Btn kind="btn-ghost" onClick={() => setFinishing(false)}>{t("cancel")}</Btn>
        </Sheet>
      )}
    </>
  );
}

export default Night;
