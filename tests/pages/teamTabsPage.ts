import { Locator, Page } from '@playwright/test';

export class TeamTabsPage {
    public readonly page: Page;

    private readonly mondayTeamStats: Locator;
    private readonly mondayTeamRecords: Locator;
    private readonly tuesVetsTeamStats: Locator;
    private readonly tuesVetsTeamRecords: Locator;
    private readonly wedPairsTeamStats: Locator;
    private readonly wedPairsTeamRecords: Locator;
    private readonly thurVetsTeamStats: Locator;
    private readonly thurVetsTeamRecords: Locator;

    constructor(page: Page) {
        this.page = page;
        this.mondayTeamStats = page.locator(`#team-select-tabs-tab-mon`);
        this.mondayTeamRecords = page.locator(`#team-select-tabs-tab-mon`);
        this.tuesVetsTeamStats = page.locator(`#team-select-tabs-tab-tuevets`);
        this.tuesVetsTeamRecords = page.locator(
            `#team-select-tabs-tab-tuevets`
        );
        this.wedPairsTeamStats = page.locator(`#team-select-tabs-tab-wedpairs`);
        this.wedPairsTeamRecords = page.locator(
            `#team-select-tabs-tab-wedpairs`
        );
        this.thurVetsTeamStats = page.locator(`#team-select-tabs-tab-thuvets`);
        this.thurVetsTeamRecords = page.locator(
            `#team-select-tabs-tab-thuvets`
        );
    }

    async selectMondayTeamFromStatsTabs() {
        await this.mondayTeamStats.click();
    }

    async selectTuesVetsTeamFromStatsTabs() {
        await this.tuesVetsTeamStats.click();
    }

    async selectWedPairsTeamFromStatsTabs() {
        await this.wedPairsTeamStats.click();
    }

    async selectTuesVetsTeamFromRecordsTabs() {
        await this.tuesVetsTeamRecords.click();
    }

    async selectWedPairsTeamFromRecordsTabs() {
        await this.wedPairsTeamRecords.click();
    }

    async selectThurVetsTeamFromRecordsTabs() {
        await this.thurVetsTeamRecords.click();
    }
}
