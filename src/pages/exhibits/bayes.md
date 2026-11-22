---

layout: ../../layouts/Exhibit.astro
title: Bayes’ theorem
description: Adjust the defect rate in a batch and see how it changes the chance that a flagged part is defective.
question: When an inspection flags a part, how likely is it actually defective?
guide: Start at a 1% defect rate and compare the filled diamonds with the filled circles. Raise the defect rate and watch the share of flagged parts that are defective.
---

## What to look for

Each mark is one part in a batch of 1,000. Diamonds are defective parts and circles are intact parts. The inspection flags 90% of defective parts and 10% of intact parts. Filled marks show every part it flags.

At a 1% defect rate, there are 10 defective parts and 990 intact ones. The inspection flags 9 of the 10 defective parts and 99 of the 990 intact ones. Among the 108 flagged parts, only 9 are defective, about 8.3%. The large number of intact parts gives the inspection many chances to raise a false alarm.

## The rule

Bayes’ theorem updates a probability when you learn something new. Here you start with the defect rate before inspection, also called the **prior**. Once a part is flagged, you restrict the comparison to the filled marks. The fraction of those marks that are diamonds gives the updated probability, or **posterior**. [Penn State notes on Bayes’ theorem](https://online.stat.psu.edu/stat414/Lesson06)

<math display="block" aria-label="The probability of a defect given a flag equals the probability of a flag given a defect times the probability of a defect, divided by the probability of a flag">
  <mi>P</mi><mo>(</mo><mi>D</mi><mo>∣</mo><mi>F</mi><mo>)</mo><mo>=</mo>
  <mfrac>
    <mrow><mi>P</mi><mo>(</mo><mi>F</mi><mo>∣</mo><mi>D</mi><mo>)</mo><mi>P</mi><mo>(</mo><mi>D</mi><mo>)</mo></mrow>
    <mrow><mi>P</mi><mo>(</mo><mi>F</mi><mo>)</mo></mrow>
  </mfrac>
</math>

**D** means a part is defective and **F** means it was flagged. The bar **∣** means “given.” Multiplying **P(F ∣ D)** by **P(D)** gives the fraction of the whole batch that is both defective and flagged. Dividing by **P(F)** gives the share among flagged parts. Each probability is a number from 0 to 1.

## What the model assumes

The slider changes the share of defective parts. Each inspection rate stays fixed. The diagram shows the counts implied by those rates for a batch of 1,000. Real batches can vary, and inspection performance can change with the kind of defect. The result rounds the percentage to one decimal place.

## Where the idea appears

A factory can use this calculation to estimate how many flagged parts need rework. If the production line starts making fewer defective parts, the same inspection can send a larger share of intact parts to the review station.

See another way a small per-item chance can add up in the [Birthday paradox](/exhibits/birthday/).
