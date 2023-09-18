import { test, chromium } from '@playwright/test';
import fs from 'fs';

let browser;
let context;
let page;

// TODO possible to change the dateTo and dateFrom values to first/last ones in index?
const teams = [
  {
    day: 'Monday Combined Leeds',
    url: '/Leeds-MonComb',
    dateFromValue: '25680',
    dateToValue: '26912',
  },
  {
    day: 'Tuesday Vets Leeds',
    url: '/LeedsParkVets-Tue',
    dateFromValue: '25688',
    dateToValue: '26920',
  },
  {
    day: 'Tuesday Leeds',
    url: '/Leeds-Tue',
    dateFromValue: '25688',
    dateToValue: '26920',
  },
  {
    day: 'Wednesday Half Holiday Leeds',
    url: '/Leeds-Wed',
    dateFromValue: '25752',
    dateToValue: '26808',
  },
  {
    day: 'Thursday Vets Leeds',
    url: '/LeedsParkVets-Thu',
    dateFromValue: '25760',
    dateToValue: '26872',
  },
  {
    day: 'Saturday Leeds',
    url: '/Leeds-Sat',
    dateFromValue: '25664',
    dateToValue: '26952',
  },
  {
    day: 'Monday AireDale & Wharfedale',
    url: '/AW-Mon',
    dateFromValue: '25680',
    dateToValue: '26848',
  },
  {
    day: 'Wednesday AireDale & Wharfedale',
    url: '/AW-WedSingles',
    dateFromValue: '25640',
    dateToValue: '27096',
  },
  {
    day: 'Tuesday AireDale & Wharfedale',
    url: '/AW-Vets',
    dateFromValue: '25688',
    dateToValue: '26920',
  },
  {
    day: 'Monday Bradford',
    url: '/Bradford-Mon',
    dateFromValue: '25680',
    dateToValue: '26792',
  },
  {
    day: 'Wednesday Half Holiday Bradford',
    url: '/Bradford-HalfHol',
    dateFromValue: '25752',
    dateToValue: '27040',
  },
  {
    day: 'Saturday Bradford',
    url: '/Bradford-Sat',
    dateFromValue: '25472',
    dateToValue: '27192',
  },
  {
    day: 'Wednesday Spen Valley',
    url: '/WestRiding',
    dateFromValue: '25608',
    dateToValue: '26816',
  },
  {
    day: 'Tuesday Mirfield',
    url: '/Mirfield',
    dateFromValue: '25744',
    dateToValue: '27016',
  },
  {
    day: 'Thursday Vets Bradford',
    url: '/BradfordVets',
    dateFromValue: '25584',
    dateToValue: '26872',
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
    const dateFromValue = team.dateFromValue;
    const dateToValue = team.dateToValue;

    await page.goto(url);

    const popUp = await page
      .frameLocator('#x-Dframe')
      .locator('#x-DlgI > .dlgBtn[value*="Close"]');
    if (popUp) {
      popUp.click();
    } else {
      console.log('No pop up clicked');
    }

    // This is a temporary measure whilst the site update appears
    const continueButton = await page
      .frameLocator('#x-Pframe')
      .locator('#fpTab .fpBtn');
    if (popUp) {
      continueButton.click();
    } else {
      console.log('No Continue button clicked');
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
      .selectOption(dateFromValue);
    await page
      .frameLocator('#x-Pframe')
      .locator('#x-DlgF > .dGrp > select[name=oResT]')
      .selectOption(dateToValue);
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
