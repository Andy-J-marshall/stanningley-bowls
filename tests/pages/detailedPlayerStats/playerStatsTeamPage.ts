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

    public readonly thuVetsLeedsGames: Locator;
    public readonly thuVetsLeedsWins: Locator;
    public readonly thuVetsLeedsWinPerc: Locator;
    public readonly thuVetsLeedsLosses: Locator;
    public readonly thuVetsLeedsAvg: Locator;

    public readonly thuVetsBLeedsGames: Locator;
    public readonly thuVetsBLeedsWins: Locator;
    public readonly thuVetsBLeedsWinPerc: Locator;
    public readonly thuVetsBLeedsLosses: Locator;
    public readonly thuVetsBLeedsAvg: Locator;

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

        this.thuVetsLeedsGames = page.locator('#thursdayvetsleedsGamesPlayed');
        this.thuVetsLeedsWins = page.locator('#thursdayvetsleedsWins');
        this.thuVetsLeedsWinPerc = page.locator('#thursdayvetsleedsWinPerc');
        this.thuVetsLeedsLosses = page.locator('#thursdayvetsleedsLosses');
        this.thuVetsLeedsAvg = page.locator('#thursdayvetsleedsAverage');

        this.thuVetsBLeedsGames = page.locator(
            '#thursdayvetsleedsbGamesPlayed'
        );
        this.thuVetsBLeedsWins = page.locator('#thursdayvetsleedsbWins');
        this.thuVetsBLeedsWinPerc = page.locator('#thursdayvetsleedsbWinPerc');
        this.thuVetsBLeedsLosses = page.locator('#thursdayvetsleedsbLosses');
        this.thuVetsBLeedsAvg = page.locator('#thursdayvetsleedsbAverage');

        this.wedBradfordGames = page.locator('#halfholidaybradfordGamesPlayed');
        this.wedBradfordWins = page.locator('#halfholidaybradfordWins');
        this.wedBradfordWinPerc = page.locator('#halfholidaybradfordWinPerc');
        this.wedBradfordLosses = page.locator('#halfholidaybradfordLosses');
        this.wedBradfordAvg = page.locator('#halfholidaybradfordAverage');

        this.wedPairsAWGames = page.locator(
            '#wednesdaypairsairewharfeGamesPlayed'
        );
        this.wedPairsAWWins = page.locator('#wednesdaypairsairewharfeWins');
        this.wedPairsAWWinPerc = page.locator(
            '#wednesdaypairsairewharfeWinPerc'
        );
        this.wedPairsAWLosses = page.locator('#wednesdaypairsairewharfeLosses');
        this.wedPairsAWAvg = page.locator('#wednesdaypairsairewharfeAverage');
    }
}
