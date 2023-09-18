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
    url: '/LeedsParkVets-Tue',
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
    day: 'Thursday Vets Leeds',
    url: '/LeedsParkVets-Thu',
  },
  {
    day: 'Saturday Leeds',
    url: '/Leeds-Sat',
  },
  {
    day: 'Monday AireDale & Wharfedale',
    url: '/AW-Mon',
  },
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
    day: 'Saturday Bradford',
    url: '/Bradford-Sat',
  },
  {
    day: 'Wednesday Spen Valley',
    url: '/WestRiding',
  },
  {
    day: 'Tuesday Mirfield',
    url: '/Mirfield',
  },
  {
    day: 'Thursday Vets Bradford',
    url: '/BradfordVets',
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

    const popUp = await page
      .frameLocator('#x-Dframe')
      .locator('#x-DlgI > .dlgBtn[value*="Close"]');
    const popUpCount = await popUp.count();

    if (popUpCount > 0) {
      await popUp.click();
    }

    await page
      .frameLocator('#x-Pframe')
      .locator('#x-Menu .menu-btn[onclick*="lgeDlg(\'DInfo\')"]')
      .click();
    await page
      .frameLocator('#x-Dframe')
      .locator('#x-DlgI .dlgBtn[onclick*="dAct(4)"]')
      .click();
    await page
      .frameLocator('#x-Pframe')
      .locator('#x-DlgF label:nth-child(3) [name="Clip"]')
      .click();
    await page
      .frameLocator('#x-Pframe')
      .locator('#x-DlgF [name="oTab1"]')
      .click();
    await page
      .frameLocator('#x-Pframe')
      .locator('#x-DlgF [name="oRes"]')
      .click();
    await page
      .frameLocator('#x-Pframe')
      .locator('#x-DlgF > .dGrp > select[name=oResF]')
      .selectOption({ index: 1 });

    const dateOptionCount = await page
      .frameLocator('#x-Pframe')
      .locator('#x-DlgF > .dGrp > select[name=oResT] > option')
      .count();

    await page
      .frameLocator('#x-Pframe')
      .locator('#x-DlgF > .dGrp > select[name=oResT]')
      .selectOption({ index: dateOptionCount - 1 });
    await page
      .frameLocator('#x-Pframe')
      .locator('#x-DlgF [name="oResFull"]')
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
