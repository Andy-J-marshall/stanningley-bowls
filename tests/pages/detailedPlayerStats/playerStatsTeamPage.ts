import { Locator, Page } from '@playwright/test';

export class PlayerStatsTeamPage {
    public readonly page: Page;

    public readonly mondayAWGames: Locator;
    public readonly mondayAWWins: Locator;
    public readonly mondayAWWinPerc: Locator;
    public readonly mondayAWLosses: Locator;
    public readonly mondayAWAvg: Locator;

    public readonly satBradfordGames: Locator;
    public readonly satBradfordWins: Locator;
    public readonly satBradfordWinPerc: Locator;
    public readonly satBradfordLosses: Locator;
    public readonly satBradfordAvg: Locator;

    public readonly tueVetsLeedsGames: Locator;
    public readonly tueVetsLeedsWins: Locator;
    public readonly tueVetsLeedsWinPerc: Locator;
    public readonly tueVetsLeedsLosses: Locator;
    public readonly tueVetsLeedsAvg: Locator;

    public readonly wedBradfordGames: Locator;
    public readonly wedBradfordWins: Locator;
    public readonly wedBradfordWinPerc: Locator;
    public readonly wedBradfordLosses: Locator;
    public readonly wedBradfordAvg: Locator;

    public readonly wedPairsAWGames: Locator;
    public readonly wedPairsAWWins: Locator;
    public readonly wedPairsAWWinPerc: Locator;
    public readonly wedPairsAWLosses: Locator;
    public readonly wedPairsAWAvg: Locator;

    constructor(page: Page) {
        this.page = page;

        this.mondayAWGames = page.locator('#mondayairewharfeGamesPlayed');
        this.mondayAWWins = page.locator('#mondayairewharfeWins');
        this.mondayAWWinPerc = page.locator('#mondayairewharfeWinPerc');
        this.mondayAWLosses = page.locator('#mondayairewharfeLosses');
        this.mondayAWAvg = page.locator('#mondayairewharfeAverage');

        this.satBradfordGames = page.locator('#saturdaybradfordGamesPlayed');
        this.satBradfordWins = page.locator('#saturdaybradfordWins');
        this.satBradfordWinPerc = page.locator('#saturdaybradfordWinPerc');
        this.satBradfordLosses = page.locator('#saturdaybradfordLosses');
        this.satBradfordAvg = page.locator('#saturdaybradfordAverage');

        this.tueVetsLeedsGames = page.locator('#tuesdayvetsleedsGamesPlayed');
        this.tueVetsLeedsWins = page.locator('#tuesdayvetsleedsWins');
        this.tueVetsLeedsWinPerc = page.locator('#tuesdayvetsleedsWinPerc');
        this.tueVetsLeedsLosses = page.locator('#tuesdayvetsleedsLosses');
        this.tueVetsLeedsAvg = page.locator('#tuesdayvetsleedsAverage');

        this.wedBradfordGames = page.locator('#wednesdayhalfholidaybradfordGamesPlayed');
        this.wedBradfordWins = page.locator('#wednesdayhalfholidaybradfordWins');
        this.wedBradfordWinPerc = page.locator('#wednesdayhalfholidaybradfordWinPerc');
        this.wedBradfordLosses = page.locator('#wednesdayhalfholidaybradfordLosses');
        this.wedBradfordAvg = page.locator('#wednesdayhalfholidaybradfordAverage');

        this.wedPairsAWGames = page.locator('#wednesdaypairsairewharfeGamesPlayed');
        this.wedPairsAWWins = page.locator('#wednesdaypairsairewharfeWins');
        this.wedPairsAWWinPerc = page.locator('#wednesdaypairsairewharfeWinPerc');
        this.wedPairsAWLosses = page.locator('#wednesdaypairsairewharfeLosses');
        this.wedPairsAWAvg = page.locator('#wednesdaypairsairewharfeAverage');
    }
}
