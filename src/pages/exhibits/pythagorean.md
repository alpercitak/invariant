---

layout: ../../layouts/Exhibit.astro
title: Pythagorean dissection
description: Compare two arrangements of four right triangles to see why their leftover square areas match.
question: How can four triangles show that one square has the same area as two others combined?
guide: Move the slider and compare the open squares. Watch how the single square on the left changes area as the two squares on the right grow or shrink.
---

## What to look for

Both boards are 7 units wide. Each holds four copies of the same right triangle, shown in copper. The slider lengthens one leg and shortens the other by the same amount so the boards stay the same size. On the left the triangles leave one square open. On the right they leave two.

## The rule

Call the two sides that meet at the right angle **a** and **b**. Call the long side opposite that angle, the hypotenuse, **c**. All three lengths are measured in units.

On the left, four hypotenuses form the edges of the opening, all of length **c**. At each corner, the two neighboring triangle angles add to 90° along a straight edge of the board. This leaves 90° for the corner of the opening, so the opening is a square. On the right, the two squares have sides **a** and **b**.

The boards have equal area and the triangles cover the same area in each. Subtract that area from each board to see why the open areas must match. [Rearrangement proof from the University of British Columbia](https://personal.math.ubc.ca/~cass/euclid/java/html/pythagorasdissection.html)

<math display="block" aria-label="a squared plus b squared equals c squared">
  <msup><mi>a</mi><mn>2</mn></msup><mo>+</mo><msup><mi>b</mi><mn>2</mn></msup><mo>=</mo><msup><mi>c</mi><mn>2</mn></msup>
</math>

The equation measures area in square units. At the starting setting, the legs are 3 and 4 units, so the two squares cover 9 and 16 square units. The square on the hypotenuse covers 25, which gives a side length of 5 units.

## Where the idea appears

Use the same rule to find the diagonal of a rectangular room from its width and length. The two sides must meet at a right angle. The fixed board size here makes the two arrangements easy to compare. The same construction works with any two positive leg lengths by choosing a board whose side is their sum.

Explore another way to divide a shape in the [Sierpiński triangle](/exhibits/sierpinski/).
