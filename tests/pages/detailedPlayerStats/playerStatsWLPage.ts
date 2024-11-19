import { Locator, Page } from '@playwright/test';

export class PlayerStatsWLPage {
    public readonly page: Page;

    public readonly gamesPlayed: Locator;
    public readonly wins: Locator;
    public readonly winPerc: Locator;
    public readonly losses: Locator;
    public readonly average: Locator;

    public readonly homeGamesPlayed: Locator;
    public readonly homeWins: Locator;
    public readonly homeWinPerc: Locator;
    public readonly homeLosses: Locator;
    public readonly homeAverage: Locator;

    public readonly awayGamesPlayed: Locator;
    public readonly awayWins: Locator;
    public readonly awayWinPerc: Locator;
    public readonly awayLosses: Locator;
    public readonly awayAverage: Locator;

    public readonly cupGamesPlayed: Locator;
    public readonly cupWins: Locator;
    public readonly cupWinPerc: Locator;
    public readonly cupLosses: Locator;
    public readonly cupAverage: Locator;

    constructor(page: Page) {
        this.page = page;

        this.gamesPlayed = page.locator('#combinedGamesPlayed');
        this.wins = page.locator('#combinedWins');
        this.winPerc = page.locator('#combinedWinPerc');
        this.losses = page.locator('#combinedLosses');
        this.average = page.locator('#combinedAverage');

        this.homeGamesPlayed = page.locator('#homeGamesPlayed');
        this.homeWins = page.locator('#homeWins');
        this.homeWinPerc = page.locator('#homeWinPerc');
        this.homeLosses = page.locator('#homeLosses');
        this.homeAverage = page.locator('#homeAverage');

        this.awayGamesPlayed = page.locator('#awayGamesPlayed');
        this.awayWins = page.locator('#awayWins');
        this.awayWinPerc = page.locator('#awayWinPerc');
        this.awayLosses = page.locator('#awayLosses');
        this.awayAverage = page.locator('#awayAverage');

        this.cupGamesPlayed = page.locator('#cupGamesPlayed');
        this.cupWins = page.locator('#cupWins');
        this.cupWinPerc = page.locator('#cupWinPerc');
        this.cupLosses = page.locator('#cupLosses');
        this.cupAverage = page.locator('#cupAverage');
    }
}
