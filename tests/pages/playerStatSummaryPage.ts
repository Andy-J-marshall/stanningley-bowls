import { expect, Locator, Page } from '@playwright/test';

// TODO move assertions out of page where possible
export class PlayerStatSummaryPage {
    public readonly page: Page;
    private readonly playerStatsRows: Locator;
    private games: Locator;
    private wins: Locator;
    private winPerc: Locator;
    private avg: Locator;

    constructor(page: Page) {
        this.page = page;
        this.playerStatsRows = page.locator('#player-stats-per-team tbody');

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

    async playerStatsAreCorrectInTable(
        games: number,
        wins: number,
        winPerc: string,
        avg: number
    ) {
        await expect(this.games).toContainText(games.toString());
        await expect(this.wins).toContainText(wins.toString());
        await expect(this.winPerc).toContainText(winPerc.toString());
        await expect(this.avg).toContainText(avg.toString());
    }
}
