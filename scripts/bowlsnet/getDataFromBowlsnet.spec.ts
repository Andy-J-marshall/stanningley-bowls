import {
  test,
  chromium,
  Browser,
  BrowserContext,
  Page,
} from '@playwright/test';
import fs from 'fs';

// const year = new Date().getFullYear();
const year = 2013 // TODO change back

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
  // TODO remove WedSingles
  {
    day: 'Wednesday AireDale & Wharfedale',
    url: '/AW-WedSingles',
  },
  {
    day: 'Tuesday AireDale & Wharfedale',
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

    // TODO remove this section
    // Select year
    await page
      .frameLocator('iframe[title="BowlsNet Page"]')
      .getByText('LIVE')
      .click();
    const page1Promise = page.waitForEvent('popup');
    await page
      .frameLocator('iframe[title="BowlsNet Page"]')
      .frameLocator('iframe[title="BowlsNet Dlg"]')
      .getByRole('cell', { name: year.toString() })
      .click();
    const page1 = await page1Promise;
    
    // Navigate to reports
    await page1
      .frameLocator('iframe[title="BowlsNet Page"]')
      .getByText('Report')
      .click();
      // TODO remove

      
    // TODO add this back in
    // await page
    //   .frameLocator('iframe[title="BowlsNet Page"]')
    //   .getByText('Info.')
    //   .click();
    // await page
    //   .frameLocator('iframe[title="BowlsNet Page"]')
    //   .frameLocator('iframe[title="BowlsNet Dlg"]')
    //   .getByRole('button', { name: 'League Report...' })
    //   .click();

    // TODO change back to page rather than page1
    // Choose report options
    await page1
      .frameLocator('iframe[title="BowlsNet Page"]')
      .getByText('Output Tables')
      .click();
    await page1
      .frameLocator('iframe[title="BowlsNet Page"]')
      .getByText('Output Selected Results')
      .click();
    await page1
      .frameLocator('iframe[title="BowlsNet Page"]')
      .getByText('Output Full Results')
      .click();
    await page1
      .frameLocator('iframe[title="BowlsNet Page"]')
      .locator('select[name="oResF"]')
      .selectOption({ index: 1 });
    const dateOptionCount = await page1
      .frameLocator('iframe[title="BowlsNet Page"]')
      .locator('select[name="oResT"] > option')
      .count();
    await page1
      .frameLocator('iframe[title="BowlsNet Page"]')
      .locator('select[name="oResT"]')
      .selectOption({ index: dateOptionCount - 1 });
    await page1
      .frameLocator('iframe[title="BowlsNet Page"]')
      .getByRole('button', { name: 'Generate Report' })
      .click();

    await page1.frameLocator('#x-Pframe').locator('#oResFull').check();
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      await page1.frameLocator('#x-Pframe').locator('#dRBtn').click(),
    ]);

    // Create text file
    const filePath = `./bowlsnetReports/${year}/${team.day}.txt`;
    await newPage.bringToFront();
    const value = await newPage.$eval('body > pre', (el) => el.innerHTML);
    fs.writeFileSync(filePath, value);
  });
}
