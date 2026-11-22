---
layout: ../../layouts/Exhibit.astro
title: Mandelbrot set
description: Zoom into the Mandelbrot set and see how a repeated calculation draws a fractal boundary.
question: How much detail can one repeated rule produce?
guide: Open Seahorse Valley and move Step limit to both ends. Watch for dark patches that gain color when you give their points more steps.
---

## What to look for

Start with the whole shape, then open **Miniature**. Look for a small body with lobes that resemble the full set.

In **Seahorse Valley**, set the step limit to 24. The marked center stays dark because we stop before it escapes. Raise the limit and the center gains color. Its orbit first crosses the escape boundary at step 33.

## The rule

Each pixel stands for a complex number **c**. The horizontal coordinate is its real part, and the vertical coordinate is its imaginary part. A complex number has the form **a + bi**, where **i² = −1**.

Start the orbit at **z₀ = 0**. Square the latest value, add the pixel’s **c**, and repeat.

<math display="block" aria-label="z at step n plus one equals z at step n squared plus c">
  <msub><mi>z</mi><mrow><mi>n</mi><mo>+</mo><mn>1</mn></mrow></msub>
  <mo>=</mo><msubsup><mi>z</mi><mi>n</mi><mn>2</mn></msubsup><mo>+</mo><mi>c</mi>
</math>

The Mandelbrot set contains the values of **c** whose orbit stays bounded forever. For these orbits starting at zero, once **z** moves farther than 2 from the origin, it will continue outward without bound. The color bands group points by how many steps it takes to pass 2.

## What the image samples

Dark pixels have stayed within radius 2 for the steps we tried. Some of those points can escape if you give them more steps. The image also samples the plane at a finite resolution, so a close-up can reveal structures smaller than a pixel in the overview.

## Where the idea appears

The picture is a map of what happens as you change a parameter. Engineers use parameter sweeps to find ranges where a system settles, oscillates, or becomes unstable. The [logistic map](/exhibits/logistic/) makes a similar map for one real-valued growth factor.

## Further reading

- [Evan Dummit’s notes on the Mandelbrot set and escape-time coloring](https://dummit.cos.northeastern.edu/teaching_sp25_3543/dynamics_5_introduction_to_complex_dynamics_v2.50.pdf#page=23).
