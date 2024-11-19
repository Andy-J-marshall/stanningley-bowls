import { Locator, Page } from '@playwright/test';

export class TeamTabsPage {
    public readonly page: Page;

    private readonly mondayTeamTab: Locator;
    private readonly tuesVetsTab: Locator;
    private readonly wedPairsTab: Locator;
    private readonly thurVetsTab: Locator;

    constructor(page: Page) {
        this.page = page;
        this.mondayTeamTab = page.getByRole('tab', { name: 'MON' });
        this.tuesVetsTab = page.getByRole('tab', { name: 'TUE (VETS)' });
        this.wedPairsTab = page.getByRole('tab', { name: 'WED (PAIRS)' });
        this.thurVetsTab = page.getByRole('tab', { name: 'THU (VETS)' });
    }

    async selectMondayTeamTab() {
        await this.mondayTeamTab.click();
    }

    async selectTuesVetsTeamTab() {
        await this.tuesVetsTab.click();
    }

    async selectWedPairsTeamTab() {
        await this.wedPairsTab.click();
    }

    async selectThurVetsTeamTab() {
        await this.thurVetsTab.click();
    }
}
