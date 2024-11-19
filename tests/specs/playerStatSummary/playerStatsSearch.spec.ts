import { expect } from '@playwright/test';
import { test } from '../../utils/fixture';
import bowlsStats from '../../../src/data/bowlsStats2023.json';
import { findTotalNumberOfPlayersForYears } from '../../utils/statsHelper';

const playerCount = findTotalNumberOfPlayersForYears(bowlsStats);

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
        await yearSelectPage.select2023Year();
        await playerSearchPage.searchForPlayer('Paul Bowes');

        await expect(detailedPlayerStatsPage.playerStats).toHaveCount(1);

        await playerSearchPage.searchForPlayer('Show All');
        await expect(playerSummaryPage.playerRows).toHaveCount(playerCount);
    });

    test('Clicking back to summary button returns all stats', async ({
        playerSummaryPage,
        playerSearchPage,
        yearSelectPage,
    }) => {
        await yearSelectPage.select2023Year();
        await playerSearchPage.searchForPlayer('Alyssa Randell');

        await playerSearchPage.clickBackToSummary();
        await expect(playerSummaryPage.playerRows).toHaveCount(playerCount);
    });

    test('Searching for player who has played no games that year returns message', async ({
        playerSearchPage,
        yearSelectPage,
    }) => {
        await yearSelectPage.select2023Year();
        await playerSearchPage.searchForPlayer('Andy Marshall');

        await yearSelectPage.select2021Year();
        await expect(playerSearchPage.noResultsMessage).toBeVisible();

        await yearSelectPage.select2023Year();
        await expect(playerSearchPage.noResultsMessage).not.toBeVisible();

        await yearSelectPage.select2013Year();
        await expect(playerSearchPage.noResultsMessage).toBeVisible();
    });

    test('Can switch between team and all stats when searching', async ({
        playerSearchPage,
        detailedPlayerStatsPage,
        playerStatOptionsPage,
        yearSelectPage,
    }) => {
        const player = 'Clifford Brogie';

        await yearSelectPage.select2023Year();
        await playerStatOptionsPage.selectAllClubStatsSwitch();
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
        await playerStatOptionsPage.deselectClubStatsSwitch();
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
