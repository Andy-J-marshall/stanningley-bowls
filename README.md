# README

## Pre-requisites
node

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

<!-- TODO do we want the Excel file in Git? -->
<!-- TODO Update wording of home and membership page -->
<!-- TODO Buy a domain -->
<!-- TODO create cypress scripts to get the data? -->
<!-- TODO update readme (and scripts readme) -->
<!-- TODO improve images -->
<!-- TODO Add routing? -->
<!-- TODO add a config file for things like days played, membership price, stanningley specific stuff etc. -->

## Bowls script
A script to collate stats from all Stanningley bowls club teams.

Data pulled from:
https://bowlsnet.uk/Leeds/Sat
https://bowlsnet.uk/Leeds/MonComb
https://bowlsnet.uk/LeedsParkVets/Tue
https://bowlsnet.uk/LeedsParkVets/Thu

### pre reqs
* Download and install python 3
* Run: `pip3 install openpyxl==2.6.2 `
* Create an Excel workbook called bowlsresults.xlsx and store it in the `/files` directory
* Create 4 new sheets, 1 for each day the team plays e.g. Monday, Tuesday, Thursday, Saturday
* Navigate to each of the above 4 URLs, go to Info, then Reports:
  * select Formatted Report
  * select the full From and To date ranges
  * tick Output Full Results
* Copy the outputted reports to the corresponding sheet in the Excel workbook
* Save the Excel file

### Update list of players
If a new player joins or a team is entered into a new league, you'll need to update the details in `stanningleyTeamDetails.py`.

e.g. a new player would have to be added into the `stanningleyPlayers` array and `stanningleyPlayerResults` dict.

If a player has multiple spellings, enter them into the `duplicateTeamMemberNames` array

### to run
`npm run update-stats`

JSON file will be created: `src/data/bowlsStats.json`

You might want to format the JSON document to make it easier to read