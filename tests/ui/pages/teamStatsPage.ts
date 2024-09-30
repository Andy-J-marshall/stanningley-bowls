import { expect, Locator, Page } from '@playwright/test';
import config from '../../../src/config';

const teamName = config.teamNames.shortName;

export class TeamStatsPage {
    private readonly page: Page;
    private readonly totalGamesValue: Locator;
    private readonly totalWinsValue: Locator;
    private readonly totalLossesValue: Locator;
    private readonly totalDrawsValue: Locator;
    private readonly totalWinPercValue: Locator;
    private readonly totalHomeWinPercValue: Locator;
    private readonly totalAwayWinPercValue: Locator;
    private readonly totalCupWinPercValue: Locator;
    private readonly totalAggValue: Locator;
    private readonly totalOpponentAggValue: Locator;

    private readonly mondayGamesValue: Locator;
    private readonly mondayWinsValue: Locator;
    private readonly mondayLossesValue: Locator;
    private readonly mondayDrawsValue: Locator;
    private readonly mondayWinPercValue: Locator;
    private readonly mondayHomeWinPercValue: Locator;
    private readonly mondayAwayWinPercValue: Locator;
    private readonly mondayCupWinPercValue: Locator;
    private readonly mondayAggValue: Locator;
    private readonly mondayOpponentAggValue: Locator;

    private readonly tuesVetsGamesValue: Locator;
    private readonly tuesVetsWinsValue: Locator;
    private readonly tuesVetsLossesValue: Locator;
    private readonly tuesVetsDrawsValue: Locator;
    private readonly tuesVetsWinPercValue: Locator;
    private readonly tuesVetsHomeWinPercValue: Locator;
    private readonly tuesVetsAwayWinPercValue: Locator;
    private readonly tuesVetsCupWinPercValue: Locator;
    private readonly tuesVetsAggValue: Locator;
    private readonly tuesVetsOpponentAggValue: Locator;

    private readonly wedPairsNoGamesPlayedMessage: Locator;

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
        this.wedPairsNoGamesPlayedMessage = page.locator(
            '#team-select-tabs-tabpane-wed p'
        );
    }

    async goto() {
        await this.page.goto('/#/stats/team');
    }

    teamStatsOverviewHasCorrectValuesFor2023() {
        expect(this.totalGamesValue).toBeVisible();
        expect(this.tuesVetsGamesValue).toBeVisible({ visible: false });

        expect(this.totalGamesValue).toContainText('112');
        expect(this.totalWinsValue).toContainText('87');
        expect(this.totalLossesValue).toContainText('20');
        expect(this.totalDrawsValue).toContainText('5');
        expect(this.totalWinPercValue).toContainText('78%');
        expect(this.totalHomeWinPercValue).toContainText('94%');
        expect(this.totalAwayWinPercValue).toContainText('59%');
        expect(this.totalCupWinPercValue).toContainText('86%');
        expect(this.totalAggValue).toContainText('15238');
        expect(this.totalOpponentAggValue).toContainText('11461');
    }

    teamStatsHasCorrectValuesForTuesVets2023() {
        expect(this.tuesVetsGamesValue).toBeVisible();
        expect(this.totalGamesValue).toBeVisible({ visible: false });

        expect(this.tuesVetsGamesValue).toContainText('22');
        expect(this.tuesVetsWinsValue).toContainText('21');
        expect(this.tuesVetsLossesValue).toContainText('1');
        expect(this.tuesVetsDrawsValue).toHaveCount(0);
        expect(this.tuesVetsWinPercValue).toContainText('95%');
        expect(this.tuesVetsHomeWinPercValue).toContainText('100%');
        expect(this.tuesVetsAwayWinPercValue).toContainText('89%');
        expect(this.tuesVetsCupWinPercValue).toContainText('100%');
        expect(this.tuesVetsAggValue).toContainText('3479');
        expect(this.tuesVetsOpponentAggValue).toContainText('2119');
    }

    teamStatsHasCorrectValuesForMonday2022() {
        expect(this.mondayGamesValue).toBeVisible();
        expect(this.totalGamesValue).toBeVisible({ visible: false });

        expect(this.mondayGamesValue).toContainText('20');
        expect(this.mondayWinsValue).toContainText('12');
        expect(this.mondayLossesValue).toContainText('5');
        expect(this.mondayDrawsValue).toContainText('3');
        expect(this.mondayWinPercValue).toContainText('60%');
        expect(this.mondayHomeWinPercValue).toContainText('70%');
        expect(this.mondayAwayWinPercValue).toContainText('50%');
        expect(this.mondayCupWinPercValue).toHaveCount(0);
        expect(this.mondayAggValue).toContainText('2077');
        expect(this.mondayOpponentAggValue).toContainText('1797');
    }

    teamStatsDoNotExistForWednesdayPairsIn2023() {
        expect(this.wedPairsNoGamesPlayedMessage).toContainText(
            `${teamName} did not play on this day for the selected year`
        );
    }
}
