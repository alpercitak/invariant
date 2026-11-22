# Invariant TODO

The [project plan](PLAN.md) tracks the full exhibit roadmap.

## First release

- [x] Scaffold the Astro site with Bun, pin Biome to the version in `biome.json`, and add development, build, and check scripts.
- [x] Build the archive index and shared exhibit layout.
- [x] Build the Kuramoto exhibit with adjustable coupling, a synchrony readout, a plain-language explanation, and a test for uncoupled motion.
- [x] Build the Lorenz exhibit with a resettable trajectory comparison, a plain-language explanation, and a short-interval step-size check.
- [x] Run browser checks for keyboard controls, pause and reset, reduced motion, and the mobile layout.
- [x] Move exhibit browser behavior and Astro configuration into TypeScript files.
- [x] Apply self-hosted Instrument Serif and Geist and check typography on desktop and mobile.
- [x] Put the gallery first and generate each card's scene from its model.
- [x] Put the visualization first on exhibit pages and add optional reading guidance.
- [x] Configure GitHub Actions for project and Chromium checks and monthly Dependabot updates for Bun packages and actions.
- [x] Upgrade to Astro 7 and pin its supported Node.js version for CI and Cloudflare Pages.
- [x] Upgrade to TypeScript 6 and explicitly load Bun and Node.js types.
- [x] Upgrade to Biome 2.6 and apply its formatter and lint changes.
- [ ] Remove the Dependabot TypeScript 7 restriction when [Astro supports it](https://github.com/withastro/roadmap/discussions/1321).
- [ ] Deploy to Cloudflare Pages and verify the archive and exhibit URLs.

## Dynamics

- [x] Build the logistic map exhibit with a bifurcation diagram, growth presets, and model checks for a steady value and a two-generation cycle.
- [x] Build two-body orbits with an adjustable mass ratio, pausable motion, and checks for orbital timing and the center of mass.

## Geometry

- [x] Build the Voronoi exhibit with movable sites and verify cell assignment by nearest-site distance.
- [x] Build the Bézier curve exhibit with movable handles, interpolation steps, and checks against the cubic Bernstein formula.
- [x] Build Pythagorean dissection with a leg-length slider, two arrangements of four triangles, and checks for congruence and equal uncovered areas.

## Emergence and fractals

- [x] Build a Mandelbrot escape map with zoom presets, a step limit, and tests for known bounded and escaping orbits.
- [x] Build Conway’s Game of Life with four starting patterns, manual and automatic stepping, and tests for still life, oscillation, and translation.
- [x] Build the Sierpiński triangle with stepwise subdivision and tests for the corner pieces, piece count, and remaining area.

## Probability

- [x] Build the Galton board with single and batch drops, adjustable bias, and tests for the fair binomial distribution and biased mean.
- [x] Build Monte Carlo π with batch sampling, a running estimate and absolute error, and tests for classification and the area-based estimate.
- [x] Build the birthday paradox with a calendar of sampled birthdays, adjustable group size, and checks for the 23-person threshold and repeated dates.

## Waves and signals

- [x] Build Fourier drawing with adjustable term count, keyboard controls, and a test that the full set of terms reconstructs the sampled outline.
- [x] Give the Fourier legend, controls, and exhibit text more room at desktop and phone widths.
- [x] Build standing waves with adjustable harmonics, pausable playback, and tests for node positions and frequencies.
- [x] Build wave interference with adjustable wavelength and relative phase, a midpoint probe, and checks for constructive and destructive interference.
