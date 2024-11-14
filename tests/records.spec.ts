import { test } from '@playwright/test';
import { YearSelectPage } from './pages/yearSelectPage';
import { TeamTabsPage } from './pages/teamTabsPage';
import { RecordsPage } from './pages/recordsPage';

let yearSelectPage: YearSelectPage;
let recordsPage: RecordsPage;
let teamTabsPage: TeamTabsPage;

test.beforeEach(async ({ page }) => {
    yearSelectPage = new YearSelectPage(page);
    recordsPage = new RecordsPage(page);
    teamTabsPage = new TeamTabsPage(page);
    await recordsPage.goto();
});

test('Records overview has correct records for 2023', async () => {
    await yearSelectPage.select2023Year();
    recordsPage.recordsOverviewHasCorrectValuesFor2023();
});

test('Records has correct records for Thursday Vets in 2023', async () => {
    await yearSelectPage.select2023Year();
    await teamTabsPage.selectThurVetsTeamFromRecordsTabs();
    recordsPage.recordsHasCorrectValuesForThurVets2023();
});

test('Records has correct records for Tuesday Vets in 2022', async () => {
    await yearSelectPage.select2022Year();
    await teamTabsPage.selectTuesVetsTeamFromRecordsTabs();
    recordsPage.recordsHasCorrectValuesForTuesVets2022();
});

test('Records not show for Wednesday Pairs in 2023 as team did not exist', async () => {
    await yearSelectPage.select2023Year();
    await teamTabsPage.selectWedPairsTeamFromRecordsTabs();
    recordsPage.recordsDoNotExistForWednesdayPairsIn2023();
});

test(`Records year dropdown appears if there are multiple years of records available`, async () => {
    await yearSelectPage.checkYearDropdownHasAllYearOptions(11);
});

// TODO improve these tests