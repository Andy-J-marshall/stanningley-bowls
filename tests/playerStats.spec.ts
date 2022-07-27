import { expect, test } from '@playwright/test';
import bowlsStats2022 from '../src/data/bowlsStats2022.json';

const numberOfPlayers = Object.keys(bowlsStats2022.playerResults).length;
const { statsYear } = bowlsStats2022;

// TODO add POM

test.beforeEach(async ({ page }) => {
  await page.goto('/#/stats/player');
});

test('Stats are checking for current year', async () => {
  const currentYear = new Date().getFullYear();
  expect(statsYear).toEqual(currentYear.toString());
});

test('Stats search bar returns correct player', async ({ page }) => {
  await page
    .locator(
      '#player-search-form input.rbt-input-main.form-control.rbt-input.form-control-lg'
    )
    .type('Andy Marshall'); // TODO change
  await page.locator('#player-search').click();
  await page.locator('#player-search-form > button').click();
  await expect(page.locator('#stats .list-group-item')).toHaveCount(1);
});

test('All players appear by default', async ({ page }) => {
  await expect(page.locator('#stats .list-group-item')).toHaveCount(
    numberOfPlayers
  );
});
