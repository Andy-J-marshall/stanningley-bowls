import { expect, Locator, Page } from '@playwright/test';

export interface PlayerStatsToCheck {
    totalGamesPlayed: number;
    totalWins: number;
    totalLosses: number;
    totalAverage: number;
}

export class PlayerStatsPage {
    private readonly page: Page;
    private readonly backButton: Locator;
    private readonly searchBar: Locator;
    private readonly playerListInDropdown: Locator;
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
    private readonly teamSwitch: Locator;
    private readonly allYearSwitch: Locator;
    private readonly singlesOnlyRadio: Locator;
    private readonly pairsOnlyRadio: Locator;
    private readonly allGameTypesRadio: Locator;
    private readonly homeOnlyRadio: Locator;
    private readonly awayOnlyRadio: Locator;
    private readonly cupOnlyRadio: Locator;
    private readonly allVenuesRadio: Locator;

    private games: Locator;
    private wins: Locator;
    private winPerc: Locator;
    private avg: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchBar = page.locator(
            '#search-form input.rbt-input-main.form-control.rbt-input.form-control-lg'
        );
        this.playerListInDropdown = page.locator('#search');
        this.backButton = page.locator('#back-button');
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
        this.teamSwitch = page.locator(
            ".form-check input[id='#all-stats-select-switch']"
        );
        this.singlesOnlyRadio = page.locator(
            ".form-check input[id='#only-singles-radio']"
        );
        this.pairsOnlyRadio = page.locator(
            ".form-check input[id='#only-pairs-radio']"
        );
        this.allGameTypesRadio = page.locator(
            ".form-check input[id='#all-matches-radio']"
        );
        this.allYearSwitch = page.locator(
            ".form-check input[id='#all-years-select-switch']"
        );
        this.homeOnlyRadio = page.locator(
            ".form-check input[id='#only-home-radio']"
        );
        this.awayOnlyRadio = page.locator(
            ".form-check input[id='#only-away-radio']"
        );
        this.cupOnlyRadio = page.locator(
            ".form-check input[id='#only-cup-radio']"
        );
        this.allVenuesRadio = page.locator(
            ".form-check input[id='#all-venues-radio']"
        );
        this.games = page.locator('#steve-gardner-games');
        this.wins = page.locator('#steve-gardner-wins');
        this.winPerc = page.locator('#steve-gardner-win-perc');
        this.avg = page.locator('#steve-gardner-avg');
    }

    setPlayerToFind(name: string) {
        const nameWithHyphen = name.trim().toLowerCase().replace(' ', '-');

        this.games = this.page.locator(`#${nameWithHyphen}-games`);
        this.wins = this.page.locator(`#${nameWithHyphen}-wins`);
        this.winPerc = this.page.locator(`#${nameWithHyphen}-win-perc`);
        this.avg = this.page.locator(`#${nameWithHyphen}-avg`);
    }

    async goto() {
        await this.page.goto('/#/stats/player');
    }

    async searchForPlayer(playerName: string) {
        await this.searchBar.fill(playerName);
        await this.playerListInDropdown.click();
    }

    async clickBackToSummary() {
        await this.backButton.click();
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

    async selectAllTeamStatsSwitch() {
        await this.teamSwitch.check();
    }

    async deselectTeamStatsSwitch() {
        await this.teamSwitch.uncheck();
    }

    async selectSinglesOnlyRadio() {
        await this.singlesOnlyRadio.check();
    }

    async selectPairsOnlyRadio() {
        await this.pairsOnlyRadio.check();
    }

    async selectAllGameTypesRadio() {
        await this.allGameTypesRadio.check();
    }

    async selectHomeOnlyRadio() {
        await this.homeOnlyRadio.check();
    }

    async selectAwayOnlyRadio() {
        await this.awayOnlyRadio.check();
    }

    async selectCupOnlyRadio() {
        await this.cupOnlyRadio.check();
    }

    async selectAllVenuesRadio() {
        await this.allVenuesRadio.check();
    }

    async selectSince2013Switch() {
        await this.allYearSwitch.check();
    }

    async deselectSince2013Switch() {
        await this.allYearSwitch.uncheck();
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
