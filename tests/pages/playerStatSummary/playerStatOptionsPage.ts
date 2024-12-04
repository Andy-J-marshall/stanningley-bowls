import { Locator, Page } from '@playwright/test';

export class PlayerStatOptionsPage {
    public readonly page: Page;

    public readonly allClubsSwitch: Locator;
    public readonly allYearSwitch: Locator;
    public readonly singlesOnlyRadio: Locator;
    public readonly pairsOnlyRadio: Locator;
    public readonly allGameTypesRadio: Locator;
    public readonly homeOnlyRadio: Locator;
    public readonly awayOnlyRadio: Locator;
    public readonly cupOnlyRadio: Locator;
    public readonly allVenuesRadio: Locator;
    public readonly teamSelectDropdown: Locator;
    public readonly clubSelectDropdown: Locator;

    constructor(page: Page) {
        this.page = page;
        this.allClubsSwitch = page.locator(
            ".form-check input[id='#all-club-stats-select-switch']"
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
        this.teamSelectDropdown = page.locator('#team-select-dropdown');
        this.clubSelectDropdown = page.locator('#club-select-dropdown');
    }

    async selectAllClubsStatsSwitch() {
        await this.allClubsSwitch.check();
    }

    async deselectClubStatsSwitch() {
        await this.allClubsSwitch.uncheck();
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

    async selectAllYearsSwitch() {
        await this.allYearSwitch.check();
    }

    async deselectAllYearsSwitch() {
        await this.allYearSwitch.uncheck();
    }

    async selectTeamFromDropdown(team: string) {
        await this.teamSelectDropdown.click();
        await this.page
            .getByRole('button', { exact: true, name: team })
            .click();
    }

    async selectAllTeamsFromTeamDropdown() {
        await this.teamSelectDropdown.click();
    }
}
