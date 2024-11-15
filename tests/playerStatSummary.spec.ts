import { test } from '@playwright/test';
import { YearSelectPage } from './pages/yearSelectPage';
import { StatOptionsPage as StatOptionsPage } from './pages/statOptionsPage';
import { PlayerSummaryPage as PlayerSummaryPage } from './pages/playerSummaryPage';

let playerSummaryPage: PlayerSummaryPage;
let yearSelectPage: YearSelectPage;
let statOptionsPage: StatOptionsPage;

test.describe('Player summary stats', () => {
    test.beforeEach(async ({ page }) => {
        playerSummaryPage = new PlayerSummaryPage(page);
        yearSelectPage = new YearSelectPage(page);
        statOptionsPage = new StatOptionsPage(page);
        await playerSummaryPage.goto();
    });

    test('Summary of Steve Gardner stats for club are correct', async () => {
        playerSummaryPage.setPlayerToFind('steve gardner');

        await yearSelectPage.select2023Year();
        await playerSummaryPage.summaryStatsAreCorrect(57, 44, '77%', 7.81);

        await yearSelectPage.select2022Year();
        await playerSummaryPage.summaryStatsAreCorrect(43, 35, '81%', 7.86);
    });

    test('Summary of Dave Hudson stats since 2013 for club are correct', async () => {
        playerSummaryPage.setPlayerToFind('dave hudson');

        await statOptionsPage.selectAllYearsSwitch();
        await playerSummaryPage.summaryStatsAreCorrect(385, 147, '38%', -2.34);
    });
});