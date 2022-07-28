import openpyxl
from pathlib import Path
import json
import os
from datetime import date
import combinedPlayerDetails

year = str(date.today().year)

leaguesDays = combinedPlayerDetails.leagues
players = combinedPlayerDetails.players
duplicatePlayerNames = combinedPlayerDetails.duplicatePlayerNames
playerResults = combinedPlayerDetails.playerResults
deduplicateNames = combinedPlayerDetails.deduplicateNames

# Spreadsheet info
# TODO prune these columns
homePlayerCol = 'A'
homePlayerScoreCol = 'B'
awayPlayerCol = 'C'
awayPlayerScoreCol = 'D'
homeAggCol = 'B'
awayAggCol = 'D'
homeTeamScoreCol = 'B'
awayTeamScoreCol = 'D'
homeTeamNameCol = 'A'
awayTeamNameCol = 'B'

cupText = ['qtr-finals', 'semi-finals', 'final']

# Open Excel file
path = str(Path.cwd()) + '/files/' + 'bowlsresults' + year + '.xlsx'
wb = openpyxl.load_workbook(path)


for league in leaguesDays:
    # Goes through each sheet in turn
    sheet = wb[league]
    print('Processing ' + league)

    # Find rows in spreadsheet for players' games
    homePlayerIndex = 1
    homePlayerRow = []
    for homePlayer in sheet[homePlayerCol]:
        homePlayerName = homePlayer.value
        if (homePlayerName and type(homePlayerName) is str) and (homePlayerName.lower() in players or homePlayerName.lower() in duplicatePlayerNames):
            homePlayerRow.append(homePlayerIndex)
        homePlayerIndex = homePlayerIndex + 1

    awayPlayerIndex = 1
    awayPlayerRow = []
    for awayPlayer in sheet[awayPlayerCol]:
        awayPlayerName = awayPlayer.value
        if (awayPlayerName and type(awayPlayerName) is str) and (awayPlayerName.lower() in players or awayPlayerName.lower() in duplicatePlayerNames):
            awayPlayerRow.append(awayPlayerIndex)
        awayPlayerIndex = awayPlayerIndex + 1

    # Find each players' results
    for row in range(1, sheet.max_row + 1):
        # reset variable values
        aggregate = 0
        opponentAggregate = 0
        points = 0
        opponentPoints = 0
        secondOpponent = ''
        playerName = ''
        opponentsName = ''
        pairsGame = False
        pairsPartner = ''
        opponentTeam = ''
        updateStats = False
        homeGame = None
        awayGame = None
        cupGame = False

        # Find columns

        # TODO handle cup games?
        # if row in cupGameRows:
        #     cupGame = True

        if row in homePlayerRow:
            updateStats = True
            if not cupGame:
                homeGame = True
            playerNameCol = homePlayerCol
            playerScoreCol = homePlayerScoreCol
            opponentPlayerNameCol = awayPlayerCol
            opponentPlayerScoreCol = awayPlayerScoreCol
        if row in awayPlayerRow:
            updateStats = True
            if not cupGame:
                awayGame = True
            playerNameCol = awayPlayerCol
            playerScoreCol = awayPlayerScoreCol
            opponentPlayerNameCol = homePlayerCol
            opponentPlayerScoreCol = homePlayerScoreCol

        # Find result details
        if updateStats:
            opponentsName = sheet[opponentPlayerNameCol + str(row)].value

            if opponentsName.lower() != '*walkover*':
                playerName = sheet[playerNameCol + str(row)].value
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

                playerName = deduplicateNames(playerName)

            # Store player stats
                playerNameForResult = playerName
                playerResults[playerName][league.lower()]['games'] += 1
                if pairsGame:
                    playerResults[playerName]['pairsPartners'].append(
                        pairsPartner)
                    playerNameForResult = playerName + ' & ' + pairsPartner
                    opponentsName = opponentsName + ' & ' + secondOpponent
                    playerResults[playerName]['totalPairsAgg'] += aggregate
                    playerResults[playerName]['totalPairsAggAgainst'] += opponentAggregate

                playersResult = playerNameForResult + ' ' + \
                    str(aggregate) + ' - ' + \
                    str(opponentAggregate) + ' ' + opponentsName
                playerResults[playerName]['results'].append(
                    playersResult)

                # Wins
                if aggregate > opponentAggregate:
                    playerResults[playerName][league.lower()
                                                    ]['wins'] += 1
                    playerResults[playerName]['beatenOpponents'].append(
                        opponentsName)
                    if pairsGame:
                        playerResults[playerName]['winningPairsPartners'].append(
                            pairsPartner)
                        playerResults[playerName]['pairWins'] += 1
                    if homeGame:
                        playerResults[playerName]['homeWins'] += 1
                    if awayGame:
                        playerResults[playerName]['awayWins'] += 1
                    if cupGame:
                        playerResults[playerName]['cupWins'] += 1
                # Losses
                else:
                    playerResults[playerName]['beatenBy'].append(
                        opponentsName)
                    if pairsGame:
                        playerResults[playerName]['losingPairsPartners'].append(
                            pairsPartner)
                        playerResults[playerName]['pairLosses'] += 1
                    if homeGame:
                        playerResults[playerName]['homeLosses'] += 1
                    if awayGame:
                        playerResults[playerName]['awayLosses'] += 1
                    if cupGame:
                        playerResults[playerName]['cupLosses'] += 1

                # Averages
                playerResults[playerName]['totalAgg'] += aggregate
                playerResults[playerName]['totalAggAgainst'] += opponentAggregate
                playerResults[playerName][league.lower()]['aggDiff'] += aggregate - \
                    opponentAggregate
                if homeGame:
                    playerResults[playerName]['totalHomeAgg'] += aggregate
                    playerResults[playerName]['totalHomeAggAgainst'] += opponentAggregate
                if awayGame:
                    playerResults[playerName]['totalAwayAgg'] += aggregate
                    playerResults[playerName]['totalAwayAggAgainst'] += opponentAggregate
                playerResults[playerName]['leaguePlayed'].append(league)

# Create JSON file
dataToExport = {
    'playerResults': playerResults,
    'lastUpdated': date.today().strftime("%d/%m/%Y"),
    'statsYear': year
}

filename = 'src/data/allPlayerStats' + year + '.json'
if os.path.exists(filename):
    os.remove(filename)

with open(filename, 'w') as f:
    json.dump(dataToExport, f)
    print(filename + ' created')
