import { test as base } from '@playwright/test';
import { DetailedPlayerStatsPage } from '../pages/detailedPlayerStatsPage';
import { PlayerSearchPage } from '../pages/playerSearchPage';
import { PlayerSummaryPage } from '../pages/playerSummaryPage';
import { PlayerStatOptionsPage } from '../pages/playerStatOptionsPage';
import { RecordsPage } from '../pages/recordsPage';
import { ResultPage } from '../pages/resultPage';
import { TeamStatsPage } from '../pages/teamStatsPage';
import { TeamTabsPage } from '../pages/teamTabsPage';
import { YearSelectPage } from '../pages/yearSelectPage';

type testFixture = {
    detailedPlayerStatsPage: DetailedPlayerStatsPage;
    playerSearchPage: PlayerSearchPage;
    playerSummaryPage: PlayerSummaryPage;
    playerStatOptionsPage: PlayerStatOptionsPage;
    recordsPage: RecordsPage;
    resultPage: ResultPage;
    teamStatsPage: TeamStatsPage;
    teamTabsPage: TeamTabsPage;
    yearSelectPage: YearSelectPage;
};

const test = base.extend<testFixture>({
    detailedPlayerStatsPage: async ({ page }, use) => {
        const individualPlayerStatsPage = new DetailedPlayerStatsPage(page);
        await use(individualPlayerStatsPage);
    },
    playerSearchPage: async ({ page }, use) => {
        const playerSearch = new PlayerSearchPage(page);
        await use(playerSearch);
    },
    playerSummaryPage: async ({ page }, use) => {
        const playerSummaryPage = new PlayerSummaryPage(page);
        await use(playerSummaryPage);
    },
    playerStatOptionsPage: async ({ page }, use) => {
        const playerStatOptionsPage = new PlayerStatOptionsPage(page);
        await use(playerStatOptionsPage);
    },
    recordsPage: async ({ page }, use) => {
        const recordsPage = new RecordsPage(page);
        await use(recordsPage);
    },
    resultPage: async ({ page }, use) => {
        const resultPage = new ResultPage(page);
        await use(resultPage);
    },
    teamStatsPage: async ({ page }, use) => {
        const teamStatsPage = new TeamStatsPage(page);
        await use(teamStatsPage);
    },
    teamTabsPage: async ({ page }, use) => {
        const teamTabsPage = new TeamTabsPage(page);
        await use(teamTabsPage);
    },
    yearSelectPage: async ({ page }, use) => {
        const yearSelectPage = new YearSelectPage(page);
        await use(yearSelectPage);
    },
});

export { test };
