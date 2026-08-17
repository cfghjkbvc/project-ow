import React, { useState } from "react";
import { Btn, Sheet } from "../ui/atoms.jsx";
import { BASE, VERSION } from "../config.js";
import { CORE_EN, CORE_HU } from "../data/packs.js";
import { t } from "../data/strings.js";

/* -------------------------------- About ------------------------------- */

/* Version, credits and licences. Also the only place a full wipe lives — it
   belongs next to the disclosures rather than lurking in settings where it
   could be hit by accident. */
function About({ state, dispatch }) {
  const [wiping, setWiping] = useState(false);
  const custom = state.packs.reduce((n, p) => n + p.pairs.length, 0);

  const Line = ({ label, children }) => (
    <div style={{ display: "flex", gap: 14, alignItems: "baseline", marginTop: 9 }}>
      <span className="eyebrow" style={{ minWidth: 104 }}>{label}</span>
      <span className="quiet" style={{ flex: 1, fontSize: 13 }}>{children}</span>
    </div>
  );

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="eyebrow">{t("about")}</span>
        <button className="eyebrow tap" onClick={() => dispatch({ type: "TO_HOME" })}>{t("back")}</button>
      </div>

      <div className="scroll" style={{ flex: 1, paddingTop: 18 }}>
        <div className="fat" style={{ fontSize: 30, textTransform: "uppercase" }}>{t("title")}</div>
        <div className="serif" style={{ fontSize: 13, color: "var(--marigold)", marginTop: 4 }}>
          {t("versionN", VERSION)}
        </div>
        <p className="quiet" style={{ marginTop: 12 }}>{t("aboutBlurb")}</p>

        <div className="rule-dbl" />

        <Line label={t("theDeck")}>
          {t("deckCounts", CORE_EN.length, CORE_HU.length, custom)}
        </Line>
        <Line label={t("theGame")}>{t("creditGenre")}</Line>
        <Line label={t("theCards")}>{t("creditArt")}</Line>
        <Line label={t("theLayout")}>{t("creditLayout")}</Line>
        <Line label={t("theType")}>
          {t("creditFonts")}{" "}
          <a href={BASE + "FONT-LICENSE.txt"} target="_blank" rel="noreferrer"
            style={{ color: "var(--marigold)" }}>{t("readLicence")}</a>
        </Line>

        <div className="rule-dbl" />

        <div className="eyebrow">{t("yourData")}</div>
        <p className="quiet" style={{ marginTop: 8 }}>{t("yourDataBody")}</p>
        <div style={{ marginTop: 12 }}>
          <Btn kind="btn-danger btn-sm" onClick={() => setWiping(true)}>{t("wipeAll")}</Btn>
        </div>

        <p className="quiet" style={{ marginTop: 22, paddingBottom: 8, fontSize: 12 }}>{t("madeFor")}</p>
      </div>

      <div style={{ marginTop: 14 }}>
        <Btn onClick={() => dispatch({ type: "TO_HOME" })}>{t("back")}</Btn>
      </div>

      {wiping && (
        <Sheet onClose={() => setWiping(false)} label={t("wipeAll")}>
          <div className="fat" style={{ fontSize: 24, textTransform: "uppercase", lineHeight: 1.14 }}>{t("wipeAll")}</div>
          <p className="quiet" style={{ margin: "10px 0 20px" }}>{t("wipeBody")}</p>
          <Btn kind="btn-danger" onClick={() => dispatch({ type: "WIPE_ALL" })}>{t("wipeConfirm")}</Btn>
          <div style={{ height: 9 }} />
          <Btn kind="btn-ghost" onClick={() => setWiping(false)}>{t("cancel")}</Btn>
        </Sheet>
      )}
    </>
  );
}

export default About;
