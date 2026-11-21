# Invariant

Invariant is an interactive archive of mathematical patterns. Each exhibit starts with a question and gives you a small experiment to explore it.

## Exhibits

- [Kuramoto synchronization](src/pages/exhibits/kuramoto.md) lets you adjust how strongly a group of oscillators influences one another and watch for a shared rhythm.
- [Lorenz attractor](src/pages/exhibits/lorenz.md) lets you change the starting distance between two trajectories and watch when their futures diverge.
- [Voronoi diagrams](src/pages/exhibits/voronoi.md) shows how regions change as you move warehouses around a map.

## Run locally

Install Bun and Node.js 22.12 or newer. Then run the following from the repo root.

```sh
bun install
bun run dev
```

Run `bun run check` for formatting, linting, type checking, and model tests. Run `bun run build` to generate the static site in `dist/`.

Run the browser tests against the static build with Playwright.

```sh
bunx playwright install chromium
bun run test:browser
```

## Deploy to Cloudflare Pages

Use `main` as the production branch, `bun run build` as the build command, and `dist` as the build output directory. Set `NODE_VERSION` to `22.16.0` and `BUN_VERSION` to `1.4.2` for the same toolchain used locally. [Cloudflare Pages Astro guide](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/)

See the [exhibit roadmap](docs/PLAN.md) and [TODO](docs/TODO.md) for project status.
