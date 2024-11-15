import { test } from './utils/fixture';
import bowlsStats from '../src/data/bowlsStats2023.json';
import allClubBowlsStats from '../src/data/allPlayerStats2023.json';

test.describe('Player detailed stats', () => {
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
            individualPlayerStatsPage,
            playerSearchPage,
            yearSelectPage,
        }) => {
            await yearSelectPage.select2023Year();
            await playerSearchPage.searchForPlayer(player);
            await individualPlayerStatsPage.checkPlayerIsReturned();
            await individualPlayerStatsPage.checkPlayerName(player);
            await individualPlayerStatsPage.checkTeamAccordionHeadersExist();
            const {
                totalAgg,
                totalAggAgainst,
                homeWins,
                awayWins,
                cupWins,
                homeLosses,
                awayLosses,
                cupLosses,
                totalGamesPlayed,
            } = bowlsStats.playerResults[player.toLowerCase()];
            const totalWins = cupWins + homeWins + awayWins;
            const totalLosses = cupLosses + homeLosses + awayLosses;
            const totalAverage =
                (totalAgg - totalAggAgainst) / totalGamesPlayed;
            const stats = {
                totalGamesPlayed,
                totalWins,
                totalLosses,
                totalAverage,
            };
            await individualPlayerStatsPage.validateOverviewStats(stats);
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
            individualPlayerStatsPage,
            playerSearchPage,
            playerStatOptionsPage,
            yearSelectPage,
        }) => {
            await yearSelectPage.select2023Year();
            await playerStatOptionsPage.selectAllClubStatsSwitch();
            await playerSearchPage.searchForPlayer(player);
            await individualPlayerStatsPage.checkTeamAccordionHeadersNotExists();
            const {
                totalAgg,
                totalAggAgainst,
                homeWins,
                awayWins,
                cupWins,
                homeLosses,
                awayLosses,
                cupLosses,
                totalGamesPlayed,
            } = allClubBowlsStats.playerResults[player.toLowerCase()];
            const totalWins = cupWins + homeWins + awayWins;
            const totalLosses = cupLosses + homeLosses + awayLosses;
            const totalAverage =
                (totalAgg - totalAggAgainst) / totalGamesPlayed;
            const stats = {
                totalGamesPlayed,
                totalWins,
                totalLosses,
                totalAverage,
            };
            await individualPlayerStatsPage.validateOverviewStats(stats);
        });
    }

    test('Detailed player stats for all years for Dave Hudson', async ({
        individualPlayerStatsPage,
        playerSearchPage,
        playerStatOptionsPage,
    }) => {
        const player = 'Dave Hudson';

        await playerStatOptionsPage.selectAllYearsSwitch();
        await playerSearchPage.searchForPlayer(player);

        await individualPlayerStatsPage.checkPlayerIsReturned();
        await individualPlayerStatsPage.checkPlayerName(player);
        await individualPlayerStatsPage.checkTeamAccordionHeadersExist();

        const stats = {
            totalGamesPlayed: 385,
            totalWins: 147,
            totalLosses: 238,
            totalAverage: -2.34,
        };

        await individualPlayerStatsPage.validateOverviewStats(stats);
    });

    test('Detailed player stats for all clubs and years for Dave Hudson', async ({
        individualPlayerStatsPage,
        playerSearchPage,
        playerStatOptionsPage,
    }) => {
        const player = 'Dave Hudson';

        await playerStatOptionsPage.selectAllYearsSwitch();
        await playerStatOptionsPage.selectAllClubStatsSwitch();
        await playerSearchPage.searchForPlayer(player);

        await individualPlayerStatsPage.checkPlayerIsReturned();
        await individualPlayerStatsPage.checkPlayerName(player);
        await individualPlayerStatsPage.checkTeamAccordionHeadersNotExists();

        const stats = {
            totalGamesPlayed: 463,
            totalWins: 174,
            totalLosses: 289,
            totalAverage: -2.48,
        };

        await individualPlayerStatsPage.validateOverviewStats(stats);
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
