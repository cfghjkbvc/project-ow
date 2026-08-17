import React, { useState } from "react";
import { Btn, Sheet, Chip, Lattice } from "../ui/atoms.jsx";
import { seated } from "../game/state.js";
import { t, buzz } from "../data/strings.js";
import { roman } from "../game/helpers.js";

/* -------------------------------- Board ------------------------------- */

function Board({ state, dispatch }) {
  const { round, settings } = state;
  const [target, setTarget] = useState(null);
  const [ending, setEnding] = useState(false);
  const [peeking, setPeeking] = useState(false);
  const here = seated(state);
  const order = round.speakOrder.map((id) => here.find((p) => p.id === id)).filter(Boolean);
  if (!order.length) return null;

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="eyebrow">{t("dealNo")} {roman(state.roundNo)}</span>
        <button className="eyebrow tap" onClick={() => setEnding(true)}>{t("endGame")}</button>
      </div>

      {/* Pips read faster than a number across a table, and they show the shape
          of the round — how many are gone, not just how many are left. */}
      <div className="pips" aria-hidden="true">
        {here.map((p) => (
          <span className="pip" key={p.id} data-on={round.alive.includes(p.id) ? "1" : "0"} />
        ))}
      </div>
      <span className="sr-only">{t("left", round.alive.length)}</span>

      <div className="rule-dbl" />
      <div className="eyebrow">{t("tapVote")}</div>

      <div className="scroll" style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12, flex: 1 }}>
        {here.map((p, i) => {
          const dead = !round.alive.includes(p.id);
          const show = dead && (settings.revealOnVote || ["mrwhite", "jester"].includes(round.roles[p.id]));
          return (
            <button key={p.id} className={`row ${dead ? "row-down" : ""}`} disabled={dead} onClick={() => setTarget(p)}>
              {/* Out of the round means the card is face down, not the text
                  struck through. Same gesture you'd use with real cards. */}
              {dead && <Lattice scale="row" />}
              <span className="num">{roman(i + 1)}</span>
              <span className="nm">{p.name}</span>
              {!dead && p.id === order[0].id && (
                <span className="starts">{t("startsHere")}</span>
              )}
              {!dead && p.id !== order[0].id && !!(round.peeks || {})[p.id] && (
                <span className="quiet" style={{ marginLeft: "auto", fontSize: 11 }}>
                  {t("peekedN", round.peeks[p.id])}
                </span>
              )}
              {dead && <span style={{ marginLeft: "auto", position: "relative", zIndex: 1 }}>
                {show ? <Chip role={round.roles[p.id]} />
                  : <span className="chip" style={{ background: "var(--bone)", color: "var(--ink)", borderColor: "var(--ink)" }}>—</span>}
              </span>}
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <Btn kind="btn-ghost btn-sm" onClick={() => setPeeking(true)}>{t("peek")}</Btn>
        <Btn kind="btn-ghost btn-sm" onClick={() => dispatch({ type: "SKIP_VOTE" })}>{t("noOneOut")}</Btn>
      </div>
      {!!state.past.length && (
        <div style={{ marginTop: 8 }}>
          <Btn kind="btn-ghost btn-sm" onClick={() => dispatch({ type: "UNDO" })}>{t("undo")}</Btn>
        </div>
      )}

      {peeking && (
        <Sheet onClose={() => setPeeking(false)} label={t("peekWho")}>
          <div className="fat" style={{ fontSize: 24, textTransform: "uppercase", lineHeight: 1.12 }}>{t("peekWho")}</div>
          <p className="quiet" style={{ margin: "10px 0 16px" }}>{t("peekWarn")}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {here.filter((p) => round.alive.includes(p.id)).map((p) => (
              <button className="row" key={p.id}
                onClick={() => { buzz("tap"); dispatch({ type: "PEEK", id: p.id }); setPeeking(false); }}>
                <span className="nm">{p.name}</span>
              </button>
            ))}
          </div>
          <div style={{ height: 14 }} />
          <Btn kind="btn-ghost" onClick={() => setPeeking(false)}>{t("cancel")}</Btn>
        </Sheet>
      )}

      {target && (
        <Sheet onClose={() => setTarget(null)} label={t("voteBtn")}>
          <div className="fat" style={{ fontSize: 26, textTransform: "uppercase", lineHeight: 1.1 }}>{t("voteOut", target.name)}</div>
          <p className="quiet" style={{ margin: "10px 0 20px" }}>{settings.revealOnVote ? t("voteWarn") : t("voteSealed")}</p>
          <Btn kind="btn-danger" onClick={() => { buzz("vote"); dispatch({ type: "ELIMINATE", id: target.id }); setTarget(null); }}>{t("voteBtn")}</Btn>
          <div style={{ height: 9 }} />
          <Btn kind="btn-ghost" onClick={() => setTarget(null)}>{t("cancel")}</Btn>
        </Sheet>
      )}

      {ending && (
        <Sheet onClose={() => setEnding(false)} label={t("endGame")}>
          <div className="fat" style={{ fontSize: 26, textTransform: "uppercase" }}>{t("endGame")}</div>
          <p className="quiet" style={{ margin: "10px 0 20px" }}>{t("endWarn")}</p>
          <Btn kind="btn-danger" onClick={() => dispatch({ type: "TO_SETUP" })}>{t("endBtn")}</Btn>
          <div style={{ height: 9 }} />
          <Btn kind="btn-ghost" onClick={() => setEnding(false)}>{t("cancel")}</Btn>
        </Sheet>
      )}
    </>
  );
}

export default Board;
