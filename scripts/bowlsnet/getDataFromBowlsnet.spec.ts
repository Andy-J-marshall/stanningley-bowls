import {
  test,
  chromium,
  Browser,
  BrowserContext,
  Page,
} from '@playwright/test';
import fs from 'fs';

const year = new Date().getFullYear();

function sleep() {
  return new Promise((resolve) => setTimeout(resolve, 1000));
}

const teams = [
  {
    day: 'Monday Combined Leeds',
    url: '/Leeds-MonComb',
  },
  {
    day: 'Tuesday Vets Leeds',
    url: '/Leeds-TueVets',
  },
  {
    day: 'Tuesday Leeds',
    url: '/Leeds-Tue',
  },
  {
    day: 'Wednesday Half Holiday Leeds',
    url: '/Leeds-Wed',
  },
  {
    day: 'Wednesday Pairs AireWharfe',
    url: '/AW-WedPairs',
  },
  {
    day: 'Thursday Vets Leeds',
    url: '/Leeds-ThuVets',
  },
  {
    day: 'Saturday Leeds',
    url: '/Leeds-Sat',
  },
  {
    day: 'Tuesday Mirfield',
    url: '/Mirfield',
  },
  {
    day: 'Wednesday Spen Valley',
    url: '/WestRiding',
  },
  {
    day: 'Monday AireWharfe',
    url: '/AW-Mon',
  },
  {
    day: 'Tuesday AireWharfe',
    url: '/AW-Vets',
  },
  {
    day: 'Monday Bradford',
    url: '/Bradford-Mon',
  },
  {
    day: 'Wednesday Half Holiday Bradford',
    url: '/Bradford-HalfHol',
  },
  {
    day: 'Thursday Vets Bradford',
    url: '/Bradford-Vets',
  },
  {
    day: 'Saturday Bradford',
    url: '/Bradford-Sat',
  },
];

for (const team of teams) {
  test(`${team.day} Stats`, async () => {
    // Browser set up
    const browser: Browser = await chromium.launch();
    const context: BrowserContext = await browser.newContext();
    let page: Page = await context.newPage();

    // Test
    await page.goto(team.url);
    await sleep();

    // Click pop up if present
    try {
      const popUp = await page
        .frameLocator('iframe[title="BowlsNet Page"]')
        .frameLocator('iframe[title="BowlsNet Dlg"]')
        .getByRole('button', { name: 'Close' });
      const popUpCount = await popUp.count();
      if (popUpCount > 0) {
        await popUp.click();
      }
    } catch (error) {
      console.log(`No popup to click for ${team.day}, continuing...`);
    }

    // Find match reports
    await page
      .frameLocator('iframe[title="BowlsNet Page"]')
      .getByText('Fixtures', { exact: true })
      .click();

    await page
      .frameLocator('iframe[title="BowlsNet Page"]')
      .locator('div')
      .filter({ hasText: /^\.\.\. ▼$/ })
      .click();

    await page
      .frameLocator('iframe[title="BowlsNet Page"]')
      .frameLocator('iframe[title="BowlsNet Dlg"]')
      .getByRole('button', { name: 'Export MatchCards...' })
      .click();

    // View report in new tab
    const newPagePromise = page.waitForEvent('popup');
    await page
      .frameLocator('iframe[title="BowlsNet Page"]')
      .frameLocator('iframe[title="BowlsNet Dlg"]')
      .getByRole('button', { name: 'In Text Format' })
      .click();

    const newPage = await newPagePromise;
    await newPage.bringToFront();
    await newPage.waitForLoadState('domcontentloaded');

    // Create text file
    const value = await newPage.evaluate(
      () => document.querySelector('body > pre')?.textContent
    );
    const filePath = `./bowlsnetReports/${year}/${team.day}.txt`;
    fs.writeFile(filePath, value as string, (err) => {
      if (err) {
        console.log(err);
      }
    });
  });
}
