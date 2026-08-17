import React, { useMemo, useState, useEffect } from "react";
import qrcode from "qrcode-generator";
import { Btn } from "../ui/atoms.jsx";
import { t, buzz } from "../data/strings.js";

/* -------------------------------- Share ------------------------------- */

/* The QR is drawn as one SVG path rather than a per-module grid: a version-3
   code is 29x29, so 841 rects would be 841 DOM nodes for something that is
   logically a single shape. One path also means the ink colour comes from the
   theme like everything else. */
function QR({ text }) {
  const { d, n } = useMemo(() => {
    const qr = qrcode(0, "M");
    qr.addData(text);
    qr.make();
    const count = qr.getModuleCount();
    let path = "";
    for (let r = 0; r < count; r++) {
      for (let c = 0; c < count; c++) {
        if (qr.isDark(r, c)) path += `M${c} ${r}h1v1h-1z`;
      }
    }
    return { d: path, n: count };
  }, [text]);

  // Four modules of quiet zone, as the spec requires, or scanners struggle.
  const q = 4;
  return (
    <svg className="qr" viewBox={`${-q} ${-q} ${n + q * 2} ${n + q * 2}`}
      shapeRendering="crispEdges" role="img" aria-label={text}>
      <rect x={-q} y={-q} width={n + q * 2} height={n + q * 2} fill="var(--bone)" />
      <path d={d} fill="var(--ink)" />
    </svg>
  );
}

function Share({ dispatch }) {
  const [toast, setToast] = useState("");
  // Strip any #pack=... fragment: this shares the game, not a pack.
  const url = typeof location !== "undefined"
    ? location.origin + location.pathname
    : "";

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(id);
  }, [toast]);

  const copy = async () => {
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(url);
      else window.prompt("", url);
      buzz("tick");
      setToast(t("copied"));
    } catch (_) { window.prompt("", url); }
  };

  const share = async () => {
    try {
      await navigator.share({ title: t("title"), text: t("shareText"), url });
    } catch (_) { /* dismissed, or unsupported */ }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="eyebrow">{t("shareGame")}</span>
        <button className="eyebrow tap" onClick={() => dispatch({ type: "TO_HOME" })}>{t("back")}</button>
      </div>

      <div className="stage">
        <div className="qrcard"><QR text={url} /></div>
        <p className="quiet" style={{ textAlign: "center", maxWidth: 280, fontSize: 13 }}>{t("shareBody")}</p>
        <p className="serif" style={{ fontSize: 12, color: "var(--muted)", wordBreak: "break-all", textAlign: "center", maxWidth: 300 }}>
          {url}
        </p>
      </div>

      <Btn onClick={copy}>{t("copyLink")}</Btn>
      {typeof navigator !== "undefined" && navigator.share && (
        <>
          <div style={{ height: 9 }} />
          <Btn kind="btn-ghost" onClick={share}>{t("shareVia")}</Btn>
        </>
      )}

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}

export default Share;
