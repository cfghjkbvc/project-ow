import { uid } from "./helpers.js";

/* --------------------------- pack sharing ---------------------------- */

const b64url = (bytes) => {
  let s = "";
  for (let i = 0; i < bytes.length; i += 4096) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 4096));
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};
const unb64url = (str) => {
  const s = str.replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(s + "=".repeat((4 - (s.length % 4)) % 4));
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
};

async function encodePack(pack) {
  const json = JSON.stringify({ n: pack.name, l: pack.lang, p: pack.pairs.map((x) => [x.a, x.b, x.sim]) });
  const bytes = new TextEncoder().encode(json);
  if (typeof CompressionStream !== "undefined") {
    try {
      const cs = new CompressionStream("deflate-raw");
      const buf = await new Response(new Blob([bytes]).stream().pipeThrough(cs)).arrayBuffer();
      return "z" + b64url(new Uint8Array(buf));
    } catch (_) {}
  }
  return "u" + b64url(bytes);
}

async function decodePack(payload) {
  const tag = payload[0];
  let bytes = unb64url(payload.slice(1));
  if (tag === "z") {
    const ds = new DecompressionStream("deflate-raw");
    const buf = await new Response(new Blob([bytes]).stream().pipeThrough(ds)).arrayBuffer();
    bytes = new Uint8Array(buf);
  }
  const o = JSON.parse(new TextDecoder().decode(bytes));
  if (!o || !Array.isArray(o.p)) throw new Error("bad");
  return {
    id: uid(), name: String(o.n || "Pack").slice(0, 40), lang: o.l === "hu" ? "hu" : "en",
    pairs: o.p.filter((x) => Array.isArray(x) && x[0] && x[1])
      .map((x) => ({ a: String(x[0]).slice(0, 40), b: String(x[1]).slice(0, 40), sim: Math.min(4, Math.max(1, +x[2] || 3)) })),
  };
}

export { encodePack, decodePack };
