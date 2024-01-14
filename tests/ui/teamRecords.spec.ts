import { test } from '@playwright/test';
import { YearSelectPage } from './pages/yearSelectPage';
import { TeamTabsPage } from './pages/teamTabsPage';
import { TeamRecordsPage } from './pages/teamRecordsPage';

let basePage: YearSelectPage;
let teamRecordsPage: TeamRecordsPage;
let teamTabsPage: TeamTabsPage;

test.beforeEach(async ({ page }) => {
  basePage = new YearSelectPage(page);
  teamRecordsPage = new TeamRecordsPage(page);
  teamTabsPage = new TeamTabsPage(page);
  await teamRecordsPage.goto();
});

test('Team records are correct for 2023', async () => {
  await basePage.select2023Year();
  teamRecordsPage.teamRecordsAreCorrectFor2023();
});
