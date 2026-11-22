---

layout: ../../layouts/Exhibit.astro
title: Standing waves
description: Change the harmonic of a string fixed at both ends and see which points stay still.
question: How can a string vibrate while some points stay still?
guide: Press Play and watch the teal dots. Change the harmonic and count how many more points stay still.
---

## What to look for

Start with harmonic 1. The string makes one bulge, and its two ends stay still. At harmonic 2, the midpoint stays still as well. The two halves move in opposite directions.

The still points are **nodes**. Halfway between neighboring nodes are **antinodes**, where the string moves the most. The dashed lines show how far the string can move in either direction.

## The rule

A string fixed at both ends can fit a whole number **n** of half wavelengths along its length. The number **n** is the harmonic. It gives the number of bulges and sets the frequency.

<math display="block" aria-label="Frequency f sub n equals n times wave speed v divided by twice the string length L">
  <msub><mi>f</mi><mi>n</mi></msub><mo>=</mo><mfrac><mrow><mi>n</mi><mi>v</mi></mrow><mrow><mn>2</mn><mi>L</mi></mrow></mfrac>
</math>

Here **L** is the string length in meters, **v** is the wave speed in meters per second, and **fₙ** is the frequency in hertz. This exhibit uses a 1 m string and a wave speed of 100 m/s, so the first harmonic is 50 Hz. The playback is slowed 300 times to make the motion visible.

<math display="block" aria-label="Displacement at position x and time t equals A times sine of n pi x over L times cosine of two pi f sub n t">
  <mi>y</mi><mo>(</mo><mi>x</mi><mo>,</mo><mi>t</mi><mo>)</mo><mo>=</mo><mi>A</mi>
  <mi>sin</mi><mo>(</mo><mfrac><mrow><mi>n</mi><mi>π</mi><mi>x</mi></mrow><mi>L</mi></mfrac><mo>)</mo>
  <mi>cos</mi><mo>(</mo><mn>2</mn><mi>π</mi><msub><mi>f</mi><mi>n</mi></msub><mi>t</mi><mo>)</mo>
</math>

**x** is the distance along the string in meters, **t** is time in seconds, and **A** is the peak displacement at an antinode. The drawing shows displacement relative to this peak.

The sine sets the shape along the string. Wherever it is zero, the string stays still through the whole cycle. The cosine sets how the shape changes over time.

## Where the idea appears

The exhibit uses a uniform string with fixed ends and shows one harmonic at a time, with no loss of amplitude. A plucked guitar string typically vibrates in several modes at once, and the modes fade as the string loses energy.

Explore how adding individual frequencies can produce a more complex shape in [Fourier drawing](/exhibits/fourier/).

## Further reading

- [Standing waves and resonance in OpenStax University Physics](https://openstax.org/books/university-physics-volume-1/pages/16-6-standing-waves-and-resonance).
