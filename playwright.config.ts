import { defineConfig, devices } from '@playwright/test';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

// Load the correct .env file based on the ENV variable
const env = process.env.ENV || 'dev'; // Default to 'dev' if ENV is not provided
const envFilePath = `.env.${env}`;

if (!fs.existsSync(envFilePath)) {
  throw new Error(`Environment file "${envFilePath}" not found. Please create one.`);
}
dotenv.config({ path: envFilePath });

export default defineConfig({
  testDir: 'tests',
  fullyParallel: true, // Allow parallel execution for better test speed
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0, // Increase retries in CI to handle flaky tests
  timeout: 120000, // 120 seconds global timeout

  expect: {
    timeout: 5000, // Default timeout for `expect` statements
  },

  /* Reporter to use */
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report' }], // HTML report in "playwright-report" folder
    ['json', { outputFile: 'playwright-report/report.json' }], // Optional JSON report
  ],

  use: {
    baseURL: process.env.BASE_URL, // Use base URL from environment
    screenshot: process.env.CI ? 'on' : 'only-on-failure', // Always capture screenshots in CI
    trace: process.env.CI ? 'on' : 'on-first-retry', // Always enable traces in CI for debugging
    video: 'retain-on-failure', // Capture video only for failed tests
  },

  projects: [
    {
      name: 'UI',
      use: {
        ...devices['Desktop Chrome'],
        deviceScaleFactor: undefined,
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          headless: process.env.HEADLESS === 'true', // Run headless based on environment
          slowMo: parseInt(process.env.SLOW_MO || '0', 10), // SlowMo value from environment
          args: ['--start-maximized'],
        },
      },
    },
  ],

  /* Add an example project for other browsers (optional) */
  // Uncomment to enable testing across multiple browsers
  // projects: [
  //   {
  //     name: 'Desktop Chrome',
  //     use: { ...devices['Desktop Chrome'] },
  //   },
  //   {
  //     name: 'Desktop Firefox',
  //     use: { ...devices['Desktop Firefox'] },
  //   },
  //   {
  //     name: 'Desktop Safari',
  //     use: { ...devices['Desktop Safari'] },
  //   },
  // ],
});