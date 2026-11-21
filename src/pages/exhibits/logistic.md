---
layout: ../../layouts/Exhibit.astro
title: Logistic map
description: Change one growth factor and watch a population settle, alternate, or fluctuate irregularly.
question: How can one growth rule make a population fluctuate?
guide: Try Settles, Alternates, and Irregular. Read the gold column for the population values that show up, then look below to see the order they appear in.
---

## What to look for

At a growth factor of 2.8, the population settles near 0.643. The gold column shows a single dot, and the generation trace is flat.

At 3.2, it alternates between about 0.513 and 0.799. Two dots appear in the column, and the trace zigzags between them. Move the slider slowly upward from there to see those two branches split again.

Try 3.9. The same rule produces a wide spread of values and an irregular trace. Move the slider back and look for narrow ranges where repeating patterns return.

## The rule

<math display="block" aria-label="x at generation n plus one equals r times x at generation n times one minus x at generation n">
  <msub><mi>x</mi><mrow><mi>n</mi><mo>+</mo><mn>1</mn></mrow></msub>
  <mo>=</mo><mi>r</mi><msub><mi>x</mi><mi>n</mi></msub>
  <mo>(</mo><mn>1</mn><mo>−</mo><msub><mi>x</mi><mi>n</mi></msub><mo>)</mo>
</math>

Here **xₙ** is the population on a 0–1 scale in generation **n**, and **r** is the growth factor. When the population is small, the crowding factor **1 − xₙ** is close to one. When the population is large, that factor shrinks. With strong enough growth, a large generation can be followed by a small one that grows rapidly again.

## What the diagram samples

Every column starts at **x₀ = 0.2**. The diagram skips 512 generations and plots the next 48. The teal columns are spaced 0.005 apart in **r**. The gold column follows the slider in steps of 0.001, and the lower trace shows the gold column's 48 values in order.

Near a split, the population can take longer to settle. A finite window can also miss values or hide a long repeat. The dots show the sampled orbit from this starting value.

## Where the idea appears

Ecologists use simple generation-to-generation models to study how reproduction and crowding can shape populations, such as insects that breed once per season. The logistic map isolates that feedback. Field populations can also change with food, weather, and migration.

Explore how nearby starting points can separate in the [Lorenz attractor](/exhibits/lorenz/).

## Further reading

- [Robert May, “Simple mathematical models with very complicated dynamics”](https://www.nature.com/articles/261459a0).
