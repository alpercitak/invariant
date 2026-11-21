---
layout: ../../layouts/Exhibit.astro
title: Fourier drawing
description: Add rotating circles and watch their combined motion trace a paper plane.
category: Waves and signals
question: How can rotating circles draw a shape?
---

## What to look for

Move the slider to one circle. Its arrow sweeps around at a steady rate, so the gold point traces a loop. As you add circles, each new arrow starts where the last one ends. The tip of the chain follows the combined motion. Watch what happens around the nose and the notch as the gold curve comes closer to the dashed outline.

The display keeps the strongest rotations first. A circle's size shows how much that rotation contributes. Its speed tells you how many times it turns during one trip around the outline. Negative frequencies turn clockwise. The stationary term sets the center of the drawing and stays in place even when the slider is at zero.

## The rule

The exhibit samples 129 points at equal distances along the closed outline. It reads each point as a complex number with its horizontal coordinate as the real part and its vertical coordinate as the imaginary part. The discrete Fourier transform finds a coefficient for each rotation by comparing that rotation to the samples.

<math display="block" aria-label="The reconstructed point at phase t equals the sum over selected frequencies k of c sub k times e raised to two pi i k t">
  <mi>z</mi><mo>(</mo><mi>t</mi><mo>)</mo><mo>=</mo>
  <munder><mo>∑</mo><mrow><mi>k</mi><mo>∈</mo><mi>S</mi></mrow></munder>
  <msub><mi>c</mi><mi>k</mi></msub>
  <msup><mi>e</mi><mrow><mn>2</mn><mi>π</mi><mi>i</mi><mi>k</mi><mi>t</mi></mrow></msup>
</math>

Here <math><mi>t</mi></math> is the fraction of a lap, <math><mi>i</mi></math> is the imaginary unit, and <math><mi>S</mi></math> is the set of frequencies currently included. Each coefficient <math><msub><mi>c</mi><mi>k</mi></msub></math> gives its arrow a length and a starting angle. The factor after it rotates that arrow <math><mi>k</mi></math> times per lap. Adding the arrows gives the reconstructed position <math><mi>z</mi></math>.

## Reading the error

The RMS sample error is the root mean square of the distances between the gold curve and the original points at the 129 sample times. It uses the drawing's coordinate units. At the maximum, 128 rotating terms plus the stationary term recover those sample points within floating-point rounding. Between sample points the reconstruction is a smooth periodic curve, so it can round a sharp corner or overshoot it slightly.

## Where the idea appears

Frequency analysis uses the same change of representation. For example, an engineer can examine the strongest frequencies in a vibration recording to see which repeating motions dominate. Here, the signal happens to be a position moving around a plane.

[Kuramoto synchronization](/exhibits/kuramoto/) uses rotating arrows too. There, the arrows describe rhythms that influence one another.

## Further reading

- [Discrete Fourier transform convention in the FFTW manual](https://www.fftw.org/fftw3_doc/The-1d-Discrete-Fourier-Transform-_0028DFT_0029.html). This exhibit divides by the number of samples when computing coefficients so the inverse sum needs no further scaling.
- [Grant Sanderson's visual introduction to Fourier series](https://www.3blue1brown.com/lessons/fourier-series/).
