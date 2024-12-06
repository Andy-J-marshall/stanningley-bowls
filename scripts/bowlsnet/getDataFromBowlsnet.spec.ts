import {
    test,
    chromium,
    Browser,
    BrowserContext,
    Page,
} from '@playwright/test';
import fs from 'fs';

const year = new Date().getFullYear();
const previousYearBool = false; // Set to true to get data from previous year and change year variable to the year you want

let queryParam = '';

if (previousYearBool) {
    queryParam = `?DB=${year}`;
}

function sleep() {
    return new Promise((resolve) => setTimeout(resolve, 1000));
}

const leagues = [
    {
        day: 'Leeds Monday Combined',
        url: '/Leeds-MonComb',
    },
    {
        day: 'Leeds Tuesday Vets',
        url: '/Leeds-TueVets',
    },
    {
        day: 'Leeds Tuesday',
        url: '/Leeds-Tue',
    },
    {
        day: 'Leeds Half Holiday',
        url: '/Leeds-Wed',
    },
    {
        day: 'AireWharfe Wednesday Pairs',
        url: '/AW-WedPairs',
    },
    {
        day: 'Leeds Thursday Vets',
        url: '/Leeds-ThuVets',
    },
    {
        day: 'Leeds Saturday',
        url: '/Leeds-Sat',
    },
    {
        day: 'Mirfield',
        url: '/Mirfield',
    },
    {
        day: 'Spen Valley',
        url: '/WestRiding',
    },
    {
        day: 'AireWharfe Monday',
        url: '/AW-Mon',
    },
    {
        day: 'AireWharfe Vets',
        url: '/AW-Vets',
    },
    {
        day: 'Bradford Monday',
        url: '/Bradford-Mon',
    },
    {
        day: 'Bradford Half Holiday',
        url: '/Bradford-HalfHol',
    },
    {
        day: 'Bradford Vets',
        url: '/Bradford-Vets',
    },
    {
        day: 'Bradford Saturday',
        url: '/Bradford-Sat',
    },
    // Other leagues of interest
    // {
    //     day: 'North East Leeds Vets',
    //     url: '/NELeedsVets',
    // },
    // {
    //     day: 'Tadcaster',
    //     url: '/Tadcaster',
    // },
    // {
    //     day: 'Leeds Ladies',
    //     url: '/LeedsLadies',
    // },
    // {
    //     day: 'AireWharfe Saturday',
    //     url: '/AW-Sat',
    // },
    // {
    //     day: 'AireWharfe Wednesday',
    //     url: '/AW-WedSingles',
    // },
    // {
    //     day: 'Barkston Ash',
    //     url: '/BarkstonAsh',
    // },
    // {
    //     day: 'Guiseley Winter',
    //     url: '/GuiseleyWinter',
    // },
    // {
    //     day: 'Wetherby Autumn',
    //     url: '/WetherbyAutumn',
    // },
];

for (const league of leagues) {
    test(`${league.day} Stats`, async () => {
        // Browser set up
        const browser: Browser = await chromium.launch();
        const context: BrowserContext = await browser.newContext();
        let page: Page = await context.newPage();

        // Navigate to Bowlsnet and wait for page to load
        await page.goto(`${league.url}${queryParam}`);
        await sleep();

        // Click pop up if present
        try {
            const popUp = page
                .frameLocator('iframe[title="BowlsNet Page"]')
                .frameLocator('iframe[title="BowlsNet Dlg"]')
                .getByRole('button', { name: 'Close' });
            const popUpCount = await popUp.count();
            if (popUpCount > 0) {
                await popUp.click();
            }
        } catch (error) {
            console.log(`No popup to click for ${league.day}, continuing...`);
        }

        // Find league fixtures
        await page
            .frameLocator('iframe[title="BowlsNet Page"]')
            .getByText('Fixtures', { exact: true })
            .hover();

        await page
            .frameLocator('iframe[title="BowlsNet Page"]')
            .getByText('League Fixtures')
            .click();

        // Export MatchCards
        await page
            .frameLocator('iframe[title="BowlsNet Page"]')
            .locator('div')
            .filter({ hasText: /^\.\.\. ▼$/ })
            .click();

        await page
            .frameLocator('iframe[title="BowlsNet Page"]')
            .getByText('Export MatchCards...')
            .click();

        const newPagePromise = page.waitForEvent('popup');
        await page
            .frameLocator('iframe[title="BowlsNet Page"]')
            .frameLocator('iframe[title="BowlsNet Dlg"]')
            .getByRole('button', { name: 'In Text Format' })
            .click();

        // View report in new tab
        const newPage = await newPagePromise;
        await newPage.bringToFront();
        await newPage.waitForLoadState('domcontentloaded');

        // Create text file
        const value = await newPage.evaluate(
            () => document.querySelector('body > pre')?.textContent
        );
        const filePath = `./bowlsnetReports/${year}/${league.day}.txt`;
        fs.writeFile(filePath, value as string, (err) => {
            if (err) {
                console.log(err);
            }
        });
    });
}
