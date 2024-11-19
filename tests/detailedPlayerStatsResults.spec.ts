import { expect } from '@playwright/test';
import { test } from './utils/fixture';

test.describe('Player detailed stats - results', () => {
    test.beforeEach(async ({ playerSummaryPage }) => {
        await playerSummaryPage.goto();
    });

    test('Detailed player stats show the player results', async ({
        detailedPlayerStatsPage,
        playerStatsResultPage,
        playerSearchPage,
        yearSelectPage,
    }) => {
        await yearSelectPage.select2013Year();
        await playerSearchPage.searchForPlayer('Jack Roberts');

        await detailedPlayerStatsPage.clickResultsAccordion();

        expect(playerStatsResultPage.resultRows).toHaveCount(81);
    });

    test('Detailed player stats show the player results - all years, all clubs', async ({
        detailedPlayerStatsPage,
        playerStatOptionsPage,
        playerStatsResultPage,
        playerSearchPage,
        yearSelectPage,
    }) => {
        await yearSelectPage.select2013Year();
        await playerStatOptionsPage.selectAllClubStatsSwitch();
        await playerStatOptionsPage.selectAllYearsSwitch();

        await playerSearchPage.searchForPlayer('Jack Roberts');

        await detailedPlayerStatsPage.clickResultsAccordion();

        expect(playerStatsResultPage.resultRows).toHaveCount(607);
    });
});
