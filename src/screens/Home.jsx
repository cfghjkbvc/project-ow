import React from "react";
import { Btn, Lattice } from "../ui/atoms.jsx";
import { activePairs, seated } from "../game/state.js";
import { t, buzz } from "../data/strings.js";
import { roman } from "../game/helpers.js";

/* -------------------------------- Home -------------------------------- */

/* The front door. The app used to open on a settings form, which is the least
   game-like thing a game can show first. Everything returns here. */
function Home({ state, dispatch }) {
  const here = seated(state);
  const pairs = activePairs(state).length;
  const live = state.session.active;
  const ready = here.length >= 4 && pairs > 0;

  // One line so you can see what Play will do without opening anything.
  const leader = live
    ? [...here].sort((a, b) => (state.scores[b.id] || 0) - (state.scores[a.id] || 0))[0]
    : null;
  const context = live
    ? `${t("dealNo")} ${roman(state.roundNo)}${leader && state.scores[leader.id] ? " \u00b7 " + t("leading", leader.name) : ""}`
    : here.length
      ? `${t("playingN", here.length)} \u00b7 ${t("p_" + state.settings.preset)} \u00b7 ${state.settings.ui === "hu" ? "Magyar" : "English"}`
      : t("noPlayers");

  return (
    <>
      <div className="homecard">
        <div className="panel panel-full"><Lattice /></div>
        <div className="stamp">
          <div className="fat" style={{ fontSize: 30, color: "var(--ink)", textTransform: "uppercase", lineHeight: 1 }}>
            {t("title")}
          </div>
          <div className="serif" style={{ fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(23,18,14,.6)", marginTop: 5 }}>
            {t("sub")}
          </div>
        </div>
      </div>

      <p className="quiet" style={{ textAlign: "center", marginTop: 16, fontSize: 13 }}>{context}</p>

      <div style={{ flex: 1, minHeight: 18 }} />

      <Btn onClick={() => { buzz("tap"); dispatch({ type: "GOTO", phase: "seats" }); }}>
        {live ? t("continueNight") : t("play")}
      </Btn>
      <div style={{ height: 9 }} />
      <Btn kind="btn-ghost" onClick={() => dispatch({ type: "GOTO", phase: "rules" })}>{t("howTo")}</Btn>
      <div style={{ height: 9 }} />
      <Btn kind="btn-ghost" onClick={() => dispatch({ type: "GOTO", phase: "settings" })}>{t("settings")}</Btn>
      <div style={{ height: 9 }} />
      <Btn kind="btn-ghost" onClick={() => dispatch({ type: "GOTO", phase: "share" })}>{t("shareGame")}</Btn>

      {live && (
        <>
          <div style={{ height: 9 }} />
          <Btn kind="btn-ghost" onClick={() => dispatch({ type: "GOTO", phase: "night" })}>{t("theNight")}</Btn>
        </>
      )}

      {!ready && !!here.length && (
        <p className="quiet" style={{ textAlign: "center", marginTop: 12, fontSize: 12.5 }}>
          {here.length < 4 ? t("fourMin") : t("noPairs")}
        </p>
      )}
    </>
  );
}

export default Home;
