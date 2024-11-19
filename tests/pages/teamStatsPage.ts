import { Locator, Page } from '@playwright/test';

export class TeamStatsPage {
    public readonly page: Page;

    public readonly noGamesMessage: Locator;

    public readonly totalGamesValue: Locator;
    public readonly totalWinsValue: Locator;
    public readonly totalLossesValue: Locator;
    public readonly totalDrawsValue: Locator;
    public readonly totalWinPercValue: Locator;
    public readonly totalHomeWinPercValue: Locator;
    public readonly totalAwayWinPercValue: Locator;
    public readonly totalCupWinPercValue: Locator;
    public readonly totalAggValue: Locator;
    public readonly totalOpponentAggValue: Locator;

    public readonly mondayGamesValue: Locator;
    public readonly mondayWinsValue: Locator;
    public readonly mondayLossesValue: Locator;
    public readonly mondayDrawsValue: Locator;
    public readonly mondayWinPercValue: Locator;
    public readonly mondayHomeWinPercValue: Locator;
    public readonly mondayAwayWinPercValue: Locator;
    public readonly mondayCupWinPercValue: Locator;
    public readonly mondayAggValue: Locator;
    public readonly mondayOpponentAggValue: Locator;

    public readonly tuesVetsGamesValue: Locator;
    public readonly tuesVetsWinsValue: Locator;
    public readonly tuesVetsLossesValue: Locator;
    public readonly tuesVetsDrawsValue: Locator;
    public readonly tuesVetsWinPercValue: Locator;
    public readonly tuesVetsHomeWinPercValue: Locator;
    public readonly tuesVetsAwayWinPercValue: Locator;
    public readonly tuesVetsCupWinPercValue: Locator;
    public readonly tuesVetsAggValue: Locator;
    public readonly tuesVetsOpponentAggValue: Locator;

    constructor(page: Page) {
        this.page = page;
        this.totalGamesValue = page.locator(
            '#combined-team-win-losses #totalGamesValue'
        );
        this.totalWinsValue = page.locator(
            '#combined-team-win-losses #totalWinsValue'
        );
        this.totalLossesValue = page.locator(
            '#combined-team-win-losses #totalLossesValue'
        );
        this.totalDrawsValue = page.locator(
            '#combined-team-win-losses #totalDrawsValue'
        );
        this.totalWinPercValue = page.locator(
            '#combined-team-win-losses #totalWinPercValue'
        );
        this.totalHomeWinPercValue = page.locator(
            '#combined-team-win-losses #totalHomeWinPercValue'
        );
        this.totalAwayWinPercValue = page.locator(
            '#combined-team-win-losses #totalAwayWinPercValue'
        );
        this.totalCupWinPercValue = page.locator(
            '#combined-team-win-losses #totalCupWinPercValue'
        );
        this.totalAggValue = page.locator(
            '#combined-team-win-losses #totalAggValue'
        );
        this.totalOpponentAggValue = page.locator(
            '#combined-team-win-losses #totalOpponentAggValue'
        );

        this.mondayGamesValue = page.locator(
            '#mondaycombinedleeds-team-results #totalGamesValue'
        );
        this.mondayWinsValue = page.locator(
            '#mondaycombinedleeds-team-results #totalWinsValue'
        );
        this.mondayLossesValue = page.locator(
            '#mondaycombinedleeds-team-results #totalLossesValue'
        );
        this.mondayDrawsValue = page.locator(
            '#mondaycombinedleeds-team-results #totalDrawsValue'
        );
        this.mondayWinPercValue = page.locator(
            '#mondaycombinedleeds-team-results #totalWinPercValue'
        );
        this.mondayHomeWinPercValue = page.locator(
            '#mondaycombinedleeds-team-results #totalHomeWinPercValue'
        );
        this.mondayAwayWinPercValue = page.locator(
            '#mondaycombinedleeds-team-results #totalAwayWinPercValue'
        );
        this.mondayCupWinPercValue = page.locator(
            '#mondaycombinedleeds-team-results #totalCupWinPercValue'
        );
        this.mondayAggValue = page.locator(
            '#mondaycombinedleeds-team-results #totalAggValue'
        );
        this.mondayOpponentAggValue = page.locator(
            '#mondaycombinedleeds-team-results #totalOpponentAggValue'
        );

        this.tuesVetsGamesValue = page.locator(
            '#tuesdayvetsleeds-team-results #totalGamesValue'
        );
        this.tuesVetsWinsValue = page.locator(
            '#tuesdayvetsleeds-team-results #totalWinsValue'
        );
        this.tuesVetsLossesValue = page.locator(
            '#tuesdayvetsleeds-team-results #totalLossesValue'
        );
        this.tuesVetsDrawsValue = page.locator(
            '#tuesdayvetsleeds-team-results #totalDrawsValue'
        );
        this.tuesVetsWinPercValue = page.locator(
            '#tuesdayvetsleeds-team-results #totalWinPercValue'
        );
        this.tuesVetsHomeWinPercValue = page.locator(
            '#tuesdayvetsleeds-team-results #totalHomeWinPercValue'
        );
        this.tuesVetsAwayWinPercValue = page.locator(
            '#tuesdayvetsleeds-team-results #totalAwayWinPercValue'
        );
        this.tuesVetsCupWinPercValue = page.locator(
            '#tuesdayvetsleeds-team-results #totalCupWinPercValue'
        );
        this.tuesVetsAggValue = page.locator(
            '#tuesdayvetsleeds-team-results #totalAggValue'
        );
        this.tuesVetsOpponentAggValue = page.locator(
            '#tuesdayvetsleeds-team-results #totalOpponentAggValue'
        );
        this.noGamesMessage = page.getByText(
            'Stanningley did not play on this day for the selected year'
        );
    }

    async goto() {
        await this.page.goto('/#/stats/team');
    }
}
