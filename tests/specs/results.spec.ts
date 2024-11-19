import { expect } from '@playwright/test';
import { test } from '../utils/fixture';

test.describe('Results', () => {
    test.beforeEach(async ({ resultPage }) => {
        await resultPage.goto();
    });

    test('Teams results appear for previous years', async ({
        resultPage,
        yearSelectPage,
    }) => {
        await yearSelectPage.select2023Year();

        expect(resultPage.teamResultsSections).toHaveCount(6);
    });

    test(`Stats year dropdown appears if there are multiple years of stats available`, async ({
        yearSelectPage,
    }) => {
        await yearSelectPage.checkYearDropdownHasAllYearOptions(11);
    });
});
