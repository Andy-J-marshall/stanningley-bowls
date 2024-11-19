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
import { PlayerStatsOverviewPage } from '../pages/playerStatsOverviewPage';
import { PlayerStatsWLPage } from '../pages/playerStatsWLPage';
import { PlayerStatsAggPage } from '../pages/playerStatsAggPage';
import { PlayerStatsTeamPage } from '../pages/playerStatsTeamPage';

type testFixture = {
    detailedPlayerStatsPage: DetailedPlayerStatsPage;
    playerStatsOverviewPage: PlayerStatsOverviewPage;
    playerStatsWLPage: PlayerStatsWLPage;
    playerStatsAggPage: PlayerStatsAggPage;
    playerStatsTeamPage: PlayerStatsTeamPage;
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
        const detailedPlayerStatsPage = new DetailedPlayerStatsPage(page);
        await use(detailedPlayerStatsPage);
    },
    playerStatsOverviewPage: async ({ page }, use) => {
        const playerStatsOverviewPage = new PlayerStatsOverviewPage(page);
        await use(playerStatsOverviewPage);
    },
    playerStatsWLPage: async ({ page }, use) => {
        const playerStatsWLPage = new PlayerStatsWLPage(page);
        await use(playerStatsWLPage);
    },
    playerStatsAggPage: async ({ page }, use) => {
        const playerStatsAggPage = new PlayerStatsAggPage(page);
        await use(playerStatsAggPage);
    },
    playerStatsTeamPage: async ({ page }, use) => {
        const playerStatsTeamPage = new PlayerStatsTeamPage(page);
        await use(playerStatsTeamPage);
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
