import openpyxl
from pathlib import Path
import json
import os
from datetime import date
import utils
import re

year = str(date.today().year)

leaguesDays = ['Test'] # leaguesDays = utils.teamDays # TODO revert
players = utils.players
duplicatePlayerNames = utils.duplicatePlayerNames
playerResults = utils.returnListOfPlayerStats(utils.teamDays, False)
formatName = utils.formatName
standardiseName = utils.standardiseName
teamsTracking = utils.teamsTracking
returnTotalAggAvailablePerGame = utils.returnTotalAggAvailablePerGame
sanityChecksOnPlayerStats = utils.sanityChecksOnPlayerStats
cupTextList = utils.cupText
leaguesProcessed = []

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
            break
        startingRowIndex += 1

    cupGameIndex = 1
    cupGameRows = []
    for row in sheet['A']:
        if cupGameIndex > startingRow:
            if row.value and type(row.value) is str:
                for cupText in cupTextList:
                    if cupText in row.value.lower():
                        for i in range(0, 11):
                            cupGameRows.append(cupGameIndex + i)
                        break
        cupGameIndex += 1

    # TODO the other script may have extra logic e.g. around traitor and transferred players  
    # Find rows in spreadsheet for players' games
    playerIndex = 1
    homePlayerRow = []
    awayPlayerRow = []
    for row in sheet['A']:
        rowText = row.value
        if (rowText and type(rowText) is str):
            isPlayerResultHome = re.match(r"^[^\d]+", rowText)
            if isPlayerResultHome:
                possiblePlayerNameHome = isPlayerResultHome.group().strip()
                possiblePlayerNameHome = standardiseName(possiblePlayerNameHome).lower()
                if possiblePlayerNameHome in players or possiblePlayerNameHome in duplicatePlayerNames:
                    homePlayerRow.append(playerIndex)

            isPlayerResultAway = re.search(r"\d+\s+(.*)", rowText)
            if isPlayerResultAway:
                possiblePlayerNameAway = isPlayerResultAway.group()
                possiblePlayerNameAway = re.sub(r"\d+", "", possiblePlayerNameAway).strip()
                possiblePlayerNameAway = standardiseName(possiblePlayerNameAway).lower()
                if possiblePlayerNameAway in players or possiblePlayerNameAway in duplicatePlayerNames:
                    awayPlayerRow.append(playerIndex)
        playerIndex = playerIndex + 1

    # Find each players' results
    for row in range(startingRow, sheet.max_row + 1):
        playerRows = []
        if row in homePlayerRow:
            playerRows.append('home')
        if row in awayPlayerRow:
            playerRows.append('away')

        for homeOrAway in playerRows:
            # reset variable values
            aggregate = 0
            opponentAggregate = 0
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
            cupHome = False
            cupAway = False

            # Find columns
            if row in cupGameRows:
                cupGame = True
                if homeOrAway == 'home':
                    cupHome = True
                if homeOrAway == 'away':
                    cupAway = True

            if homeOrAway == 'home':
                updateStats = True
                if not cupGame:
                    homeGame = True

            if homeOrAway == 'away':
                updateStats = True
                if not cupGame:
                    awayGame = True

            # Checks player plays for expected team
            correctPlayerFound = False
            for i in range(0, 13):
                if row - i <= startingRow:
                    break
                
                # TODO should I care about possible duplicate name appearing for home/away team?
                possibleTeamText = sheet['A'][row - i].value
                if type(possibleTeamText) is str:
                    # Checks against full team name first
                    for team in teamsTracking:
                        if team.lower() in possibleTeamText.lower():
                            correctPlayerFound = True
                            break
                    
                    if correctPlayerFound is True:
                        break
                        
                    # Checks against each word in the team name if team not found
                    teamNameParts = possibleTeamText.split(' ')
                    for part in teamNameParts:
                        if part.lower() in teamsTracking:
                            correctPlayerFound = True
                            break
            if correctPlayerFound is False:
                updateStats = False

            # Find result details
            if updateStats:
                # TODO change regex to what Stiv sent me? Use Find all, then change it to [0], [1] etc.?
                # TODO check how it handles - and ' etc.
                text = sheet['A' + str(row)].value
                # TODO will this work for pairs games?
                if homeGame or cupHome:
                    opponentsName = re.search(r"\d+\s+(.*)", text).group()
                    opponentsName = re.sub(r"\d+", "", opponentsName).strip()
                
                if awayGame or cupAway:
                    opponentsName = re.match(r"^[^\d]+", text).group().strip()
                    
                if opponentsName.lower() != '*walkover*' and opponentsName.lower() != '*no player*':
                    if homeGame or cupHome:
                        playerName = re.match(r"^[^\d]+", text).group().strip()
                            
                        aggregateMatch = re.findall(r'\d+', text)
                        if aggregateMatch:
                            aggregate = int(aggregateMatch[0].strip())
                            opponentAggregate = int(aggregateMatch[1].strip())

                    if awayGame or cupAway:
                        playerName = re.search(r"\d+\s+(.*)", text).group()
                        playerName = re.sub(r"\d+", "", playerName).strip()
                        
                        aggregateMatch = re.findall(r'\d+', text)
                        if aggregateMatch:
                            aggregate = int(aggregateMatch[1].strip())
                            opponentAggregate = int(aggregateMatch[0].strip())
                            
                # TODO remove
                # Mick Bagshaw       21  Craig Clarkson     17
                # Trevor Hawkin          Alyssa Randell       
                
                # TODO how to get regex for pairs game?
                    if aggregateMatch.count == 0:
                        print('HERE')
                    pairsGame = False
                    # if aggregate is None:
                        # pairsGame = True
                #         pairsPartner = sheet[playerNameCol +
                #                              str(row - 1)].value
                #         secondOpponent = sheet[opponentPlayerNameCol +
                #                                str(row - 1)].value
                #         aggregate = sheet[playerScoreCol + str(row - 1)].value
                #         opponentAggregate = sheet[opponentPlayerScoreCol +
                #                                   str(row - 1)].value
                #     else:
                #         pointsRowBelow = sheet[playerScoreCol +
                #                                str(row + 1)].value
                #         if pointsRowBelow is None:
                #             pairsGame = True
                #             pairsPartner = sheet[playerNameCol +
                #                                  str(row + 1)].value
                #             secondOpponent = sheet[opponentPlayerNameCol +
                #                                    str(row + 1)].value

                    pairsPartner = formatName(pairsPartner)
                    playerName = formatName(playerName)
                    opponentsName = formatName(opponentsName)
                    secondOpponent = formatName(secondOpponent)
                    pairsPartner = formatName(pairsPartner)

                    # Store player stats
                    playerNameForResult = playerName
                    if pairsGame:
                        playerResults[playerName]['pairsPartners'].append(
                            pairsPartner)
                        playerNameForResult = playerName + ' & ' + pairsPartner
                        opponentsName = opponentsName + ' & ' + secondOpponent
                        playerResults[playerName]['availablePairsAgg'] += returnTotalAggAvailablePerGame(league)
                        playerResults[playerName]['totalPairsAgg'] += aggregate
                        playerResults[playerName]['totalPairsAggAgainst'] += opponentAggregate

                    playerResults[playerName]['totalGamesPlayed'] += 1
                    playersResult = playerNameForResult + ' ' + \
                        str(aggregate) + ' - ' + \
                        str(opponentAggregate) + ' ' + opponentsName
                    playerResults[playerName]['results'].append(
                        playersResult)

                    # Wins
                    if aggregate > opponentAggregate:
                        if pairsGame:
                            playerResults[playerName]['winningPairsPartners'].append(
                                pairsPartner)
                            playerResults[playerName]['pairWins'] += 1
                        if homeGame:
                            playerResults[playerName]['homeWins'] += 1
                            if pairsGame:
                                playerResults[playerName]['pairHomeWins'] += 1
                        if awayGame:
                            playerResults[playerName]['awayWins'] += 1
                            if pairsGame:
                                playerResults[playerName]['pairAwayWins'] += 1
                        if cupGame:
                            playerResults[playerName]['cupWins'] += 1
                            if pairsGame:
                                playerResults[playerName]['pairCupWins'] += 1
                    # Losses
                    else:
                        if pairsGame:
                            playerResults[playerName]['losingPairsPartners'].append(pairsPartner)
                            playerResults[playerName]['pairLosses'] += 1
                        if homeGame:
                            playerResults[playerName]['homeLosses'] += 1
                            if pairsGame:
                                playerResults[playerName]['pairHomeLosses'] += 1
                        if awayGame:
                            playerResults[playerName]['awayLosses'] += 1
                            if pairsGame:
                                playerResults[playerName]['pairAwayLosses'] += 1
                        if cupGame:
                            playerResults[playerName]['cupLosses'] += 1
                            if pairsGame:
                                playerResults[playerName]['pairCupLosses'] += 1

                    # Averages
                    playerResults[playerName]['availableAgg'] += returnTotalAggAvailablePerGame(league)
                    playerResults[playerName]['totalAgg'] += aggregate
                    playerResults[playerName]['totalAggAgainst'] += opponentAggregate
                    if homeGame:
                        playerResults[playerName]['availableHomeAgg'] += returnTotalAggAvailablePerGame(league)
                        playerResults[playerName]['totalHomeAgg'] += aggregate
                        playerResults[playerName]['totalHomeAggAgainst'] += opponentAggregate
                        if pairsGame:
                            playerResults[playerName]['availablePairsHomeAgg'] += returnTotalAggAvailablePerGame(league)
                            playerResults[playerName]['totalPairsHomeAgg'] += aggregate
                            playerResults[playerName]['totalPairsHomeAggAgainst'] += opponentAggregate
                    if awayGame:
                        playerResults[playerName]['availableAwayAgg'] += returnTotalAggAvailablePerGame(league)
                        playerResults[playerName]['totalAwayAgg'] += aggregate
                        playerResults[playerName]['totalAwayAggAgainst'] += opponentAggregate
                        if pairsGame:
                            playerResults[playerName]['availablePairsAwayAgg'] += returnTotalAggAvailablePerGame(league)
                            playerResults[playerName]['totalPairsAwayAgg'] += aggregate
                            playerResults[playerName]['totalPairsAwayAggAgainst'] += opponentAggregate
                    playerResults[playerName]['dayPlayed'].append(league)

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
    print('------')

# Sanity checks on the data
sanityChecksOnPlayerStats(playerResults, players)
print('Sanity checks for all teams stats complete')
