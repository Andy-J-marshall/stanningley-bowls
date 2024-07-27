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
  teamStatsPage.teamStatsHasCorrectValuesForTuesVets2023();
});

test('Teams stats for Monday has correct stats for 2022', async () => {
  await basePage.select2022Year();
  await teamTabsPage.selectMondayTeamFromStatsTabs();
  teamStatsPage.teamStatsHasCorrectValuesForMonday2022();
});

test('Team stats not show for Wednesday Pairs in 2023 as team did not exist', async () => {
  await basePage.select2022Year();
  await teamTabsPage.selectWedPairsTeamFromStatsTabs();
  teamStatsPage.teamStatsDoNotExistForWednesdayPairsIn2023();
});

test(`Stats year dropdown appears if there are multiple years of stats available`, async () => {
  await basePage.checkYearDropdownHasAllYearOptions(3);
});
