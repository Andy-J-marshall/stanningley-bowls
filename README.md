# README

This web app displays information and stats for Stanningley Park Crown Green Bowling Club.
There is also a python script that takes the raw data from bowlsnet.uk and generates a JSON file that the web app uses.

# React Web App

## UI Pre-requisites

NodeJS

## To run locally

Run the following:

- `npm i`
- `npm run start`
- Visit: http://localhost:3000/stanningley-bowls

## To deploy to Github Pages

Run the following:

- `npm i`
- `npm run build`
- `npm run deploy`
- Note: If the website isn't found then navigate to the Github repo settings and re-add the custom domain `stanningleybowlsclub.co.uk`

## Maintenance

Fixture images will need to be updated for each year. Most of the club details are stored in the `config.js` file (e.g. membership price, team names etc.), so any changes will need to be updated. Similarly, the `stats.js` file and year drop down will need to be configured to support more years.

# Bowls script

The script that collates stats from all Stanningley bowls club teams can be found in the `/scripts/pythonScripts` directory.

Bowlsnet links:

- [Monday](https://bowlsnet.uk/Leeds/MonComb)
- [Tuesday](https://bowlsnet.uk/LeedsParkVets/Tue)
- [Thursday](https://bowlsnet.uk/LeedsParkVets/Thu)
- [Saturday](https://bowlsnet.uk/Leeds/Sat)

## Pre-requisites

- Download and install python 3
- Run: `pip3 install openpyxl==2.6.2`

## Update the player stats

- Create an Excel workbook called bowlsresults{year}.xlsx and store it in the `/files` directory
- Create 4 new sheets, 1 for each day the team plays e.g. Monday, Tuesday, Thursday, Saturday
- Generate the reports on bowlsnet. This can either by running the Cypress tests or manually. To generate them using Cypress:
  - Run `npm run get-latest-stats` - these will output local html files in `files/htmlFiles/` and open them in your web browser
  - Copy contents of each file (CMD + A, CMD + C) into the Excel file (CMD + V)
- To generate manually:
  - Navigate to each of the above 4 URLs, go to Info, then Reports:
  - Select Formatted Report
  - Click Output Tables
  - Select the full From and To date ranges
  - Click Output Full Results
- Copy the outputted reports to the corresponding sheet in the Excel workbook
- Save the Excel file

## Update list of players

If a new player joins or a team is entered into a new league, you'll need to update the details in `stanningleyTeamDetails.py`.

e.g. a new player would have to be added into the `stanningleyPlayers` array and `stanningleyPlayerResults` dict.

If a player has multiple spellings, enter them into the `duplicateTeamMemberNames` array

## Run the script

`npm run update-stats`

JSON file will be created: `src/data/bowlsStats{year}.json`.

You might want to format the JSON document to make it easier to read
