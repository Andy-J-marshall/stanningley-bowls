import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: '.',
  timeout: 20 * 1000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  forbidOnly: true,
  retries: 0, // TODO revert this back to 2
  workers: 4,
  // reporter: 'html', // TODO revert this back
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
