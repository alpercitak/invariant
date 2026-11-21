# Invariant project plan

Invariant is a web archive of interactive math exhibits for curious readers, including engineers without a mathematics background. Each page makes one idea tangible by letting the reader change something and see what follows.

## What an exhibit contains

1. A plain-language question that gives the reader a reason to try the experiment.
2. An interactive visual with a clear starting point and a short prompt about what to change and watch.
3. An explanation of what the marks, colors, or readings represent and how they connect to the equation or rule.
4. Notes on the model's assumptions, approximations, and limits, with a source for the mathematics.
5. A concrete application and links to related exhibits as they become available.

## Build and release

Use Astro to build a static archive index and individual exhibit pages with a shared layout. Use Markdown for exhibit copy, TypeScript for the models and browser code, and native browser controls and rendering. Use Bun for dependencies and model tests, Biome for code checks, and Playwright for the core exhibit interactions. Cloudflare Pages is the deployment target.

The homepage opens on a gallery of titled scenes. Each exhibit supplies a model-generated preview beside its interactive implementation.

1. Set up the site and the exhibit template. Build Kuramoto synchronization first so the archive has one complete example with working controls, a readable explanation, and model tests.
2. Add the Lorenz attractor and launch with both exhibits. Check reproducible reset, keyboard controls, paused and reduced-motion states, and a mobile layout before publishing.
3. Add Voronoi diagrams to extend the archive from simulations to interactive geometry, then add Fourier drawing to introduce waves and signals. Add the remaining exhibits individually as their experiments, explanations, and math checks are ready.

Each exhibit should be checked against a known result, an invariant, or an appropriate numerical or statistical reference. For example, check that uncoupled Kuramoto oscillators follow their natural frequencies and that the Lorenz solver agrees over a short interval when the time step is reduced.

## Exhibit roadmap

| Area | Exhibits |
| --- | --- |
| Dynamics | Kuramoto synchronization, Lorenz attractor, logistic map, two-body orbits |
| Waves and signals | Fourier drawing, standing waves, wave interference, Doppler effect |
| Probability | Galton board, Monte Carlo estimation of π, Bayes' theorem, birthday paradox |
| Geometry | Voronoi diagrams, great circles, Bézier curves, Pythagorean dissection |
| Emergence and fractals | Mandelbrot set, Sierpiński triangle, Conway's Game of Life, Gray–Scott reaction–diffusion |

See [TODO.md](TODO.md) for the work in scope for the first release and the next exhibit.
