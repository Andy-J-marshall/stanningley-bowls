import { test } from '@playwright/test';
import { YearSelectPage } from './pages/yearSelectPage';
import { TeamTabsPage } from './pages/teamTabsPage';
import { playerRecordsPage } from './pages/playerRecordsPage';

let basePage: YearSelectPage;
let teamRecordsPage: playerRecordsPage;
let teamTabsPage: TeamTabsPage;

test.beforeEach(async ({ page }) => {
  basePage = new YearSelectPage(page);
  teamRecordsPage = new playerRecordsPage(page);
  teamTabsPage = new TeamTabsPage(page);
  await teamRecordsPage.goto();
});

test('Player records overview has correct records for 2023', async () => {
  await basePage.select2023Year();
  teamRecordsPage.playerRecordsOverviewHasCorrectValuesFor2023();
});

test('Player records has correct records for Thursday Vets in 2023', async () => {
  await basePage.select2023Year();
  await teamTabsPage.selectThurVetsTeamFromRecordsTabs();
  teamRecordsPage.playerRecordsHasCorrectValuesForThurVets();
});

test(`Records year dropdown appears if there are multiple years of records available`, async () => {
  await basePage.checkYearDropdownHasAllYearOptions();
});
