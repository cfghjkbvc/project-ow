import React, { useState, useEffect, useMemo } from "react";
import { Btn, Sheet } from "../ui/atoms.jsx";
import { allPacks } from "../game/state.js";
import { pairKey } from "../data/packs.js";
import { encodePack } from "../game/share.js";
import { parsePairList } from "../game/transfer.js";
import { t, buzz } from "../data/strings.js";

/* ------------------------------- Packs -------------------------------- */

function Packs({ state, dispatch }) {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="eyebrow">{t("packs")}</span>
        <button className="eyebrow tap" onClick={() => dispatch({ type: "GOTO", phase: "settings" })}>{t("done")}</button>
      </div>

      <div className="scroll" style={{ flex: 1, paddingTop: 20, display: "flex", flexDirection: "column", gap: 7 }}>
        {allPacks(state).map((p) => {
          const on = state.settings.active.includes(p.id);
          const gone = p.pairs.filter((x) => state.retired.includes(pairKey(x))).length;
          return (
            <div className={`row ${on ? "row-on" : ""}`} key={p.id}>
              <button className="tick" data-on={on ? "1" : "0"} role="switch" aria-checked={on}
                aria-label={p.name}
                onClick={() => { buzz("tick"); dispatch({ type: "TOGGLE_PACK", id: p.id }); }} />
              {/* The whole row opens the deck, built-in ones included — you should
                  be able to read what you are about to play with. */}
              <button className="rowbody" onClick={() => dispatch({ type: "EDIT_PACK", id: p.id })}>
                <div className="nm" style={{ fontSize: 17 }}>{p.name}</div>
                <div className="quiet" style={{ fontSize: 12 }}>
                  {t("pairsN", p.pairs.length)} · {p.lang.toUpperCase()}
                  {gone ? " · " + t("removedN", gone) : ""}
                </div>
              </button>
              <span className="quiet" aria-hidden="true" style={{ fontSize: 18, paddingRight: 2 }}>›</span>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 14 }}>
        <Btn onClick={() => dispatch({ type: "NEW_PACK" })}>{t("newPack")}</Btn>
      </div>
    </>
  );
}

/* ------------------------------- Editor ------------------------------- */

function Editor({ state, dispatch }) {
  const pack = allPacks(state).find((p) => p.id === state.editingId);
  const ro = !!pack?.builtin;

  const [a, setA] = useState(""); const [b, setB] = useState(""); const [sim, setSim] = useState(3);
  const [err, setErr] = useState(""); const [toast, setToast] = useState("");
  const [confirmDel, setConfirmDel] = useState(false);
  const [bulk, setBulk] = useState(null);       // null = closed
  const [editing, setEditing] = useState(null); // one pair, opened from the list
  const [q, setQ] = useState("");

  useEffect(() => { if (!toast) return; const id = setTimeout(() => setToast(""), 2200); return () => clearTimeout(id); }, [toast]);

  // The real index travels with each row, so filtering never misdirects an edit.
  const rows = useMemo(() => {
    if (!pack) return [];
    const needle = q.trim().toLowerCase();
    return pack.pairs
      .map((p, index) => ({ p, index }))
      .filter(({ p }) => !needle || p.a.toLowerCase().includes(needle) || p.b.toLowerCase().includes(needle));
  }, [pack, q]);

  if (!pack) return null;
  const goneCount = pack.pairs.filter((p) => state.retired.includes(pairKey(p))).length;

  const addPair = () => {
    if (!a.trim() || !b.trim()) return setErr(t("bothWords"));
    const k = pairKey({ a: a.trim(), b: b.trim() });
    if (pack.pairs.some((p) => pairKey(p) === k)) return setErr(t("dupe"));
    setErr(""); buzz("tick");
    dispatch({ type: "ADD_PAIRS", id: pack.id, pairs: [{ a: a.trim(), b: b.trim(), sim }] });
    setA(""); setB("");
  };

  const addBulk = () => {
    const existing = new Set(pack.pairs.map((p) => pairKey(p)));
    const { pairs, skipped, dupes } = parsePairList(bulk, existing);
    if (!pairs.length) { setErr(t("nothingToAdd")); return; }
    buzz("tap");
    dispatch({ type: "ADD_PAIRS", id: pack.id, pairs });
    setBulk(null); setErr("");
    setToast(t("addedN", pairs.length, skipped + dupes));
  };

  const saveEdit = () => {
    const { index, a: na, b: nb, sim: ns } = editing;
    if (!na.trim() || !nb.trim()) return setErr(t("bothWords"));
    const k = pairKey({ a: na.trim(), b: nb.trim() });
    if (pack.pairs.some((p, i) => i !== index && pairKey(p) === k)) return setErr(t("dupe"));
    buzz("tick");
    dispatch({ type: "PATCH_PAIR", id: pack.id, index, pair: { a: na.trim(), b: nb.trim(), sim: ns } });
    setEditing(null); setErr("");
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
        <span className="eyebrow">{ro ? pack.name : t("packName")}</span>
        <button className="eyebrow tap" onClick={() => dispatch({ type: "GOTO", phase: "packs" })}>{t("done")}</button>
      </div>

      {!ro && (
        <>
          <input className="field" style={{ marginTop: 12 }} value={pack.name} maxLength={40}
            onChange={(e) => dispatch({ type: "PATCH_PACK", id: pack.id, patch: { name: e.target.value } })} />
          <div className="seg" style={{ marginTop: 10 }}>
            {[["en", "English"], ["hu", "Magyar"]].map(([k, l]) => (
              <button key={k} data-on={pack.lang === k ? "1" : "0"}
                onClick={() => dispatch({ type: "PATCH_PACK", id: pack.id, patch: { lang: k } })}>{l}</button>
            ))}
          </div>
        </>
      )}

      {ro && <p className="quiet" style={{ marginTop: 10, fontSize: 12.5 }}>{t("builtInNote")}</p>}

      <div className="rule-dbl" />

      <input className="field" style={{ fontSize: 15 }} value={q} placeholder={t("searchPairs")}
        onChange={(e) => setQ(e.target.value)} />

      <div className="eyebrow" style={{ marginTop: 12 }}>
        {q.trim() ? t("matchesN", rows.length) : t("pairsN", pack.pairs.length)}
        {goneCount ? " · " + t("removedN", goneCount) : ""}
      </div>

      <div className="scroll" style={{ flex: 1, marginTop: 11, display: "flex", flexDirection: "column", gap: 6 }}>
        {!pack.pairs.length && <p className="quiet">{t("noPairsYet")}</p>}
        {!!pack.pairs.length && !rows.length && <p className="quiet">{t("noMatches")}</p>}
        {rows.map(({ p, index }) => {
          const gone = state.retired.includes(pairKey(p));
          return (
            <button className={`row ${gone ? "row-off" : ""}`} key={pairKey(p) + index}
              onClick={() => { setErr(""); setEditing({ index, a: p.a, b: p.b, sim: p.sim, key: pairKey(p) }); }}>
              <span className="num">{p.sim}</span>
              <span className="nm" style={{ fontSize: 16, textDecoration: gone ? "line-through" : "none" }}>
                {p.a} · {p.b}
              </span>
              {gone && (
                <span className="chip" style={{ marginLeft: "auto", background: "transparent", color: "var(--muted)", borderColor: "var(--hair)" }}>
                  {t("removedChip")}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {!ro && (
        <>
          <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
            <input className="field" value={a} placeholder={t("wordA")} maxLength={40} onChange={(e) => setA(e.target.value)} />
            <input className="field" value={b} placeholder={t("wordB")} maxLength={40} onChange={(e) => setB(e.target.value)} />
          </div>
          <div className="seg" style={{ marginTop: 10 }}>
            {[1, 2, 3, 4].map((n) => (
              <button key={n} data-on={sim === n ? "1" : "0"} onClick={() => setSim(n)}>{n}</button>
            ))}
          </div>
          {err && !editing && <div className="err">{err}</div>}
          <div style={{ marginTop: 12 }}>
            <Btn kind="btn-sm" onClick={addPair}>{t("addPair")}</Btn>
            <div style={{ height: 8 }} />
            <Btn kind="btn-ghost btn-sm" onClick={() => { setBulk(""); setErr(""); }}>{t("pasteList")}</Btn>
            <div style={{ height: 8 }} />
            <Btn kind="btn-ghost btn-sm" disabled={!pack.pairs.length} onClick={share}>{t("sharePack")}</Btn>
            <div style={{ height: 8 }} />
            <Btn kind="btn-danger btn-sm" onClick={() => setConfirmDel(true)}>{t("deletePack")}</Btn>
          </div>
        </>
      )}

      {ro && (
        <div style={{ marginTop: 14 }}>
          <Btn kind="btn-sm" onClick={() => { buzz("tap"); dispatch({ type: "CLONE_PACK", id: pack.id, name: t("copyOf", pack.name) }); }}>
            {t("copyToNew")}
          </Btn>
          {!!goneCount && (
            <>
              <div style={{ height: 8 }} />
              <Btn kind="btn-ghost btn-sm" onClick={() => dispatch({ type: "RESTORE_ALL" })}>{t("restoreAll")}</Btn>
            </>
          )}
        </div>
      )}

      {editing && (
        <Sheet onClose={() => { setEditing(null); setErr(""); }} label={t("editPair")}>
          <div className="fat" style={{ fontSize: 22, textTransform: "uppercase" }}>{ro ? t("thisPair") : t("editPair")}</div>

          {ro ? (
            <p className="quiet" style={{ margin: "10px 0 16px" }}>{editing.a} · {editing.b}</p>
          ) : (
            <>
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <input className="field" value={editing.a} maxLength={40} autoFocus
                  onChange={(e) => setEditing({ ...editing, a: e.target.value })} />
                <input className="field" value={editing.b} maxLength={40}
                  onChange={(e) => setEditing({ ...editing, b: e.target.value })} />
              </div>
              <div className="seg" style={{ marginTop: 10 }}>
                {[1, 2, 3, 4].map((n) => (
                  <button key={n} data-on={editing.sim === n ? "1" : "0"}
                    onClick={() => setEditing({ ...editing, sim: n })}>{n}</button>
                ))}
              </div>
              {err && <div className="err">{err}</div>}
              <div style={{ height: 14 }} />
              <Btn onClick={saveEdit}>{t("savePair")}</Btn>
              <div style={{ height: 9 }} />
            </>
          )}

          {/* Removing from play works on any deck, because it is stored as a key
              rather than as an edit to the pack itself. */}
          {state.retired.includes(editing.key) ? (
            <Btn kind="btn-ghost" onClick={() => { dispatch({ type: "UNRETIRE", key: editing.key }); setEditing(null); }}>
              {t("restorePair")}
            </Btn>
          ) : (
            <Btn kind="btn-ghost" onClick={() => { dispatch({ type: "RETIRE", key: editing.key }); setEditing(null); }}>
              {t("removeFromPlay")}
            </Btn>
          )}

          {!ro && (
            <>
              <div style={{ height: 9 }} />
              <Btn kind="btn-danger" onClick={() => { dispatch({ type: "REMOVE_PAIR", id: pack.id, index: editing.index }); setEditing(null); }}>
                {t("deletePair")}
              </Btn>
            </>
          )}
          <div style={{ height: 9 }} />
          <Btn kind="btn-ghost" onClick={() => { setEditing(null); setErr(""); }}>{t("cancel")}</Btn>
        </Sheet>
      )}

      {bulk !== null && (
        <Sheet onClose={() => setBulk(null)} label={t("pasteList")}>
          <div className="fat" style={{ fontSize: 23, textTransform: "uppercase" }}>{t("pasteList")}</div>
          <p className="quiet" style={{ margin: "9px 0 0", fontSize: 12.5 }}>{t("pasteListHelp")}</p>
          <textarea className="field area" value={bulk} rows={7} autoFocus
            placeholder={"Kávé / Tea\nBor, Sör 4\nAlma - Körte"}
            onChange={(e) => setBulk(e.target.value)} style={{ marginTop: 11 }} />
          {err && <div className="err">{err}</div>}
          <div style={{ height: 12 }} />
          <Btn disabled={!bulk.trim()} onClick={addBulk}>{t("addThem")}</Btn>
          <div style={{ height: 9 }} />
          <Btn kind="btn-ghost" onClick={() => setBulk(null)}>{t("cancel")}</Btn>
        </Sheet>
      )}

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
