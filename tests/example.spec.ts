import { test, chromium } from '@playwright/test';

test('Monday Stats', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const dateFromValue = '17496';
  const dateToValue = '18784';
  await page.goto('https://bowlsnet.uk/Leeds/MonComb');

  // TODO make this optional?
  await page.frameLocator('#x-Dframe').locator('#x-DlgI > input').click();

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
  const modifier = 'Meta';
  await newPage.focus('body');
  await newPage.keyboard.press(`${modifier}+KeyA`);
  await newPage.keyboard.press(`${modifier}+KeyC`);

  // await page.keyboard.press(`${modifier}+KeyV`);
  // await page.keyboard.press(`${modifier}+KeyV`);
});
