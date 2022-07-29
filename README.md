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

If a player has multiple spellings, enter them into the `duplicateTeamMemberNames` array

## Run the script

`npm run update-stats`

JSON file will be created: `src/data/bowlsStats{year}.json`.

You might want to format the JSON document to make it easier to read

# How to use this repo as a template for other clubs

Update `scripts/pythonScripts/teamDetails.py`:

- teamNames
- preferredTeamName
- teamDays
- players
- duplicateTeamMemberNames
- anonymiseNames
- traitorPlayers (also update the days)
- calculateGamePoints (#TODO check if we need this one)

Update the playwright script (e.g. `teams` array) to get data from bowlsnet in `scripts/bowlsnet/getDataFromBowlsnet.spec.ts`

Update `background-color` and `color` in `src/app.css`

Update `public` folder:

- CNAME
- favicon.ico
- title in `index.html`
- short_name and name in `manifest.json`

Update all images in the `/images` folder

Update `homepage` in `package.json`

Check `bowls.py`:

- Is the `cupText` array correct of the leagues the team is in?
- Remove game points? (#TODO check if we need this one)

Update `src/config.js`:

- all data in this file
- membership info
- home page
- contact page info
- all images

Update tests:

- players array in `playerStats.spec.ts`
- bowlsStatsExample.json with data from `src/data/bowlsStatsXXXX.json`

Update team info in all components:
- lots of hardcoded references and variable names called "Monday", "Tuesday", "Thursday", "Saturday" #TODO would be good to minimise these
- Add/remove teams if there are more/fewer teams than Stanningley in `playerRecords` component
- Add/remove teams if there are more/fewer teams than Stanningley in `players` component
- Add/remove teams if there are more/fewer teams than Stanningley in `teamStats` component
- Add/remove teams if there are more/fewer teams than Stanningley in `teamInfo` component
- Add/remove teams if there are more/fewer teams than Stanningley in `teamTabs` component
