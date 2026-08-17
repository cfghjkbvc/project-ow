import React from "react";
import { Btn, Chip } from "../ui/atoms.jsx";
import { EXTRAS, PRESETS } from "../ui/sigils.jsx";
import { GAPS, activePairs, seated } from "../game/state.js";
import { t, buzz, setHaptics, HAPTICS_SUPPORTED } from "../data/strings.js";
import { roman } from "../game/helpers.js";

/* ------------------------------ Settings ------------------------------ */

/* Grouped by how often you touch a thing. Roles and word gap change between
   nights, packs occasionally, language and vibration once ever. Who's playing
   is not here at all — that changes every session and lives on the way in. */
function Settings({ state, dispatch }) {
  const { settings } = state;
  const here = seated(state);
  const maxImp = Math.max(1, Math.ceil(Math.max(here.length, 4) / 2) - 1);
  const pairs = activePairs(state).length;
  const preset = PRESETS[settings.preset];
  const set = (key, value) => dispatch({ type: "SET", key, value });

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="eyebrow">{t("settings")}</span>
        <button className="eyebrow tap" onClick={() => dispatch({ type: "TO_HOME" })}>{t("done")}</button>
      </div>

      <div className="scroll" style={{ flex: 1, paddingTop: 18 }}>
        <div className="eyebrow">{t("rolesInPlay")}</div>
        <div className="seg" style={{ marginTop: 11 }}>
          {Object.keys(PRESETS).map((k) => (
            <button key={k} data-on={settings.preset === k ? "1" : "0"}
              onClick={() => set("preset", k)}>{t("p_" + k)}</button>
          ))}
        </div>
        <p className="quiet" style={{ marginTop: 10 }}>{t("pn_" + settings.preset)}</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 13 }}>
          <Chip role="undercover" />
          {preset.map((r) => here.length >= EXTRAS[r] ? <Chip key={r} role={r} /> : (
            <span key={r} className="chip" style={{ background: "transparent", color: "var(--muted)", borderColor: "var(--hair)" }}>
              {t("r_" + r)} {t("at", EXTRAS[r])}
            </span>))}
        </div>

        <div className="eyebrow" style={{ marginTop: 24 }}>{t("impostors")}</div>
        <div className="seg" style={{ marginTop: 11 }}>
          {[1, 2, 3].map((n) => (
            <button key={n} disabled={n > maxImp} style={{ opacity: n > maxImp ? 0.3 : 1 }}
              data-on={settings.impostors === n ? "1" : "0"}
              onClick={() => set("impostors", n)}>{roman(n)}</button>
          ))}
        </div>

        <div className="eyebrow" style={{ marginTop: 24 }}>{t("wordGap")}</div>
        <div className="seg" style={{ marginTop: 11 }}>
          {Object.keys(GAPS).map((k) => (
            <button key={k} data-on={settings.gap === k ? "1" : "0"}
              onClick={() => set("gap", k)}>{t("g_" + k)}</button>
          ))}
        </div>
        <p className="quiet" style={{ marginTop: 10 }}>{t("gh_" + settings.gap)}</p>

        <div className="eyebrow" style={{ marginTop: 24 }}>{t("onVote")}</div>
        <div className="seg" style={{ marginTop: 11 }}>
          <button data-on={settings.revealOnVote ? "1" : "0"} onClick={() => set("revealOnVote", true)}>{t("showSide")}</button>
          <button data-on={!settings.revealOnVote ? "1" : "0"} onClick={() => set("revealOnVote", false)}>{t("sayNothing")}</button>
        </div>
        <p className="quiet" style={{ marginTop: 10 }}>{t("sayNote")}</p>

        <div className="rule-dbl" />

        <div className="eyebrow">{t("packs")}</div>
        <p className="quiet" style={{ marginTop: 8 }}>{t("activePairs", pairs)}</p>
        <div style={{ marginTop: 11 }}>
          <Btn kind="btn-ghost btn-sm" onClick={() => dispatch({ type: "GOTO", phase: "packs" })}>{t("managePacks")}</Btn>
        </div>

        <div className="rule-dbl" />

        <div className="eyebrow">{t("language")}</div>
        <div className="seg" style={{ marginTop: 11 }}>
          {[["en", "English"], ["hu", "Magyar"]].map(([k, l]) => (
            <button key={k} data-on={settings.ui === k ? "1" : "0"} onClick={() => set("ui", k)}>{l}</button>
          ))}
        </div>

        <div className="eyebrow" style={{ marginTop: 22 }}>{t("haptics")}</div>
        {HAPTICS_SUPPORTED ? (
          <div className="seg" style={{ marginTop: 11 }}>
            <button data-on={settings.haptics ? "1" : "0"}
              onClick={() => { setHaptics(true); buzz("tap"); set("haptics", true); }}>{t("on")}</button>
            <button data-on={!settings.haptics ? "1" : "0"} onClick={() => set("haptics", false)}>{t("off")}</button>
          </div>
        ) : (
          <p className="quiet" style={{ marginTop: 9, paddingBottom: 8 }}>{t("hapticsUnsupported")}</p>
        )}

        <div className="rule-dbl" />
        <button className="eyebrow tap" style={{ paddingBottom: 6 }}
          onClick={() => dispatch({ type: "GOTO", phase: "about" })}>{t("about")}</button>
      </div>

      <div style={{ marginTop: 14 }}>
        <Btn onClick={() => dispatch({ type: "TO_HOME" })}>{t("done")}</Btn>
      </div>
    </>
  );
}

export default Settings;
