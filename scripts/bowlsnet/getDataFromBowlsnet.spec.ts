import { test, chromium } from '@playwright/test';
import fs from 'fs';

let browser;
let context;
let page;

const teams = [
  {
    day: 'Monday Combined Leeds',
    url: 'https://bowlsnet.uk/Leeds/MonComb',
    dateFromValue: '17496',
    dateToValue: '18784',
  },
  {
    day: 'Tuesday Vets Leeds',
    url: 'https://bowlsnet.uk/LeedsParkVets/Tue',
    dateFromValue: '17560',
    dateToValue: '18848',
  },
  {
    day: 'Tuesday Leeds',
    url: 'https://bowlsnet.uk/Leeds/Tue',
    dateFromValue: '17688',
    dateToValue: '18672',
  },
  {
    day: 'Wednesday Half Holiday Leeds',
    url: 'https://bowlsnet.uk/Leeds/Wed',
    dateFromValue: '17456',
    dateToValue: '18800',
  },
  {
    day: 'Thursday Vets Leeds',
    url: 'https://bowlsnet.uk/LeedsParkVets/Thu',
    dateFromValue: '17576',
    dateToValue: '18752',
  },
  {
    day: 'Saturday Leeds',
    url: 'https://bowlsnet.uk/Leeds/Sat',
    dateFromValue: '17424',
    dateToValue: '18880',
  },
  {
    day: 'Monday AireDale & Wharfedale',
    url: 'https://bowlsnet.uk/AW/Mon',
    dateFromValue: '17440',
    dateToValue: '18664',
  },
  {
    day: 'Wednesday AireDale & Wharfedale',
    url: 'https://bowlsnet.uk/AW/WedSingles',
    dateFromValue: '17512',
    dateToValue: '18800',
  },
  {
    day: 'Monday Bradford',
    url: 'https://bowlsnet.uk/Bradford/Mon',
    dateFromValue: '17496',
    dateToValue: '18608',
  },
  {
    day: 'Wednesday Half Holiday Bradford',
    url: 'https://bowlsnet.uk/Bradford/HalfHol',
    dateFromValue: '17568',
    dateToValue: '18856',
  },
  {
    day: 'Saturday Bradford',
    url: 'https://bowlsnet.uk/Bradford/Sat',
    dateFromValue: '17288',
    dateToValue: '18952',
  },
  {
    day: 'Wednesday West Riding & Spen Valley',
    url: 'https://bowlsnet.uk/WestRiding',
    dateFromValue: '17424',
    dateToValue: '18632',
  },
  {
    day: 'Tuesday Mirfield',
    url: 'https://bowlsnet.uk/Mirfield',
    dateFromValue: '17560',
    dateToValue: '18672',
  },
  {
    day: 'Thursday Vets Bradford',
    url: 'https://bowlsnet.uk/BradfordVets',
    dateFromValue: '17400',
    dateToValue: '18752',
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
    const dateFromValue = team.dateFromValue;
    const dateToValue = team.dateToValue;
    const url = team.url;
    await page.goto(url);

    const popUp = await page
      .frameLocator('#x-Dframe')
      .locator('#x-DlgI > input');
    if (popUp) {
      popUp.click();
    } else {
      console.log('No pop up clicked');
    }

    await page
      .frameLocator('#x-Pframe')
      .locator(
        '#x-Menu > .menuSect:nth-child(2) > .menu-btn[onclick*="MenuPage(\'Info\')"]'
      )
      .click();

    await page
      .frameLocator('#x-Pframe')
      .locator('#bbar > .bbar-tab[onclick*="ShowSubPage(4)"]')
      .click();
    await page.frameLocator('#x-Pframe').locator('#r1').click();
    await page.frameLocator('#x-Pframe').locator('#oTab1').click();
    await page.frameLocator('#x-Pframe').locator('#oRes').click();
    await page.frameLocator('#x-Pframe').locator('#oResFull').click();
    await page
      .frameLocator('#x-Pframe')
      .locator('#x-DlgF > .dGrp > select[name=oResF]')
      .selectOption(dateFromValue);
    await page
      .frameLocator('#x-Pframe')
      .locator('#x-DlgF > .dGrp > select[name=oResT]')
      .selectOption(dateToValue);
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
