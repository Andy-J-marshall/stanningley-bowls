import { test } from '@playwright/test';
import { YearSelectPage } from './pages/yearSelectPage';
import { StatOptionsPage as StatOptionsPage } from './pages/statOptionsPage';
import { PlayerSummaryPage as PlayerSummaryPage } from './pages/playerSummaryPage';
import bowlsStats from '../src/data/bowlsStats2023.json';
import { findTotalNumberOfPlayersForYears } from './utils/statsHelper';

const totalPlayerCount = findTotalNumberOfPlayersForYears(bowlsStats);

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

    test('Summary of Steve Gardner stats are correct', async () => {
        playerSummaryPage.setPlayerToFind('steve gardner');

        await yearSelectPage.select2023Year();
        await playerSummaryPage.summaryStatsAreCorrect(57, 44, '77%', 7.81);

        await yearSelectPage.select2022Year();
        await playerSummaryPage.summaryStatsAreCorrect(43, 35, '81%', 7.86);
    });

    test('Summary of Jim Moorin stats for all clubs is correct', async () => {
        playerSummaryPage.setPlayerToFind('jim moorin');
        await statOptionsPage.selectAllClubStatsSwitch();

        await yearSelectPage.select2023Year();
        await playerSummaryPage.summaryStatsAreCorrect(111, 66, '59%', 2.23);

        await yearSelectPage.select2022Year();
        await playerSummaryPage.summaryStatsAreCorrect(114, 83, '73%', 5.57);
    });

    test('Summary of Dave Hudson stats since 2013 are correct', async () => {
        playerSummaryPage.setPlayerToFind('dave hudson');

        await statOptionsPage.selectAllYearsSwitch();
        await playerSummaryPage.summaryStatsAreCorrect(385, 147, '38%', -2.34);
    });

    test('Summary of Dave Hudson stats since 2013 for all clubs is correct', async () => {
        playerSummaryPage.setPlayerToFind('dave hudson');
        await statOptionsPage.selectAllClubStatsSwitch();

        await statOptionsPage.selectAllYearsSwitch();
        await playerSummaryPage.summaryStatsAreCorrect(463, 174, '38%', -2.48);
    });

    test('All players appear by default', async () => {
        await yearSelectPage.select2023Year();
        await playerSummaryPage.checkNumberOfPlayersReturned(totalPlayerCount);
    });

    test('Stats year dropdown appears if there are multiple years of stats available', async () => {
        await yearSelectPage.checkYearDropdownHasAllYearOptions(11);
    });
});
