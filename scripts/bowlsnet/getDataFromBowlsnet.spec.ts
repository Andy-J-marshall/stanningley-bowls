import { test, chromium } from '@playwright/test';
import fs from 'fs';

let browser;
let context;
let page;

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
    day: 'Monday AireDale & Wharfedale',
    url: '/AW-Mon',
  },
  {
    day: 'Tuesday AireDale & Wharfedale',
    url: '/AW-Vets',
  },
  {
    day: 'Wednesday AireDale & Wharfedale',
    url: '/AW-WedSingles',
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
  test.beforeEach(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
  });

  test(`${team.day} Stats`, async () => {
    const day = team.day;
    const filePath = `./files/htmlFiles/${day}.html`;
    const url = team.url;

    await page.goto(url);
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

    // Navigate to reports
    await page
      .frameLocator('iframe[title="BowlsNet Page"]')
      .getByText('Info.')
      .click();
    await page
      .frameLocator('iframe[title="BowlsNet Page"]')
      .frameLocator('iframe[title="BowlsNet Dlg"]')
      .getByRole('button', { name: 'League Report...' })
      .click();

    // Choose report options
    await page
      .frameLocator('iframe[title="BowlsNet Page"]')
      .getByText('Formatted Report')
      .click();
    await page
      .frameLocator('iframe[title="BowlsNet Page"]')
      .getByText('Output Tables')
      .click();
    await page
      .frameLocator('iframe[title="BowlsNet Page"]')
      .getByText('Output Selected Results')
      .click();
    await page
      .frameLocator('iframe[title="BowlsNet Page"]')
      .getByText('Output Full Results')
      .click();
    await page
      .frameLocator('iframe[title="BowlsNet Page"]')
      .locator('select[name="oResF"]')
      .selectOption({ index: 1 });
    const dateOptionCount = await page
      .frameLocator('iframe[title="BowlsNet Page"]')
      .locator('select[name="oResT"] > option')
      .count();
    await page
      .frameLocator('iframe[title="BowlsNet Page"]')
      .locator('select[name="oResT"]')
      .selectOption({ index: dateOptionCount - 1 });
    await page
      .frameLocator('iframe[title="BowlsNet Page"]')
      .getByRole('button', { name: 'Generate Report' })
      .click();

    await page.frameLocator('#x-Pframe').locator('#oResFull').check();
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      await page.frameLocator('#x-Pframe').locator('#dRBtn').click(),
    ]);

    await newPage.bringToFront();
    const value = await newPage.$eval('body', (el) => el.innerHTML);
    const html = `<html><body>${value}</body></html>`;
    fs.writeFileSync(filePath, html);
  });
}
