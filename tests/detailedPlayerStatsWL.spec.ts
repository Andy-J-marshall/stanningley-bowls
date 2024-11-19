import { expect } from '@playwright/test';
import { test } from './utils/fixture';
import bowlsStats from '../src/data/bowlsStats2023.json';
import allClubBowlsStats from '../src/data/allPlayerStats2023.json';

test.describe('Player detailed stats overview', () => {
    test.beforeEach(async ({ playerSummaryPage }) => {
        await playerSummaryPage.goto();
    });

    test('Detailed player stats overview show the wins & losses stats', async ({
        detailedPlayerStatsPage,
        playerSearchPage,
        yearSelectPage,
    }) => {
        await yearSelectPage.select2023Year();
        await playerSearchPage.searchForPlayer('Alison Woodfine');

        await detailedPlayerStatsPage.clickWinsAndLossesAccordion();
    });
});
