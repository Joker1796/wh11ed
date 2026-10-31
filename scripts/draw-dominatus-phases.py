# The phase numeral a Dominatus card prints in its frame (`.wi-dom-phase-1..3`), drawn from
# measurements of the deck rather than traced: it is plain geometry, and a trace of a photo gave
# wavy edges and nicks where the print has straight lines (owner, 2026-10-31: "the same way as the
# others were extracted").
#
#   python3 scripts/draw-dominatus-phases.py src/assets/icons
#
# The numbers were measured on the three frames straightened side by side by
# straighten-dominatus-phases.py (ink runs across rows, columns and the diagonal); I, II and III
# agree to within a pixel, so they are one design. Units: the frame's outer side is 200.
import sys
OUT = sys.argv[1]
SIDE = 200      # the frame's outer square
FRAME = 18.5    # the frame's width
OUT_CUT = 32    # the outer corner cut off at the bottom right
IN_CUT_TL = 36  # the opening's corner cut off at the top left
IN_CUT_BR = 22  # …and at the bottom right
TOP, BOTTOM = 60.5, 139.5  # the numeral's height
SERIF = 11      # a serif bar's thickness
STEM, GAP = 16, 21         # a stem's width, the room between two stems
OVERHANG = 14.5            # how far a serif bar runs past the outer stems

def poly(points):
    return 'M' + 'L'.join(f'{x:g} {y:g}' for x, y in points) + 'Z'

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
# The app's icons: a square viewBox round the ink, the ink 21 of its 24 and centred.
box = SIDE * 24 / 21; m = (box - SIDE) / 2
for n in (1, 2, 3):
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{-m:.2f} {-m:.2f} {box:.2f} {box:.2f}" fill="currentColor" fill-rule="evenodd">\n'
           f'  <path d="{outer}{opening}{numeral(n)}"/>\n</svg>\n')
    open(f'{OUT}/dom-phase-{n}.svg', 'w').write(svg)
    print(f'dom-phase-{n}', len(svg), 'bytes')
