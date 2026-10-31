# The three Dominatus Alliance emblems (Liberators, Oppressors, Raiders), traced off the owner's
# photo of the booklet's Alliances page into one-colour SVGs for `.wi-dom-<alliance>`.
#
# The only drawings in src/assets/icons that are not ours: the owner asked for the emblems exactly
# as the booklet prints them (2026-10-31), so they are traced, not redrawn. Run it again only to
# re-trace from a better photo:
#
#   python3 -m venv /tmp/trace && /tmp/trace/bin/pip install potracer numpy pillow
#   /tmp/trace/bin/python scripts/trace-dominatus-emblems.py ../sources/dominatus/alliances.png src/assets/icons
#
# What it does: crops each emblem (BOXES, pixels of that photo), scales it ×6 and blurs a little
# so the threshold gives smooth edges, keeps ink midway between the photo's ink and paper, drops
# whatever touches the crop's edge (the text boxes' frame lines) and specks, fills grain holes,
# then traces with potrace. Written as relative whole numbers on a 240 grid with the ink 210 of
# 240 and centred (the app's 21 of 24): under Vite's 4 KB inline limit.
import sys, numpy as np, potrace
from collections import deque
from PIL import Image, ImageFilter
SRC, OUT = sys.argv[1], sys.argv[2]
BOXES = {'liberators': (330, 70, 500, 215), 'oppressors': (330, 260, 500, 410), 'raiders': (330, 455, 500, 600)}
K = 6  # upscale before thresholding: smoother edges for the tracer

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

for name, box in BOXES.items():
    im = Image.open(SRC).convert('L').crop(box)
    im = im.resize((im.width * K, im.height * K), Image.LANCZOS).filter(ImageFilter.GaussianBlur(K * 0.6))
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
    # paper: fill holes too small to be drawn (grain inside the ink)
    for c in components(~keep):
        ys, xs = c[:, 0], c[:, 1]
        if ys.min() == 0 or xs.min() == 0 or ys.max() == h - 1 or xs.max() == w - 1: continue
        if len(c) < (K * K) * 20: keep[ys, xs] = True
    ys, xs = np.nonzero(keep)
    x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()
    path = potrace.Bitmap(~keep).trace(turdsize=K * K * 6, alphamax=1.0, opticurve=True, opttolerance=0.5)
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
