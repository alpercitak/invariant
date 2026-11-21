---
layout: ../../layouts/Exhibit.astro
title: Voronoi diagrams
description: Move warehouses and watch their nearest-neighbor regions change.
question: How can distance divide a map?
guide: Move a numbered warehouse and watch its patch grow or shrink. You can drag a point or focus it and use the arrow keys. Hold Shift for larger steps.
---

Imagine choosing which warehouse delivers to each address in a town. If every truck travels in a straight line across a flat map, each address belongs to the warehouse closest to it. The map above draws that rule: move a numbered warehouse and watch its patch expand or shrink.

The shared boundary between two patches consists of places equally far from those two warehouses. On each side, the corresponding warehouse is closer. Where several boundaries meet, three or more warehouses are tied.

## The rule behind the map

For a location **p** and warehouse **s**, the distance is

<math display="block" aria-label="The distance between p and s is the square root of the sum of the squared differences in x and y">
  <mi>d</mi><mo>(</mo><mi>p</mi><mo>,</mo><mi>s</mi><mo>)</mo><mo>=</mo>
  <msqrt><mrow>
    <msup><mrow><mo>(</mo><msub><mi>p</mi><mi>x</mi></msub><mo>−</mo><msub><mi>s</mi><mi>x</mi></msub><mo>)</mo></mrow><mn>2</mn></msup>
    <mo>+</mo>
    <msup><mrow><mo>(</mo><msub><mi>p</mi><mi>y</mi></msub><mo>−</mo><msub><mi>s</mi><mi>y</mi></msub><mo>)</mo></mrow><mn>2</mn></msup>
  </mrow></msqrt>
</math>

The patch for a warehouse contains all locations whose distance to it is no greater than the distance to any other warehouse. The square root can be dropped when comparing distances, because squaring keeps their order. The exhibit clips these regions to the rectangular map, so a warehouse's mathematical region can continue beyond the visible edge.

Try moving two warehouses close together. Their shared boundary lies on the perpendicular bisector between them. Move a third near that boundary and it can cut into a patch. When two warehouses occupy exactly the same position, they share a region and the display assigns its color to the lower number.

## What this model leaves out

This is an **unweighted Euclidean** map. It measures straight-line distance and treats every warehouse alike. Real delivery areas depend on roads, travel time, capacity, rivers, and demand. A road-aware map could measure distances along the road network. A weighted map could give a larger warehouse greater influence.

The polygons are calculated by repeatedly clipping a rectangle to the side of each bisector that is closer to the warehouse being considered. The straight boundaries are exact up to floating-point rounding.

### Further reading

- [Voronoi diagram (Encyclopedia of Mathematics)](https://encyclopediaofmath.org/wiki/Voronoi_diagram)
- [CGAL: 2D Voronoi diagram adaptor](https://doc.cgal.org/latest/Voronoi_diagram_2/index.html)
