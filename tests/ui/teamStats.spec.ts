import { test } from '@playwright/test';
import { YearSelectPage } from './pages/yearSelectPage';
import { TeamStatsPage } from './pages/teamStatsPage';
import { TeamTabsPage } from './pages/teamTabsPage';

let basePage: YearSelectPage;
let teamStatsPage: TeamStatsPage;
let teamTabsPage: TeamTabsPage;

test.beforeEach(async ({ page }) => {
  basePage = new YearSelectPage(page);
  teamStatsPage = new TeamStatsPage(page);
  teamTabsPage = new TeamTabsPage(page);
  await teamStatsPage.goto();
});

test('Teams stats overview has correct stats for 2023', async () => {
  await basePage.select2023Year();
  teamStatsPage.teamStatsOverviewHasCorrectValuesFor2023();
});

test('Teams stats for Tuesday Vets has correct stats for 2023', async () => {
  await basePage.select2023Year();
  await teamTabsPage.selectTuesVetsTeamFromStatsTabs();
  teamStatsPage.teamStatsHasCorrectValuesForTuesVets();
});

test(`Stats year dropdown appears if there are multiple years of stats available`, async () => {
  await basePage.checkYearDropdownHasAllYearOptions();
});
