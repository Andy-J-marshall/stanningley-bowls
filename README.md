# README

This web app displays information and stats for the Crown Green Bowling club.
There is also a python script that takes the raw data from bowlsnet.uk and generates a JSON file that the web app uses.

## Pre-requisites
- Install Git
- Install GH CLI i.e. `brew install gh`
  - Run: `gh auth login` and login to GitHub
- Install NodeJS
- Install python 3
  - Run: `pip3 install openpyxl==2.6.2` (only need if updated stats for 2022 and 2023)

# React Web App

## To run locally

Run the following:

- `npm i`
- `npm run start`
- Visit: http://localhost:5173

## To deploy to Github Pages

Run the following:

- `npm i`
- `npm run build`
- `npm run deploy`
- Note: If the website isn't found then navigate to the Github repo settings and re-add the custom domain

## Pipelines
There are several GitHub Action jobs that run. These can be found in `/.github/workflows`.
* `deploy-master.yml` - this deploys to prod whenever there is a push to master and then runs the tests
* `run-ui-tests-on-pr.yml` - this runs the UI tests against prod whenever a PR is opened or changed
* `update-stats.yml` - this updates the stats on a branch and creates a PR, and is run on a schedule

Note, if the branch names change (e.g. `update_stats_prod` or `master`) then the jobs will need to be updated.

# Tests
* Install Playwright using `npx playwright install --with-deps`
* Run `npm run tests` to run the unit and UI tests
* View reports using `npm run ui-test-reports`

## Maintenance

Most of the club details are stored in the `config.ts` file (e.g. membership price, team names etc.), so any changes will need to be updated. Similarly, the `stats.tsx` file and year drop down will need to be configured to support more years.

# Bowls scripts

The script that collates stats from all club teams can be found in the `/scripts/statsScripts` directory.


## Update the player stats

Generate the reports on bowlsnet. This can either by running the automated Playwright scripts or manually.

- To generate them using Playwright:
  - Run `npm run get-stats-and-update` - this will use Playwright to generate text reports and then run the scripts to update the stats JSON files
  - Advanced: You can also get, update and commit the stats, then create a PR, by running `npm run get-stats-update-pr`. Once the PR is merged it should automatically deploy master to prod.
    - A PR will automatically be created in Github before the updated stats can be merged into master
- To generate the reports manually:
  - Navigate to the Bowlsnet league URLs
  - Go to Fixtures, then click the "..." dropdown and select Export matchcards, then select In text format
  - Copy the outputted reports to a text file
  - Save the file in the `/bowlsnetReports/{year}` directory
  - Run `npm run update-stats`

You can also set up a Cron scheduled job:
- run `crontab -e` from your terminal
- Add something like the below, replacing the path to the repo and the PATH value e.g. this runs at 10.15am and 10.15pm most days during the bowls season.

```
PATH=[insert path here]
15 10,22 1-30 4-9 1,2,3,4,6 cd /path/to/repo && npm run get-stats-update-pr
```

## Update list of players

If a new player joins or a team is entered into a new league, you'll need to update the details in `teamDetails.py`.

e.g. a new player would have to be added into the `players` list.

If a player has multiple spellings, enter them into the `duplicatePlayerNames` array and `deduplicateNames` function.

If a player plays for another team on a different day, enter them into the `traitorPlayers` array.

## Run the script

`npm run update-stats`

JSON file will be created: `src/data/bowlsStats{year}.json`.

# How to use this repo as a template for other clubs
Change the Git credentials in the GitHub action `update-stats.yml`.

Update `scripts/statsScripts/teamDetails.py`/`statsHelper.py`:

- teamNames
- preferredTeamName
- teamDays
- players
- duplicatePlayerNames
- traitorPlayers (also update the days)

Update the playwright script (e.g. `teams` array) to get data from bowlsnet in `scripts/bowlsnet/getDataFromBowlsnet.spec.ts`

Update `background-color` and `color` in `src/app.css`

Update `public` folder:

- CNAME
- favicon.ico
- title in `index.html`
- short_name and name in `manifest.json`

Update all images in the `/images` folder

Update the `History.tsx` component, including the links in the config file, and the `clubCupWinners.json` file

Update `homepage` in `package.json`

Check `bowlsTeam.py`/`bowlsCombined.py`:

- Is the `cupText` array correct of the leagues the team is in?

Update `src/config.ts`:

- all data in this file
- membership info
- home page
- contact page info
- all images

Update tests:

- players array in `playerStats.spec.ts`

Update team info in all components:

- Change hardcoded references and variable names (e.g. "Monday", "Tuesday", "Thursday", "Saturday") to the correct team names
- Add/remove teams if there are more/fewer teams than Stanningley in `records` component
- Add/remove teams if there are more/fewer teams than Stanningley in `players` component
- Add/remove teams if there are more/fewer teams than Stanningley in `teamStats` component
- Add/remove teams if there are more/fewer teams than Stanningley in `teamInfo` component
- Add/remove teams if there are more/fewer teams than Stanningley in `teamTabs` component


# Updates required at end of each calendar year

Update the `teamDetails.py` script with the updated list of players, traitorPlayers, duplicatePlayerNames and teamDays.

Create a directory for the new year in the `/bowlsnetReports`.

Update the `teamDetails.py` script: deduplicateNames, otherTeams, and otherLeagues (any leagues added to `teamDays` will need to be removed from here).

If entering a new league, make sure the `bowlsTeam.py` script will still work e.g. different scoring methods, or different number of players in a team might cause issues.

After generating the stats file for the new year, import the file into `statsData.ts`. Update `allYearStats` and `allYearCombinedStats`.
Update `statsCallback` in `App.tsx` with the reference to the new year's stats file.
Update the default stats to display for `teamStats` and `combinedStats`.

Add a dropdown item for the new year in the `yearSelectDropdown.tsx` component.

If there are any new teams added, update the `teamTabs.tsx`, `playerStatsTeams.tsx`, `teamStats.tsx`, and `teamInfo.tsx` components. Ensure any null checks are added for each new team so the components continue to work for previous years.

Add fixtures to Google calendar for all teams.

Update `History.tsx` with any trophies won and `clubCupWinners.json` with the club cup winner.

Update `checkYearDropdownHasAllYearOptions` function in `yearSelectPage.tsx`.

If adding or removing a second team, updated the following properties in `teamDetails.py`:
* `teamNames` - Add the lowercase team names for the B team 
* `teamDays` - Suffix the league name with (A) and (B) for each team e.g. `['Saturday Leeds (A)', 'Saturday Leeds (B)']`

Change the `days` property in `config.ts` to include an extra key for the second team (suffixed with ' (b)').
Change the `historicTeamInfo` property in `config.ts` to include league data for any new teams or second teams.
Update the `allTeamsInLeaguesSince2013` array in `config.ts` to include an extra keys (second team teams need to be suffixed with ' (b)'). 
Update any URLs if the Bowlsnet link has changed.
Update `playersHelper.ts` with the name of any new teams or second teams. Keep the old name for the first team and put the B team stats inside a null check for backwards compatibility for previous years. These stats need to be imported and used in `playerTeamStats.tsx`.

Consider whether to add league reports for any non-tracked leagues e.g. Barkston Ash, AireWharfe Saturday, Leeds Ladies etc.

## Ideas for future improvements
* Home/away/cup breakdown on stat summary options
* Improve homepage - news section?
* All years detailed stats (not just summary):
  * Players best ever season
