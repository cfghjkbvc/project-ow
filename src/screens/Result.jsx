import React, { useEffect, useState } from "react";
import { Btn, Lattice } from "../ui/atoms.jsx";
import { ROLE } from "../ui/sigils.jsx";
import { ROLE_ART } from "../config.js";
import { t } from "../data/strings.js";

/* ------------------------------- Result ------------------------------- */

/* The face of the role card, art or fallback line work. */
function RoleFace({ role }) {
  const r = ROLE[role];
  const S = r.Sig;
  if (ROLE_ART?.[role]) return <img className="turn-img" src={ROLE_ART[role]} alt={t(r.cardKey)} />;
  return (
    <div className="turn-fallback">
      <div className="pane"><S className="sig" style={{ color: r.tone }} /></div>
      <div className="cap">{t(r.cardKey)}</div>
    </div>
  );
}

/* Comes in face down, holds a beat, then turns over. Materialising the role
   card out of nothing was the least card-like moment in the app. */
function RoleTurn({ role, sealed }) {
  const [open, setOpen] = useState(false);
  const art = !sealed && ROLE_ART?.[role];
  useEffect(() => {
    if (sealed) return;
    const id = setTimeout(() => setOpen(true), 560);
    return () => clearTimeout(id);
  }, [sealed]);

  return (
    <div className="turnwrap">
      <div className="turn" data-open={open ? "1" : "0"} data-art={art ? "1" : "0"}>
        {/* An invisible copy of the art in normal flow gives .turn its height, so
            the card takes the image's own proportions instead of a hardcoded
            ratio. Same behaviour as the carousel, which was already right. */}
        {art && <img className="sizer" src={art} alt="" aria-hidden="true" />}
        <div className="tface tback"><Lattice /></div>
        <div className="tface tfront">
          {sealed ? <div className="turn-fallback"><div className="pane" /><div className="cap">{t("sealed")}</div></div>
            : <RoleFace role={role} />}
        </div>
      </div>
    </div>
  );
}

/* Shared with the how-to-play carousel, so the two places you learn what a
   Jester is cannot drift apart. The art says THE STRANGER; a new player still
   needs telling that means impostor. */
export function RoleBlurb({ role }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div className="fat" style={{ fontSize: 23, textTransform: "uppercase", color: ROLE[role].tone }}>
        {t("r_" + role)}
      </div>
      <p className="quiet" style={{ marginTop: 7, maxWidth: 300, marginLeft: "auto", marginRight: "auto", fontSize: 13 }}>
        {t("d_" + role)}
      </p>
    </div>
  );
}

function Result({ state, dispatch }) {
  const { result, settings } = state;
  const show = settings.revealOnVote || ["mrwhite", "jester"].includes(result.role);

  return (
    <>
      <div className="eyebrow">{t("votedOut")}</div>
      <div className="stage">
        <div className="fat" style={{ fontSize: 30, textTransform: "uppercase" }}>{result.name}</div>
        <RoleTurn role={result.role} sealed={!show} />
        {show && <RoleBlurb role={result.role} />}
        {result.winner === "jester" && (
          <p className="quiet" style={{ textAlign: "center", maxWidth: 260, fontSize: 12.5 }}>{t("jesterNote")}</p>
        )}
      </div>
      <Btn onClick={() => dispatch({ type: "CONTINUE" })}>
        {result.guessNext ? t("whiteGuesses") : result.winner ? t("turnOver") : t("keepPlaying")}
      </Btn>
      {!!state.past.length && (
        <button className="eyebrow tap" style={{ padding: "12px 0 0", alignSelf: "center" }}
          onClick={() => dispatch({ type: "UNDO" })}>{t("undo")}</button>
      )}
    </>
  );
}

/* The carousel wants a plain card with no turn animation. */
export function RevealCard({ role }) {
  return <div className="turn-static"><RoleFace role={role} /></div>;
}

export { Result };
