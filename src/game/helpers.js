/* ------------------------------ helpers ------------------------------ */

const uid = () => Math.random().toString(36).slice(2, 9);
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};
const roman = (n) => {
  const tb = [[10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
  let s = ""; for (const [v, l] of tb) while (n >= v) { s += l; n -= v; } return s || "—";
};
const norm = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  .replace(/^(the|a|an|az|egy)\s+/, "").replace(/[^a-z0-9 ]/g, "").trim();
export function lev(a, b) {
  const m = Array.from({ length: b.length + 1 }, (_, i) => [i, ...Array(a.length).fill(0)]);
  for (let j = 1; j <= a.length; j++) m[0][j] = j;
  for (let i = 1; i <= b.length; i++)
    for (let j = 1; j <= a.length; j++)
      m[i][j] = Math.min(m[i - 1][j] + 1, m[i][j - 1] + 1, m[i - 1][j - 1] + (a[j - 1] === b[i - 1] ? 0 : 1));
  return m[b.length][a.length];
}
const isClose = (g0, t0) => {
  const g = norm(g0), tt = norm(t0);
  if (!g) return false; if (g === tt) return true;
  return lev(g, tt) <= (tt.length <= 4 ? 1 : 2);
};

const store = (() => {
  let mem = {}, ok = false;
  try { window.localStorage.setItem("__ow", "1"); window.localStorage.removeItem("__ow"); ok = true; } catch (_) {}
  return {
    get(k) { try { return ok ? JSON.parse(window.localStorage.getItem(k)) : mem[k] ?? null; } catch (_) { return null; } },
    set(k, v) { try { ok ? window.localStorage.setItem(k, JSON.stringify(v)) : (mem[k] = v); } catch (_) {} },
  };
})();
const KEY = "oddword.v2";

export { uid, shuffle, roman, norm, isClose, store, KEY };
