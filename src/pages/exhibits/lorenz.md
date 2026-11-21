---
layout: ../../layouts/Exhibit.astro
title: Lorenz attractor
description: Watch two nearby Lorenz trajectories drift apart.
category: Chaos
question: How far apart can two nearly identical futures become?
---

Begin with two points almost on top of each other. Their paths initially track each other, then wander apart. How does changing the initial separation affect the time it takes for the paths to look different?

## What to try

Use **Initial separation** to move the teal starting point while the amber point stays at <math><mo>(</mo><mn>1</mn><mo>,</mo><mn>1</mn><mo>,</mo><mn>1</mn><mo>)</mo></math>. Press **Pause** to inspect the current paths, or **Reset** to replay from the beginning. The plot shows the <math><mi>x</mi></math>- and <math><mi>z</mi></math>-coordinates. The third coordinate, <math><mi>y</mi></math>, still affects how both paths move. The readout reports simulated time and the distance between the two full three-dimensional states.

The starting states are <math><mo>(</mo><mn>1</mn><mo>,</mo><mn>1</mn><mo>,</mo><mn>1</mn><mo>)</mo></math> and <math><mo>(</mo><mn>1</mn><mo>+</mo><mi>δ</mi><mo>,</mo><mn>1</mn><mo>,</mo><mn>1</mn><mo>)</mo></math>, where <math><mi>δ</mi></math> is the separation slider in model units. The solid line is the baseline and the dashed line is the shifted start.

## The rule

Edward Lorenz studied a three-variable model of thermal convection. Its dimensionless variables change according to these equations.

<math display="block" aria-label="Lorenz equations">
  <mtable columnalign="left">
    <mtr><mtd><mfrac><mrow><mi>d</mi><mi>x</mi></mrow><mrow><mi>d</mi><mi>t</mi></mrow></mfrac><mo>=</mo><mi>σ</mi><mo>(</mo><mi>y</mi><mo>−</mo><mi>x</mi><mo>)</mo></mtd></mtr>
    <mtr><mtd><mfrac><mrow><mi>d</mi><mi>y</mi></mrow><mrow><mi>d</mi><mi>t</mi></mrow></mfrac><mo>=</mo><mi>x</mi><mo>(</mo><mi>ρ</mi><mo>−</mo><mi>z</mi><mo>)</mo><mo>−</mo><mi>y</mi></mtd></mtr>
    <mtr><mtd><mfrac><mrow><mi>d</mi><mi>z</mi></mrow><mrow><mi>d</mi><mi>t</mi></mrow></mfrac><mo>=</mo><mi>x</mi><mi>y</mi><mo>−</mo><mi>β</mi><mi>z</mi></mtd></mtr>
  </mtable>
</math>

Here <math><mi>t</mi></math> is model time. The variables <math><mi>x</mi></math>, <math><mi>y</mi></math>, and <math><mi>z</mi></math> describe the model's convection state. The parameters are fixed at <math><mi>σ</mi><mo>=</mo><mn>10</mn></math>, <math><mi>ρ</mi><mo>=</mo><mn>28</mn></math>, and <math><mi>β</mi><mo>=</mo><mfrac><mn>8</mn><mn>3</mn></mfrac></math>, a regime in which nearby starts can produce dramatically different paths.

## Reading the result

The equations are deterministic because a starting state and these parameters specify one future. Small differences in the starting state can grow until one path stops being a useful point-by-point estimate of the other. This is sensitive dependence on initial conditions. Watch how long the paths remain close before their separation grows.

The model simplifies convection to three variables. The curves use fixed-step fourth-order Runge–Kutta integration with a step of 0.01 model-time units. The approximation introduces errors that can grow over a long run. The readout measures distance between the computed states. Because the plot drops the third coordinate, a crossing on the screen can represent points at different depths.

## Where the idea appears

Weather forecasters run ensembles from slightly different estimates of current conditions. Comparing the resulting forecasts helps estimate how uncertain the outcome is. [European Centre for Medium-Range Weather Forecasts](https://www.ecmwf.int/en/research/modelling-and-prediction/quantifying-forecast-uncertainty)

For a second example of how simple dynamics shape a group's behavior, try [Kuramoto synchronization](/exhibits/kuramoto/).

## Further reading

Edward N. Lorenz, [“Deterministic Nonperiodic Flow”](https://doi.org/10.1175/1520-0469(1963)020%3C0130:DNF%3E2.0.CO;2), *Journal of the Atmospheric Sciences* 20 (1963), 130–141.
