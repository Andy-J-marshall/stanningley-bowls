import { expect } from '@playwright/test';
import { test } from '../../utils/fixture';

test.describe('Player detailed stats - wins and losses', () => {
    test.beforeEach(async ({ playerSummaryPage }) => {
        await playerSummaryPage.goto();
    });

    test('Detailed player stats show the wins & losses stats', async ({
        detailedPlayerStatsPage,
        playerStatsWLPage,
        playerSearchPage,
        yearSelectPage,
    }) => {
        await yearSelectPage.select2022Year();
        await playerSearchPage.searchForPlayer('Jeff Allman');

        await detailedPlayerStatsPage.clickWinsAndLossesAccordion();

        // Check the combined stats
        await expect(playerStatsWLPage.gamesPlayed).toHaveText('27');
        await expect(playerStatsWLPage.average).toHaveText('-3.22');
        await expect(playerStatsWLPage.wins).toHaveText('12');
        await expect(playerStatsWLPage.losses).toHaveText('15');
        await expect(playerStatsWLPage.winPerc).toHaveText('44%');

        await expect(playerStatsWLPage.homeGamesPlayed).toHaveText('13');
        await expect(playerStatsWLPage.homeAverage).toHaveText('-5.00');
        await expect(playerStatsWLPage.homeWins).toHaveText('5');
        await expect(playerStatsWLPage.homeLosses).toHaveText('8');
        await expect(playerStatsWLPage.homeWinPerc).toHaveText('38%');

        await expect(playerStatsWLPage.awayGamesPlayed).toHaveText('13');
        await expect(playerStatsWLPage.awayAverage).toHaveText('-2.31');
        await expect(playerStatsWLPage.awayWins).toHaveText('6');
        await expect(playerStatsWLPage.awayLosses).toHaveText('7');
        await expect(playerStatsWLPage.awayWinPerc).toHaveText('46%');

        await expect(playerStatsWLPage.cupGamesPlayed).toHaveText('1');
        await expect(playerStatsWLPage.cupAverage).toHaveText('8.00');
        await expect(playerStatsWLPage.cupWins).toHaveText('1');
        await expect(playerStatsWLPage.cupLosses).toHaveText('0');
        await expect(playerStatsWLPage.cupWinPerc).toHaveText('100%');

        // Check the singles stats
        await detailedPlayerStatsPage.clickSinglesButton();
        await expect(playerStatsWLPage.gamesPlayed).toHaveText('17');
        await expect(playerStatsWLPage.average).toHaveText('-1.94');
        await expect(playerStatsWLPage.wins).toHaveText('8');
        await expect(playerStatsWLPage.losses).toHaveText('9');
        await expect(playerStatsWLPage.winPerc).toHaveText('47%');

        await expect(playerStatsWLPage.homeGamesPlayed).toHaveText('8');
        await expect(playerStatsWLPage.homeAverage).toHaveText('-4.38');
        await expect(playerStatsWLPage.homeWins).toHaveText('3');
        await expect(playerStatsWLPage.homeLosses).toHaveText('5');
        await expect(playerStatsWLPage.homeWinPerc).toHaveText('38%');

        await expect(playerStatsWLPage.awayGamesPlayed).toHaveText('8');
        await expect(playerStatsWLPage.awayAverage).toHaveText('-0.75');
        await expect(playerStatsWLPage.awayWins).toHaveText('4');
        await expect(playerStatsWLPage.awayLosses).toHaveText('4');
        await expect(playerStatsWLPage.awayWinPerc).toHaveText('50%');

        await expect(playerStatsWLPage.cupGamesPlayed).toHaveText('1');
        await expect(playerStatsWLPage.cupAverage).toHaveText('8.00');
        await expect(playerStatsWLPage.cupWins).toHaveText('1');
        await expect(playerStatsWLPage.cupLosses).toHaveText('0');
        await expect(playerStatsWLPage.cupWinPerc).toHaveText('100%');

        // Check the pairs stats
        await detailedPlayerStatsPage.clickPairsButton();
        await expect(playerStatsWLPage.gamesPlayed).toHaveText('10');
        await expect(playerStatsWLPage.average).toHaveText('-5.40');
        await expect(playerStatsWLPage.wins).toHaveText('4');
        await expect(playerStatsWLPage.losses).toHaveText('6');
        await expect(playerStatsWLPage.winPerc).toHaveText('40%');

        await expect(playerStatsWLPage.homeGamesPlayed).toHaveText('5');
        await expect(playerStatsWLPage.homeAverage).toHaveText('-6.00');
        await expect(playerStatsWLPage.homeWins).toHaveText('2');
        await expect(playerStatsWLPage.homeLosses).toHaveText('3');
        await expect(playerStatsWLPage.homeWinPerc).toHaveText('40%');

        await expect(playerStatsWLPage.awayGamesPlayed).toHaveText('5');
        await expect(playerStatsWLPage.awayAverage).toHaveText('-4.80');
        await expect(playerStatsWLPage.awayWins).toHaveText('2');
        await expect(playerStatsWLPage.awayLosses).toHaveText('3');
        await expect(playerStatsWLPage.awayWinPerc).toHaveText('40%');

        await expect(playerStatsWLPage.cupGamesPlayed).not.toBeVisible();
        await expect(playerStatsWLPage.cupAverage).not.toBeVisible();
        await expect(playerStatsWLPage.cupWins).not.toBeVisible();
        await expect(playerStatsWLPage.cupLosses).not.toBeVisible();
        await expect(playerStatsWLPage.cupWinPerc).not.toBeVisible();
    });

    test('Detailed player stats show the wins & losses stats for cup pairs games', async ({
        detailedPlayerStatsPage,
        playerStatsWLPage,
        playerSearchPage,
        playerStatOptionsPage,
        yearSelectPage,
    }) => {
        await playerStatOptionsPage.selectAllClubsFromDropdown();
        await yearSelectPage.selectAllYears();

        await playerSearchPage.searchForPlayer('Richard Hodgson');
        await detailedPlayerStatsPage.clickWinsAndLossesAccordion();

        await detailedPlayerStatsPage.clickPairsButton();
        await expect(playerStatsWLPage.cupGamesPlayed).toContainText('2');
        await expect(playerStatsWLPage.cupAverage).toContainText('-2.00');
        await expect(playerStatsWLPage.cupWins).toContainText('1');
        await expect(playerStatsWLPage.cupLosses).toContainText('1');
        await expect(playerStatsWLPage.cupWinPerc).toContainText('50%');
    });

    test('Detailed player stats show the wins & losses stats - all years, all clubs', async ({
        detailedPlayerStatsPage,
        playerStatsWLPage,
        playerSearchPage,
        playerStatOptionsPage,
        yearSelectPage,
    }) => {
        await playerStatOptionsPage.selectAllClubsFromDropdown();
        await yearSelectPage.selectAllYears();

        await playerSearchPage.searchForPlayer('Mabel Shaw');
        await detailedPlayerStatsPage.clickWinsAndLossesAccordion();

        await expect(playerStatsWLPage.gamesPlayed).toHaveText('636');
        await expect(playerStatsWLPage.average).toHaveText('2.75');
        await expect(playerStatsWLPage.wins).toHaveText('397');
        await expect(playerStatsWLPage.losses).toHaveText('239');
        await expect(playerStatsWLPage.winPerc).toHaveText('62%');

        await detailedPlayerStatsPage.clickSinglesButton();
        await expect(playerStatsWLPage.gamesPlayed).toHaveText('549');
        await expect(playerStatsWLPage.average).toHaveText('2.65');
        await expect(playerStatsWLPage.wins).toHaveText('344');
        await expect(playerStatsWLPage.losses).toHaveText('205');
        await expect(playerStatsWLPage.winPerc).toHaveText('63%');

        await detailedPlayerStatsPage.clickPairsButton();
        await expect(playerStatsWLPage.gamesPlayed).toHaveText('87');
        await expect(playerStatsWLPage.average).toHaveText('3.34');
        await expect(playerStatsWLPage.wins).toHaveText('53');
        await expect(playerStatsWLPage.losses).toHaveText('34');
        await expect(playerStatsWLPage.winPerc).toHaveText('61%');
    });
});
