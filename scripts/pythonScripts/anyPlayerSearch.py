import openpyxl
from pathlib import Path
import json
import os
from datetime import date
import utils
import sys

# TODO delete this comment
# e.g. python3 ./scripts/pythonScripts/anyPlayerSearch.py 'jim moorin' 'james moorin, jimmy moorin' 'stanningley, littlemoor' '2024'
playerNameInput = sys.argv[1]
player = utils.standardiseName(playerNameInput).lower()
duplicatePlayerNames = sys.argv[2].lower()
teamsTracking = sys.argv[3].lower()
year = sys.argv[4]
leaguesDays = utils.teamDays
playerResults = utils.returnIndividualPlayerStats(player)
standardiseName = utils.standardiseName
returnTotalAggAvailablePerGame = utils.returnTotalAggAvailablePerGame
sanityChecksOnPlayerStats = utils.sanityChecksOnPlayerStats
cupText = utils.cupText
leaguesProcessed = []

# Spreadsheet info
homePlayerCol = 'A'
homePlayerScoreCol = 'B'
awayPlayerCol = 'C'
awayPlayerScoreCol = 'D'
homeTeamNameCol = 'A'
awayTeamNameCol = 'B'

# Open Excel file
path = str(Path.cwd()) + '/files/' + 'bowlsresults' + year + '.xlsx'
wb = openpyxl.load_workbook(path)

print('UPDATING ALL PLAYER STATS')

for league in leaguesDays:
    # To prevent duplication
    league = league.replace(' (A)', '').replace(' (B)', '')
    if league in leaguesProcessed:
        continue
    leaguesProcessed.append(league)
    
    # Goes through each sheet in turn
    sheet = wb[league]
    print('Processing ' + league)

    startingRow = 0
    startingRowIndex = 1
    for row in sheet['A']:
        if row.value and type(row.value) is str and 'FULL RESULTS' in row.value.upper():
            startingRow = startingRowIndex
        startingRowIndex += 1

    cupGameIndex = 1
    cupGameRows = []
    for row in sheet['A']:
        if row.value and type(row.value) is str:
            if cupGameIndex > startingRow and row.value.lower() in cupText:
                for i in range(0, 11):
                    cupGameRows.append(cupGameIndex + i)
        cupGameIndex += 1

    # Find rows in spreadsheet for players' games
    homePlayerIndex = 1
    homePlayerRow = []
    for homePlayer in sheet[homePlayerCol]:
        homePlayerName = homePlayer.value
        if (homePlayerName and type(homePlayerName) is str):
            homePlayerName = standardiseName(homePlayerName)
            if homePlayerName.lower() == player.lower() or homePlayerName.lower() in duplicatePlayerNames:
                homePlayerRow.append(homePlayerIndex)
        homePlayerIndex = homePlayerIndex + 1

    awayPlayerIndex = 1
    awayPlayerRow = []
    for awayPlayer in sheet[awayPlayerCol]:
        awayPlayerName = awayPlayer.value
        if (awayPlayerName and type(awayPlayerName) is str):
            awayPlayerName = standardiseName(awayPlayerName)
            if awayPlayerName.lower() == player.lower() or awayPlayerName.lower() in duplicatePlayerNames:
                awayPlayerRow.append(awayPlayerIndex)
        awayPlayerIndex = awayPlayerIndex + 1

    # Find each players' results
    for row in range(startingRow, sheet.max_row + 1):
        playersToUpdate = []
        if row in homePlayerRow:
            playersToUpdate.append('home')
        if row in awayPlayerRow:
            playersToUpdate.append('away')

        for p in playersToUpdate:
            # reset variable values
            aggregate = 0
            opponentAggregate = 0
            secondOpponent = ''
            opponentsName = ''
            pairsGame = False
            pairsPartner = ''
            opponentTeam = ''
            updateStats = False
            homeGame = None
            awayGame = None
            cupGame = False

            # Find columns
            if row in cupGameRows:
                cupGame = True

            if p == 'home':
                updateStats = True
                if not cupGame:
                    homeGame = True
                playerNameCol = homePlayerCol
                playerScoreCol = homePlayerScoreCol
                opponentPlayerNameCol = awayPlayerCol
                opponentPlayerScoreCol = awayPlayerScoreCol
                teamNameCol = homeTeamNameCol
            if p == 'away':
                updateStats = True
                if not cupGame:
                    awayGame = True
                playerNameCol = awayPlayerCol
                playerScoreCol = awayPlayerScoreCol
                opponentPlayerNameCol = homePlayerCol
                opponentPlayerScoreCol = homePlayerScoreCol
                teamNameCol = awayTeamNameCol

            # Checks player plays for expected team
            correctPlayerFound = False
            teamName = ''
            longTeamName = ''
            for i in range(0, 13):
                if row - i <= startingRow:
                    break

                possibleTeamName = sheet[teamNameCol][row - i].value
                if type(possibleTeamName) is str:
                    # Checks against full team name first
                    if possibleTeamName.lower() in teamsTracking:
                        teamName = possibleTeamName
                        correctPlayerFound = True
                        break
                    else:                        
                        # Checks against first two words in team name next
                        teamNameParts = possibleTeamName.split(' ')
                        if len(teamNameParts) > 2:
                            longTeamName = (teamNameParts[0] + ' ' + teamNameParts[1])
                            if longTeamName.lower() in teamsTracking:
                                teamName = possibleTeamName
                                correctPlayerFound = True
                                break

                        # Finally checks against each word in the team name
                        for part in teamNameParts:
                            if part.lower() in teamsTracking:
                                teamName = possibleTeamName
                                correctPlayerFound = True
                                break

            if correctPlayerFound is False:
                updateStats = False

            # Find result details
            if updateStats:
                opponentsName = sheet[opponentPlayerNameCol + str(row)].value

                if opponentsName.lower() != '*walkover*' and opponentsName.lower() != '*no player*':
                    aggregate = sheet[playerScoreCol + str(row)].value
                    opponentAggregate = sheet[opponentPlayerScoreCol +
                                              str(row)].value
                    pairsGame = False
                    if aggregate is None:
                        pairsGame = True
                        pairsPartner = sheet[playerNameCol +
                                             str(row - 1)].value
                        secondOpponent = sheet[opponentPlayerNameCol +
                                               str(row - 1)].value
                        aggregate = sheet[playerScoreCol + str(row - 1)].value
                        opponentAggregate = sheet[opponentPlayerScoreCol +
                                                  str(row - 1)].value
                    else:
                        pointsRowBelow = sheet[playerScoreCol +
                                               str(row + 1)].value
                        if pointsRowBelow is None:
                            pairsGame = True
                            pairsPartner = sheet[playerNameCol +
                                                 str(row + 1)].value
                            secondOpponent = sheet[opponentPlayerNameCol +
                                                   str(row + 1)].value

                    pairsPartner = standardiseName(pairsPartner)
                    opponentsName = standardiseName(opponentsName)
                    secondOpponent = standardiseName(secondOpponent)

                    # Store player stats
                    playerNameForResult = player
                    if pairsGame:
                        playerResults[player]['pairsPartners'].append(
                            pairsPartner)
                        playerNameForResult = player + ' & ' + pairsPartner
                        opponentsName = opponentsName + ' & ' + secondOpponent
                        playerResults[player]['availablePairsAgg'] += returnTotalAggAvailablePerGame(league)
                        playerResults[player]['totalPairsAgg'] += aggregate
                        playerResults[player]['totalPairsAggAgainst'] += opponentAggregate

                    playerResults[player]['totalGamesPlayed'] += 1
                    playersResult = playerNameForResult + ' ' + \
                        str(aggregate) + ' - ' + \
                        str(opponentAggregate) + ' ' + opponentsName
                    playerResults[player]['results'].append(
                        playersResult)

                    # Wins
                    if aggregate > opponentAggregate:
                        if pairsGame:
                            playerResults[player]['winningPairsPartners'].append(
                                pairsPartner)
                            playerResults[player]['pairWins'] += 1
                        if homeGame:
                            playerResults[player]['homeWins'] += 1
                            if pairsGame:
                                playerResults[player]['pairHomeWins'] += 1
                        if awayGame:
                            playerResults[player]['awayWins'] += 1
                            if pairsGame:
                                playerResults[player]['pairAwayWins'] += 1
                        if cupGame:
                            playerResults[player]['cupWins'] += 1
                            if pairsGame:
                                playerResults[player]['pairCupWins'] += 1
                    # Losses
                    else:
                        if pairsGame:
                            playerResults[player]['losingPairsPartners'].append(pairsPartner)
                            playerResults[player]['pairLosses'] += 1
                        if homeGame:
                            playerResults[player]['homeLosses'] += 1
                            if pairsGame:
                                playerResults[player]['pairHomeLosses'] += 1
                        if awayGame:
                            playerResults[player]['awayLosses'] += 1
                            if pairsGame:
                                playerResults[player]['pairAwayLosses'] += 1
                        if cupGame:
                            playerResults[player]['cupLosses'] += 1
                            if pairsGame:
                                playerResults[player]['pairCupLosses'] += 1

                    # Averages
                    playerResults[player]['availableAgg'] += returnTotalAggAvailablePerGame(league)
                    playerResults[player]['totalAgg'] += aggregate
                    playerResults[player]['totalAggAgainst'] += opponentAggregate
                    if homeGame:
                        playerResults[player]['availableHomeAgg'] += returnTotalAggAvailablePerGame(league)
                        playerResults[player]['totalHomeAgg'] += aggregate
                        playerResults[player]['totalHomeAggAgainst'] += opponentAggregate
                        if pairsGame:
                            playerResults[player]['availablePairsHomeAgg'] += returnTotalAggAvailablePerGame(league)
                            playerResults[player]['totalPairsHomeAgg'] += aggregate
                            playerResults[player]['totalPairsHomeAggAgainst'] += opponentAggregate
                    if awayGame:
                        playerResults[player]['availableAwayAgg'] += returnTotalAggAvailablePerGame(league)
                        playerResults[player]['totalAwayAgg'] += aggregate
                        playerResults[player]['totalAwayAggAgainst'] += opponentAggregate
                        if pairsGame:
                            playerResults[player]['availablePairsAwayAgg'] += returnTotalAggAvailablePerGame(league)
                            playerResults[player]['totalPairsAwayAgg'] += aggregate
                            playerResults[player]['totalPairsAwayAggAgainst'] += opponentAggregate
                    playerResults[player]['dayPlayed'].append(
                        league + ' (' + teamName + ')')

# Create JSON file
dataToExport = {
    'playerResults': playerResults,
    'lastUpdated': date.today().strftime("%d/%m/%Y"),
    'statsYear': year
}

filename = 'src/data/individualPlayer.json'
if os.path.exists(filename):
    os.remove(filename)

with open(filename, 'w') as f:
    json.dump(dataToExport, f)
    print(filename + ' created')
    print('------')

# Sanity checks on the data
sanityChecksOnPlayerStats(playerResults, [player])
print('Sanity checks for all teams stats complete')
