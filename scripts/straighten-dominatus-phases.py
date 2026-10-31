# The three phase frames Dominatus' Location cards print, straightened side by side for
# trace-dominatus-emblems.py (set `phases`). From the owner's photos of the deck (the hub's
# sources/dominatus/3/): the I and the II on cards shot sideways (turned upright first), the III upright.
#
#   python3 scripts/straighten-dominatus-phases.py ../sources/dominatus ../sources/dominatus/phase-marks.png
#
# The photos lean, and a rotation or a shear alone left the frames skewed: each frame's four outer
# edges are fitted by lines (rows and columns through its middle, clear of the cut corner), and the
# quadrilateral they meet in is pulled square by a perspective transform.
import sys, numpy as np
from PIL import Image, ImageOps
SRC, OUT = sys.argv[1], sys.argv[2]
# numeral → (photo, crop round the frame in its upright pixels, turn before straightening)
FRAMES = {
    'I': ('3/c0260a92-000d-4a9b-a692-5bf5ffb3d0f1.jpeg', (170, 215, 330, 365), 90),
    'II': ('3/97d5eb93-885c-4cd8-ac2d-929c927c5760.jpeg', (145, 185, 305, 335), 90),
    'III': ('3/6791aa5f-73f9-4f63-a45b-50f849bc38fc.jpeg', (225, 1175, 385, 1340), 0),
}
N, M = 200, 20  # each tile: the frame's outer square N px, a margin M round it

def fit(points):  # a line through (t, u) as u = a*t + b
    p = np.array(points, float); return np.polyfit(p[:, 0], p[:, 1], 1)

def meet(v, h):  # v: x = a*y + b, h: y = c*x + d
    a, b = v; c, d = h; y = (c * b + d) / (1 - c * a); return (a * y + b, y)

out = Image.new('L', (3 * (N + 2 * M), N + 2 * M), 235)
for i, (photo, box, turn) in enumerate(FRAMES.values()):
    im = ImageOps.exif_transpose(Image.open(f'{SRC}/{photo}')).convert('L').crop(box)
    if turn: im = im.rotate(turn, expand=True, resample=Image.BICUBIC)
    ink = np.asarray(im) < 110
    ys, xs = np.nonzero(ink); x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()
    rows = range(int(y0 + (y1 - y0) * .25), int(y0 + (y1 - y0) * .6))
    cols = range(int(x0 + (x1 - x0) * .25), int(x0 + (x1 - x0) * .6))
    left = fit([(y, np.nonzero(ink[y])[0].min()) for y in rows]); right = fit([(y, np.nonzero(ink[y])[0].max()) for y in rows])
    top = fit([(x, np.nonzero(ink[:, x])[0].min()) for x in cols]); bottom = fit([(x, np.nonzero(ink[:, x])[0].max()) for x in cols])
    corners = [meet(left, top), meet(right, top), meet(right, bottom), meet(left, bottom)]
    square = [(M, M), (M + N, M), (M + N, M + N), (M, M + N)]
    # PIL's perspective coefficients map the output back to the input
    A, b = [], []
    for (x, y), (u, v) in zip(square, corners):
        A += [[x, y, 1, 0, 0, 0, -u * x, -u * y], [0, 0, 0, x, y, 1, -v * x, -v * y]]; b += [u, v]
    c = np.linalg.solve(np.array(A), np.array(b))
    out.paste(im.transform((N + 2 * M, N + 2 * M), Image.PERSPECTIVE, tuple(c), resample=Image.BICUBIC, fillcolor=235), (i * (N + 2 * M), 0))
out.save(OUT)
