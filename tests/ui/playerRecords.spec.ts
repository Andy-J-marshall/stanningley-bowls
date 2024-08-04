import { test } from '@playwright/test';
import { YearSelectPage } from './pages/yearSelectPage';
import { TeamTabsPage } from './pages/teamTabsPage';
import { PlayerRecordsPage } from './pages/playerRecordsPage';

let basePage: YearSelectPage;
let playerRecordsPage: PlayerRecordsPage;
let teamTabsPage: TeamTabsPage;

test.beforeEach(async ({ page }) => {
  basePage = new YearSelectPage(page);
  playerRecordsPage = new PlayerRecordsPage(page);
  teamTabsPage = new TeamTabsPage(page);
  await playerRecordsPage.goto();
});

test('Player records overview has correct records for 2023', async () => {
  await basePage.select2023Year();
  playerRecordsPage.playerRecordsOverviewHasCorrectValuesFor2023();
});

test('Player records has correct records for Thursday Vets in 2023', async () => {
  await basePage.select2023Year();
  await teamTabsPage.selectThurVetsTeamFromRecordsTabs();
  playerRecordsPage.playerRecordsHasCorrectValuesForThurVets2023();
});

test('Player records has correct records for Tuesday Vets in 2022', async () => {
  await basePage.select2022Year();
  await teamTabsPage.selectTuesVetsTeamFromRecordsTabs();
  playerRecordsPage.playerRecordsHasCorrectValuesForTuesVets2022();
});

test(`Records year dropdown appears if there are multiple years of records available`, async () => {
  await basePage.checkYearDropdownHasAllYearOptions(11);
});
