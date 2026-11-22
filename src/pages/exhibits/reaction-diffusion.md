---

layout: ../../layouts/Exhibit.astro
title: Gray–Scott reaction–diffusion
description: Start from the same patches and watch two sets of reaction rates produce spots or stripes.
question: How can the same starting patches turn into spots or stripes?
guide: Press Play with Spots selected and watch patches grow and split. Then choose Stripes to start from the same patches with different feed and removal rates. Use Advance to move in 250-step jumps.
---

## What to look for

The grid tracks two virtual substances, **U** and **V**. Bright cells contain more **V**. Each preset begins with the same small patches of **V**. In Spots, many patches split and stay separate. In Stripes, they spread into bands that often join.

## The rule

The two substances spread across neighboring cells. **U** has twice the diffusion coefficient of **V**, so an uneven patch of **U** smooths out more quickly. Where the substances meet, the reaction uses up **U** and produces more **V**. A steady feed replenishes **U**, while dilution and removal reduce **V**. [John Pearson’s study of Gray–Scott patterns](https://arxiv.org/abs/patt-sol/9304003)

<math display="block" aria-label="The rate of change of U is diffusion of U minus U times V squared plus feed times one minus U. The rate of change of V is diffusion of V plus U times V squared minus the sum of the feed and removal rates times V.">
  <mtable columnalign="left">
    <mtr><mtd>
      <mfrac><mrow><mo>∂</mo><mi>U</mi></mrow><mrow><mo>∂</mo><mi>t</mi></mrow></mfrac><mo>=</mo>
      <msub><mi>D</mi><mi>U</mi></msub><msup><mi>∇</mi><mn>2</mn></msup><mi>U</mi><mo>−</mo><mi>U</mi><msup><mi>V</mi><mn>2</mn></msup><mo>+</mo><mi>F</mi><mo>(</mo><mn>1</mn><mo>−</mo><mi>U</mi><mo>)</mo>
    </mtd></mtr>
    <mtr><mtd>
      <mfrac><mrow><mo>∂</mo><mi>V</mi></mrow><mrow><mo>∂</mo><mi>t</mi></mrow></mfrac><mo>=</mo>
      <msub><mi>D</mi><mi>V</mi></msub><msup><mi>∇</mi><mn>2</mn></msup><mi>V</mi><mo>+</mo><mi>U</mi><msup><mi>V</mi><mn>2</mn></msup><mo>−</mo><mo>(</mo><mi>F</mi><mo>+</mo><mi>k</mi><mo>)</mo><mi>V</mi>
    </mtd></mtr>
  </mtable>
</math>

**U** and **V** are scaled concentrations without units. **t** is time in model units. **Dᵤ** and **Dᵥ** control diffusion in squared grid spacings per time unit. **∇²** measures how much a concentration differs from its surroundings. **F** is the feed rate and **k** is the additional removal rate of **V**, both per time unit. Spots uses **F = 0.0367** and **k = 0.0649**. Stripes uses **F = 0.029** and **k = 0.057**.

## What the model assumes

The simulation approximates diffusion using the four neighbors of each cell on a 144 × 96 grid. The edges wrap, so the left edge meets the right and the top meets the bottom. Each Euler step uses the current rates of change to estimate the concentrations one time unit later. Grid size and step size affect the details of the result. The readout counts cells where **V** is at least 0.18 and rounds to a whole percent.

## Where the idea appears

Reaction–diffusion models help researchers study how interactions over short distances can organize matter into patterns over much larger distances. Pearson’s simulations showed how the same equations could produce several types of patterns by changing the rates and initial conditions. [Gray–Scott model walkthrough by Karl Sims](https://www.karlsims.com/rd.html)

Compare another way that neighboring cells can shape a whole grid in [Conway’s Game of Life](/exhibits/life/).
