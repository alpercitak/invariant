---

layout: ../../layouts/Exhibit.astro
title: Conway’s Game of Life
description: Step through Conway’s Game of Life and see how a local rule produces still, repeating, and moving patterns.
question: How can a pattern travel when its cells stay in place?
guide: Choose Glider and press Step four times. Look for the starting shape one cell down and to the right.
---

## What to look for

Choose **Block** and step once. The four live cells stay in place because each has three live neighbors. **Blinker** flips between a horizontal and a vertical line. **Pulsar** takes three steps to return to its starting arrangement.

**Glider** recovers its shape in a new place. After four steps, it sits one column to the right and one row down. Each step lights up new cells and turns others off. The gold diamonds mark the new cells.

## The rule

Each cell checks the eight squares around it, including diagonals. An empty cell becomes live when exactly three neighbors are live. A live cell stays live with two or three live neighbors.

<math display="block" aria-label="A cell is live next if and only if N equals 3, or the cell is live now and N equals 2">
  <msub><mi>s</mi><mtext>next</mtext></msub><mo>=</mo><mn>1</mn><mo>⇔</mo>
  <mi>N</mi><mo>=</mo><mn>3</mn><mo>∨</mo>
  <mo>(</mo><mi>s</mi><mo>=</mo><mn>1</mn><mo>∧</mo><mi>N</mi><mo>=</mo><mn>2</mn><mo>)</mo>
</math>

Here **s** is the current cell state, with 1 for live and 0 for empty. **N** is its count of live neighbors. Every cell reads the same previous generation, so the order of calculation leaves the result unchanged.

## What the board assumes

This display uses 22 columns and 16 rows. Cells beyond those edges count as empty. Conway’s original rules apply to an infinite grid. On this board a glider can change shape when it reaches an edge.

## Where the idea appears

Life is a **cellular automaton**, a grid that updates each cell using a local rule. In a freeway traffic model, local rules about speed and gaps between cars can produce stop-and-go waves. [Nagel and Schreckenberg’s freeway traffic model](https://web2.qatar.cmu.edu/~gdicaro/15382/additional/NagelSchr-model.pdf)

See how another short rule produces different patterns as its parameter changes in the [Logistic map](/exhibits/logistic/).

## Further reading

- [Martin Gardner’s original account of Conway’s Game of Life](https://web.stanford.edu/class/sts145/Library/life.pdf).
