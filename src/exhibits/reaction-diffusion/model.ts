export const WIDTH = 144;
export const HEIGHT = 96;
export const DIFFUSION_U = 0.16;
export const DIFFUSION_V = 0.08;

export const PRESETS = [
  {
    name: 'Spots',
    feed: 0.0367,
    kill: 0.0649,
    description: 'With Spots, patches tend to grow, split, and stay separate.',
  },
  {
    name: 'Stripes',
    feed: 0.029,
    kill: 0.057,
    description: 'With Stripes, patches spread into bands that often join.',
  },
] as const;

type Field = {
  width: number;
  height: number;
  u: Float32Array;
  v: Float32Array;
  nextU: Float32Array;
  nextV: Float32Array;
};

export function createField(width = WIDTH, height = HEIGHT): Field {
  const size = width * height;
  return {
    width,
    height,
    u: new Float32Array(size).fill(1),
    v: new Float32Array(size),
    nextU: new Float32Array(size),
    nextV: new Float32Array(size),
  };
}

function random(seed: number): () => number {
  let value = seed >>> 0;
  return () => {
    value = (value + 0x6d2b79f5) | 0;
    let next = Math.imul(value ^ (value >>> 15), 1 | value);
    next ^= next + Math.imul(next ^ (next >>> 7), 61 | next);
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}

export function seededField(): Field {
  const field = createField();
  const sample = random(42);
  for (let centerY = 12; centerY < HEIGHT; centerY += 24) {
    for (let centerX = 12; centerX < WIDTH; centerX += 24) {
      const x = centerX + (sample() - 0.5) * 6;
      const y = centerY + (sample() - 0.5) * 6;
      const radius = 4.5;
      for (let row = Math.ceil(y - radius); row <= Math.floor(y + radius); row += 1) {
        for (let column = Math.ceil(x - radius); column <= Math.floor(x + radius); column += 1) {
          const dx = column - x;
          const dy = row - y;
          if (dx * dx + dy * dy <= radius * radius) {
            const index = row * WIDTH + column;
            field.u[index] = 0.5 + (sample() - 0.5) * 0.04;
            field.v[index] = 0.25 + (sample() - 0.5) * 0.02;
          }
        }
      }
    }
  }
  return field;
}

export function stepField(field: Field, { feed, kill }: { feed: number; kill: number }): void {
  const { width, height, u, v, nextU, nextV } = field;

  for (let row = 0; row < height; row += 1) {
    const above = ((row + height - 1) % height) * width;
    const below = ((row + 1) % height) * width;
    const current = row * width;
    for (let column = 0; column < width; column += 1) {
      const left = (column + width - 1) % width;
      const right = (column + 1) % width;
      const index = current + column;
      const U = u[index];
      const V = v[index];
      const lapU = u[current + left] + u[current + right] + u[above + column] + u[below + column] - 4 * U;
      const lapV = v[current + left] + v[current + right] + v[above + column] + v[below + column] - 4 * V;
      const reaction = U * V * V;
      nextU[index] = U + DIFFUSION_U * lapU - reaction + feed * (1 - U);
      nextV[index] = V + DIFFUSION_V * lapV + reaction - (feed + kill) * V;
    }
  }

  field.u = nextU;
  field.v = nextV;
  field.nextU = u;
  field.nextV = v;
}
