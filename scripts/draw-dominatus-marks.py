# Dominatus marks that are plain geometry, drawn from measurements of the deck rather than traced:
# a trace of a photo gave wavy edges and nicks where the print has straight lines, and skewed the
# proportions where the photo leaned (owner, 2026-10-31: "the same way as the others were extracted").
#   - the phase numeral in the card's frame (`.wi-dom-phase-1..3`);
#   - the Briefing deck's mark (`.wi-dom-briefing`), as the Briefing cards print it.
#
#   python3 scripts/draw-dominatus-marks.py src/assets/icons
#
# The phase frames were measured on the three straightened side by side by
# straighten-dominatus-phases.py (ink runs across rows, columns and the diagonal); I, II and III
# agree to within a pixel, so they are one design. The Briefing mark was measured the same way on
# the nine Briefing cards of the hub's sources/dominatus/1/ (63475b31…), each straightened by its
# frame; three clear ones agree to 1–2 units in 100. Units: the frame's outer side is 200.
import sys
OUT = sys.argv[1]
SIDE = 200      # the frame's outer square

def poly(points):
    return 'M' + 'L'.join(f'{x:g} {y:g}' for x, y in points) + 'Z'

# The app's icons: a square viewBox round the ink, the ink 21 of its 24 and centred.
box = SIDE * 24 / 21; m = (box - SIDE) / 2
HEAD = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{-m:.2f} {-m:.2f} {box:.2f} {box:.2f}" fill="currentColor" fill-rule="evenodd">\n'

def write(name, body):
    svg = HEAD + body + '</svg>\n'
    open(f'{OUT}/dom-{name}.svg', 'w').write(svg)
    print(f'dom-{name}', len(svg), 'bytes')

# ── The phase numeral ──
FRAME = 18.5    # the frame's width
OUT_CUT = 32    # the outer corner cut off at the bottom right
IN_CUT_TL = 36  # the opening's corner cut off at the top left
IN_CUT_BR = 22  # …and at the bottom right
TOP, BOTTOM = 60.5, 139.5  # the numeral's height
SERIF = 11      # a serif bar's thickness
STEM, GAP = 16, 21         # a stem's width, the room between two stems
OVERHANG = 14.5            # how far a serif bar runs past the outer stems

def numeral(n):
    width = n * STEM + (n - 1) * GAP + 2 * OVERHANG
    l, r = SIDE / 2 - width / 2, SIDE / 2 + width / 2
    t, b = TOP, BOTTOM
    outline = poly([(l, t), (r, t), (r, t + SERIF), (r - OVERHANG, t + SERIF), (r - OVERHANG, b - SERIF), (r, b - SERIF),
                    (r, b), (l, b), (l, b - SERIF), (l + OVERHANG, b - SERIF), (l + OVERHANG, t + SERIF), (l, t + SERIF)])
    gaps = ''
    for k in range(1, n):
        x = l + OVERHANG + k * STEM + (k - 1) * GAP
        gaps += poly([(x, t + SERIF), (x + GAP, t + SERIF), (x + GAP, b - SERIF), (x, b - SERIF)])
    return outline + gaps

outer = poly([(0, 0), (SIDE, 0), (SIDE, SIDE - OUT_CUT), (SIDE - OUT_CUT, SIDE), (0, SIDE)])
a, z = FRAME, SIDE - FRAME
opening = poly([(a + IN_CUT_TL, a), (z, a), (z, z - IN_CUT_BR), (z - IN_CUT_BR, z), (a, z), (a, a + IN_CUT_TL)])
for n in (1, 2, 3):
    write(f'phase-{n}', f'  <path d="{outer}{opening}{numeral(n)}"/>\n')

# ── The Briefing mark: a thin frame cut at the bottom right, and in it a diamond whose line forks
# to two rings (measured in units of 100, doubled here) ──
B_FRAME = 18    # 9 in 100
B_CUT = 28      # the outer cut, 14 in 100; the opening's cut keeps the frame's width along it
STROKE = 9.4    # the glyph's line, 4.7 in 100
AXIS = 101      # the glyph's middle line, 50.5 in 100
b_outer = poly([(0, 0), (SIDE, 0), (SIDE, SIDE - B_CUT), (SIDE - B_CUT, SIDE), (0, SIDE)])
f, g = B_FRAME, SIDE - B_FRAME
in_cut = B_CUT - B_FRAME * (2 - 2 ** 0.5)  # the opening's cut, a frame's width in from the outer one
b_opening = poly([(f, f), (g, f), (g, g - in_cut), (g - in_cut, g), (f, g)])
dx, dr = 50, 19                        # the diamond: centre x 25, half-diagonal 9.5
diamond = poly([(dx - dr, AXIS), (dx, AXIS - dr), (dx + dr, AXIS), (dx, AXIS + dr)])
jx = 94                                # the fork, x 47
ex, rx, rr = 118, 154.4, 18            # the elbow x 59; the rings' centre x 77.2, radius 9
ry = (58, 144)                         # the rings' centres y, 29 and 72
fork = (f'M{dx + dr:g} {AXIS}H{jx}'
        + ''.join(f'M{jx} {AXIS}L{ex} {y}H{rx - rr:g}' for y in ry))
rings = ''.join(f'<circle cx="{rx:g}" cy="{y}" r="{rr}"/>' for y in ry)
write('briefing',
      f'  <path d="{b_outer}{b_opening}"/>\n'
      f'  <g fill="none" stroke="currentColor" stroke-width="{STROKE}" stroke-linejoin="round" stroke-linecap="round">'
      f'<path d="{diamond}"/><path d="{fork}"/>{rings}</g>\n')
