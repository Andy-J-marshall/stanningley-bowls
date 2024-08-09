import { test } from '@playwright/test';
import { ResultPage } from './pages/resultPage';
import { YearSelectPage } from './pages/yearSelectPage';

let yearSelectPage: YearSelectPage;
let resultPage: ResultPage;

test.beforeEach(async ({ page }) => {
  yearSelectPage = new YearSelectPage(page);
  resultPage = new ResultPage(page);
  await resultPage.goto();
});

test('Teams results appear for previous years', async () => {
  await yearSelectPage.select2023Year();
  resultPage.resultsForAll2023TeamsAppear();
});

test(`Stats year dropdown appears if there are multiple years of stats available`, async () => {
  await yearSelectPage.checkYearDropdownHasAllYearOptions(9);
});
