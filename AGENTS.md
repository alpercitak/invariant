# Invariant

Invariant is a single Astro site for interactive math exhibits. Write for curious readers who can follow an experiment without a math background.

- Use Bun for dependencies and package scripts, TypeScript for models and browser code, and Biome for formatting and linting.
- Use relative imports within an exhibit and `@/` for imports across `src/` features.
- Use Conventional Commits, such as `feat: add the Kuramoto exhibit`.
- For review, diagnosis, or planning, inspect only. For implementation, preserve unrelated user changes.

## Site Layout

- Keep routes in `src/pages/`, shared layouts in `src/layouts/`, and interactive exhibit code in `src/exhibits/<slug>/`. Keep exhibit copy in Markdown and use the shared exhibit layout.
- Keep the mathematical model independent of DOM and rendering code so it can be checked with Bun tests. Keep each exhibit's parameters and presets with the exhibit.
- Build pages as static HTML and load browser code where an exhibit needs it. Prefer native HTML controls, Canvas 2D for simulations, SVG for geometry, and MathML for equations.

## Exhibits

- Open with a question in plain language. Let readers change a parameter, explain what to look for, and connect the result to the equation or rule. Define symbols and units where they appear.
- Explain model assumptions, what the visualization represents, and what changes when readers adjust the controls. Identify numerical approximations and sampling uncertainty where they affect interpretation.
- Support keyboard input, visible focus, and reduced motion. Give moving exhibits a pause control and a text explanation of the result.

## Implementation

- Make the smallest change that solves the task. Follow existing patterns. Add a dependency or abstraction when it removes concrete complexity. Prefer small duplication to premature abstraction.
- Use precise TypeScript types. Avoid `any`, unnecessary assertions, and duplicate state. Derive quantities from their inputs and keep animation state local to the exhibit.
- Validate at trust boundaries such as user input, URL parameters, and external or persisted data. Let internal types express invariants. Handle errors where the caller or reader has an actionable recovery path.

## Before Finishing

- Run Biome and the relevant project checks. Verify interactive changes in the browser and check mathematical changes against a known result, an invariant, or a convergence check appropriate to the model.
- Keep `docs/PLAN.md` aligned with project decisions and update `docs/TODO.md` for completed or newly identified work.
- Keep the diff focused on the task. Remove speculative config, redundant guards, and abstractions that add more code than they save.
