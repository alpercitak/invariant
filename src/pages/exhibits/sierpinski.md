---

layout: ../../layouts/Exhibit.astro
title: Sierpiński triangle
description: Cut out the middle of a triangle again and again and see how much area remains.
question: How can a triangle keep its outline as its area shrinks to zero?
guide: Start at step 0 and advance one step at a time. At step 1, the large middle triangle disappears. At step 2, the same cut appears inside each of the three corners.
---

## What to look for

The pale pieces show what remains of the original triangle. Each step joins the midpoints of the sides of every piece, then removes the middle triangle. The three corner pieces stay. The same pattern of holes appears at smaller scales as you keep going.

## The rule

The midpoint lines divide each piece into four triangles of equal area. Keeping three of them leaves three quarters of the area from the previous step.

<math display="block" aria-label="The fraction of the original area at step n equals three quarters raised to the power n">
  <mi>A</mi><mo>(</mo><mi>n</mi><mo>)</mo><mo>=</mo>
  <msup>
    <mrow><mo>(</mo><mfrac><mn>3</mn><mn>4</mn></mfrac><mo>)</mo></mrow>
    <mi>n</mi>
  </msup>
</math>

Here **n** is the number of subdivisions, with **n = 0** for the whole triangle. **A(n)** is the fraction of the original area still filled. Continuing forever drives that fraction to zero, while every point along the three outer edges survives. [Sierpiński construction notes from UC Irvine](https://www.math.uci.edu/~vmm/docs/Sierpinski_Curve.pdf)

## What the picture shows

The exhibit stops after six steps so you can still see the smallest pieces. The readout rounds the percentage to one decimal place. The formula applies at every finite step, and the Sierpiński triangle is the set of points that survive all steps.

## Where the idea appears

Engineers have used this arrangement to make multiband antennas. The nested triangular shapes let a single antenna operate in several frequency bands. [NASA Tech Briefs on fractal antennas](https://ntrs.nasa.gov/api/citations/20110015037/downloads/20110015037.pdf)

Explore another shape with fine detail at smaller scales in the [Mandelbrot set](/exhibits/mandelbrot/).
