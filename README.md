# Invariant

Invariant is an interactive archive of mathematical patterns. Pick a scene from the gallery to open its experiment. Each preview is generated from the exhibit's mathematical model.

## Exhibits

- [Kuramoto synchronization](src/pages/exhibits/kuramoto.md) lets you adjust how strongly a group of oscillators influences one another and watch for a shared rhythm.
- [Lorenz attractor](src/pages/exhibits/lorenz.md) lets you change the starting distance between two trajectories and watch when their futures diverge.
- [Voronoi diagrams](src/pages/exhibits/voronoi.md) shows how regions change as you move warehouses around a map.
- [Fourier drawing](src/pages/exhibits/fourier.md) lets you add rotating circles to redraw a paper plane and compare the result with the original outline.

## Run locally

Install Bun and Node.js 22.12 or newer. Then run the following from the repo root.

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

## Deploy to Cloudflare Pages

Use `main` as the production branch, `bun run build` as the build command, and `dist` as the build output directory. Set `NODE_VERSION` to `22.16.0` and `BUN_VERSION` to `1.4.2` for the same toolchain used locally. [Cloudflare Pages Astro guide](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/)

## Project notes

Instrument Serif is used for titles and Geist for body text and controls. The site serves both fonts and their license notices from `public/fonts/`. [Instrument Serif](https://github.com/Instrument/instrument-serif) · [Geist](https://github.com/vercel/geist-font)

See the [exhibit roadmap](docs/PLAN.md) and [TODO](docs/TODO.md) for project status.
