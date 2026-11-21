---
layout: ../../layouts/Exhibit.astro
title: Kuramoto synchronization
description: Explore how a crowd of oscillators can find a shared beat.
category: Dynamics
question: Can rhythms synchronize?
---

## One shared pull

Imagine many clocks that tick at slightly different speeds. Each oscillator has a phase <math><msub><mi>θ</mi><mi>i</mi></msub></math>, its position in a repeating cycle, and a natural angular frequency <math><msub><mi>ω</mi><mi>i</mi></msub></math>, measured here in radians per second. The Kuramoto rule gives each oscillator a gentle pull toward the crowd’s average phase:

<math display="block" aria-label="The rate of change of oscillator i's phase equals its natural frequency plus coupling K times coherence r times the sine of the average phase psi minus its phase theta i">
  <mfrac><mrow><mi>d</mi><msub><mi>θ</mi><mi>i</mi></msub></mrow><mrow><mi>d</mi><mi>t</mi></mrow></mfrac>
  <mo>=</mo><msub><mi>ω</mi><mi>i</mi></msub><mo>+</mo><mi>K</mi><mi>r</mi>
  <mi mathvariant="normal">sin</mi><mo>(</mo><mi>ψ</mi><mo>−</mo><msub><mi>θ</mi><mi>i</mi></msub><mo>)</mo>
</math>

Here <math><mi>K</mi></math> is the coupling strength and <math><mi>r</mi></math> is the length of the mean of the unit phase vectors. It is 0 when the vectors cancel and 1 when they all point in the same direction. Their mean points at angle <math><mi>ψ</mi></math> whenever its length is nonzero. The slider changes <math><mi>K</mi></math>. At zero, every oscillator follows its own pace. As the pull grows, some can lock into a shared rhythm while faster or slower ones keep drifting.

## What this model leaves out

The dots are phases, not physical objects. Every oscillator feels the same average pull, and their natural frequencies are fixed and evenly spread from −1.4 to +1.4 radians per second. This small, finite crowd is a useful experiment, not a prediction for every real population: its transition is less sharp than the idealized infinite-population theory. The simulation advances in small numerical time steps, so the displayed path is an approximation.

## Where the idea appears

Related synchronization questions arise in flashing fireflies, rhythmically active neurons, and coupled electrical generators. The model is a starting point for studying collective timing, not a detailed account of any one of those systems.

## Further reading

- Yoshiki Kuramoto, [“Self-entrainment of a population of coupled non-linear oscillators”](https://cir.nii.ac.jp/crid/1361418518461244800) (1975).
- Juan A. Acebrón et al., [“The Kuramoto model: A simple paradigm for synchronization phenomena”](https://journals.aps.org/rmp/abstract/10.1103/RevModPhys.77.137), *Reviews of Modern Physics* 77, 137 (2005).
