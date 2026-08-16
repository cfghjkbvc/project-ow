import React, { useEffect } from "react";
import { Btn, Chip } from "../ui/atoms.jsx";
import { seated } from "../game/state.js";
import { t, buzz } from "../data/strings.js";
import { roman } from "../game/helpers.js";

/* --------------------------------- End -------------------------------- */

const BANNER_TONE = { civilians: "var(--celadon)", impostors: "var(--vermilion)", mrwhite: "var(--bone)", jester: "var(--marigold)" };

function End({ state, dispatch }) {
  const { round, result, scores } = state;
  const gone = state.retired.includes(round.pairKey);
  const ranked = [...seated(state)].sort((x, y) => (scores[y.id] || 0) - (scores[x.id] || 0));

  useEffect(() => { buzz([40, 60, 40, 60, 90]); }, []);

  return (
    <>
      <div className="eyebrow">{t("dealNo")} {roman(state.roundNo)}</div>
      <div className="fat rise" style={{ fontSize: 32, lineHeight: 1.12, marginTop: 8, textTransform: "uppercase", color: BANNER_TONE[result.winner] }}>
        {t("b_" + result.winner)}
      </div>
      <div className="rule-dbl" />

      <div style={{ display: "flex", gap: 9 }}>
        <div className="mini"><div className="k">{t("mostHeld")}</div><div className="v">{round.civWord}</div></div>
        <div className="mini" style={{ borderBottomWidth: 5, borderBottomColor: "var(--vermilion)" }}>
          <div className="k">{t("impHeld")}</div><div className="v">{round.ucWord}</div>
        </div>
      </div>

      <button className="eyebrow" style={{ alignSelf: "center", padding: "12px 0 0", opacity: gone ? 0.5 : 1 }}
        disabled={gone} onClick={() => { buzz(10); dispatch({ type: "RETIRE", key: round.pairKey }); }}>
        {gone ? t("retired") : t("retire")}
      </button>

      <div className="eyebrow" style={{ marginTop: 18 }}>{t("whoWas")}</div>
      <div className="scroll" style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12, flex: 1 }}>
        {ranked.map((p) => (
          <div className="row" key={p.id}>
            <span className="nm">{p.name}</span>
            <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
              <Chip role={round.roles[p.id]} />
              <span className="pts" style={{ minWidth: 20, textAlign: "right" }}>{scores[p.id] || 0}</span>
            </span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 14 }}>
        <Btn onClick={() => dispatch({ type: "DEAL" })}>{t("dealAnother")}</Btn>
        <div style={{ height: 9 }} />
        <Btn kind="btn-ghost" onClick={() => dispatch({ type: "GOTO", phase: "recap" })}>{t("seeNight")}</Btn>
        <div style={{ height: 9 }} />
        <Btn kind="btn-ghost" onClick={() => dispatch({ type: "TO_SETUP" })}>{t("backTable")}</Btn>
      </div>
    </>
  );
}

export default End;
