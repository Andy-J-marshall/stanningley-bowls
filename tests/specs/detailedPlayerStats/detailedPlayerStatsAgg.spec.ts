import { expect } from '@playwright/test';
import { test } from '../../utils/fixture';

test.describe('Player detailed stats - aggregate', () => {
    test.beforeEach(async ({ playerSummaryPage }) => {
        await playerSummaryPage.goto();
    });

    test('Detailed player stats overview show the aggregate stats', async ({
        detailedPlayerStatsPage,
        playerStatsAggPage,
        playerSearchPage,
        yearSelectPage,
    }) => {
        await yearSelectPage.select2022Year();
        
        await playerSearchPage.searchForPlayer('Shirley Allman');
        await detailedPlayerStatsPage.clickAggAccordion();

        await expect(playerStatsAggPage.aggFor).toHaveText('187 / 294');
        await expect(playerStatsAggPage.aggAgainst).toHaveText('268 / 294');
        await expect(playerStatsAggPage.homeAggFor).toHaveText('89 / 147');
        await expect(playerStatsAggPage.homeAggAgainst).toHaveText('143 / 147');
        await expect(playerStatsAggPage.awayAggFor).toHaveText('89 / 126');
        await expect(playerStatsAggPage.awayAggAgainst).toHaveText('104 / 126');
        await expect(playerStatsAggPage.cupAggFor).toHaveText('9 / 21');
        await expect(playerStatsAggPage.cupAggAgainst).toHaveText('21 / 21');

        await detailedPlayerStatsPage.clickSinglesButton();
        await expect(playerStatsAggPage.aggFor).toHaveText('56 / 105');
        await expect(playerStatsAggPage.aggAgainst).toHaveText('96 / 105');
        await expect(playerStatsAggPage.homeAggFor).toHaveText('26 / 63');
        await expect(playerStatsAggPage.homeAggAgainst).toHaveText('63 / 63');
        await expect(playerStatsAggPage.awayAggFor).toHaveText('21 / 21');
        await expect(playerStatsAggPage.awayAggAgainst).toHaveText('12 / 21');
        await expect(playerStatsAggPage.cupAggFor).toHaveText('9 / 21');
        await expect(playerStatsAggPage.cupAggAgainst).toHaveText('21 / 21');

        await detailedPlayerStatsPage.clickPairsButton();
        await expect(playerStatsAggPage.aggFor).toHaveText('131 / 189');
        await expect(playerStatsAggPage.aggAgainst).toHaveText('172 / 189');
        await expect(playerStatsAggPage.homeAggFor).toHaveText('63 / 84');
        await expect(playerStatsAggPage.homeAggAgainst).toHaveText('80 / 84');
        await expect(playerStatsAggPage.awayAggFor).toHaveText('68 / 105');
        await expect(playerStatsAggPage.awayAggAgainst).toHaveText('92 / 105');
        await expect(playerStatsAggPage.cupAggFor).not.toBeVisible();
        await expect(playerStatsAggPage.cupAggAgainst).not.toBeVisible();
    });
});
