import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: '.',
  timeout: 25 * 1000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  forbidOnly: true,
  retries: 2,
  // reporter: 'html',
  use: {
    actionTimeout: 0,
    baseURL: 'https://bowlsnet.uk',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
};

export default config;
