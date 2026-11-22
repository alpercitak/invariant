---

layout: ../../layouts/Exhibit.astro
title: Kuramoto synchronization
description: Explore how a crowd of oscillators can find a shared beat.
question: Can rhythms synchronize?
guide: Raise coupling. If the scene is paused, press Play. Watch the dots form a cluster and the mean arrow grow as they line up.
---

## One shared pull

Imagine many clocks that tick at slightly different speeds. Each oscillator has a phase <math><msub><mi>θ</mi><mi>i</mi></msub></math>, its position in a repeating cycle, and a natural angular frequency <math><msub><mi>ω</mi><mi>i</mi></msub></math>, measured here in radians per second. The Kuramoto rule gives each oscillator a gentle pull toward the crowd’s average phase.

<math display="block" aria-label="The rate of change of oscillator i's phase equals its natural frequency plus coupling K times coherence r times the sine of the average phase psi minus its phase theta i">
  <mfrac><mrow><mi>d</mi><msub><mi>θ</mi><mi>i</mi></msub></mrow><mrow><mi>d</mi><mi>t</mi></mrow></mfrac>
  <mo>=</mo><msub><mi>ω</mi><mi>i</mi></msub><mo>+</mo><mi>K</mi><mi>r</mi>
  <mi mathvariant="normal">sin</mi><mo>(</mo><mi>ψ</mi><mo>−</mo><msub><mi>θ</mi><mi>i</mi></msub><mo>)</mo>
</math>

Here <math><mi>K</mi></math> is the coupling strength and <math><mi>r</mi></math> is the length of the mean of the unit phase vectors. It is 0 when the vectors cancel and 1 when they all point in the same direction. Their mean points at angle <math><mi>ψ</mi></math> whenever its length is nonzero. The slider changes <math><mi>K</mi></math>. At zero, every oscillator follows its own pace. As the pull grows, some can lock into a shared rhythm while faster or slower ones keep drifting.

## What this model leaves out

The dots show positions within a cycle. Every oscillator feels the influence of the group, and their natural frequencies are fixed and evenly spread from −1.4 to +1.4 radians per second. With 64 oscillators, the transition can look smoother than the one predicted for an idealized infinite population. The simulation approximates motion with small numerical time steps.

## Where the idea appears

Related synchronization questions arise in flashing fireflies, rhythmically active neurons, and coupled electrical generators. The model isolates the collective timing shared across these systems.

Try the [Lorenz attractor](/exhibits/lorenz/) to see how small differences can grow in another dynamical system.

For another experiment with rotating arrows, try [Fourier drawing](/exhibits/fourier/) and watch their combined motion trace an outline.

## Further reading

- Yoshiki Kuramoto, [“Self-entrainment of a population of coupled non-linear oscillators”](https://cir.nii.ac.jp/crid/1361418518461244800) (1975).
- Juan A. Acebrón et al., [“The Kuramoto model: A simple paradigm for synchronization phenomena”](https://journals.aps.org/rmp/abstract/10.1103/RevModPhys.77.137), _Reviews of Modern Physics_ 77, 137 (2005).
