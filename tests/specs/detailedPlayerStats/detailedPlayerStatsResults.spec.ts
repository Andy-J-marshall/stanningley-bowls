import { expect } from '@playwright/test';
import { test } from '../../utils/fixture';

test.describe('Player detailed stats - results', () => {
    test.beforeEach(async ({ playerSummaryPage }) => {
        await playerSummaryPage.goto();
    });

    test('Detailed player stats show the player results', async ({
        detailedPlayerStatsPage,
        playerStatsResultPage,
        playerSearchPage,
        yearSelectPage,
    }) => {
        await yearSelectPage.select2022Year();
        await playerSearchPage.searchForPlayer('Jack Roberts');

        await detailedPlayerStatsPage.clickResultsAccordion();

        expect(playerStatsResultPage.resultRows).toHaveCount(3);

        expect(playerStatsResultPage.firstResultName).toHaveText(
            'Jack Roberts'
        );
        expect(playerStatsResultPage.firstResultScore).toHaveText('7');
        expect(playerStatsResultPage.firstResultOpponent).toHaveText(
            'Malcolm Cameron'
        );
        expect(playerStatsResultPage.firstResultOpponentScore).toHaveText('21');
    });

    test('Detailed player stats show the player results - all years, all clubs', async ({
        detailedPlayerStatsPage,
        playerStatOptionsPage,
        playerStatsResultPage,
        playerSearchPage,
    }) => {
        await playerStatOptionsPage.selectAllClubsFromDropdown();
        await playerStatOptionsPage.selectAllYearsSwitch();

        await playerSearchPage.searchForPlayer('Jack Roberts');

        await detailedPlayerStatsPage.clickResultsAccordion();

        expect(playerStatsResultPage.resultRows).toHaveCount(607);

        expect(playerStatsResultPage.firstResultName).toHaveText(
            'Jack Roberts'
        );
        expect(playerStatsResultPage.firstResultScore).toHaveText('19');
        expect(playerStatsResultPage.firstResultOpponent).toHaveText(
            'Lynette Hall'
        );
        expect(playerStatsResultPage.firstResultOpponentScore).toHaveText('21');
    });
});
