# Odd Word — art prompt pack

There are **two different jobs** here, and they need different prompts. The first
batch you generated produced complete cards — frame, numeral plate, title banner —
which is exactly right for role cards and exactly wrong for round sigils.

| | Family A · role cards | Family B · round sigils |
|---|---|---|
| Where it shows | Reveal and recap screens | The card every player holds |
| Count | 5 | 12–16 |
| Output | Complete card, frame and title included | Square panel only |
| Text in image | Yes — the role's name | **None** |
| Aspect | 2:3 portrait | 1:1 square |

Family B has no text because the word changes every round and the app draws that
banner in HTML. It also has no frame, because the frame is code.

---

## Family A — role cards (complete)

The two you've made match this already. Keep the same prompt shape for the
remaining three so the set holds together.

```
Vintage tarot card, complete with cream border, thin black keyline, a small
title plate at the top containing a Roman numeral, and a bottom banner reading
"{TITLE}" in bold condensed serif capitals flanked by small ornaments.
Illustration: {SUBJECT}.
Monochrome {COLOUR} palette, heavy black ink outlines, dense stipple shading,
1900s woodcut and lithograph style, flat colour, symmetrical composition,
aged print.
```

Done:

| Role | `{TITLE}` | `{SUBJECT}` | `{COLOUR}` |
|---|---|---|---|
| Impostor | THE STRANGER | a hooded figure holding a blank mask before its face, standing on a dais above a crowd | brick red |
| Civilian | THE CHORUS (CIVILIAN) | three identical robed figures standing shoulder to shoulder, hands clasped, faces alike | sage green |

Still to make:

| Role | `{TITLE}` | `{SUBJECT}` | `{COLOUR}` |
|---|---|---|---|
| Mr White | THE BLANK (MR WHITE) | a plain empty card standing upright on a bare stone plinth, no markings on it, an empty crowd square behind | bone and grey |
| Jester | THE FOOL (JESTER) | a jester in belled cap dancing alone on a dais while a crowd turns away | marigold yellow |
| Accomplice | THE SHADOW (ACCOMPLICE) | two robed figures standing apart on a dais but casting one single shared shadow across the stones | oxblood purple-red |

Keep the dais, the crowd and the scattered objects on the flagstones across all
five — that repetition is what makes them read as one deck rather than five
pictures. Save as `role-mrwhite.webp`, `role-jester.webp`,
`role-accomplice.webp` and add them to `ROLE_ART` in `src/App.jsx`.

---

## Family B — round sigils (panel only)

```
{SUBJECT}, vintage tarot illustration, 1900s woodcut and lithograph style,
heavy uniform black ink outlines, dense stipple shading, flat limited palette
of marigold yellow, burnt orange, vermilion red and sage green, solid deep
teal background, symmetrical centred composition, subject filling most of the
frame, aged print, no border, no frame, no card edge, no text, no lettering,
no title, square format
```

Negative: `text, letters, words, numbers, title, banner, border, frame, card
edge, watermark, signature, white background, gradient, 3d render, photorealistic`

If your tool keeps adding a frame anyway, generate at 2:3 with the frame and
crop the panel out — faster than fighting the model.

### Subjects

> **Collision rule:** a sigil must not appear anywhere in the word deck. Everyone
> sees the same sigil, so a candle on the Candle / Lamp round hands the game away
> to the whole table. This is why there is no sun, key, candle, bee, mountain,
> boat, clock, book or mirror below — every one of those is half of a pair.

| # | `{SUBJECT}` |
|---|---|
| 01 | A crescent moon with a serene face in profile, ringed by small stars |
| 02 | A single open eye inside a radiant triangle |
| 03 | A stone tower struck by a bolt of lightning |
| 04 | An ouroboros, a serpent coiled devouring its own tail |
| 05 | An eight-pointed star with long tapering rays |
| 06 | An hourglass with outspread feathered wings |
| 07 | A pair of balanced scales on a stone pedestal |
| 08 | A spoked wheel of fortune with trailing ribbons |
| 09 | A hand emerging from a cloud holding a burning torch |
| 10 | A circular labyrinth seen from above |
| 11 | A crown above two crossed sceptres |
| 12 | A phoenix rising from a bed of flames |
| 13 | A comet trailing sparks across a field of stars |
| 14 | An arched stone gateway with a drawn curtain |
| 15 | A three-tiered stone fountain with falling water |
| 16 | An endless interlaced knot of rope |

---

## Holding the style across a batch

Lock the style before generating the set, or you get a pile of unrelated
pictures instead of a deck:

1. Generate one subject three or four times on the full prompt.
2. Pick the strongest and keep it as your reference image — Midjourney `--sref`,
   Gemini's "use this style", or a reused seed in Flux.
3. Never edit the style block mid-run. Reordering words is enough to drift it.

Generate three or four per subject and cull hard. Expect to keep about a third.

---

## Processing

The uploads came in at 1628×2624 with a checkerboard strip along the bottom.
This crops it, resizes and converts:

```python
from PIL import Image
im = Image.open("in.jpeg").convert("RGB").crop((0, 17, 1628, 2594))
im = im.resize((560, round(im.height * 560 / im.width)), Image.LANCZOS)
im.save("out.webp", "WEBP", quality=82, method=6)
```

That lands around 100KB per card — fine for Pages. Sigil panels at 1:1 should go
in at 512px and will come out nearer 40KB. The full set will total roughly 1MB,
worth precaching in a service worker so the game survives bad wifi at a party.
