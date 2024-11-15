import { test } from './utils/fixture';

test.describe('Records', () => {
    test.beforeEach(async ({ recordsPage }) => {
        await recordsPage.goto();
    });

    test('Records overview has correct records for 2023', async ({
        recordsPage,
        yearSelectPage,
    }) => {
        await yearSelectPage.select2023Year();
        recordsPage.recordsOverviewHasCorrectValuesFor2023();
    });

    test('Records has correct records for Thursday Vets in 2023', async ({
        recordsPage,
        teamTabsPage,
        yearSelectPage,
    }) => {
        await yearSelectPage.select2023Year();
        await teamTabsPage.selectThurVetsTeamFromRecordsTabs();
        recordsPage.recordsHasCorrectValuesForThurVets2023();
    });

    test('Records has correct records for Tuesday Vets in 2022', async ({
        recordsPage,
        teamTabsPage,
        yearSelectPage,
    }) => {
        await yearSelectPage.select2022Year();
        await teamTabsPage.selectTuesVetsTeamFromRecordsTabs();
        recordsPage.recordsHasCorrectValuesForTuesVets2022();
    });

    test('Records not show for Wednesday Pairs in 2023 as team did not exist', async ({
        recordsPage,
        teamTabsPage,
        yearSelectPage,
    }) => {
        await yearSelectPage.select2023Year();
        await teamTabsPage.selectWedPairsTeamFromRecordsTabs();
        recordsPage.recordsDoNotExistForWednesdayPairsIn2023();
    });

    test(`Records year dropdown appears if there are multiple years of records available`, async ({
        yearSelectPage,
    }) => {
        await yearSelectPage.checkYearDropdownHasAllYearOptions(11);
    });

    // TODO improve these tests
});
