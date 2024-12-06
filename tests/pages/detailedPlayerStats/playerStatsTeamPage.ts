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

        this.mondayAWGames = page.locator('#airewharfemondayGamesPlayed');
        this.mondayAWWins = page.locator('#airewharfemondayWins');
        this.mondayAWWinPerc = page.locator('#airewharfemondayWinPerc');
        this.mondayAWLosses = page.locator('#airewharfemondayLosses');
        this.mondayAWAvg = page.locator('#airewharfemondayAverage');

        this.satBradfordGames = page.locator('#bradfordsaturdayGamesPlayed');
        this.satBradfordWins = page.locator('#bradfordsaturdayWins');
        this.satBradfordWinPerc = page.locator('#bradfordsaturdayWinPerc');
        this.satBradfordLosses = page.locator('#bradfordsaturdayLosses');
        this.satBradfordAvg = page.locator('#bradfordsaturdayAverage');

        this.tueVetsLeedsGames = page.locator('#leedstuesdayvetsGamesPlayed');
        this.tueVetsLeedsWins = page.locator('#leedstuesdayvetsWins');
        this.tueVetsLeedsWinPerc = page.locator('#leedstuesdayvetsWinPerc');
        this.tueVetsLeedsLosses = page.locator('#leedstuesdayvetsLosses');
        this.tueVetsLeedsAvg = page.locator('#leedstuesdayvetsAverage');

        this.thuVetsLeedsGames = page.locator('#leedsthursdayvetsGamesPlayed');
        this.thuVetsLeedsWins = page.locator('#leedsthursdayvetsWins');
        this.thuVetsLeedsWinPerc = page.locator('#leedsthursdayvetsWinPerc');
        this.thuVetsLeedsLosses = page.locator('#leedsthursdayvetsLosses');
        this.thuVetsLeedsAvg = page.locator('#leedsthursdayvetsAverage');

        this.thuVetsBLeedsGames = page.locator(
            '#leedsthursdayvetsbGamesPlayed'
        );
        this.thuVetsBLeedsWins = page.locator('#leedsthursdayvetsbWins');
        this.thuVetsBLeedsWinPerc = page.locator('#leedsthursdayvetsbWinPerc');
        this.thuVetsBLeedsLosses = page.locator('#leedsthursdayvetsbLosses');
        this.thuVetsBLeedsAvg = page.locator('#leedsthursdayvetsbAverage');

        this.wedBradfordGames = page.locator('#bradfordhalfholidayGamesPlayed');
        this.wedBradfordWins = page.locator('#bradfordhalfholidayWins');
        this.wedBradfordWinPerc = page.locator('#bradfordhalfholidayWinPerc');
        this.wedBradfordLosses = page.locator('#bradfordhalfholidayLosses');
        this.wedBradfordAvg = page.locator('#bradfordhalfholidayAverage');

        this.wedPairsAWGames = page.locator(
            '#airewharfewednesdaypairsGamesPlayed'
        );
        this.wedPairsAWWins = page.locator('#airewharfewednesdaypairsWins');
        this.wedPairsAWWinPerc = page.locator(
            '#airewharfewednesdaypairsWinPerc'
        );
        this.wedPairsAWLosses = page.locator('#airewharfewednesdaypairsLosses');
        this.wedPairsAWAvg = page.locator('#airewharfewednesdaypairsAverage');
    }
}
