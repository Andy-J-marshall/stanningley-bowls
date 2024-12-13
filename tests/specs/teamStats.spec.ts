import { expect } from '@playwright/test';
import { test } from '../utils/fixture';

test.describe('Team Stats', () => {
    test.beforeEach(async ({ teamStatsPage }) => {
        await teamStatsPage.goto();
    });

    test('Teams stats overview has correct stats for 2023', async ({
        teamStatsPage,
        yearSelectPage,
    }) => {
        await yearSelectPage.selectYear(2023);

        expect(teamStatsPage.totalGamesValue).toBeVisible();
        expect(teamStatsPage.tuesVetsGamesValue).toBeVisible({
            visible: false,
        });

        expect(teamStatsPage.totalGamesValue).toContainText('112');
        expect(teamStatsPage.totalWinsValue).toContainText('87');
        expect(teamStatsPage.totalLossesValue).toContainText('20');
        expect(teamStatsPage.totalDrawsValue).toContainText('5');
        expect(teamStatsPage.totalWinPercValue).toContainText('78%');
        expect(teamStatsPage.totalHomeWinPercValue).toContainText('94%');
        expect(teamStatsPage.totalAwayWinPercValue).toContainText('59%');
        expect(teamStatsPage.totalCupWinPercValue).toContainText('86%');
        expect(teamStatsPage.totalAggValue).toContainText('15238');
        expect(teamStatsPage.totalOpponentAggValue).toContainText('11461');
    });

    test('Teams stats for Tuesday Vets has correct stats for 2023', async ({
        teamStatsPage,
        teamTabsPage,
        yearSelectPage,
    }) => {
        await yearSelectPage.selectYear(2023);
        await teamTabsPage.selectTuesVetsTeamTab();

        expect(teamStatsPage.tuesVetsGamesValue).toBeVisible();
        expect(teamStatsPage.totalGamesValue).toBeVisible({ visible: false });

        expect(teamStatsPage.tuesVetsGamesValue).toContainText('22');
        expect(teamStatsPage.tuesVetsWinsValue).toContainText('21');
        expect(teamStatsPage.tuesVetsLossesValue).toContainText('1');
        expect(teamStatsPage.tuesVetsDrawsValue).toHaveCount(0);
        expect(teamStatsPage.tuesVetsWinPercValue).toContainText('95%');
        expect(teamStatsPage.tuesVetsHomeWinPercValue).toContainText('100%');
        expect(teamStatsPage.tuesVetsAwayWinPercValue).toContainText('89%');
        expect(teamStatsPage.tuesVetsCupWinPercValue).toContainText('100%');
        expect(teamStatsPage.tuesVetsAggValue).toContainText('3479');
        expect(teamStatsPage.tuesVetsOpponentAggValue).toContainText('2119');
    });

    test('Teams stats for Monday has correct stats for 2022', async ({
        teamStatsPage,
        teamTabsPage,
        yearSelectPage,
    }) => {
        await yearSelectPage.selectYear(2022);
        await teamTabsPage.selectMondayTeamTab();

        expect(teamStatsPage.mondayGamesValue).toBeVisible();
        expect(teamStatsPage.totalGamesValue).toBeVisible({ visible: false });

        expect(teamStatsPage.mondayGamesValue).toContainText('20');
        expect(teamStatsPage.mondayWinsValue).toContainText('12');
        expect(teamStatsPage.mondayLossesValue).toContainText('5');
        expect(teamStatsPage.mondayDrawsValue).toContainText('3');
        expect(teamStatsPage.mondayWinPercValue).toContainText('60%');
        expect(teamStatsPage.mondayHomeWinPercValue).toContainText('70%');
        expect(teamStatsPage.mondayAwayWinPercValue).toContainText('50%');
        expect(teamStatsPage.mondayCupWinPercValue).toHaveCount(0);
        expect(teamStatsPage.mondayAggValue).toContainText('2077');
        expect(teamStatsPage.mondayOpponentAggValue).toContainText('1797');
    });

    test('Team stats not show for Wednesday Pairs in 2023 as team did not exist', async ({
        teamStatsPage,
        teamTabsPage,
        yearSelectPage,
    }) => {
        await yearSelectPage.selectYear(2023);
        await teamTabsPage.selectWedPairsTeamTab();

        await expect(teamStatsPage.noGamesMessage).toBeVisible();
    });

    test('Team stats show B team if there is one', async ({
        teamStatsPage,
        teamTabsPage,
        yearSelectPage,
    }) => {
        await teamTabsPage.selectMondayTeamTab();

        await yearSelectPage.selectYear(2013);
        await expect(teamStatsPage.mondayTeamStats).toHaveCount(2);

        await yearSelectPage.selectYear(2021);
        await expect(teamStatsPage.mondayTeamStats).toHaveCount(1);
    });

    test(`Stats year dropdown appears if there are multiple years of stats available`, async ({
        yearSelectPage,
    }) => {
        await yearSelectPage.checkYearDropdownHasAllYearOptions(11);
    });
});
