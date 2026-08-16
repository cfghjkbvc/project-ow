import React, { useState } from "react";
import { Btn, Chip } from "../ui/atoms.jsx";
import { ROLE, EXTRAS, PRESETS } from "../ui/sigils.jsx";
import { GAPS, activePairs, seated } from "../game/state.js";
import { t, buzz, setHaptics } from "../data/strings.js";
import { roman } from "../game/helpers.js";

/* ------------------------------- Setup -------------------------------- */

function Setup({ state, dispatch }) {
  const [name, setName] = useState("");
  const [tab, setTab] = useState("table");
  const { players, settings, scores } = state;
  const here = seated(state);
  const maxImp = Math.max(1, Math.ceil(here.length / 2) - 1);
  const pairCount = activePairs(state).length;
  const ready = here.length >= 4 && pairCount > 0;
  const add = () => { dispatch({ type: "ADD_PLAYER", name }); setName(""); };

  return (
    <>
      <div className="rise" style={{ textAlign: "center", paddingBottom: 20 }}>
        <div className="eyebrow">{t("sub")}</div>
        <h1 className="fat" style={{ fontSize: 40, marginTop: 10, textTransform: "uppercase" }}>{t("title")}</h1>
        <div style={{ display: "flex", alignItems: "center", gap: 11, justifyContent: "center", marginTop: 10 }}>
          <span style={{ width: 46, height: 1, background: "var(--hair)" }} />
          <span style={{ width: 6, height: 6, background: "var(--marigold)", transform: "rotate(45deg)" }} />
          <span style={{ width: 46, height: 1, background: "var(--hair)" }} />
        </div>
        <button className="eyebrow tap" style={{ marginTop: 6 }}
          onClick={() => dispatch({ type: "GOTO", phase: "rules" })}>{t("howTo")}</button>
      </div>

      <div className="tabs">
        {[["table", t("tabTable")], ["rules", t("tabRound")], ["scores", t("tabScores")]].map(([k, l]) => (
          <button key={k} data-on={tab === k ? "1" : "0"} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>

      <div className="scroll" style={{ flex: 1, paddingTop: 20 }}>
        {tab === "table" && (
          <div className="rise">
            <div className="eyebrow">{t("atTable", here.length, players.length)}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12 }}>
              {players.map((p) => {
                const on = p.in !== false;
                return (
                  <div className={`row ${on ? "row-on" : "row-off"}`} key={p.id}>
                    <button className="tick" data-on={on ? "1" : "0"} role="switch" aria-checked={on}
                      aria-label={p.name}
                      onClick={() => { buzz(8); dispatch({ type: "TOGGLE_SEAT", id: p.id }); }} />
                    <span className="nm">{p.name}</span>
                    <button className="x" onClick={() => dispatch({ type: "REMOVE_PLAYER", id: p.id })} aria-label={p.name}>×</button>
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <input className="field" value={name} placeholder={t("addName")}
                onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()} />
              <button className="btn" style={{ width: 56, padding: 0, fontSize: 20 }} onClick={add} aria-label="+">+</button>
            </div>
            <p className="quiet" style={{ marginTop: 13 }}>{t("rememberNote")}</p>

            <div className="eyebrow" style={{ marginTop: 26 }}>{t("language")}</div>
            <div className="seg" style={{ marginTop: 11 }}>
              {[["en", "English"], ["hu", "Magyar"]].map(([k, l]) => (
                <button key={k} data-on={settings.ui === k ? "1" : "0"}
                  onClick={() => dispatch({ type: "SET", key: "ui", value: k })}>{l}</button>
              ))}
            </div>

            <div className="eyebrow" style={{ marginTop: 22 }}>{t("haptics")}</div>
            <div className="seg" style={{ marginTop: 11 }}>
              <button data-on={settings.haptics ? "1" : "0"} onClick={() => { setHaptics(true); buzz(12); dispatch({ type: "SET", key: "haptics", value: true }); }}>{t("on")}</button>
              <button data-on={!settings.haptics ? "1" : "0"} onClick={() => dispatch({ type: "SET", key: "haptics", value: false })}>{t("off")}</button>
            </div>
          </div>
        )}

        {tab === "rules" && (
          <div className="rise">
            <div className="eyebrow">{t("rolesInPlay")}</div>
            <div className="seg" style={{ marginTop: 11 }}>
              {Object.keys(PRESETS).map((k) => (
                <button key={k} data-on={settings.preset === k ? "1" : "0"}
                  onClick={() => dispatch({ type: "SET", key: "preset", value: k })}>{t("p_" + k)}</button>
              ))}
            </div>
            <p className="quiet" style={{ marginTop: 10 }}>{t("pn_" + settings.preset)}</p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 13 }}>
              <Chip role="undercover" />
              {PRESETS[settings.preset].map((r) => here.length >= EXTRAS[r] ? <Chip key={r} role={r} /> : (
                <span key={r} className="chip" style={{ background: "transparent", color: "var(--muted)", borderColor: "var(--hair)" }}>
                  {t("r_" + r)} {t("at", EXTRAS[r])}
                </span>))}
            </div>

            <div className="eyebrow" style={{ marginTop: 24 }}>{t("impostors")}</div>
            <div className="seg" style={{ marginTop: 11 }}>
              {[1, 2, 3].map((n) => (
                <button key={n} disabled={n > maxImp} style={{ opacity: n > maxImp ? 0.3 : 1 }}
                  data-on={settings.impostors === n ? "1" : "0"}
                  onClick={() => dispatch({ type: "SET", key: "impostors", value: n })}>{roman(n)}</button>
              ))}
            </div>

            <div className="eyebrow" style={{ marginTop: 24 }}>{t("wordGap")}</div>
            <div className="seg" style={{ marginTop: 11 }}>
              {Object.keys(GAPS).map((k) => (
                <button key={k} data-on={settings.gap === k ? "1" : "0"}
                  onClick={() => dispatch({ type: "SET", key: "gap", value: k })}>{t("g_" + k)}</button>
              ))}
            </div>
            <p className="quiet" style={{ marginTop: 10 }}>{t("gh_" + settings.gap)}</p>

            <div className="eyebrow" style={{ marginTop: 24 }}>{t("onVote")}</div>
            <div className="seg" style={{ marginTop: 11 }}>
              <button data-on={settings.revealOnVote ? "1" : "0"} onClick={() => dispatch({ type: "SET", key: "revealOnVote", value: true })}>{t("showSide")}</button>
              <button data-on={!settings.revealOnVote ? "1" : "0"} onClick={() => dispatch({ type: "SET", key: "revealOnVote", value: false })}>{t("sayNothing")}</button>
            </div>
            <p className="quiet" style={{ marginTop: 10 }}>{t("sayNote")}</p>

            <div className="eyebrow" style={{ marginTop: 24 }}>{t("packs")}</div>
            <p className="quiet" style={{ marginTop: 8 }}>{t("activePairs", pairCount)}</p>
            <div style={{ marginTop: 11 }}>
              <Btn kind="btn-ghost btn-sm" onClick={() => dispatch({ type: "GOTO", phase: "packs" })}>{t("managePacks")}</Btn>
            </div>
          </div>
        )}

        {tab === "scores" && (
          <div className="rise">
            <div className="eyebrow">{t("session", state.roundNo)}</div>
            {!Object.keys(scores).length && <p className="quiet" style={{ marginTop: 14 }}>{t("noScores")}</p>}
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12 }}>
              {[...players].sort((a, b) => (scores[b.id] || 0) - (scores[a.id] || 0)).map((p, i) => (
                <div className="row" key={p.id}>
                  <span className="num">{roman(i + 1)}</span><span className="nm">{p.name}</span>
                  <span className="pts" style={{ marginLeft: "auto" }}>{scores[p.id] || 0}</span>
                </div>
              ))}
            </div>
            {!!state.history.length && (
              <div style={{ marginTop: 16 }}>
                <Btn kind="btn-ghost btn-sm" onClick={() => dispatch({ type: "GOTO", phase: "recap" })}>{t("seeNight")}</Btn>
              </div>
            )}
            {!!Object.keys(scores).length && (
              <div style={{ marginTop: 8 }}>
                <Btn kind="btn-ghost btn-sm" onClick={() => dispatch({ type: "RESET_SCORES" })}>{t("clearScores")}</Btn>
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{ marginTop: 16 }}>
        <Btn disabled={!ready} onClick={() => { buzz(14); dispatch({ type: "DEAL" }); }}>
          {here.length < 4 ? t("fourMin") : pairCount === 0 ? t("noPairs") : t("dealRound")}
        </Btn>
      </div>
    </>
  );
}

export default Setup;
