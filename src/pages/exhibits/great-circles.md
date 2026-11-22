---

layout: ../../layouts/Exhibit.astro
title: Great circles
description: Compare the shortest route on a sphere with a route that stays at the same latitude.
question: Why can the shortest route on a globe look curved on a flat map?
guide: Move the endpoints to 0° latitude to make the routes overlap. Then move them north and watch the solid route bend away from the dashed one on the map.
---

## What to look for

The two dots are the same endpoints in each view. The slider moves them north and south together while keeping their longitudes 120° apart. The dashed route follows their line of latitude. The solid route takes the shortest path along the sphere. At the equator both routes coincide. Farther north the solid route bends toward the pole on the flat map and covers a shorter distance.

## The rule

Slice a sphere through its center and the edge of the slice is a **great circle**. The only line of latitude that makes such a slice is the equator. For the two endpoints here, imagine a plane through both dots and the center of the sphere. The shorter arc of the circle this plane cuts out gives the shortest route. [University of Illinois notes on shortest flight paths](https://dynref.engr.illinois.edu/aos.html)

<math display="block" aria-label="The great-circle distance equals the radius times the central angle in radians">
  <mi>d</mi><mo>=</mo><mi>R</mi><mi>θ</mi>
</math>

**d** is the distance in kilometers, **R** is the sphere’s radius in kilometers, and **θ** is the angle in radians between the two lines from the center to the endpoints. A straight line drawn between the dots on the flat map keeps the same latitude. The map spaces degrees of latitude and longitude evenly, even though lines of longitude get closer together on the globe near the poles. [USGS guide to map projections](https://www.usgs.gov/faqs/how-are-different-map-projections-used)

## What the model assumes

The model treats Earth as a sphere with a radius of 6,371 km. It calculates the lengths along the sphere and rounds the readings to the nearest kilometer. The drawn curves join closely spaced points on those routes. Earth is slightly flattened at the poles, so an ellipsoid gives a more precise distance.

## Where the idea appears

A route between two northern airports can arc farther north on a flat map. The great circle gives a shortest-distance baseline. A flight plan can also account for winds and airspace.

Compare the geometry of a flat right triangle in [Pythagorean dissection](/exhibits/pythagorean/).
