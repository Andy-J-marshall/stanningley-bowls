import { expect, Locator, Page } from '@playwright/test';

export class PlayerSummaryPage {
    public readonly page: Page;

    public readonly playerRows: Locator;
    private games: Locator;
    private wins: Locator;
    private winPerc: Locator;
    private avg: Locator;

    constructor(page: Page) {
        this.page = page;
        this.playerRows = page.locator('#player-stats-per-team tbody');

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

    async clickOnPlayerLink(playerName: string) {
        await this.page.getByRole('link', { name: playerName }).click();
    }

    async validateSummaryStats(
        games: number,
        wins: number,
        winPerc: number,
        avg: number
    ) {
        await expect(this.games).toContainText(games.toString());
        await expect(this.wins).toContainText(wins.toString());
        await expect(this.winPerc).toContainText(`${winPerc}%`);
        await expect(this.avg).toContainText(avg.toString());
    }
}
