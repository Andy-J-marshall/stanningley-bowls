import { test } from '@playwright/test';
import bowlsStats from '../src/data/bowlsStats2023.json';
import { IndividualPlayerStatsPage } from './pages/individualPlayerStatsPage';
import { YearSelectPage } from './pages/yearSelectPage';
import { StatOptionsPage as StatOptionsPage } from './pages/statOptionsPage';
import { PlayerSearchPage } from './pages/playerSearchPage';
import { PlayerSummaryPage } from './pages/playerSummaryPage';

let individualPlayerStatsPage: IndividualPlayerStatsPage;
let playerSummaryPage: PlayerSummaryPage;
let yearSelectPage: YearSelectPage;
let statOptionsPage: StatOptionsPage;
let playerSearchPage: PlayerSearchPage;

test.describe('Player detailed stats - single club', () => {
    test.beforeEach(async ({ page }) => {
        // TODO create a fixture
        individualPlayerStatsPage = new IndividualPlayerStatsPage(page);
        playerSummaryPage = new PlayerSummaryPage(page);
        yearSelectPage = new YearSelectPage(page);
        statOptionsPage = new StatOptionsPage(page);
        playerSearchPage = new PlayerSearchPage(page);
        await playerSummaryPage.goto();
    });

    const players: Array<string> = [
        'Andy Marshall',
        'Andy Waller',
        'Paul Bowes',
        'Alyssa Randell',
        'Alison Woodfine',
        'Derek Wilson',
    ];
    for (const player of players) {
        test(`Summary of player's team stats are correct for ${player} in 2023`, async () => {
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

    test('Detailed player stats for all years for Dave Hudson', async () => {
        const player = 'Dave Hudson';

        await statOptionsPage.selectAllYearsSwitch();
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

    test('Stats year dropdown appears if there are multiple years of stats available', async () => {
        await yearSelectPage.select2022Year();
        await playerSearchPage.searchForPlayer('Jack Roberts');
        await yearSelectPage.checkYearDropdownHasAllYearOptions(11);
    });
});
