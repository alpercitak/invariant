import { defineConfig } from '@playwright/test';

const baseURL = 'http://127.0.0.1:4173';

export default defineConfig({
  testDir: './tests/browser',
  use: { baseURL },
  webServer: {
    command: 'bun run build && bun run preview --host 127.0.0.1 --port 4173',
    url: baseURL,
  },
});
