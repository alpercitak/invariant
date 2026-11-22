---

layout: ../../layouts/Exhibit.astro
title: Two-body orbits
description: Change the mass ratio of two orbiting bodies and watch how their paths shift around a shared center of mass.
question: When two bodies orbit each other, what stays still?
guide: Set the mass ratio to 1:1 and press Play. Both bodies follow paths of the same size. Increase the ratio toward 10:1 and watch body A move closer to the cross.
---

## What to look for

The cross marks the **barycenter**, the point where the two masses balance. The connecting line always passes through it. With equal masses the cross is halfway between the bodies. As A becomes heavier relative to B, A's orbit shrinks and B's grows. Both still take the same time to go around.

## The rule

Think of a seesaw with the heavier person closer to the pivot. To balance, each mass multiplied by its distance from the pivot must give the same result.

<math display="block" aria-label="Mass of body A times its distance from the center equals mass of body B times its distance from the center">
  <msub><mi>m</mi><mi>A</mi></msub><msub><mi>d</mi><mi>A</mi></msub>
  <mo>=</mo>
  <msub><mi>m</mi><mi>B</mi></msub><msub><mi>d</mi><mi>B</mi></msub>
</math>

Here **m** is mass and **d** is distance from the barycenter, with **A** and **B** identifying the bodies. Both masses use the same unit and both distances use the same unit. At 3:1, A has three times B's mass and stays one third as far from the cross.

## What the model assumes

Only the two bodies pull on each other, under Newtonian gravity. The control keeps their combined mass and the shape and size of their relative orbit fixed, so changing the mass ratio leaves the orbital period unchanged. The cross stays fixed because the scene is drawn from the shared center of mass. Dot sizes are illustrative, and one orbit takes eight seconds on screen.

The browser approximates each position by solving Kepler's equation at the current time. This makes the bodies move faster when they are close together and slower when they are far apart. [Kepler’s equation and orbital coordinates at NASA JPL](https://ssd.jpl.nasa.gov/planets/approx_pos.html)

## Where the idea appears

A planet can make its host star trace a small orbit. Astronomers look for that motion to infer the presence of planets too faint to see directly. [NASA’s guide to barycenters and stellar wobble](https://spaceplace.nasa.gov/barycenter/en/)

See how a different set of motion rules produces a [Lorenz attractor](/exhibits/lorenz/).
