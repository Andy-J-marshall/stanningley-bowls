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
        await yearSelectPage.select2023Year();

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
        await yearSelectPage.select2021Year();

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
        await yearSelectPage.select2013Year();

        expect(resultPage.teamResultsSections).toHaveCount(8);
        expect(resultPage.resultRows).toHaveCount(146);

        expect(resultPage.firstResultHomeTeam).toHaveText('Greenbottom B');
        expect(resultPage.firstResultHomeScore).toHaveText('10');
        expect(resultPage.firstResultAwayTeam).toHaveText('STANNINGLEY A');
        expect(resultPage.firstResultAwayScore).toHaveText('20');
    });

    test(`Stats year dropdown appears if there are multiple years of stats available`, async ({
        yearSelectPage,
    }) => {
        await yearSelectPage.checkYearDropdownHasAllYearOptions(11);
    });
});
