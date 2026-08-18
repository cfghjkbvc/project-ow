import React, { useRef, useState, useEffect } from "react";
import { Btn, Sheet } from "../ui/atoms.jsx";
import { buildBackup, backupFilename, parseBackup } from "../game/transfer.js";
import { t, buzz } from "../data/strings.js";

/* ------------------------------- Backup ------------------------------- */

/* Files are awkward on phones, so text is a first-class path here rather than a
   fallback: copy the whole backup to the clipboard, paste it back on the other
   device. That works everywhere a file picker doesn't. */
function Backup({ state, dispatch }) {
  const fileRef = useRef(null);
  const [toast, setToast] = useState("");
  const [pasting, setPasting] = useState(false);
  const [text, setText] = useState("");
  const [pending, setPending] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(""), 2400);
    return () => clearTimeout(id);
  }, [toast]);

  const save = () => {
    try {
      const blob = new Blob([buildBackup(state)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = backupFilename();
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
      buzz("tick");
      setToast(t("saved"));
    } catch (_) { setError(t("saveFailed")); }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(buildBackup(state));
      buzz("tick");
      setToast(t("copied"));
    } catch (_) { setError(t("saveFailed")); }
  };

  const read = (raw) => {
    try {
      setPending(parseBackup(raw));
      setError("");
      setPasting(false);
    } catch (e) {
      setPending(null);
      setError(t(
        e.message === "notOurs" ? "notOurBackup"
          : e.message === "tooNew" ? "backupTooNew"
            : "backupUnreadable"
      ));
    }
  };

  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => read(String(r.result));
    r.onerror = () => setError(t("backupUnreadable"));
    r.readAsText(f);
    e.target.value = ""; // so picking the same file twice still fires
  };

  const counts = {
    players: state.players.length,
    packs: state.packs.length,
    pairs: state.packs.reduce((n, p) => n + p.pairs.length, 0),
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="eyebrow">{t("backup")}</span>
        <button className="eyebrow tap" onClick={() => dispatch({ type: "TO_HOME" })}>{t("back")}</button>
      </div>

      <div className="scroll" style={{ flex: 1, paddingTop: 18 }}>
        <p className="quiet">{t("backupWhy")}</p>

        <div style={{ display: "flex", gap: 9, marginTop: 14 }}>
          <div className="mini"><div className="k">{t("playersLbl")}</div><div className="v">{counts.players}</div></div>
          <div className="mini"><div className="k">{t("packs")}</div><div className="v">{counts.packs}</div></div>
          <div className="mini"><div className="k">{t("pairsLbl")}</div><div className="v">{counts.pairs}</div></div>
        </div>

        <div className="rule-dbl" />
        <div className="eyebrow">{t("saveIt")}</div>
        <div style={{ marginTop: 11 }}>
          <Btn kind="btn-sm" onClick={save}>{t("saveFile")}</Btn>
          <div style={{ height: 8 }} />
          <Btn kind="btn-ghost btn-sm" onClick={copy}>{t("copyText")}</Btn>
        </div>

        <div className="rule-dbl" />
        <div className="eyebrow">{t("bringItBack")}</div>
        <p className="quiet" style={{ marginTop: 8, fontSize: 12.5 }}>{t("bringItBackBody")}</p>
        <div style={{ marginTop: 11 }}>
          <Btn kind="btn-ghost btn-sm" onClick={() => fileRef.current?.click()}>{t("loadFile")}</Btn>
          <div style={{ height: 8 }} />
          <Btn kind="btn-ghost btn-sm" onClick={() => { setText(""); setError(""); setPasting(true); }}>{t("pasteBackup")}</Btn>
        </div>
        <input ref={fileRef} type="file" accept="application/json,.json"
          onChange={onFile} style={{ display: "none" }} />

        {error && <div className="err" style={{ marginTop: 12 }}>{error}</div>}
        <div style={{ height: 10 }} />
      </div>

      <div style={{ marginTop: 12 }}>
        <Btn onClick={() => dispatch({ type: "TO_HOME" })}>{t("back")}</Btn>
      </div>

      {pasting && (
        <Sheet onClose={() => setPasting(false)} label={t("pasteBackup")}>
          <div className="fat" style={{ fontSize: 23, textTransform: "uppercase" }}>{t("pasteBackup")}</div>
          <textarea className="field area" value={text} rows={6} autoFocus
            placeholder={t("pastePlaceholder")} onChange={(e) => setText(e.target.value)}
            style={{ marginTop: 12 }} />
          <div style={{ height: 12 }} />
          <Btn disabled={!text.trim()} onClick={() => read(text)}>{t("readIt")}</Btn>
          <div style={{ height: 9 }} />
          <Btn kind="btn-ghost" onClick={() => setPasting(false)}>{t("cancel")}</Btn>
        </Sheet>
      )}

      {pending && (
        <Sheet onClose={() => setPending(null)} label={t("bringItBack")}>
          <div className="fat" style={{ fontSize: 23, textTransform: "uppercase", lineHeight: 1.14 }}>
            {t("foundBackup")}
          </div>
          <p className="quiet" style={{ margin: "10px 0 6px" }}>
            {t("backupSummary", pending.summary.players, pending.summary.packs, pending.summary.pairs)}
          </p>
          {pending.exportedAt && (
            <p className="quiet" style={{ fontSize: 12 }}>{t("madeOn", pending.exportedAt)}</p>
          )}
          <div style={{ height: 16 }} />
          <Btn onClick={() => { buzz("tap"); dispatch({ type: "IMPORT_BACKUP", data: pending.data, mode: "merge" }); }}>
            {t("mergeIt")}
          </Btn>
          <p className="quiet" style={{ margin: "8px 0 12px", fontSize: 12 }}>{t("mergeNote")}</p>
          <Btn kind="btn-danger" onClick={() => { buzz("tap"); dispatch({ type: "IMPORT_BACKUP", data: pending.data, mode: "replace" }); }}>
            {t("replaceIt")}
          </Btn>
          <div style={{ height: 9 }} />
          <Btn kind="btn-ghost" onClick={() => setPending(null)}>{t("cancel")}</Btn>
        </Sheet>
      )}

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}

export default Backup;
