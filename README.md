# README

This web app displays information and stats for Stanningley Park Crown Green Bowling Club.
There is also a python script that takes the raw data from bowlsnet.uk and generates a JSON file that the web app uses.

# React Web App
## UI Pre-requisites
NodeJS

## To run locally
Run the following:
* `npm i`
* `npm run start`
* Visit: http://localhost:3000/stanningley-bowls

## To deploy to Github Pages
Run the following:
* `npm i`
* `npm run build`
* `npm run deploy`

<!-- TODO Buy a domain -->
<!-- TODO Add routing? -->
<!-- TODO images load slowly -->

# Bowls script
The script that collates stats from all Stanningley bowls club teams can be found in the `/pythonScript` directory.

Bowlsnet links:
* [Monday](https://bowlsnet.uk/Leeds/MonComb)
* [Tuesday](https://bowlsnet.uk/LeedsParkVets/Tue)
* [Thursday](https://bowlsnet.uk/LeedsParkVets/Thu)
* [Saturday](https://bowlsnet.uk/Leeds/Sat)

## Pre-requisites
* Download and install python 3
* Run: `pip3 install openpyxl==2.6.2 `

## Update the player stats
* Create an Excel workbook called bowlsresults.xlsx and store it in the `/files` directory
* Create 4 new sheets, 1 for each day the team plays e.g. Monday, Tuesday, Thursday, Saturday
* Generate the reports on bowlsnet. This can either by running the Cypress tests or manually. To generate them using Cypress:
  * Run `npm run cypress:open`
  * Select Integration tests and Chome as the browser.
  * Run the tests in the generate-data.cy.js file (Bowlsnet is flaky so may need to rerun occasionally)
  * These will output the reports that can be copied and pasted into the Excel file.
* To generate manually:
  * Navigate to each of the above 4 URLs, go to Info, then Reports:
  * Select Formatted Report
  * Click Output Tables
  * Select the full From and To date ranges
  * Click Output Full Results
* Copy the outputted reports to the corresponding sheet in the Excel workbook
* Save the Excel file

## Update list of players
If a new player joins or a team is entered into a new league, you'll need to update the details in `stanningleyTeamDetails.py`.

e.g. a new player would have to be added into the `stanningleyPlayers` array and `stanningleyPlayerResults` dict.

If a player has multiple spellings, enter them into the `duplicateTeamMemberNames` array

## Run the script
`npm run update-stats`

JSON file will be created: `src/data/bowlsStats{year}.json`. Ensure you update the year variable in the python script if required.

You might want to format the JSON document to make it easier to read