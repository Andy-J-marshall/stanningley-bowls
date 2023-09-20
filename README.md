# README

This web app displays information and stats for the Crown Green Bowling club.
There is also a python script that takes the raw data from bowlsnet.uk and generates a JSON file that the web app uses.

# React Web App

## UI Pre-requisites

NodeJS

## To run locally

Run the following:

- `npm i`
- `npm run start`
- Visit: http://localhost:3000

## To deploy to Github Pages

Run the following:

- `npm i`
- `npm run build`
- `npm run deploy`
- Note: If the website isn't found then navigate to the Github repo settings and re-add the custom domain

## Maintenance

Fixture images will need to be updated for each year. Most of the club details are stored in the `config.js` file (e.g. membership price, team names etc.), so any changes will need to be updated. Similarly, the `stats.js` file and year drop down will need to be configured to support more years.

# Bowls script

The script that collates stats from all club teams can be found in the `/scripts/pythonScripts` directory.

## Pre-requisites

- Download and install python 3
- Run: `pip3 install openpyxl==2.6.2`
- Run: `pip3 install datefinder`

## Update the player stats

Generate the reports on bowlsnet. This can either by running the automated Playwright tests or manually.

- To generate them using Playwright:
  - Run `npm run get-latest-stats` - these will output local html files in `files/htmlFiles/` and open them in your web browser
  - Copy contents of each file (CMD + A, CMD + C) into the Excel file (CMD + V)
- To generate manually:
  - Create an Excel workbook called bowlsresults{year}.xlsx and store it in the `/files` directory
  - Create 4 new sheets, 1 for each day the team plays (ensure the names match the team names used by the `bowls.py` script)
  - Navigate to each of the above 4 URLs, go to Info, then Reports:
  - Select Formatted Report
  - Click Output Tables
  - Select the full From and To date ranges
  - Click Output Full Results
- Copy the outputted reports to the corresponding sheet in the Excel workbook
- Save the Excel file

## Update list of players

If a new player joins or a team is entered into a new league, you'll need to update the details in `teamDetails.py`.

e.g. a new player would have to be added into the `players` list.

If a player has multiple spellings, enter them into the `duplicateTeamMemberNames` array and `deduplicateNames` function.

If a player plays for another team on a different day, enter them into the `traitorPlayers` array.

Remove players from the `transferredPlayers` dictionary (and add to traitorPlayers?).

If a player doesn't want their full name appearing on the website, add them into the `anonymiseNames` function.

## Run the script

`npm run update-stats`

JSON file will be created: `src/data/bowlsStats{year}.json`.

You might want to format the JSON document to make it easier to read

# How to use this repo as a template for other clubs

Update `scripts/pythonScripts/teamDetails.py`/`utils`:

- teamNames
- preferredTeamName
- teamDays
- players
- duplicateTeamMemberNames
- anonymiseNames
- traitorPlayers (also update the days)
- calculateGamePoints

Update the playwright script (e.g. `teams` array) to get data from bowlsnet in `scripts/bowlsnet/getDataFromBowlsnet.spec.ts`

Update `background-color` and `color` in `src/app.css`

Update `public` folder:

- CNAME
- favicon.ico
- title in `index.html`
- short_name and name in `manifest.json`

Update all images in the `/images` folder

Update `homepage` in `package.json`

Check `bowls.py`/`bowlsCombined.py`:

- Is the `cupText` array correct of the leagues the team is in?
- Remove/edit game points?
- Check the `satAndWedLeaguePositionCol` value for the selected leagues

Update `src/config.js`:

- all data in this file
- membership info
- home page
- contact page info
- all images

Update tests:

- players array in `playerStats.spec.ts`

Update team info in all components:

- Change hardcoded references and variable names called "Monday", "Tuesday", "Thursday", "Saturday" to the correct team names
- Add/remove teams if there are more/fewer teams than Stanningley in `playerRecords` component
- Add/remove teams if there are more/fewer teams than Stanningley in `players` component
- Add/remove teams if there are more/fewer teams than Stanningley in `teamStats` component
- Add/remove teams if there are more/fewer teams than Stanningley in `teamInfo` component
- Add/remove teams if there are more/fewer teams than Stanningley in `teamTabs` component

Team Records:

- gamesPerMatch for Monday and Wednesday are set to 6 and 8 for everything else. Is this still correct?

# Updates required at end of each calendar year

Update the `get-latest-stats` script in `package.json` to point to the new year's xlsx file.

Update the `teamDetails.py` script with the updated list of players, traitorPlayers, duplicateTeamMemberNames and teamDays. Reset the transferredPlayers to empty objects for each league.

Update the `Utils.py` script: deduplicateNames, anonymiseNames, otherTeams, otherDuplicatePlayers and otherLeagues (any leagues added to teamDays in `teamDetails.py` will need to be removed from here).

If entering a new league, update `bowls.py` and `bowlscombined.py` scripts with the new scoring system for the league (if not 54321). Will also need to change the calculation for average number of points scored in `players.js` component.

After generating the stats file for the new year, import the file into `App.js` and update `allYearStats`, `allYearCombinedStats` and `statsCallback` with the reference to the new year's stats file.
Update the default stats to display for `teamStats` and `combinedStats`.

Add a dropdown item for the new year in the `yearSelectDropdown.js` component.

If there are any new teams added, update the `teamTabs.js`, `players.js`, `teamStats.js`, `teamRecords.js` and `teamInfo.js` components. Ensure any null checks are added for each new team so the components continue to work for previous years. Does the `gamesPerMatch` for the new league need updating (the default is 8)?

Update `yearFixturesAddedFor` in `fixtures.js`.

Add/update the `clubCupWinner` in the `bowlsStats{year}` file.

Update the `bowlsStats` file to the latest year in `allPlayerStats.spec.ts` and `playerStats.spec.ts`. You might need to comment out players if they haven't played a game yet.

# Ideas
### UI
<!-- TODO remove these once implemented -->
- Toggle for pairs/singles stats
- Display detailed stat information in nicer way