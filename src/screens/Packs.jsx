import React, { useState, useEffect } from "react";
import { Btn, Sheet } from "../ui/atoms.jsx";
import { allPacks } from "../game/state.js";
import { pairKey } from "../data/packs.js";
import { encodePack } from "../game/share.js";
import { t, buzz } from "../data/strings.js";

/* ------------------------------- Packs -------------------------------- */

function Packs({ state, dispatch }) {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="eyebrow">{t("packs")}</span>
        <button className="eyebrow tap" onClick={() => dispatch({ type: "GOTO", phase: "setup" })}>{t("done")}</button>
      </div>

      <div className="scroll" style={{ flex: 1, paddingTop: 20, display: "flex", flexDirection: "column", gap: 7 }}>
        {allPacks(state).map((p) => {
          const on = state.settings.active.includes(p.id);
          return (
            <div className={`row ${on ? "row-on" : ""}`} key={p.id}>
              <button className="tick" data-on={on ? "1" : "0"} role="switch" aria-checked={on}
                aria-label={p.name}
                onClick={() => { buzz("tick"); dispatch({ type: "TOGGLE_PACK", id: p.id }); }} />
              <div style={{ minWidth: 0, flex: 1 }}>
                <div className="nm" style={{ fontSize: 17 }}>{p.name}</div>
                <div className="quiet" style={{ fontSize: 12 }}>{t("pairsN", p.pairs.length)} · {p.lang.toUpperCase()}</div>
              </div>
              {p.builtin
                ? <span className="chip" style={{ background: "transparent", color: "var(--muted)", borderColor: "var(--hair)" }}>{t("builtIn")}</span>
                : <button className="eyebrow tap" onClick={() => dispatch({ type: "EDIT_PACK", id: p.id })}>{t("edit")}</button>}
            </div>
          );
        })}

        {!!state.retired.length && (
          <div style={{ marginTop: 18 }}>
            <div className="eyebrow">{t("retiredPairs", state.retired.length)}</div>
            <div style={{ marginTop: 11 }}>
              <Btn kind="btn-ghost btn-sm" onClick={() => dispatch({ type: "RESTORE_ALL" })}>{t("restoreAll")}</Btn>
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: 14 }}>
        <Btn onClick={() => dispatch({ type: "NEW_PACK" })}>{t("newPack")}</Btn>
      </div>
    </>
  );
}

function Editor({ state, dispatch }) {
  const pack = state.packs.find((p) => p.id === state.editingId);
  const [a, setA] = useState(""); const [b, setB] = useState(""); const [sim, setSim] = useState(3);
  const [err, setErr] = useState(""); const [toast, setToast] = useState("");
  const [confirmDel, setConfirmDel] = useState(false);

  useEffect(() => { if (!toast) return; const id = setTimeout(() => setToast(""), 2200); return () => clearTimeout(id); }, [toast]);
  if (!pack) return null;

  const addPair = () => {
    if (!a.trim() || !b.trim()) return setErr(t("bothWords"));
    const k = pairKey({ a: a.trim(), b: b.trim() });
    if (pack.pairs.some((p) => pairKey(p) === k)) return setErr(t("dupe"));
    setErr(""); buzz("tick");
    dispatch({ type: "PATCH_PACK", id: pack.id, patch: { pairs: [...pack.pairs, { a: a.trim(), b: b.trim(), sim }] } });
    setA(""); setB("");
  };

  const share = async () => {
    try {
      const payload = await encodePack(pack);
      const url = `${location.origin}${location.pathname}#pack=${payload}`;
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(url);
      else window.prompt("", url);
      setToast(t("copied"));
    } catch (_) { setToast(t("importBad")); }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="eyebrow">{t("packName")}</span>
        <button className="eyebrow tap" onClick={() => dispatch({ type: "GOTO", phase: "packs" })}>{t("done")}</button>
      </div>

      <input className="field" style={{ marginTop: 12 }} value={pack.name} maxLength={40}
        onChange={(e) => dispatch({ type: "PATCH_PACK", id: pack.id, patch: { name: e.target.value } })} />

      <div className="seg" style={{ marginTop: 10 }}>
        {[["en", "English"], ["hu", "Magyar"]].map(([k, l]) => (
          <button key={k} data-on={pack.lang === k ? "1" : "0"}
            onClick={() => dispatch({ type: "PATCH_PACK", id: pack.id, patch: { lang: k } })}>{l}</button>
        ))}
      </div>

      <div className="rule-dbl" />
      <div className="eyebrow">{t("pairsN", pack.pairs.length)}</div>

      <div className="scroll" style={{ flex: 1, marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
        {!pack.pairs.length && <p className="quiet">{t("noPairsYet")}</p>}
        {pack.pairs.map((p, i) => (
          <div className="row" key={pairKey(p) + i}>
            <span className="num">{p.sim}</span>
            <span className="nm" style={{ fontSize: 16 }}>{p.a} · {p.b}</span>
            <button className="x" aria-label={p.a}
              onClick={() => dispatch({ type: "PATCH_PACK", id: pack.id, patch: { pairs: pack.pairs.filter((_, j) => j !== i) } })}>×</button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
        <input className="field" value={a} placeholder={t("wordA")} maxLength={40} onChange={(e) => setA(e.target.value)} />
        <input className="field" value={b} placeholder={t("wordB")} maxLength={40} onChange={(e) => setB(e.target.value)} />
      </div>
      <div className="eyebrow" style={{ marginTop: 14 }}>{t("similarity")}</div>
      <div className="seg" style={{ marginTop: 9 }}>
        {[1, 2, 3, 4].map((n) => (
          <button key={n} data-on={sim === n ? "1" : "0"} onClick={() => setSim(n)}>{n}</button>
        ))}
      </div>
      <p className="quiet" style={{ marginTop: 8, fontSize: 12.5 }}>{t("simHint")}</p>
      {err && <div className="err">{err}</div>}

      <div style={{ marginTop: 12 }}>
        <Btn kind="btn-sm" onClick={addPair}>{t("addPair")}</Btn>
        <div style={{ height: 8 }} />
        <Btn kind="btn-ghost btn-sm" disabled={!pack.pairs.length} onClick={share}>{t("sharePack")}</Btn>
        <div style={{ height: 8 }} />
        <Btn kind="btn-danger btn-sm" onClick={() => setConfirmDel(true)}>{t("deletePack")}</Btn>
      </div>

      {confirmDel && (
        <Sheet onClose={() => setConfirmDel(false)} label={t("deletePack")}>
          <div className="fat" style={{ fontSize: 24, textTransform: "uppercase" }}>{pack.name}</div>
          <div style={{ height: 18 }} />
          <Btn kind="btn-danger" onClick={() => dispatch({ type: "DELETE_PACK", id: pack.id })}>{t("deletePack")}</Btn>
          <div style={{ height: 9 }} />
          <Btn kind="btn-ghost" onClick={() => setConfirmDel(false)}>{t("cancel")}</Btn>
        </Sheet>
      )}
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}

export { Packs, Editor };
