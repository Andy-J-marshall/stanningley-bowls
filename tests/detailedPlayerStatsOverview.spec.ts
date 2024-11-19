import { expect } from '@playwright/test';
import { test } from './utils/fixture';
import bowlsStats from '../src/data/bowlsStats2023.json';
import allClubBowlsStats from '../src/data/allPlayerStats2023.json';

test.describe('Player detailed stats - overview', () => {
    test.beforeEach(async ({ playerSummaryPage }) => {
        await playerSummaryPage.goto();
    });

    const clubPlayers: Array<string> = [
        'Andy Marshall',
        'Andy Waller',
        'Paul Bowes',
        'Alyssa Randell',
        'Alison Woodfine',
        'Derek Wilson',
    ];
    for (const player of clubPlayers) {
        test(`Summary of player's team stats are correct for ${player} in 2023`, async ({
            detailedPlayerStatsPage,
            playerStatsOverviewPage,
            playerSearchPage,
            yearSelectPage,
        }) => {
            await yearSelectPage.select2023Year();
            await playerSearchPage.searchForPlayer(player);
            await expect(detailedPlayerStatsPage.playerStats).toHaveCount(1);
            await expect(detailedPlayerStatsPage.title).toHaveText(player);

            const {
                totalAgg,
                totalAggAgainst,
                homeWins,
                awayWins,
                cupWins,
                totalGamesPlayed,
            } = bowlsStats.playerResults[player.toLowerCase()];
            const totalWins = cupWins + homeWins + awayWins;
            const totalAverage =
                (totalAgg - totalAggAgainst) / totalGamesPlayed;

            await playerStatsOverviewPage.validateOverviewStats(
                totalGamesPlayed,
                totalWins,
                totalAverage
            );
        });
    }

    const allClubPlayers: Array<string> = [
        'Clifford Brogie',
        'Jim Moorin',
        'Stewart Watson',
        'John Armitage',
        'Duncan McPhail',
        'Peter Crowther',
        'Andy Marshall',
    ];
    for (const player of allClubPlayers) {
        test(`Summary of player's all team stats are correct for ${player} in 2023`, async ({
            playerStatsOverviewPage,
            playerSearchPage,
            playerStatOptionsPage,
            yearSelectPage,
        }) => {
            await yearSelectPage.select2023Year();
            await playerStatOptionsPage.selectAllClubStatsSwitch();
            await playerSearchPage.searchForPlayer(player);

            const {
                totalAgg,
                totalAggAgainst,
                homeWins,
                awayWins,
                cupWins,
                totalGamesPlayed,
            } = allClubBowlsStats.playerResults[player.toLowerCase()];
            const totalWins = cupWins + homeWins + awayWins;
            const totalAverage =
                (totalAgg - totalAggAgainst) / totalGamesPlayed;

            await playerStatsOverviewPage.validateOverviewStats(
                totalGamesPlayed,
                totalWins,
                totalAverage
            );
        });
    }

    test('Detailed player stats overview for all years for Dave Hudson', async ({
        playerStatsOverviewPage,
        playerSearchPage,
        playerStatOptionsPage,
    }) => {
        const player = 'Dave Hudson';

        await playerStatOptionsPage.selectAllYearsSwitch();
        await playerSearchPage.searchForPlayer(player);

        await playerStatsOverviewPage.validateOverviewStats(385, 147, -2.34);
        await expect(playerStatsOverviewPage.biggestWin).toHaveText('31 - 4');
    });

    test('Detailed player stats overview for all clubs and years for Dave Hudson', async ({
        playerStatsOverviewPage,
        playerSearchPage,
        playerStatOptionsPage,
    }) => {
        const player = 'Dave Hudson';

        await playerStatOptionsPage.selectAllYearsSwitch();
        await playerStatOptionsPage.selectAllClubStatsSwitch();
        await playerSearchPage.searchForPlayer(player);

        await playerStatsOverviewPage.validateOverviewStats(463, 174, -2.48);
        await expect(playerStatsOverviewPage.biggestWin).toHaveText('31 - 4');
    });

    test('Stats year dropdown appears if there are multiple years of stats available', async ({
        playerSearchPage,
        yearSelectPage,
    }) => {
        await yearSelectPage.select2022Year();
        await playerSearchPage.searchForPlayer('Jack Roberts');
        await yearSelectPage.checkYearDropdownHasAllYearOptions(11);
    });
});
