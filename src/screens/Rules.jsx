import React from "react";
import { Btn } from "../ui/atoms.jsx";
import { ROLE } from "../ui/sigils.jsx";
import { t } from "../data/strings.js";
import { roman } from "../game/helpers.js";

/* -------------------------------- Rules ------------------------------- */

function Rules({ dispatch }) {
  const steps = [["s1", "s1b"], ["s2", "s2b"], ["s3", "s3b"], ["s4", "s4b"]];
  const roles = ["civilian", "undercover", "mrwhite", "jester", "accomplice"];
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="eyebrow">{t("rulesTitle")}</span>
        <button className="eyebrow tap" onClick={() => dispatch({ type: "GOTO", phase: "setup" })}>{t("close")}</button>
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
        <div className="eyebrow">{t("theRoles")}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 13 }}>
          {roles.map((r) => {
            const S = ROLE[r].Sig;
            return (
              <div className="row" key={r} style={{ alignItems: "flex-start" }}>
                <S style={{ width: 26, flex: "none", color: ROLE[r].tone, marginTop: 2 }} />
                <div style={{ minWidth: 0 }}>
                  <div className="nm" style={{ fontSize: 16 }}>{t("r_" + r)}</div>
                  <p className="quiet" style={{ fontSize: 12.5, marginTop: 3 }}>{t("d_" + r)}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="rule-dbl" />
        <div className="eyebrow">{t("houseRule")}</div>
        <p className="quiet" style={{ marginTop: 8, paddingBottom: 10 }}>{t("houseRuleBody")}</p>
      </div>

      <div style={{ marginTop: 12 }}>
        <Btn onClick={() => dispatch({ type: "GOTO", phase: "setup" })}>{t("close")}</Btn>
      </div>
    </>
  );
}

export default Rules;
