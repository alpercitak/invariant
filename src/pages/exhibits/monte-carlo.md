---
layout: ../../layouts/Exhibit.astro
title: Monte Carlo π
description: Scatter random points in a square and see how the fraction inside a circular arc estimates π.
question: How can a cloud of random points reveal π?
guide: Add 10 points a few times and watch the estimate jump. Add 1,000 and see how much the next small batch changes it.
---

## What to look for

Each point lands somewhere in a unit square. The teal dots land inside the quarter circle. The gold rings land outside. The fraction of all points that land inside estimates how much of the square the quarter circle covers.

Reset and compare two runs with the same number of points. The estimates can differ because each run draws a fresh sample. The absolute error shows how far each estimate is from π.

## The rule

The circle has radius 1, so its quarter covers an area of π/4. The square has area 1. A uniformly drawn point lands inside the arc with probability π/4.

<math display="block" aria-label="The estimate of pi is four times the number of points inside divided by the total number of points">
  <mover><mi>π</mi><mo>^</mo></mover><mo>=</mo><mn>4</mn><mo>×</mo>
  <mfrac><mi>H</mi><mi>N</mi></mfrac>
</math>

Here **N** is the total number of points and **H** counts those with **x² + y² ≤ 1**. The coordinates **x** and **y** are each sampled between 0 and 1. The estimate multiplies that observed fraction by four to scale the quarter circle up to the whole circle.

## What the sampling assumes

The model assumes independent draws with an equal chance of landing in any two regions of the same area. The browser approximates those draws with a pseudorandom number generator. Across repeated runs, using four times as many points halves the typical size of the error, measured by standard deviation. In a single run, adding points can still move the estimate farther from π. [BYU’s notes on Monte Carlo integration](https://labs.acme.byu.edu/Volume1/MonteCarloIntegration/MonteCarloIntegration.html)

## Where the idea appears

To estimate how often parts will fit together, engineers can sample dimensions from a model of manufacturing variation and check each simulated assembly. The fraction that fits estimates the production yield. [NIST report on assembly tolerances](https://nvlpubs.nist.gov/nistpubs/Legacy/IR/nistir6223.pdf)

The [Galton board](/exhibits/galton/) uses repeated random draws to estimate an entire distribution.
