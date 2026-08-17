import React, { useEffect, useRef, useState } from "react";
import { CSS } from "./theme.js";
import { ROLE, SIGILS } from "./sigils.jsx";
import { t, buzz, getLang } from "../data/strings.js";
import { SIGIL_ART } from "../config.js";

/* ------------------------------ chrome -------------------------------- */

export const Shell = ({ children, mainRef, heading }) => (
  <div className="ow" lang={getLang()}>
    <style>{CSS}</style>
    <div className="ow-frame" aria-hidden="true"><i /><i /><i /><i /></div>
    <main className="ow-shell" ref={mainRef} tabIndex={-1}>
      <h1 className="sr-only">{heading}</h1>
      {children}
    </main>
  </div>
);

export const Btn = ({ kind = "", children, ...rest }) => (
  <button className={`btn ${kind}`} {...rest}><b />{children}<b /></button>
);

export const Chip = ({ role }) => {
  const r = ROLE[role];
  return <span className="chip" style={{ background: r.tone, color: r.ink ? "var(--ink)" : "var(--bone)" }}>{t("r_" + role)}</span>;
};

/* ---------------------------- the card back --------------------------- *
 * A seamless lattice of eight-pointed stars in the deck's three loud inks
 * over cream, with a mint dot where the lattice crosses.
 *
 * The colour cycle is (i+j)%3, so the tile has to be exactly three steps
 * wide or the seam shows as a colour break on every repeat. Both scales
 * below obey that: 120/40 for a full card, 60/20 for a row.
 * -------------------------------------------------------------------- */

const star = (cx, cy, R, r) => {
  let d = "";
  for (let k = 0; k < 16; k++) {
    const a = (k * Math.PI) / 8 - Math.PI / 2;
    const rad = k % 2 ? r : R;
    d += (k ? "L" : "M") + (cx + Math.cos(a) * rad).toFixed(1) + " " + (cy + Math.sin(a) * rad).toFixed(1);
  }
  return d + "Z";
};

const INKS = ["var(--vermilion)", "var(--oxblood)", "var(--marigold)"];

const SCALES = {
  card: { id: "ow-back", step: 40, R: 13, r: 5, dot: 4, sw: 2, lw: 0.9, dw: 1.2 },
  row: { id: "ow-back-sm", step: 20, R: 6.6, r: 2.5, dot: 2, sw: 1.1, lw: 0.6, dw: 0.7 },
};

const cellsFor = (step) => {
  const out = [];
  for (let i = 0; i <= 3; i++) for (let j = 0; j <= 3; j++) out.push({ x: i * step, y: j * step, ink: INKS[(i + j) % 3] });
  return out;
};

const PRESET = Object.fromEntries(
  Object.entries(SCALES).map(([k, s]) => [k, { ...s, cells: cellsFor(s.step), tile: s.step * 3 }])
);

export const Lattice = ({ scale = "card" }) => {
  const s = PRESET[scale];
  return (
    <svg className="lattice" aria-hidden="true">
      <defs>
        <pattern id={s.id} width={s.tile} height={s.tile} patternUnits="userSpaceOnUse">
          <rect width={s.tile} height={s.tile} fill="var(--bone)" />
          <g stroke="var(--ink)" strokeWidth={s.lw} opacity="0.5">
            {s.cells.map((c, n) => (
              <g key={"l" + n}>
                <path d={`M${c.x} ${c.y}L${c.x + s.step} ${c.y + s.step}`} />
                <path d={`M${c.x} ${c.y}L${c.x + s.step} ${c.y - s.step}`} />
              </g>
            ))}
          </g>
          {s.cells.map((c, n) => (
            <circle key={"d" + n} cx={c.x + s.step / 2} cy={c.y + s.step / 2} r={s.dot}
              fill="var(--celadon)" stroke="var(--ink)" strokeWidth={s.dw} />
          ))}
          {s.cells.map((c, n) => (
            <path key={"s" + n} d={star(c.x, c.y, s.R, s.r)} fill={c.ink}
              stroke="var(--ink)" strokeWidth={s.sw} strokeLinejoin="round" />
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${s.id})`} />
    </svg>
  );
};

export const Panel = ({ index }) => {
  if (SIGIL_ART) return <div className="panel"><img src={SIGIL_ART[index]} alt="" /></div>;
  const S = SIGILS[index % SIGILS.length];
  return <div className="panel"><S className="line" /></div>;
};

/* The round's sigil, faint, behind the board. Everyone in a round shares the
   same sigil so showing it publicly leaks nothing. */
export const Watermark = ({ index }) => {
  if (SIGIL_ART) return <img className="watermark" src={SIGIL_ART[index]} alt="" />;
  const S = SIGILS[index % SIGILS.length];
  return <S className="watermark" />;
};

export function Sheet({ onClose, children, label }) {
  const box = useRef(null);
  useEffect(() => {
    box.current?.querySelector("button, [href], input")?.focus();
    const esc = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);
  return (
    <div className="sheet" onClick={onClose}>
      <div className="sheet-in" ref={box} role="dialog" aria-modal="true" aria-label={label}
        onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}
