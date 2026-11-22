---

layout: ../../layouts/Exhibit.astro
title: Galton board
description: Drop balls through a triangular grid of pegs and compare where they land with the binomial distribution.
question: How do random turns make a predictable pattern?
guide: Drop one ball to see its route. Drop 100 a few times and compare the gold bars with the teal marks. Change the chance of turning right to start a fresh sample.
---

## What to look for

Each ball makes ten choices as it passes through the pegs. The gold line shows the most recent route. The bins count right turns, so a ball that turns right five times lands in bin 5, even if it takes a different route to get there.

At 50%, there are 252 ways to make five right turns and only one way to make all ten. That’s why the middle bins are more likely. Drop several batches and watch the gold bars approach the teal predictions. Turn the chance up to 80% and watch the predicted peak move to the right.

## The rule

<math display="block" aria-label="The probability that K equals k is ten choose k times p to the power k times one minus p to the power ten minus k">
  <mi>P</mi><mo>(</mo><mi>K</mi><mo>=</mo><mi>k</mi><mo>)</mo><mo>=</mo>
  <mrow><mo>(</mo><mfrac linethickness="0"><mn>10</mn><mi>k</mi></mfrac><mo>)</mo></mrow>
  <msup><mi>p</mi><mi>k</mi></msup>
  <msup><mrow><mo>(</mo><mn>1</mn><mo>−</mo><mi>p</mi><mo>)</mo></mrow><mrow><mn>10</mn><mo>−</mo><mi>k</mi></mrow></msup>
</math>

Here **K** is the number of right turns, **k** is the bin number from 0 to 10, and **p** is the chance of turning right at each peg. “10 choose k” counts the ways to pick which **k** of the ten choices go right. The other factors give the probability of any one of those routes.

## What the board assumes

The board simulates independent choices with the same chance at every peg. Uneven pegs, friction, or collisions could change those chances on a physical board.

The gold bars show the share of dropped balls in each bin. The teal marks show the model’s predicted shares. With a small sample, one bin may hold a large share of the balls, so the vertical scale can expand. Even with many drops, the observed shares vary between runs. Reset clears the sample and keeps the selected chance.

## Where the idea appears

If each item in a production batch independently has the same chance of being defective, the binomial distribution describes how many defects you might find when you inspect a fixed number of items.

## Further reading

- [Binomial distribution in the NIST Engineering Statistics Handbook](https://www.itl.nist.gov/div898/handbook/eda/section3/eda366i.htm).
