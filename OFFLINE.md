# Making Odd Word work with no signal

Everything below is already done — this is the record of how it works and what
to watch out for.

## Fonts: bundled, not fetched

The three typefaces come from Fontsource as npm packages and are imported in
`src/main.jsx`:

```js
import "@fontsource/abril-fatface/latin-400.css";
import "@fontsource/abril-fatface/latin-ext-400.css";
import "@fontsource-variable/bodoni-moda/wght.css";
import "@fontsource-variable/jost/wght.css";
```

Vite bundles the woff2 files into `dist/assets/` with content hashes, so there
is no runtime dependency on Google and a font change can never be served stale
from the service worker cache.

**`latin-ext` is not optional.** It carries `U+0100–02BA`, which is where
Hungarian's `ő` and `ű` live. Drop it and the Hungarian deck silently falls back
to Georgia.

**Fontsource names variable families with a suffix** — `'Bodoni Moda Variable'`,
not `'Bodoni Moda'`. `theme.js` lists both, variable first, so it degrades to
the static family if you ever swap packages.

Three subsets ship that nobody downloads: Bodoni's math and symbols files and
Jost's Cyrillic. They cost about 45KB of repo space and zero bandwidth, because
`unicode-range` means the browser never requests them. Not worth optimising.

**Licensing:** bundling the woff2 files is redistribution, and the SIL Open Font
License requires the licence text to travel with them. That's
`public/FONT-LICENSE.txt`. Don't delete it.

## Service worker

`ENABLE_SW` in `src/config.js` is `true`. `public/sw.js` precaches the shell on
install, then treats anything under `/assets/`, `/art/` or `/fonts/` as
immutable and cache-first. Everything else is network-first with a cache
fallback, so a new deploy is picked up rather than pinned.

**Bump `VERSION` in `sw.js` on every deploy.** It's currently `odd-word-v2`. A
service worker will happily serve last month's bundle forever otherwise, and
you will lose an evening working out why your changes aren't showing up.

Offline works after the first visit — the shell is precached immediately, and
art and fonts are cached as they load.

## Icons

```
public/icon-192.png            any purpose
public/icon-512.png            any purpose
public/icon-maskable-512.png   extra safe area, Android crops to a circle
public/apple-touch-icon.png    iOS ignores the manifest and uses this
```

The maskable one has wider margins on purpose. Android masks icons to whatever
shape the launcher uses, so a full-bleed icon loses its edges — the card in the
maskable version sits inside the centre 71% so nothing important gets cut.

## Checking it worked

1. `npm run build && npm run preview`
2. DevTools → Application → Service Workers, confirm it's activated
3. DevTools → Application → Manifest, confirm no icon errors
4. Tick **Offline**, reload — the game should come up with correct fonts
5. On a phone: open the deployed URL, then Add to Home Screen

## If it doesn't

**Icons missing in the manifest panel.** Check the paths resolve at your
deployed base — the manifest uses relative paths (`icon-192.png`), which
resolve against the manifest's own location, so renaming the repo is safe.

**Fonts fall back to Georgia.** Almost always the `Variable` suffix. Check
`--f-serif` in `theme.js` lists `'Bodoni Moda Variable'` first.

**Changes not appearing after deploy.** You didn't bump `VERSION`. Unregister
the worker in DevTools, hard reload, then bump it properly.
