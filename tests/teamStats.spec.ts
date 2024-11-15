import { test } from './utils/fixture';

test.describe('Team Stats', () => {
    test.beforeEach(async ({ teamStatsPage }) => {
        await teamStatsPage.goto();
    });

    test('Teams stats overview has correct stats for 2023', async ({
        teamStatsPage,
        yearSelectPage,
    }) => {
        await yearSelectPage.select2023Year();
        teamStatsPage.teamStatsOverviewHasCorrectValuesFor2023();
    });

    test('Teams stats for Tuesday Vets has correct stats for 2023', async ({
        teamStatsPage,
        teamTabsPage,
        yearSelectPage,
    }) => {
        await yearSelectPage.select2023Year();
        await teamTabsPage.selectTuesVetsTeamFromStatsTabs();
        teamStatsPage.teamStatsHasCorrectValuesForTuesVets2023();
    });

    test('Teams stats for Monday has correct stats for 2022', async ({
        teamStatsPage,
        teamTabsPage,
        yearSelectPage,
    }) => {
        await yearSelectPage.select2022Year();
        await teamTabsPage.selectMondayTeamFromStatsTabs();
        teamStatsPage.teamStatsHasCorrectValuesForMonday2022();
    });

    test('Team stats not show for Wednesday Pairs in 2023 as team did not exist', async ({
        teamStatsPage,
        teamTabsPage,
        yearSelectPage,
    }) => {
        await yearSelectPage.select2022Year();
        await teamTabsPage.selectWedPairsTeamFromStatsTabs();
        teamStatsPage.teamStatsDoNotExistForWednesdayPairsIn2023();
    });

    test(`Stats year dropdown appears if there are multiple years of stats available`, async ({
        yearSelectPage,
    }) => {
        await yearSelectPage.checkYearDropdownHasAllYearOptions(11);
    });

    // TODO improve these tests
});
