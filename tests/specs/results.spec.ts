import { expect } from '@playwright/test';
import { test } from '../utils/fixture';

test.describe('Results', () => {
    test.beforeEach(async ({ resultPage }) => {
        await resultPage.goto();
    });

    test('Teams results appear for 2023', async ({
        resultPage,
        yearSelectPage,
    }) => {
        await yearSelectPage.selectYear(2023);

        expect(resultPage.teamResultsSections).toHaveCount(6);
        expect(resultPage.resultRows).toHaveCount(112);

        expect(resultPage.firstResultHomeTeam).toHaveText('STANNINGLEY');
        expect(resultPage.firstResultHomeScore).toHaveText('29');
        expect(resultPage.firstResultAwayTeam).toHaveText('Garforth C C');
        expect(resultPage.firstResultAwayScore).toHaveText('13');
    });

    test('Teams results appear for 2021', async ({
        resultPage,
        yearSelectPage,
    }) => {
        await yearSelectPage.selectYear(2021);

        expect(resultPage.teamResultsSections).toHaveCount(3);
        expect(resultPage.resultRows).toHaveCount(40);

        expect(resultPage.firstResultHomeTeam).toHaveText('Guiseley B');
        expect(resultPage.firstResultHomeScore).toHaveText('19');
        expect(resultPage.firstResultAwayTeam).toHaveText('STANNINGLEY');
        expect(resultPage.firstResultAwayScore).toHaveText('11');
    });

    test('Teams results appear for 2013', async ({
        resultPage,
        yearSelectPage,
    }) => {
        await yearSelectPage.selectYear(2013);

        expect(resultPage.teamResultsSections).toHaveCount(8);
        expect(resultPage.resultRows).toHaveCount(146);

        expect(resultPage.firstResultHomeTeam).toHaveText('Greenbottom B');
        expect(resultPage.firstResultHomeScore).toHaveText('10');
        expect(resultPage.firstResultAwayTeam).toHaveText('STANNINGLEY A');
        expect(resultPage.firstResultAwayScore).toHaveText('20');
    });

    test('Results do not appear if All Years is selected', async ({
        playerSummaryPage,
        resultPage,
        yearSelectPage,
    }) => {
        // Note: the All Years dropdown is only accessible in PlayerStats
        await playerSummaryPage.goto();
        await yearSelectPage.selectAllYears();
        await resultPage.goto();

        await expect(resultPage.noResultsMessage).toBeVisible();
    });

    test(`Stats year dropdown appears if there are multiple years of stats available`, async ({
        yearSelectPage,
    }) => {
        await yearSelectPage.checkYearDropdownHasAllYearOptions(11);
    });
});
