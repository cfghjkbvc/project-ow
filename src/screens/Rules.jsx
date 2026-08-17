import React, { useRef, useState, useCallback } from "react";
import { Btn } from "../ui/atoms.jsx";
import { ROLE } from "../ui/sigils.jsx";
import { RevealCard, RoleBlurb } from "./Result.jsx";
import { t, buzz } from "../data/strings.js";
import { roman } from "../game/helpers.js";

/* -------------------------------- Rules ------------------------------- */

const ROLES = ["civilian", "undercover", "mrwhite", "jester", "accomplice"];
const CARD_W = 212;
const GAP = 14;

/* Swipe carousel on native scroll-snap rather than a gesture library: it
   gets momentum, rubber-banding and trackpad scrolling for free, and stays
   operable from the keyboard through the arrow buttons. */
function RoleCarousel() {
  const track = useRef(null);
  const [active, setActive] = useState(0);

  const onScroll = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / (CARD_W + GAP));
    setActive(Math.max(0, Math.min(ROLES.length - 1, i)));
  }, []);

  const go = (i) => {
    const next = Math.max(0, Math.min(ROLES.length - 1, i));
    buzz("tick");
    track.current?.scrollTo({ left: next * (CARD_W + GAP), behavior: "smooth" });
    setActive(next);
  };

  const role = ROLES[active];

  return (
    <>
      <div className="carou" ref={track} onScroll={onScroll}
        role="group" aria-label={t("theRoles")}>
        {ROLES.map((r, i) => (
          <div className="rolecard" key={r} aria-hidden={i !== active}>
            <RevealCard role={r} />
          </div>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 4 }}>
        <button className="eyebrow tap" onClick={() => go(active - 1)}
          disabled={active === 0} style={{ opacity: active === 0 ? 0.3 : 1 }}
          aria-label={t("prevRole")}>‹</button>

        <div style={{ display: "flex", gap: 9 }}>
          {ROLES.map((r, i) => (
            <button key={r} onClick={() => go(i)} aria-label={t("r_" + r)}
              style={{
                width: 8, height: 8, padding: 0, transform: "rotate(45deg)",
                background: i === active ? ROLE[r].tone : "transparent",
                border: "1px solid " + (i === active ? ROLE[r].tone : "var(--hair)"),
              }} />
          ))}
        </div>

        <button className="eyebrow tap" onClick={() => go(active + 1)}
          disabled={active === ROLES.length - 1} style={{ opacity: active === ROLES.length - 1 ? 0.3 : 1 }}
          aria-label={t("nextRole")}>›</button>
      </div>

      <div aria-live="polite" style={{ marginTop: 12 }}>
        <RoleBlurb role={role} />
        {/* A fixed four-part shape, so roles are comparable rather than five
            paragraphs that each answer a different question. */}
        <dl className="facts">
          <dt>{t("lbl_holds")}</dt><dd>{t("h_" + role)}</dd>
          <dt>{t("lbl_knows")}</dt><dd>{t("k_" + role)}</dd>
          <dt>{t("lbl_wins")}</dt><dd>{t("w_" + role)}</dd>
          <dt>{t("lbl_watch")}</dt><dd>{t("x_" + role)}</dd>
        </dl>
      </div>
    </>
  );
}

function Rules({ dispatch }) {
  const steps = [["s1", "s1b"], ["s2", "s2b"], ["s3", "s3b"], ["s4", "s4b"]];
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="eyebrow">{t("rulesTitle")}</span>
        <button className="eyebrow tap" onClick={() => dispatch({ type: "GOTO", phase: "home" })}>{t("close")}</button>
      </div>

      <div className="scroll" style={{ flex: 1, paddingTop: 18 }}>
        {steps.map(([k, b], i) => (
          <div key={k} style={{ display: "flex", gap: 14, marginBottom: 22 }}>
            <span className="serif" style={{ color: "var(--marigold)", fontSize: 15, minWidth: 28, paddingTop: 3 }}>
              {roman(i + 1)}
            </span>
            <div style={{ minWidth: 0 }}>
              <div className="fat" style={{ fontSize: 20, textTransform: "uppercase" }}>{t(k)}</div>
              <p className="quiet" style={{ marginTop: 6 }}>{t(b)}</p>
            </div>
          </div>
        ))}

        <div className="rule-dbl" />
        <div className="eyebrow" style={{ textAlign: "center" }}>{t("theRoles")}</div>
        <p className="quiet" style={{ textAlign: "center", fontSize: 12, marginTop: 6 }}>{t("swipeRoles")}</p>
        <RoleCarousel />

        {/* A worked round teaches a hidden-role game faster than any rule text. */}
        <div className="rule-dbl" />
        <div className="eyebrow">{t("exampleTitle")}</div>
        <div className="example">
          <p>{t("ex1", t("exA"), t("exB"))}</p>
          <p>{t("ex2", "Anna")}</p>
          <p>{t("ex3", "Bence")}</p>
          <p>{t("ex4", "Csaba")}</p>
          <p>{t("ex5", "Csaba", t("exB"))}</p>
        </div>

        <div className="rule-dbl" />
        <div className="eyebrow">{t("houseRule")}</div>
        <p className="quiet" style={{ marginTop: 8, paddingBottom: 10 }}>{t("houseRuleBody")}</p>
      </div>

      <div style={{ marginTop: 12 }}>
        <Btn onClick={() => dispatch({ type: "GOTO", phase: "home" })}>{t("close")}</Btn>
      </div>
    </>
  );
}

export default Rules;
