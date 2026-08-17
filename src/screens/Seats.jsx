import React, { useState } from "react";
import { Btn } from "../ui/atoms.jsx";
import { activePairs, seated } from "../game/state.js";
import { t, buzz } from "../data/strings.js";

/* -------------------------------- Seats ------------------------------- */

/* Who's playing changes every session, so it sits on the way into a game
   rather than buried in settings with things you set once and forget. */
function Seats({ state, dispatch }) {
  const [name, setName] = useState("");
  const { players } = state;
  const here = seated(state);
  const pairs = activePairs(state).length;
  const ready = here.length >= 4 && pairs > 0;
  const allOn = players.length > 0 && here.length === players.length;

  const add = () => {
    if (!name.trim()) return;
    buzz("tick");
    dispatch({ type: "ADD_PLAYER", name });
    setName("");
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="eyebrow">{t("whoIsHere")}</span>
        <button className="eyebrow tap" onClick={() => dispatch({ type: "TO_HOME" })}>{t("back")}</button>
      </div>

      <div className="scroll" style={{ flex: 1, paddingTop: 18 }}>
        {!players.length && (
          <p className="quiet" style={{ marginBottom: 14 }}>{t("addFirstPlayers")}</p>
        )}

        {!!players.length && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 11 }}>
            <span className="eyebrow">{t("playingN", here.length)}</span>
            <button className="eyebrow tap"
              onClick={() => { buzz("tick"); dispatch({ type: "TOGGLE_ALL_SEATS", value: !allOn }); }}>
              {allOn ? t("noneHere") : t("allHere")}
            </button>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {players.map((p) => {
            const on = p.in !== false;
            return (
              <div className={`row ${on ? "row-on" : "row-off"}`} key={p.id}>
                <button className="tick" data-on={on ? "1" : "0"} role="switch" aria-checked={on}
                  aria-label={p.name}
                  onClick={() => { buzz("tick"); dispatch({ type: "TOGGLE_SEAT", id: p.id }); }} />
                <span className="nm">{p.name}</span>
                <button className="x" aria-label={p.name}
                  onClick={() => dispatch({ type: "REMOVE_PLAYER", id: p.id })}>×</button>
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <input className="field" value={name} placeholder={t("addName")} maxLength={20}
            onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()} />
          <button className="btn" style={{ width: 56, padding: 0, fontSize: 20 }} onClick={add} aria-label="+">+</button>
        </div>
        <p className="quiet" style={{ marginTop: 13 }}>{t("rememberNote")}</p>
      </div>

      <div style={{ marginTop: 14 }}>
        <Btn disabled={!ready} onClick={() => { buzz("tap"); dispatch({ type: "DEAL" }); }}>
          {here.length < 4 ? t("fourMin") : pairs === 0 ? t("noPairs") : t("dealRound")}
        </Btn>
      </div>
    </>
  );
}

export default Seats;
