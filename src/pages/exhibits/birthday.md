---

layout: ../../layouts/Exhibit.astro
title: Birthday paradox
description: Change the size of a group and see how quickly the odds of a shared birthday rise.
question: How many people does it take for a shared birthday to be more likely than not?
guide: Move the slider from 22 people to 23 and watch the chance cross 50%. Then draw a few new groups at 23. Look for a gold ring each time.
---

## What to look for

Each dot is a date in a 365-day calendar. A filled dot marks a date with one birthday. A ring marks a date shared by two or more people. The slider adds people to the group or removes them from the end. **Draw new group** picks a fresh set of birthdays.

At 23 people the chance of a match is about 50.7%. Any pair can share a birthday, so 23 people give you 253 pairs. Draw several groups at the same size. The rings can change or disappear even though the chance stays the same. [Stanford CS109 notes on the birthday problem](https://web.stanford.edu/class/cs109/section/1/section-1-soln.pdf)

## The rule

Start by finding the chance that everyone has a different birthday. The first person can have any birthday. The second needs to land on one of the 364 remaining dates. If both birthdays differ, the third has 363 dates left. Multiply those chances, then subtract the result from one to get the chance of at least one match.

<math display="block" aria-label="The chance of a shared birthday among n people is one minus the product, for j from zero to n minus one, of 365 minus j divided by 365">
  <mi>P</mi><mo>(</mo><mi>n</mi><mo>)</mo><mo>=</mo><mn>1</mn><mo>−</mo>
  <munderover><mo>∏</mo><mrow><mi>j</mi><mo>=</mo><mn>0</mn></mrow><mrow><mi>n</mi><mo>−</mo><mn>1</mn></mrow></munderover>
  <mfrac><mrow><mn>365</mn><mo>−</mo><mi>j</mi></mrow><mn>365</mn></mfrac>
</math>

**n** is the number of people. The product sign **∏** says to multiply one fraction for each person. **j** counts the birthdays already used, assuming they were all different. **P(n)** is the chance of at least one shared date, expressed as a number from 0 to 1.

## What the model assumes

The model uses a year without February 29 and gives each day the same chance. Each person's birthday is picked independently. Real birthdays vary in frequency, and groups can contain people with related birthdays, such as twins. The percentage comes from the model and is rounded to one decimal place. The calendar shows one group at a time, starting with the same example on each visit.

## Where the idea appears

If a system assigns random IDs from a fixed pool, two records can receive the same ID. The same calculation applies when each ID is equally likely and assigned independently. Replace the 365 dates with the number of available IDs. [NIST notes on collisions and the birthday paradox](https://csrc.nist.gov/csrc/media/events/ispab-december-2005-meeting/documents/b_burr-dec2005-ispab.pdf)

Compare one draw with a growing collection of draws in the [Galton board](/exhibits/galton/).
