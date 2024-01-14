import { test } from '@playwright/test';
import { BasePage } from './pages/basePage';
import { TeamStatsPage } from './pages/teamStatsPage';

let basePage: BasePage;
let teamStatsPage: TeamStatsPage;

test.beforeEach(async ({ page }) => {
  basePage = new BasePage(page);
  teamStatsPage = new TeamStatsPage(page);
  await teamStatsPage.goto();
});

test('Teams stats overview has correct stats for 2023', async () => {
  await basePage.select2023Year();
  teamStatsPage.teamStatsOverviewHasCorrectValuesFor2023();
});

test('Teams stats for Tuesday Vets has correct stats for 2023', async () => {
  await basePage.select2023Year();
  teamStatsPage.teamStatsHasCorrectValuesForTuesVets();
});

test(`Stats year dropdown appears if there are multiple years of stats available`, async () => {
  await basePage.checkYearDropdownHasAllYearOptions();
});
