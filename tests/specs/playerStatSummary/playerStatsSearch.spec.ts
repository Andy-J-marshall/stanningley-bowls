import { expect } from '@playwright/test';
import { test } from '../../utils/fixture';

test.describe('Player stats - search', () => {
    test.beforeEach(async ({ playerSummaryPage }) => {
        await playerSummaryPage.goto();
    });

    test('Stats search bar can show all player stats', async ({
        playerSummaryPage,
        playerSearchPage,
        detailedPlayerStatsPage,
        yearSelectPage,
    }) => {
        await yearSelectPage.selectYear(2023);
        await playerSearchPage.searchForPlayer('Paul Bowes');

        await expect(detailedPlayerStatsPage.playerStats).toHaveCount(1);

        await playerSearchPage.searchForPlayer('Show All');
        await expect(playerSummaryPage.playerRows).toHaveCount(32);
    });

    test('Clicking back to summary button returns all stats', async ({
        playerSummaryPage,
        playerSearchPage,
        yearSelectPage,
    }) => {
        await yearSelectPage.selectYear(2023);
        await playerSearchPage.searchForPlayer('Alyssa Randell');

        await playerSearchPage.clickBackToSummary();
        await expect(playerSummaryPage.playerRows).toHaveCount(32);
    });

    test('Searching for player who has played no games that year returns message', async ({
        playerSearchPage,
        yearSelectPage,
    }) => {
        await yearSelectPage.selectYear(2023);
        await playerSearchPage.searchForPlayer('Andy Marshall');

        await yearSelectPage.selectYear(2021);
        await expect(playerSearchPage.noResultsMessage).toBeVisible();

        await yearSelectPage.selectYear(2023);
        await expect(playerSearchPage.noResultsMessage).not.toBeVisible();

        await yearSelectPage.selectYear(2013);
        await expect(playerSearchPage.noResultsMessage).toBeVisible();
    });

    test('Can switch between team and all stats when searching', async ({
        playerSearchPage,
        detailedPlayerStatsPage,
        playerStatOptionsPage,
        yearSelectPage,
    }) => {
        const player = 'Clifford Brogie';

        await yearSelectPage.selectYear(2023);
        await playerStatOptionsPage.selectAllClubsFromDropdown();
        await playerSearchPage.searchForPlayer(player);

        await expect(detailedPlayerStatsPage.accordions).toHaveCount(4);
        await expect(detailedPlayerStatsPage.overviewAccordion).toHaveText(
            'OVERVIEW'
        );
        await expect(detailedPlayerStatsPage.winLossAccordion).toHaveText(
            'WINS & LOSSES'
        );
        await expect(detailedPlayerStatsPage.aggAccordion).toHaveText(
            'AGGREGATES'
        );
        await expect(detailedPlayerStatsPage.resultsAccordion).toHaveText(
            'RESULTS'
        );

        await playerSearchPage.clickBackToSummary();
        await playerStatOptionsPage.selectClubFromDropdown('Stanningley');
        await playerSearchPage.searchForPlayer(player);

        await expect(detailedPlayerStatsPage.accordions).toHaveCount(5);
        await expect(detailedPlayerStatsPage.overviewAccordion).toHaveText(
            'OVERVIEW'
        );
        await expect(detailedPlayerStatsPage.winLossAccordion).toHaveText(
            'WINS & LOSSES'
        );
        await expect(detailedPlayerStatsPage.aggAccordion).toHaveText(
            'AGGREGATES'
        );
        await expect(detailedPlayerStatsPage.teamAccordion).toHaveText('TEAMS');
        await expect(detailedPlayerStatsPage.resultsAccordion).toHaveText(
            'RESULTS'
        );
    });
});
