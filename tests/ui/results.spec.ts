import { test } from '@playwright/test';
import { BasePage } from './pages/basePage';
import { ResultPage } from './pages/resultPage';

let basePage: BasePage;
let resultPage: ResultPage;

test.beforeEach(async ({ page }) => {
  basePage = new BasePage(page);
  resultPage = new ResultPage(page);
  await resultPage.goto();
});

test('Teams results appear for previous years', async () => {
  await basePage.select2023Year();
  await basePage.checkYearDropdownHasAllYearOptions();
  resultPage.resultsForAll2023TeamsAppear();
});
