import React, { useState } from "react";
import { Btn, Sheet, Chip } from "../ui/atoms.jsx";
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
        <span className="eyebrow">{t("dealNo")} {roman(state.roundNo)} · {t("left", round.alive.length)}</span>
        <button className="eyebrow tap" onClick={() => setEnding(true)}>{t("endGame")}</button>
      </div>

      <div className="rise" style={{ padding: "22px 0 2px", textAlign: "center" }}>
        <div className="eyebrow">{t("speaksFirst")}</div>
        <div className="fat" style={{ fontSize: 38, marginTop: 8, textTransform: "uppercase" }}>{order[0].name}</div>
      </div>
      <p className="quiet" style={{ textAlign: "center", fontSize: 12.5, marginTop: 8 }}>
        {order.map((p) => p.name).join(" · ")}
      </p>

      <div className="rule-dbl" />
      <div className="eyebrow">{t("tapVote")}</div>

      <div className="scroll" style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12, flex: 1 }}>
        {here.map((p, i) => {
          const dead = !round.alive.includes(p.id);
          const show = dead && (settings.revealOnVote || ["mrwhite", "jester"].includes(round.roles[p.id]));
          return (
            <button key={p.id} className={`row ${dead ? "dead" : ""}`} disabled={dead} onClick={() => setTarget(p)}>
              <span className="num">{roman(i + 1)}</span>
              <span className="nm">{p.name}</span>
              {!dead && !!(round.peeks || {})[p.id] && (
                <span className="quiet" style={{ marginLeft: "auto", fontSize: 11 }}>
                  {t("peekedN", round.peeks[p.id])}
                </span>
              )}
              {dead && <span style={{ marginLeft: "auto" }}>
                {show ? <Chip role={round.roles[p.id]} />
                  : <span className="chip" style={{ background: "transparent", color: "var(--muted)", borderColor: "var(--hair)" }}>—</span>}
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
