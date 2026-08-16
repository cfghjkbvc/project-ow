# Making Odd Word work with no signal

Three things depend on the network right now: the fonts, the art, and the
bundle itself. Fixing all three takes about ten minutes and then the game
survives a garden, a cellar, or a train.

## 1. Self-host the fonts

The app pulls four faces from Google Fonts. Download them once and serve them
yourself — this also stops the first render at a party showing fallback fonts
while the wifi thinks about it.

Easiest route is [google-webfonts-helper](https://gwfh.mranftl.com): pick each
family, choose **latin + latin-ext** (latin-ext is required — it carries `ő`
and `ű`, and without it the Hungarian deck renders broken), and download woff2.

Put these four files in `public/fonts/`:

```
abril-fatface-400.woff2
bodoni-moda-600.woff2
bodoni-moda-800.woff2
jost-400.woff2
```

Then in `src/App.jsx`:

```js
const SELF_HOSTED_FONTS = true;
```

If your filenames differ, edit the `LOCAL_FONTS` block rather than renaming —
it's four `url()` calls in one place.

## 2. Turn on the service worker

Copy `sw.js` and `manifest.webmanifest` into `public/`, then in `src/App.jsx`:

```js
const ENABLE_SW = true;
```

Add the manifest link to `index.html` inside `<head>`:

```html
<link rel="manifest" href="./manifest.webmanifest" />
```

Keep it relative. An absolute path breaks the moment the repo is renamed.

**Bump `VERSION` in `sw.js` on every deploy.** A service worker will happily
serve last month's bundle forever otherwise, and you will lose an evening to it.

## 3. Icons

The manifest expects two PNGs in `public/`:

```
icon-192.png
icon-512.png
```

The card back makes an obvious icon — teal ground, marigold lattice, no text.

## Checking it worked

1. `npm run build && npm run preview`
2. Open DevTools → Application → Service Workers, confirm it's activated
3. Tick **Offline**, reload — the game should come up with correct fonts
4. On a phone: open the deployed URL, then Add to Home Screen

The whole payload is roughly 250KB of JS plus fonts and art, so the first visit
caches everything in a second or two and later visits never touch the network.
