import React from "react";

/* --------------------------- placeholder art -------------------------- */

const Art = (p) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className={p.className} style={p.style} aria-hidden="true">{p.children}</svg>
);

const MoonSigil = (p) => (<Art {...p}>
  <path d="M60 20a30 30 0 1 0 0 60 33 33 0 0 1 0-60z" />
  <path d="M26 28l2.6 5.4 5.4 2.6-5.4 2.6L26 44l-2.6-5.4L18 36l5.4-2.6z" strokeWidth="1.4" />
  <path d="M76 64l2 4.2 4.2 2-4.2 2-2 4.2-2-4.2-4.2-2 4.2-2z" strokeWidth="1.4" />
  <circle cx="80" cy="32" r="1.8" strokeWidth="1.4" /></Art>);
const EyeSigil = (p) => (<Art {...p}>
  <path d="M50 16L86 74H14z" />
  <path d="M30 52c6-8 13-12 20-12s14 4 20 12c-6 8-13 12-20 12s-14-4-20-12z" strokeWidth="1.7" />
  <circle cx="50" cy="52" r="6.5" strokeWidth="1.7" /><circle cx="50" cy="52" r="2.2" strokeWidth="3" /></Art>);
const TowerSigil = (p) => (<Art {...p}>
  <path d="M34 84V38h32v46M30 38h40M34 30v8M42 30v8M50 30v8M58 30v8M66 30v8M34 30h32" />
  <path d="M52 44l-8 14h12l-9 16" strokeWidth="2.2" /><line x1="22" y1="84" x2="78" y2="84" /></Art>);
const SerpentSigil = (p) => (<Art {...p}>
  <path d="M64 26a28 28 0 1 1-26 3" /><path d="M38 29l11-5-1 12z" strokeWidth="1.6" />
  <circle cx="44" cy="27" r="1.3" strokeWidth="2.4" /><circle cx="50" cy="54" r="10" strokeWidth="1.4" /></Art>);
const StarSigil = (p) => (<Art {...p}>
  <path d="M50 12l8 26 26-8-18 20 18 20-26-8-8 26-8-26-26 8 18-20-18-20 26 8z" />
  <circle cx="50" cy="50" r="6" strokeWidth="1.4" /></Art>);
const HourglassSigil = (p) => (<Art {...p}>
  <path d="M34 26h32L50 50 34 74h32" /><line x1="30" y1="26" x2="70" y2="26" /><line x1="30" y1="74" x2="70" y2="74" />
  <path d="M22 40c-6-6-8-12-6-16 6 2 10 6 12 10M78 40c6-6 8-12 6-16-6 2-10 6-12 10" strokeWidth="1.5" /></Art>);
const ScalesSigil = (p) => (<Art {...p}>
  <line x1="50" y1="20" x2="50" y2="76" /><line x1="22" y1="30" x2="78" y2="30" />
  <path d="M12 42a10 10 0 0 0 20 0zM68 42a10 10 0 0 0 20 0z" />
  <line x1="22" y1="30" x2="22" y2="42" /><line x1="78" y1="30" x2="78" y2="42" />
  <path d="M36 80h28c0-3-6-4-14-4s-14 1-14 4z" /></Art>);
const WheelSigil = (p) => (<Art {...p}>
  <circle cx="50" cy="50" r="30" /><circle cx="50" cy="50" r="8" strokeWidth="1.5" />
  {Array.from({ length: 8 }, (_, i) => { const a = (i * Math.PI) / 4;
    return <line key={i} x1={50 + Math.cos(a) * 8} y1={50 + Math.sin(a) * 8}
      x2={50 + Math.cos(a) * 30} y2={50 + Math.sin(a) * 30} strokeWidth="1.5" />; })}</Art>);

const SIGILS = [MoonSigil, EyeSigil, TowerSigil, SerpentSigil, StarSigil, HourglassSigil, ScalesSigil, WheelSigil];

const ChorusSigil = (p) => (<Art {...p}>{[28, 50, 72].map((x, i) => (
  <g key={x}><circle cx={x} cy={i === 1 ? 32 : 37} r="9" />
    <path d={`M${x - 14} ${i === 1 ? 78 : 81}c0-12 6-19 14-19s14 7 14 19`} /></g>))}</Art>);
const MaskSigil = (p) => (<Art {...p}>
  <path d="M20 30h60c0 28-14 50-30 50S20 58 20 30z" />
  <path d="M31 46c4-4 11-4 15 0M54 46c4-4 11-4 15 0" /><path d="M41 64c6 4 12 4 18 0" strokeWidth="1.6" />
  <line x1="20" y1="30" x2="11" y2="21" strokeWidth="1.5" /><line x1="80" y1="30" x2="89" y2="21" strokeWidth="1.5" /></Art>);
const BlankSigil = (p) => (<Art {...p}>
  <rect x="27" y="14" width="46" height="64" rx="3" />
  <rect x="34" y="22" width="32" height="48" rx="2" strokeWidth="1.2" strokeDasharray="4 5" />
  <path d="M22 86h56" /></Art>);
const FoolSigil = (p) => (<Art {...p}>
  <path d="M28 48c0-15 10-26 22-26s22 11 22 26" />
  <path d="M28 48c-7-9-11-18-9-24 7-2 13 4 17 11M72 48c7-9 11-18 9-24-7-2-13 4-17 11" />
  <line x1="23" y1="52" x2="77" y2="52" />
  <circle cx="19" cy="26" r="4" strokeWidth="1.5" /><circle cx="81" cy="26" r="4" strokeWidth="1.5" />
  <path d="M38 66c7 7 17 7 24 0" strokeWidth="1.6" /></Art>);
const ShadowSigil = (p) => (<Art {...p}>
  <circle cx="38" cy="46" r="24" /><circle cx="62" cy="54" r="24" strokeWidth="1.5" strokeDasharray="5 6" />
  <circle cx="38" cy="46" r="5" strokeWidth="3" /></Art>);

const ROLE = {
  civilian: { cardKey: "c_civilian", Sig: ChorusSigil, tone: "var(--celadon)", ink: true },
  undercover: { cardKey: "c_undercover", Sig: MaskSigil, tone: "var(--vermilion)", ink: false },
  mrwhite: { cardKey: "c_blank", Sig: BlankSigil, tone: "var(--bone)", ink: true },
  jester: { cardKey: "c_fool", Sig: FoolSigil, tone: "var(--marigold)", ink: true },
  accomplice: { cardKey: "c_shadow", Sig: ShadowSigil, tone: "var(--oxblood)", ink: false },
};

const EXTRAS = { mrwhite: 6, jester: 6, accomplice: 7 };
const PRESETS = { classic: [], white: ["mrwhite"], wild: ["mrwhite", "jester", "accomplice"] };
const POINTS = { civilian: 1, undercover: 3, accomplice: 3, mrwhite: 3, jesterWin: 4, whiteWin: 4 };

export { SIGILS, ROLE, BlankSigil, EXTRAS, PRESETS, POINTS };
