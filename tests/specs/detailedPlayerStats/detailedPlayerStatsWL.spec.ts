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

        await expect(playerStatsWLPage.gamesPlayed).toHaveText('27');
        await expect(playerStatsWLPage.average).toHaveText('-3.22');
        await expect(playerStatsWLPage.wins).toHaveText('12');
        await expect(playerStatsWLPage.losses).toHaveText('15');
        await expect(playerStatsWLPage.winPerc).toHaveText('44%');

        await detailedPlayerStatsPage.clickSinglesButton();
        await expect(playerStatsWLPage.gamesPlayed).toHaveText('17');
        await expect(playerStatsWLPage.average).toHaveText('-1.94');
        await expect(playerStatsWLPage.wins).toHaveText('8');
        await expect(playerStatsWLPage.losses).toHaveText('9');
        await expect(playerStatsWLPage.winPerc).toHaveText('47%');

        await detailedPlayerStatsPage.clickPairsButton();
        await expect(playerStatsWLPage.gamesPlayed).toHaveText('10');
        await expect(playerStatsWLPage.average).toHaveText('-5.40');
        await expect(playerStatsWLPage.wins).toHaveText('4');
        await expect(playerStatsWLPage.losses).toHaveText('6');
        await expect(playerStatsWLPage.winPerc).toHaveText('40%');
    });

    test('Detailed player stats show the wins & losses stats - all years, all clubs', async ({
        detailedPlayerStatsPage,
        playerStatsWLPage,
        playerSearchPage,
        playerStatOptionsPage,
    }) => {
        await playerStatOptionsPage.selectAllClubStatsSwitch();
        await playerStatOptionsPage.selectAllYearsSwitch();
        
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
