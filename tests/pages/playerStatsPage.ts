import { expect, Locator, Page } from '@playwright/test';

export interface PlayerStatsToCheck {
    totalGamesPlayed: number;
    totalWins: number;
    totalLosses: number;
    totalAverage: number;
}

export class IndividualPlayerStatsPage {
    public readonly page: Page;
    private readonly playerStatsItem: Locator;
    private readonly playerStatsRows: Locator;
    private readonly playerNameTitle: Locator;
    private readonly overviewAccordionButton: Locator;
    private readonly winLossAccordionButton: Locator;
    private readonly teamAccordionButton: Locator;
    private readonly aggAccordionButton: Locator;
    private readonly resultsAccordionButton: Locator;
    private readonly accordionButtons: Locator;
    private readonly totalGamesPlayed: Locator;
    private readonly totalWins: Locator;
    private readonly totalLosses: Locator;
    private readonly totalAverage: Locator;

    private games: Locator;
    private wins: Locator;
    private winPerc: Locator;
    private avg: Locator;

    constructor(page: Page) {
        this.page = page;
        this.playerStatsItem = page.locator('#detailed-player-stats');
        this.playerStatsRows = page.locator('#player-stats-per-team tbody');
        this.playerNameTitle = page.locator('#playerNameTitle');
        this.overviewAccordionButton = page.locator('#stats-overview');
        this.winLossAccordionButton = page.locator('#stats-wl');
        this.teamAccordionButton = page.locator('#stats-teams');
        this.aggAccordionButton = page.locator('#stats-aggregate');
        this.resultsAccordionButton = page.locator('#stats-results');
        this.accordionButtons = page.locator(
            '#detailed-player-stats .accordion-button'
        );
        this.totalGamesPlayed = page.locator('#totalGamesPlayed');
        this.totalWins = page.locator('#totalWins');
        this.totalLosses = page.locator('#totalLosses');
        this.totalAverage = page.locator('#totalAverage');

        this.games = page.locator('#steve-gardner-games');
        this.wins = page.locator('#steve-gardner-wins');
        this.winPerc = page.locator('#steve-gardner-win-perc');
        this.avg = page.locator('#steve-gardner-avg');
    }

    async goto() {
        await this.page.goto('/#/stats/player');
    }

    setPlayerToFind(name: string) {
        const nameWithHyphen = name.trim().toLowerCase().replace(' ', '-');

        this.games = this.page.locator(`#${nameWithHyphen}-games`);
        this.wins = this.page.locator(`#${nameWithHyphen}-wins`);
        this.winPerc = this.page.locator(`#${nameWithHyphen}-win-perc`);
        this.avg = this.page.locator(`#${nameWithHyphen}-avg`);
    }

    async checkNumberOfPlayersReturned(expectedNumberOfPlayers: number) {
        await expect(this.playerStatsRows).toHaveCount(expectedNumberOfPlayers);
    }

    async checkPlayerIsReturned() {
        await expect(this.playerStatsItem).toHaveCount(1);
    }

    async checkPlayerName(expectedPlayer: string) {
        await expect(this.playerNameTitle).toHaveText(expectedPlayer);
    }

    async checkTeamAccordionHeadersExist() {
        await expect(this.accordionButtons).toHaveCount(5);
        await this.checkAccordionHeaderExists();
        await expect(this.teamAccordionButton).toHaveText('TEAMS');
    }

    async checkTeamAccordionHeadersNotExists() {
        await expect(this.accordionButtons).toHaveCount(4);
        await this.checkAccordionHeaderExists();
    }

    private async checkAccordionHeaderExists() {
        await expect(this.overviewAccordionButton).toHaveText('OVERVIEW');
        await expect(this.winLossAccordionButton).toHaveText('WINS & LOSSES');
        await expect(this.aggAccordionButton).toHaveText('AGGREGATES');
        await expect(this.resultsAccordionButton).toHaveText('RESULTS');
    }

    async validateSummaryStats(playerStats: PlayerStatsToCheck) {
        await expect(this.totalGamesPlayed).toHaveText(
            `${playerStats.totalGamesPlayed}`
        );
        await expect(this.totalWins).toHaveText(`${playerStats.totalWins}`);
        await expect(this.totalLosses).toHaveText(`${playerStats.totalLosses}`);
        await expect(this.totalAverage).toHaveText(
            `${playerStats.totalAverage.toFixed(2)}`
        );
        expect(playerStats.totalAverage).toBeGreaterThan(-22);
        expect(playerStats.totalAverage).toBeLessThan(22);
    }

    playerStatsAreCorrectInTable(
        games: number,
        wins: number,
        winPerc: string,
        avg: number
    ) {
        expect(this.games).toContainText(games.toString());
        expect(this.wins).toContainText(wins.toString());
        expect(this.winPerc).toContainText(winPerc.toString());
        expect(this.avg).toContainText(avg.toString());
    }
}
