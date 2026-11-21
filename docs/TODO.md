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
- [ ] Deploy to Cloudflare Pages and verify the archive and exhibit URLs.

## Geometry

- [x] Build the Voronoi exhibit with movable sites and verify cell assignment by nearest-site distance.

## Waves and signals

- [x] Build Fourier drawing with adjustable term count, keyboard controls, and a test that the full set of terms reconstructs the sampled outline.
