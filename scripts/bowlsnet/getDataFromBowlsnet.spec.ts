import {
    test,
    chromium,
    Browser,
    BrowserContext,
    Page,
} from '@playwright/test';
import fs from 'fs';

const year = new Date().getFullYear();
const previousYearBool = false; // Set to true to get data from previous year

let queryParam = '';

if (previousYearBool) {
    queryParam = `?DB=${year}`;
}

function sleep() {
    return new Promise((resolve) => setTimeout(resolve, 1000));
}

const leagues = [
    {
        day: 'Monday Combined Leeds',
        url: `/Leeds-MonComb${queryParam}`,
    },
    {
        day: 'Tuesday Vets Leeds',
        url: `/Leeds-TueVets${queryParam}`,
    },
    {
        day: 'Tuesday Leeds',
        url: `/Leeds-Tue${queryParam}`,
    },
    {
        day: 'Wednesday Half Holiday Leeds',
        url: `/Leeds-Wed${queryParam}`,
    },
    {
        day: 'Wednesday Pairs AireWharfe',
        url: `/AW-WedPairs${queryParam}`,
    },
    {
        day: 'Thursday Vets Leeds',
        url: `/Leeds-ThuVets${queryParam}`,
    },
    {
        day: 'Saturday Leeds',
        url: `/Leeds-Sat${queryParam}`,
    },
    {
        day: 'Tuesday Mirfield',
        url: `/Mirfield${queryParam}`,
    },
    {
        day: 'Wednesday Spen Valley',
        url: `/WestRiding${queryParam}`,
    },
    {
        day: 'Monday AireWharfe',
        url: `/AW-Mon${queryParam}`,
    },
    {
        day: 'Tuesday AireWharfe',
        url: `/AW-Vets${queryParam}`,
    },
    {
        day: 'Monday Bradford',
        url: `/Bradford-Mon${queryParam}`,
    },
    {
        day: 'Wednesday Half Holiday Bradford',
        url: `/Bradford-HalfHol${queryParam}`,
    },
    {
        day: 'Thursday Vets Bradford',
        url: `/Bradford-Vets${queryParam}`,
    },
    {
        day: 'Saturday Bradford',
        url: `/Bradford-Sat${queryParam}`,
    },
    // Other leagues of interest
    // {
    //   day: 'Leeds Ladies',
    //   url: `/LeedsLadies${queryParam}`,
    // },
    // {
    //   day: 'Saturday AireWharfe',
    //   url: `/AW-Sat${queryParam}`,
    // },
    // {
    //   day: 'Wednesday AireWharfe',
    //   url: `/AW-WedSingles${queryParam}`,
    // },
    // {
    //   day: 'Saturday Barkston Ash',
    //   url: `/BarkstonAsh${queryParam}`,
    // },
];

for (const league of leagues) {
    test(`${league.day} Stats`, async () => {
        // Browser set up
        const browser: Browser = await chromium.launch();
        const context: BrowserContext = await browser.newContext();
        let page: Page = await context.newPage();

        // Test
        await page.goto(league.url);
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

        // Find match reports
        await page
            .frameLocator('iframe[title="BowlsNet Page"]')
            .getByText('Fixtures', { exact: true })
            .click();

        // Click League Calendar if present
        try {
            const leagueCalendarButton = page
                .frameLocator('iframe[title="BowlsNet Page"]')
                .getByText('League Calendar');
            const buttonCount = await leagueCalendarButton.count();
            if (buttonCount > 0) {
                await leagueCalendarButton.click();

                await sleep(); // This is needed for some reason

                // Some leagues name them League Fixtures and some Comp. Fixtures
                const leagueFixturesButton = page
                    .frameLocator('iframe[title="BowlsNet Page"]')
                    .frameLocator('iframe[title="BowlsNet Dlg"]')
                    .getByRole('button', { name: 'League Fixtures' });
                const compFixturesButton = page
                    .frameLocator('iframe[title="BowlsNet Page"]')
                    .frameLocator('iframe[title="BowlsNet Dlg"]')
                    .getByRole('button', { name: 'Comp. Fixtures' });

                // Click whichever button is present
                const leagueFixturesButtonCount = await leagueFixturesButton.count();
                const compFixturesButtonCount = await compFixturesButton.count();
                if (leagueFixturesButtonCount > 0) {
                    await leagueFixturesButton.click();
                } else if (compFixturesButtonCount > 0) {
                    await compFixturesButton.click();
                }
            }
        } catch (error) {
            console.log(
                `Fixtures already selected for ${league.day}, continuing...`
            );
        }

        // Export MatchCards
        await page
            .frameLocator('iframe[title="BowlsNet Page"]')
            .locator('div')
            .filter({ hasText: /^\.\.\. ▼$/ })
            .click();

        await page
            .frameLocator('iframe[title="BowlsNet Page"]')
            .frameLocator('iframe[title="BowlsNet Dlg"]')
            .getByRole('button', { name: 'Export MatchCards...' })
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
