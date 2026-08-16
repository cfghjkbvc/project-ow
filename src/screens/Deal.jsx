import React, { useState, useRef, useEffect } from "react";
import { Btn, Sheet, Lattice, Panel } from "../ui/atoms.jsx";
import { t, buzz, NOTES, getLang } from "../data/strings.js";
import { roman } from "../game/helpers.js";

/* -------------------------------- Deal -------------------------------- */


function cardFace(role, round) {
  const n = NOTES[getLang()] || NOTES.en;
  const note = role === "accomplice" ? n.accomplice(round.accompliceOf) : n[role];
  const word = role === "mrwhite" ? t("r_mrwhite") : role === "undercover" ? round.ucWord : round.civWord;
  return { word, note };
}

function HoldCard({ name, numeral, sigil, word, note, onSeen }) {
  const [open, setOpen] = useState(false);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  const down = (e) => {
    e.preventDefault?.(); buzz(12); setOpen(true);
    timer.current = setTimeout(() => onSeen?.(), 400);
  };
  const up = () => { clearTimeout(timer.current); setOpen(false); };

  return (
    <div className="card-wrap">
      <div className={open ? "" : "float"}>
        <div className="card" data-open={open ? "1" : "0"}
          role="button" tabIndex={0} aria-label={`${name} — ${t("holdPress")}`}
          onPointerDown={down} onPointerUp={up} onPointerLeave={up} onPointerCancel={up}
          onKeyDown={(e) => { if ((e.key === " " || e.key === "Enter") && !open) { e.preventDefault(); down(e); } }}
          onKeyUp={(e) => { if (e.key === " " || e.key === "Enter") up(); }}
          onBlur={up}
          onContextMenu={(e) => e.preventDefault()}>
          <div className="face back">
            <div className="panel panel-full"><Lattice /></div>
            <div className="stamp">
              <div className="serif" style={{ fontSize: 26, color: "var(--ink)" }}>{numeral}</div>
              <div className="fat" style={{ fontSize: 17, color: "var(--ink)", textTransform: "uppercase", marginTop: 2 }}>{name}</div>
            </div>
          </div>
          <div className="face front">
            <div className="sheen" />
            <div className="who">{name}</div>
            <div style={{ position: "relative", width: "100%", flex: 1, display: "flex" }}>
              <Panel index={sigil} />
              <span className="plate">{numeral}</span>
            </div>
            <div className="banner">
              <div className="word">{word}</div>
              <div className="note">{note}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Deal({ state, dispatch }) {
  const { round, players } = state;
  const id = round.dealOrder[round.dealIndex];
  const player = players.find((p) => p.id === id);
  const face = cardFace(round.roles[id], round);
  const [seen, setSeen] = useState(false);
  const [lock, setLock] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const total = round.dealOrder.length;

  useEffect(() => { setSeen(false); }, [round.dealIndex]);

  // A double tap here would skip someone's card entirely, so it locks briefly.
  const advance = () => {
    if (lock) return;
    setLock(true); buzz(10);
    dispatch({ type: "NEXT_CARD" });
    setTimeout(() => setLock(false), 450);
  };

  const next = round.dealIndex + 1 < total ? players.find((p) => p.id === round.dealOrder[round.dealIndex + 1]).name : null;

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="eyebrow">{t("dealing")}</span>
        <span className="eyebrow">{roman(round.dealIndex + 1)} / {roman(total)}</span>
      </div>

      <div className="stage">
        <HoldCard key={round.dealIndex} name={player.name} numeral={roman(round.dealIndex + 1)}
          sigil={round.sigil} word={face.word} note={face.note} onSeen={() => setSeen(true)} />
        <p className="quiet" style={{ textAlign: "center", height: 20, fontSize: 12.5 }}>
          {seen ? t("letGo") : t("holdPress")}
        </p>
      </div>

      <Btn disabled={!seen || lock} onClick={advance}>{next ? t("passTo", next) : t("everyoneHas")}</Btn>

      <div style={{ display: "flex", gap: 18, justifyContent: "center", paddingTop: 10 }}>
        {round.dealIndex > 0 && (
          <button className="eyebrow tap" onClick={() => dispatch({ type: "PREV_CARD" })}>{t("backOne")}</button>
        )}
        <button className="eyebrow tap" onClick={() => setConfirm(true)}>{t("redeal")}</button>
      </div>

      {confirm && (
        <Sheet onClose={() => setConfirm(false)} label={t("redeal")}>
          <div className="fat" style={{ fontSize: 25, textTransform: "uppercase", lineHeight: 1.12 }}>{t("redealTitle")}</div>
          <p className="quiet" style={{ margin: "10px 0 20px" }}>{t("redealBody")}</p>
          <Btn onClick={() => { buzz(14); dispatch({ type: "REDEAL" }); setConfirm(false); }}>{t("redeal")}</Btn>
          <div style={{ height: 9 }} />
          <Btn kind="btn-ghost" onClick={() => setConfirm(false)}>{t("cancel")}</Btn>
        </Sheet>
      )}
    </>
  );
}

export { Deal, HoldCard, cardFace };
