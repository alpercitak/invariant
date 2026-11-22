# Invariant

Invariant is an interactive archive of mathematical patterns. Pick a scene from the gallery to open its experiment. Each preview is generated from the exhibit's mathematical model. Open **How to read this** on any scene for one thing to try.

## Exhibits

- [Kuramoto synchronization](src/pages/exhibits/kuramoto.md) lets you adjust how strongly a group of oscillators influences one another and watch for a shared rhythm.
- [Lorenz attractor](src/pages/exhibits/lorenz.md) lets you change the starting distance between two trajectories and watch when their futures diverge.
- [Voronoi diagrams](src/pages/exhibits/voronoi.md) shows how regions change as you move warehouses around a map.
- [Fourier drawing](src/pages/exhibits/fourier.md) lets you add rotating circles to redraw a paper plane and compare the result with the original outline.
- [Logistic map](src/pages/exhibits/logistic.md) lets you adjust population growth and follow the shift from a steady level to repeating cycles and irregular fluctuations.
- [Galton board](src/pages/exhibits/galton.md) lets you drop balls through pegs, bias the turns, and compare the observed distribution with its binomial prediction.
- [Mandelbrot set](src/pages/exhibits/mandelbrot.md) lets you zoom into a fractal and see how the step limit changes which points can be shown to escape.
- [Standing waves](src/pages/exhibits/standing-waves.md) lets you change a string’s harmonic and see which points stay still as it vibrates.
- [Bézier curves](src/pages/exhibits/bezier.md) lets you move four control points and see how straight-line interpolation produces a smooth curve.
- [Conway’s Game of Life](src/pages/exhibits/life.md) lets you step through generations and see how one neighbor rule produces still, repeating, and traveling patterns.
- [Monte Carlo π](src/pages/exhibits/monte-carlo.md) lets you scatter random points and use the share inside a quarter circle to estimate π.
- [Wave interference](src/pages/exhibits/interference.md) lets you change the wavelength and phase of two sources to see where they reinforce and cancel.
- [Sierpiński triangle](src/pages/exhibits/sierpinski.md) lets you remove the middle of each triangle and track how much area remains.
- [Two-body orbits](src/pages/exhibits/orbits.md) lets you change the mass ratio of two bodies to see how they move around a shared center of mass.
- [Birthday paradox](src/pages/exhibits/birthday.md) lets you draw groups of different sizes and see how quickly the chance of a shared birthday rises.
- [Pythagorean dissection](src/pages/exhibits/pythagorean.md) lets you reshape four right triangles and compare the square areas left by two arrangements.

## Run locally

Install Bun and the Node.js version in `.node-version`. Then run the following from the repo root.

```sh
bun install
bun run dev
```

Run `bun run check` for formatting, linting, type checking, and model tests. Run `bun run build` to generate the static site in `dist/`.

Each exhibit keeps its browser controls and rendering in `src/exhibits/<slug>/experiment.ts` and its math in `model.ts`. Astro compiles the TypeScript into JavaScript for the browser.

Run the browser tests against the static build with Playwright.

```sh
bunx playwright install chromium
bun run test:browser
```

GitHub Actions runs the project checks and Chromium tests on pull requests and pushes to `main`. Dependabot proposes monthly updates for Bun dependencies and GitHub Actions, grouping minor and patch updates by ecosystem.

## Deploy to Cloudflare Pages

Use `main` as the production branch, `bun run build` as the build command, and `dist` as the build output directory. Cloudflare Pages reads `.node-version`. If you set a `NODE_VERSION` override, match that file. Set `BUN_VERSION` to `1.4.2`. [Cloudflare Pages Astro guide](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/)

## Project notes

Instrument Serif is used for titles and Geist for body text and controls. The site serves both fonts and their license notices from `public/fonts/`. [Instrument Serif](https://github.com/Instrument/instrument-serif) · [Geist](https://github.com/vercel/geist-font)

See the [exhibit roadmap](docs/PLAN.md) and [TODO](docs/TODO.md) for project status.
