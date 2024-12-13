import { expect } from '@playwright/test';
import { test } from '../../utils/fixture';

test.describe('Player detailed stats - teams', () => {
    test.beforeEach(async ({ playerSummaryPage }) => {
        await playerSummaryPage.goto();
    });

    test('Detailed player stats show the team stats', async ({
        detailedPlayerStatsPage,
        playerStatsTeamPage,
        playerSearchPage,
        yearSelectPage,
    }) => {
        await yearSelectPage.selectYear(2013);

        await playerSearchPage.searchForPlayer('Jack Roberts');
        await detailedPlayerStatsPage.clickTeamAccordion();

        // AW Monday
        await expect(playerStatsTeamPage.mondayAWGames).toHaveText('15');
        await expect(playerStatsTeamPage.mondayAWAvg).toHaveText('2.80');
        await expect(playerStatsTeamPage.mondayAWWins).toHaveText('10');
        await expect(playerStatsTeamPage.mondayAWLosses).toHaveText('5');
        await expect(playerStatsTeamPage.mondayAWWinPerc).toHaveText('67%');

        // Bradford Saturday
        await expect(playerStatsTeamPage.satBradfordGames).toHaveText('18');
        await expect(playerStatsTeamPage.satBradfordAvg).toHaveText('0.06');
        await expect(playerStatsTeamPage.satBradfordWins).toHaveText('10');
        await expect(playerStatsTeamPage.satBradfordLosses).toHaveText('8');
        await expect(playerStatsTeamPage.satBradfordWinPerc).toHaveText('56%');

        // Leeds Tuesday Vets
        await expect(playerStatsTeamPage.tueVetsLeedsGames).toHaveText('19');
        await expect(playerStatsTeamPage.tueVetsLeedsAvg).toHaveText('-3.16');
        await expect(playerStatsTeamPage.tueVetsLeedsWins).toHaveText('7');
        await expect(playerStatsTeamPage.tueVetsLeedsLosses).toHaveText('12');
        await expect(playerStatsTeamPage.tueVetsLeedsWinPerc).toHaveText('37%');

        // Bradford Wednesday
        await expect(playerStatsTeamPage.wedBradfordGames).toHaveText('17');
        await expect(playerStatsTeamPage.wedBradfordAvg).toHaveText('3.18');
        await expect(playerStatsTeamPage.wedBradfordWins).toHaveText('11');
        await expect(playerStatsTeamPage.wedBradfordLosses).toHaveText('6');
        await expect(playerStatsTeamPage.wedBradfordWinPerc).toHaveText('65%');

        // AW Wednesday Pairs
        await expect(playerStatsTeamPage.wedPairsAWGames).toHaveText('12');
        await expect(playerStatsTeamPage.wedPairsAWAvg).toHaveText('-4.08');
        await expect(playerStatsTeamPage.wedPairsAWWins).toHaveText('3');
        await expect(playerStatsTeamPage.wedPairsAWLosses).toHaveText('9');
        await expect(playerStatsTeamPage.wedPairsAWWinPerc).toHaveText('25%');
    });

    test('Detailed player stats show the team stats - all years - Marion Worrall', async ({
        detailedPlayerStatsPage,
        playerStatsTeamPage,
        playerSearchPage,
        yearSelectPage,
    }) => {
        await yearSelectPage.selectAllYears();

        await playerSearchPage.searchForPlayer('Marion Worrall');
        await detailedPlayerStatsPage.clickTeamAccordion();

        // AW Monday
        await expect(playerStatsTeamPage.mondayAWGames).toHaveText('1');
        await expect(playerStatsTeamPage.mondayAWAvg).toHaveText('-5.00');
        await expect(playerStatsTeamPage.mondayAWWins).toHaveText('0');
        await expect(playerStatsTeamPage.mondayAWLosses).toHaveText('1');
        await expect(playerStatsTeamPage.mondayAWWinPerc).toHaveText('0%');

        // Leeds Tuesday Vets
        await expect(playerStatsTeamPage.tueVetsLeedsGames).toHaveText('33');
        await expect(playerStatsTeamPage.tueVetsLeedsAvg).toHaveText('-4.70');
        await expect(playerStatsTeamPage.tueVetsLeedsWins).toHaveText('10');
        await expect(playerStatsTeamPage.tueVetsLeedsLosses).toHaveText('23');
        await expect(playerStatsTeamPage.tueVetsLeedsWinPerc).toHaveText('30%');

        // Bradford Saturday
        await expect(playerStatsTeamPage.satBradfordGames).toHaveText('19');
        await expect(playerStatsTeamPage.satBradfordAvg).toHaveText('-7.63');
        await expect(playerStatsTeamPage.satBradfordWins).toHaveText('2');
        await expect(playerStatsTeamPage.satBradfordLosses).toHaveText('17');
        await expect(playerStatsTeamPage.satBradfordWinPerc).toHaveText('11%');
    });

    test('Detailed player stats show the team stats - all years - Alan Parker', async ({
        detailedPlayerStatsPage,
        playerStatsTeamPage,
        playerSearchPage,
        yearSelectPage,
    }) => {
        await yearSelectPage.selectAllYears();

        await playerSearchPage.searchForPlayer('Alan Parker');
        await detailedPlayerStatsPage.clickTeamAccordion();

        // Leeds Thursday Vets
        await expect(playerStatsTeamPage.thuVetsLeedsGames).toHaveText('1');
        await expect(playerStatsTeamPage.thuVetsLeedsAvg).toHaveText('7.00');
        await expect(playerStatsTeamPage.thuVetsLeedsWins).toHaveText('1');
        await expect(playerStatsTeamPage.thuVetsLeedsLosses).toHaveText('0');
        await expect(playerStatsTeamPage.thuVetsLeedsWinPerc).toHaveText(
            '100%'
        );

        // Leeds Tuesday Vets(B)
        await expect(playerStatsTeamPage.thuVetsBLeedsGames).toHaveText('8');
        await expect(playerStatsTeamPage.thuVetsBLeedsAvg).toHaveText('9.75');
        await expect(playerStatsTeamPage.thuVetsBLeedsWins).toHaveText('7');
        await expect(playerStatsTeamPage.thuVetsBLeedsLosses).toHaveText('1');
        await expect(playerStatsTeamPage.thuVetsBLeedsWinPerc).toHaveText(
            '88%'
        );
    });
});
