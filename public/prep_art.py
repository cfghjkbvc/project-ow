#!/usr/bin/env python3
"""
Odd Word — batch art prep.

    pip install pillow
    python prep_art.py <input_dir> [output_dir]

Does four things per image:

  1. Trims the transparency checkerboard and white margin that image
     generators leave around the card. Detected, not hardcoded, so it
     survives whatever size the exports come out at.
  2. Sorts by shape: roughly square goes out at 512 (sigil panels),
     anything portrait goes out at 560 wide (full role cards).
  3. Converts to WebP at quality 82.
  4. Pads single-digit numbers, so sigil-2 doesn't sort after sigil-10.

Output goes to <input_dir>/webp unless you name one.
"""

import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    sys.exit("Pillow is missing. Run:  pip install pillow")

SIGIL_PX = 512   # square panels sit small inside the card
CARD_PX = 560    # full role cards render about 190pt wide, so 560 covers 3x
QUALITY = 82
SUFFIXES = {".png", ".jpg", ".jpeg", ".webp", ".bmp", ".tif", ".tiff"}


def content_box(im):
    """Bounding box of real artwork.

    The checkerboard and any white margin are neutral and light. Actual
    artwork is either coloured or dark, so a pixel counts as content when
    it is saturated or dark. Falls back to the full frame if that finds
    nothing, which happens on genuinely greyscale art.
    """
    small = im.convert("RGB")
    scale = max(1, small.width // 600)
    if scale > 1:
        small = small.resize((small.width // scale, small.height // scale), Image.BILINEAR)

    px = small.load()
    w, h = small.size
    rows, cols = [], []
    for y in range(h):
        for x in range(w):
            r, g, b = px[x, y]
            if (max(r, g, b) - min(r, g, b)) > 25 or max(r, g, b) < 120:
                rows.append(y)
                cols.append(x)
                break
    if not rows:
        return None

    col_hit = set()
    for x in range(w):
        for y in range(h):
            r, g, b = px[x, y]
            if (max(r, g, b) - min(r, g, b)) > 25 or max(r, g, b) < 120:
                col_hit.add(x)
                break

    pad = 1
    top = max(0, min(rows) - pad) * scale
    bottom = min(h, max(rows) + 1 + pad) * scale
    left = max(0, min(col_hit) - pad) * scale
    right = min(w, max(col_hit) + 1 + pad) * scale
    return (left, top, min(right, im.width), min(bottom, im.height))


def padded(name):
    """sigil-2 -> sigil-02, leaving anything already padded alone."""
    parts = name.rsplit("-", 1)
    if len(parts) == 2 and parts[1].isdigit() and len(parts[1]) == 1:
        return f"{parts[0]}-0{parts[1]}"
    return name


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)

    src = Path(sys.argv[1]).expanduser()
    if not src.is_dir():
        sys.exit(f"Not a directory: {src}")
    out = Path(sys.argv[2]).expanduser() if len(sys.argv) > 2 else src / "webp"
    out.mkdir(parents=True, exist_ok=True)

    files = sorted(f for f in src.iterdir() if f.suffix.lower() in SUFFIXES and f.is_file())
    if not files:
        sys.exit(f"No images found in {src}")

    for f in files:
        try:
            im = Image.open(f).convert("RGB")
        except Exception as e:
            print(f"skip  {f.name}  ({e})")
            continue

        before = im.size
        box = content_box(im)
        if box and (box[2] - box[0]) > 50 and (box[3] - box[1]) > 50:
            im = im.crop(box)

        ratio = im.width / im.height
        square = 0.9 < ratio < 1.11
        target = SIGIL_PX if square else CARD_PX
        im = im.resize((target, round(im.height * target / im.width)), Image.LANCZOS)

        dest = out / (padded(f.stem) + ".webp")
        im.save(dest, "WEBP", quality=QUALITY, method=6)

        kb = dest.stat().st_size / 1024
        kind = "sigil" if square else "card "
        print(f"{kind} {f.name}  {before[0]}x{before[1]} -> {im.width}x{im.height}  {kb:.0f}KB  {dest.name}")

    print(f"\n{len(files)} images -> {out}")


if __name__ == "__main__":
    main()
