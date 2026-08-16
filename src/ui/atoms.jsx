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

export /* The card back. A seamless lattice of eight-pointed stars in the deck's
   three loud inks over cream, with a mint dot where the lattice crosses.

   The tile is 120 and the stars sit every 40, so the colour cycle (i+j)%3
   completes exactly at the tile edge — any other tile size and the seam
   shows as a colour break every repeat. */
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
const STEP = 40;

const CELLS = [];
for (let i = 0; i <= 3; i++) {
  for (let j = 0; j <= 3; j++) {
    CELLS.push({ x: i * STEP, y: j * STEP, ink: INKS[(i + j) % 3] });
  }
}

export const Lattice = () => (
  <svg className="lattice" aria-hidden="true">
    <defs>
      <pattern id="ow-back" width="120" height="120" patternUnits="userSpaceOnUse">
        <rect width="120" height="120" fill="var(--bone)" />
        <g stroke="var(--ink)" strokeWidth="0.9" opacity="0.5">
          {CELLS.map((c, n) => (
            <g key={"l" + n}>
              <path d={`M${c.x} ${c.y}L${c.x + STEP} ${c.y + STEP}`} />
              <path d={`M${c.x} ${c.y}L${c.x + STEP} ${c.y - STEP}`} />
            </g>
          ))}
        </g>
        {CELLS.map((c, n) => (
          <circle key={"d" + n} cx={c.x + STEP / 2} cy={c.y + STEP / 2} r="4"
            fill="var(--celadon)" stroke="var(--ink)" strokeWidth="1.2" />
        ))}
        {CELLS.map((c, n) => (
          <path key={"s" + n} d={star(c.x, c.y, 13, 5)} fill={c.ink}
            stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
        ))}
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#ow-back)" />
  </svg>
);

export const Panel = ({ index }) => {
  if (SIGIL_ART) return <div className="panel"><img src={SIGIL_ART[index]} alt="" /></div>;
  const S = SIGILS[index % SIGILS.length];
  return <div className="panel"><S className="line" /></div>;
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
