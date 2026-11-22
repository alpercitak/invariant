---

layout: ../../layouts/Exhibit.astro
title: Doppler effect
description: Change the speed of a sound source and watch its wavefronts crowd ahead and spread behind it.
question: Why does a passing siren sound higher as it approaches?
guide: Start at 0% and move the speed slider to the right. The rings crowd ahead of the arrow and spread behind it. Compare the two pitch readings.
---

## What to look for

Each ring marks the position of a sound crest seen from above. The gold dot marks the source, which releases crests at a steady rate. Between crests, the source moves a little to the right while each crest spreads outward from where it started. This packs the rings tighter ahead and spreads them farther apart behind. A listener hears a higher pitch when more crests pass in a second.

The view follows the source, keeping the dot centered. Press Play to see the rings expand. When the source is moving, their centers drift left relative to the dot.

## The rule

The readout gives the frequency heard by stationary listeners directly ahead of or behind the source. The source produces **440 Hz**, or 440 cycles per second.

<math display="block" aria-label="Heard frequency equals emitted frequency times sound speed divided by sound speed minus or plus source speed">
  <msub><mi>f</mi><mtext>heard</mtext></msub><mo>=</mo>
  <mfrac>
    <mrow><msub><mi>f</mi><mn>0</mn></msub><mi>c</mi></mrow>
    <mrow><mi>c</mi><mo>∓</mo><mi>u</mi></mrow>
  </mfrac>
</math>

Here **f₀** is the emitted frequency. Both frequencies are in hertz. **c** is the speed of sound and **u** is the source speed, both in meters per second. Subtract **u** for a listener ahead and add **u** for a listener behind. At half the speed of sound, the frequency directly ahead doubles to 880 Hz. [The Doppler effect in OpenStax University Physics](https://openstax.org/books/university-physics-volume-1/pages/17-7-the-doppler-effect)

## What the picture assumes

The model assumes straight motion at a constant speed in still air. The slider sets that speed as a percentage of the speed of sound for the whole scene. The animation is slowed down, and older rings fade to keep the view clear. The readings round to the nearest hertz.

## Where the idea appears

An ambulance siren can sound higher as it approaches and lower as it recedes, even if it is emitting the same tone. At the side of the road, the shift changes as the direction from you to the ambulance changes.

See what happens when crests from two different sources meet in [Wave interference](/exhibits/interference/).
