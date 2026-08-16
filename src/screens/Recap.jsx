import React from "react";
import { Btn } from "../ui/atoms.jsx";
import { ROLE } from "../ui/sigils.jsx";
import { t } from "../data/strings.js";
import { roman } from "../game/helpers.js";

const TONE = {
  civilians: "var(--celadon)", impostors: "var(--vermilion)",
  mrwhite: "var(--bone)", jester: "var(--marigold)",
};

function Recap({ state, dispatch }) {
  const rounds = [...state.history].reverse();

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="eyebrow">{t("recap")}</span>
        <button className="eyebrow tap" onClick={() => dispatch({ type: "GOTO", phase: "setup" })}>{t("close")}</button>
      </div>

      <div className="scroll" style={{ flex: 1, paddingTop: 18 }}>
        {!rounds.length && <p className="quiet">{t("recapEmpty")}</p>}

        {rounds.map((r) => (
          <div key={r.n} style={{ marginBottom: 20, borderTop: "1px solid var(--hair)", paddingTop: 14 }}>
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
        <Btn onClick={() => dispatch({ type: "GOTO", phase: "setup" })}>{t("close")}</Btn>
      </div>
    </>
  );
}

export default Recap;
