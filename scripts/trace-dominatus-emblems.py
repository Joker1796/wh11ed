# The Dominatus marks, traced off the owner's photos of the booklet into one-colour SVGs for
# `.wi-dom-<name>`: the three Alliance emblems (the Alliances page) and the five deck marks (the
# booklet's list of what the pack contains), and the Relic deck's shield, off a Relic card (the
# booklet's list shows no such mark).
#
# The only drawings in src/assets/icons that are not ours: the owner asked for them exactly as the
# booklet prints them (2026-10-31), so they are traced, not redrawn. Run it again only to re-trace
# from a better photo (the photos are in the hub's sources/dominatus/):
#
#   python3 -m venv /tmp/trace && /tmp/trace/bin/pip install potracer numpy pillow
#   /tmp/trace/bin/python scripts/trace-dominatus-emblems.py alliances ../sources/dominatus/alliances.png src/assets/icons
#   /tmp/trace/bin/python scripts/trace-dominatus-emblems.py decks ../sources/dominatus/deck-icons.png src/assets/icons
#   /tmp/trace/bin/python scripts/trace-dominatus-emblems.py relic ../sources/dominatus/5/66905a52-4ba9-4956-ac43-7473289c2c3c.jpeg src/assets/icons
#
# What it does: crops each emblem (BOXES, pixels of that photo), scales it ×6 and blurs a little
# so the threshold gives smooth edges, keeps ink midway between the photo's ink and paper, drops
# whatever touches the crop's edge (the text boxes' frame lines) and specks, fills grain holes,
# then traces with potrace. Written as relative whole numbers on a 240 grid with the ink 210 of
# 240 and centred (the app's 21 of 24): under Vite's 4 KB inline limit.
import sys, numpy as np, potrace
from collections import deque
from PIL import Image, ImageFilter
SET, SRC, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
# name → (left, top, right, bottom) in pixels of that set's photo; a crop may take in a frame line
# or the start of a caption, as long as they reach its edge (they are dropped).
SETS = {
    'alliances': {'liberators': (330, 70, 500, 215), 'oppressors': (330, 260, 500, 410), 'raiders': (330, 455, 500, 600)},
    # The Upgrade deck's gear is the mark the Battle Skill cards print: `dom-skill`. Boxes are in
    # the photo straightened by SHEAR below.
    'decks': {'agenda': (60, 20, 135, 93), 'achieved': (60, 106, 135, 167),
              'location': (60, 257, 130, 325), 'skill': (52, 346, 128, 421)},
    # The Briefing mark is no longer traced from `decks`: the booklet photo leaned and skewed it, so
    # it is drawn from the cards' measurements (draw-dominatus-marks.py).
    # Fate-Forged Weapon's corner, the clearest of the twelve Relic cards on the owner's photos.
    'relic': {'relic': (458, 1673, 608, 1823)},
}
BOXES = SETS[SET]
# The decks photo was taken at an angle: a frame's left side leans 0.083 px right per px down and
# its top rises 0.022 px per px right (measured on the Agenda and Briefing frames). Undone as a
# shear about (cx, cy) before anything is cut out, so the frames trace square.
SHEAR = {'decks': (0.083, -0.022, 90, 220)}
K = 6  # upscale before thresholding: smoother edges for the tracer
# How much to soften before thresholding, in photo pixels: the Relic card is a worn print shot from
# further off, and at the booklet's 0.6 its edges came out wavy with the grain.
BLUR = {'relic': 1.1}
# potrace rounds a corner below this: the Relic's cross keeps its square ends.
ALPHAMAX = {'relic': 0.75}

def components(mask):
    h, w = mask.shape; lab = np.zeros((h, w), np.int32); comps = []; n = 0
    for y in range(h):
        for x in range(w):
            if mask[y, x] and not lab[y, x]:
                n += 1; q = deque([(y, x)]); lab[y, x] = n; pts = []
                while q:
                    cy, cx = q.popleft(); pts.append((cy, cx))
                    for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                        ny, nx = cy + dy, cx + dx
                        if 0 <= ny < h and 0 <= nx < w and mask[ny, nx] and not lab[ny, nx]:
                            lab[ny, nx] = n; q.append((ny, nx))
                comps.append(np.array(pts))
    return comps

photo = Image.open(SRC).convert('L')
if SET in SHEAR:
    a, b, cx0, cy0 = SHEAR[SET]
    photo = photo.transform(photo.size, Image.AFFINE, (1, a, -a * cy0, b, 1, -b * cx0), resample=Image.BICUBIC, fillcolor=255)
for name, box in BOXES.items():
    im = photo.crop(box)
    im = im.resize((im.width * K, im.height * K), Image.LANCZOS).filter(ImageFilter.GaussianBlur(K * BLUR.get(SET, 0.6)))
    a = np.asarray(im, dtype=np.float32)
    ink = a < (np.percentile(a, 5) + np.percentile(a, 95)) / 2   # midway between ink and paper
    h, w = ink.shape
    # ink: drop what touches the crop's edge (the text box's frame lines) and specks
    keep = np.zeros_like(ink)
    for c in components(ink):
        ys, xs = c[:, 0], c[:, 1]
        if ys.min() == 0 or xs.min() == 0 or ys.max() == h - 1 or xs.max() == w - 1: continue
        if len(c) < (K * K) * 12: continue
        keep[ys, xs] = True
    # and whatever lies outside the mark itself (its largest piece): a card's edge, worn print
    pieces = [c for c in components(keep)]
    if pieces:
        big = max(pieces, key=len); by0, by1, bx0, bx1 = big[:, 0].min(), big[:, 0].max(), big[:, 1].min(), big[:, 1].max()
        for c in pieces:
            cy, cx = c[:, 0].mean(), c[:, 1].mean()
            if not (by0 <= cy <= by1 and bx0 <= cx <= bx1): keep[c[:, 0], c[:, 1]] = False
    # paper: fill holes too small to be drawn (grain inside the ink)
    for c in components(~keep):
        ys, xs = c[:, 0], c[:, 1]
        if ys.min() == 0 or xs.min() == 0 or ys.max() == h - 1 or xs.max() == w - 1: continue
        if len(c) < (K * K) * 20: keep[ys, xs] = True
    ys, xs = np.nonzero(keep)
    x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()
    path = potrace.Bitmap(~keep).trace(turdsize=K * K * 6, alphamax=ALPHAMAX.get(SET, 1.0), opticurve=True, opttolerance=0.5)
    # into a 240 grid (whole numbers: the 24 grid at one decimal, written shorter): a square round the ink, the ink 21 of 24 and centred
    side = max(x1 - x0, y1 - y0) * 24 / 21; cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
    s = 240 / side; f = lambda p: f'{round((p.x - cx) * s + 120)} {round((p.y - cy) * s + 120)}'
    # Relative commands on whole numbers: the shortest the same outline writes.
    P = lambda p: (round((p.x - cx) * s + 120), round((p.y - cy) * s + 120))
    def nums(vals):
        out = ''
        for v in vals: out += (str(v) if v < 0 or not out else ' ' + str(v))
        return out
    d = []
    for curve in path:
        cur = P(curve.start_point); d.append('M' + nums(cur))
        for seg in curve.segments:
            if seg.is_corner:
                c, e = P(seg.c), P(seg.end_point)
                d.append('l' + nums([c[0] - cur[0], c[1] - cur[1], e[0] - c[0], e[1] - c[1]])); cur = e
            else:
                a1, a2, e = P(seg.c1), P(seg.c2), P(seg.end_point)
                d.append('c' + nums([a1[0] - cur[0], a1[1] - cur[1], a2[0] - cur[0], a2[1] - cur[1], e[0] - cur[0], e[1] - cur[1]])); cur = e
        d.append('z')
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" fill="currentColor">\n  <path d="{"".join(d)}"/>\n</svg>\n'
    open(f'{OUT}/dom-{name}.svg', 'w').write(svg)
    print(name, len(path.curves), 'curves', len(svg), 'bytes')
