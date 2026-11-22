---
layout: ../../layouts/Exhibit.astro
title: Bézier curves
description: Move four control points and see how repeated linear interpolation draws a cubic Bézier curve.
question: How can straight-line steps draw a smooth curve?
guide: Move the slider and follow the teal points, then the violet pair, then the gold point. Drag a handle or tab to it and use the arrow keys.
---

## What to look for

Set **t** to 0.40. Each teal point sits 40% of the way along one segment between the four handles. Repeat that step on the two segments between the teal points to get the violet pair. One last step between the violet points gives the gold point on the curve.

Move the slider from 0 to 1 to trace the full curve. Then move one of the two interior handles and watch the gold curve change shape while its endpoints stay put.

## The rule

To find a point a fraction **t** of the way from **A** to **B**, take a weighted average of their coordinates.

<math display="block" aria-label="The interpolated point equals one minus t times A plus t times B">
  <mo>(</mo><mn>1</mn><mo>−</mo><mi>t</mi><mo>)</mo><mi>A</mi><mo>+</mo><mi>t</mi><mi>B</mi>
</math>

**A** and **B** are points with an **x** and a **y** coordinate. **t** is a number from 0 to 1, without units. Apply the same formula to both coordinates at every step. Repeating it with the same **t** until one point remains is called **de Casteljau’s algorithm**. The first and last handles give the start and finish of the curve.

## Reading the diagram

The gold dot uses drawing coordinates, with **x** increasing rightward and **y** downward. The slider controls how far each interpolation goes along its own straight segment. Equal changes in **t** can cover different distances along the curved path.

## Where the idea appears

Designers use Bézier curves to draw editable outlines in fonts and vector graphics. Each control point helps steer the outline. The gold curve here uses the same cubic path command that SVG uses to draw these outlines in browsers.

Explore a different way to reconstruct a curve in [Fourier drawing](/exhibits/fourier/).

## Further reading

- [Algorithms for Bézier curves in MIT’s Shape Interrogation for Computer Aided Design and Manufacturing](https://web.mit.edu/hyperbook/Patrikalakis-Maekawa-Cho/node13.html).
