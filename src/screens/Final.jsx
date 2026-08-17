import React, { useEffect } from "react";
import { Btn } from "../ui/atoms.jsx";
import { seated } from "../game/state.js";
import { t, buzz } from "../data/strings.js";
import { roman } from "../game/helpers.js";

/* -------------------------------- Final ------------------------------- */

/* The payoff the game never had. Rounds ended; the night just trailed off with
   scores accumulating silently until someone cleared them. */
function Final({ state, dispatch }) {
  const ranked = [...seated(state)].sort((a, b) => (state.scores[b.id] || 0) - (state.scores[a.id] || 0));
  const top = state.scores[ranked[0]?.id] || 0;
  const champs = ranked.filter((p) => (state.scores[p.id] || 0) === top && top > 0);

  useEffect(() => { buzz("win"); }, []);

  // Who got away with it most often, counted from the round history.
  const sneaky = (() => {
    const tally = {};
    for (const r of state.history) {
      if (r.winner !== "impostors") continue;
      for (const w of r.who) if (w.role === "undercover") tally[w.name] = (tally[w.name] || 0) + 1;
    }
    const best = Object.entries(tally).sort((a, b) => b[1] - a[1])[0];
    return best && best[1] > 0 ? best : null;
  })();

  const civWins = state.history.filter((r) => r.winner === "civilians").length;
  const impWins = state.history.length - civWins;

  return (
    <>
      <div className="eyebrow">{t("nightOver")}</div>

      <div className="rise" style={{ textAlign: "center", paddingTop: 18 }}>
        <div className="eyebrow">{champs.length > 1 ? t("championPlural") : t("champion")}</div>
        <div className="fat" style={{ fontSize: 34, marginTop: 8, textTransform: "uppercase", color: "var(--marigold)", lineHeight: 1.1 }}>
          {champs.length ? champs.map((p) => p.name).join(" & ") : t("nobodyScored")}
        </div>
        {!!top && <div className="serif" style={{ fontSize: 20, marginTop: 6, color: "var(--bone)" }}>{t("pointsN", top)}</div>}
      </div>

      <div className="rule-dbl" />

      <div style={{ display: "flex", gap: 9 }}>
        <div className="mini"><div className="k">{t("roundsPlayed")}</div><div className="v">{state.history.length}</div></div>
        <div className="mini"><div className="k">{t("r_civilian")}</div><div className="v">{civWins}</div></div>
        <div className="mini" style={{ borderBottomWidth: 4, borderBottomColor: "var(--vermilion)" }}>
          <div className="k">{t("r_undercover")}</div><div className="v">{impWins}</div>
        </div>
      </div>

      {sneaky && (
        <p className="quiet" style={{ textAlign: "center", marginTop: 13, fontSize: 13 }}>
          {t("gotAwayWith", sneaky[0], sneaky[1])}
        </p>
      )}

      <div className="eyebrow" style={{ marginTop: 20 }}>{t("finalStandings")}</div>
      <div className="scroll" style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12, flex: 1 }}>
        {ranked.map((p, i) => (
          <div className="row" key={p.id} style={i === 0 && top > 0 ? { borderColor: "var(--marigold)" } : undefined}>
            <span className="num">{roman(i + 1)}</span>
            <span className="nm">{p.name}</span>
            <span className="pts" style={{ marginLeft: "auto" }}>{state.scores[p.id] || 0}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 14 }}>
        <Btn onClick={() => dispatch({ type: "CLOSE_NIGHT" })}>{t("closeNight")}</Btn>
      </div>
    </>
  );
}

export default Final;
