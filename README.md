# Invariant

Invariant is an interactive archive of mathematical patterns. Each exhibit starts with a question and gives you a small experiment to explore it.

## Run locally

Install Bun and Node.js 22.12 or newer. Then run the following from the repo root.

```sh
bun install
bun run dev
```

Run `bun run check` for formatting, linting, type checking, and model tests. Run `bun run build` to generate the static site in `dist/`.

## Deploy to Cloudflare Pages

Use `main` as the production branch, `bun run build` as the build command, and `dist` as the build output directory. Set `NODE_VERSION` to `22.16.0` and `BUN_VERSION` to `1.4.2` for the same toolchain used locally. [Cloudflare Pages Astro guide](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/)

See the [exhibit roadmap](docs/PLAN.md) and [TODO](docs/TODO.md) for project status.
