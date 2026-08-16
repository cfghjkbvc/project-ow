# Odd Word

A deduction party game for one phone, passed around a table. Most of you share
a word. One or two hold something close but different — and nobody is told
which they are.

## Run it

```bash
npm install
npm run dev
```

## Test

```bash
npm test
```

Plays a full game in both languages against the real reducer and
server-renders every screen. Worth running after any change to `game/state.js`
— a plain build passes even when a screen throws at runtime.

## Deploy to GitHub Pages

1. Set `base` in `vite.config.js` to `"/your-repo-name/"`. Wrong value here is
   the usual cause of a blank white page after deploy.
2. Push to `main`.
3. Repo → Settings → Pages → Source → **GitHub Actions**.

## Layout

```
src/
  config.js           base path, art slots, feature flags, font source
  App.jsx             phase router, persistence, wake lock, pack import
  data/packs.js       CORE_EN (228 pairs), CORE_HU (235 pairs)
  data/strings.js     every string in both languages, t(), NOTES, buzz()
  game/state.js       reducer, role assignment, win conditions, scoring
  game/helpers.js     shuffle, roman numerals, fuzzy match, localStorage
  game/share.js       pack encode/decode for URL sharing
  ui/theme.js         the entire stylesheet
  ui/sigils.jsx       original line art, role table
  ui/atoms.jsx        Shell, Btn, Chip, Sheet, Panel
  screens/            one file per phase
test/
  smoke.jsx           full-game smoke test
public/
  art/                generated card images
  fonts/              woff2 files (see OFFLINE.md)
  sw.js, manifest.webmanifest
```

## The four rules the word pairs follow

A pair only works if **one everyday word fits one and not the other**. Test it
before adding anything. Barred outright:

- **Parent and child.** Dog/Animal — every clue for the parent fits the child.
- **One word covering the other.** Kenyér/Kifli — kenyér describes both.
- **Two halves of one system.** Key/Lock — door, turn, open, metal fit both.
- **Homonyms.** Crane is a bird and a machine; the table splits and the round dies.

`sim` runs 1 (far apart) to 4 (close cousins). There is no 5 — that band was
where the unwinnable pairs lived.

## The rule the design follows

**Every card in a round carries the same sigil, and the civilian and impostor
cards read identically.** You are not told which side you are on; that
uncertainty is the whole game. Role-specific art appears only on the reveal and
recap screens, which are public anyway.

This is also why peeking is public: the table picks the name from a list, so
nobody can quietly check someone else's card and learn which side they're on.
Peek counts show on the board.

## Adding art

Two slots in `src/config.js`:

- `ROLE_ART` — complete generated cards, frame and title included, rendered
  full-bleed. Two are in. Missing roles fall back to the built-in line drawings,
  so you can add them one at a time.
- `SIGIL_ART` — bare **square panels**, no frame and no text, because the frame,
  numeral plate and word banner are drawn in HTML around them.

Prompts for both are in `art-prompts.md`.

## Offline

See `OFFLINE.md`. Two flags in `src/config.js` (`SELF_HOSTED_FONTS`,
`ENABLE_SW`) ship off so the app runs without extra files.

Download fonts with **latin + latin-ext**. Latin alone omits `ő` and `ű` and the
Hungarian deck renders broken.

## Not built yet

Discussion timer, Ghost Vote and Lovers variants, category tags on pairs,
sound cues, selective un-retire.
