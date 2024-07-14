import openpyxl
from pathlib import Path
import json
import os
from datetime import date
import utils
import re

year = str(date.today().year)

leaguesDays = utils.teamDays
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

    # Find the stating row to check the stats
    startingRow = 0
    startingRowIndex = 1
    for row in sheet['A']:
        if row.value and type(row.value) is str and 'FULL RESULTS' in row.value.upper():
            startingRow = startingRowIndex
            break
        startingRowIndex += 1

    # Find the cup games in the stats
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

    # Find rows in spreadsheet for players' games
    playerIndex = 1
    homePlayerRow = []
    awayPlayerRow = []
    for row in sheet['A']:
        if playerIndex < startingRow:
            playerIndex = playerIndex + 1
            continue
        rowText = row.value
        if (rowText and type(rowText) is str):
            findPossiblePlayerNames = re.findall(r"([A-za-z'\-()]+(?: [A-Za-z'\-()]+)+)", rowText)
            if len(findPossiblePlayerNames) > 1:                
                possiblePlayerNameHome = str(findPossiblePlayerNames[0]).strip()
                possiblePlayerNameHome = standardiseName(possiblePlayerNameHome).lower()
                if possiblePlayerNameHome in players or possiblePlayerNameHome in duplicatePlayerNames:
                    homePlayerRow.append(playerIndex)

                possiblePlayerNameAway = str(findPossiblePlayerNames[1]).strip()
                possiblePlayerNameAway = standardiseName(possiblePlayerNameAway).lower()
                if possiblePlayerNameAway in players or possiblePlayerNameAway in duplicatePlayerNames:
                    awayPlayerRow.append(playerIndex)
        playerIndex = playerIndex + 1

    # Find each players' results
    for row in range(startingRow, sheet.max_row + 1):
        # Create list as players may be playing against one another
        playerRows = []
        playerToProcess = False
        
        if row in homePlayerRow:
            playerToProcess = True
            playerRows.append('home')

        if row in awayPlayerRow:
            playerToProcess = True
            playerRows.append('away')
        
        if playerToProcess is False:
            continue

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
            correctPlayerFound = False
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
                if not cupGame:
                    homeGame = True

            if homeOrAway == 'away':
                if not cupGame:
                    awayGame = True

            # Checks player plays for expected team
            for i in range(0, 13):
                if row - i <= startingRow:
                    break

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

            # Find result details
            if correctPlayerFound:
                text = sheet['A' + str(row)].value

                findPossiblePlayerNames = re.findall(r"([A-za-z'\-()]+(?: [A-Za-z'\-()]+)+)", text)
                if homeGame or cupHome:
                    opponentsName = findPossiblePlayerNames[1]
                
                if awayGame or cupAway:
                    opponentsName = findPossiblePlayerNames[0]
                    
                if 'walkover' not in opponentsName.lower() and 'no player' not in opponentsName.lower():
                    if homeGame or cupHome:
                        playerName = findPossiblePlayerNames[0]
                        
                        aggregateMatch = re.findall(r'\d+', text)
                        if aggregateMatch:
                            aggregate = int(aggregateMatch[0].strip())
                            opponentAggregate = int(aggregateMatch[1].strip())

                    if awayGame or cupAway:
                        playerName = findPossiblePlayerNames[1]
                        
                        aggregateMatch = re.findall(r'\d+', text)
                        if aggregateMatch:
                            aggregate = int(aggregateMatch[1].strip())
                            opponentAggregate = int(aggregateMatch[0].strip())

                    # Checks whether it's a pairs game
                    pairsGame = False
                    scoreFoundInText = any(char.isdigit() for char in text)
                    if scoreFoundInText is False:
                        pairsGame = True
                        rowBelowText = sheet['A' + str(row - 1)].value
                        
                        findPossiblePairsPlayerNames = re.findall(r"([A-za-z'\-()]+(?: [A-Za-z'\-()]+)+)", rowBelowText)
                        pairsAggregateMatch = re.findall(r'\d+', rowBelowText)
                        if homeGame or cupHome:
                            pairsPartner = findPossiblePairsPlayerNames[0]
                            secondOpponent = findPossiblePairsPlayerNames[1]
                            aggregate = int(pairsAggregateMatch[0].strip())
                            opponentAggregate = int(pairsAggregateMatch[1].strip())
                
                        if awayGame or cupAway:
                            pairsPartner = findPossiblePairsPlayerNames[1]
                            secondOpponent = findPossiblePairsPlayerNames[0]
                            aggregate = int(pairsAggregateMatch[1].strip())
                            opponentAggregate = int(pairsAggregateMatch[0].strip())
                            
                    else:
                        rowBelowText = sheet['A' + str(row + 1)].value
                        
                        findPossiblePairsPlayerNames = re.findall(r"([A-za-z'\-()]+(?: [A-Za-z'\-()]+)+)", rowBelowText)
                        pairsAggregateMatch = re.findall(r'\d+', rowBelowText)
                        if len(pairsAggregateMatch) == 0:
                            pairsGame = True
                            if homeGame or cupHome:
                                pairsPartner = findPossiblePairsPlayerNames[0]
                                secondOpponent = findPossiblePairsPlayerNames[1]
                            if awayGame or cupAway:
                                pairsPartner = findPossiblePairsPlayerNames[1]
                                secondOpponent = findPossiblePairsPlayerNames[0]

                    playerName = formatName(playerName)
                    opponentsName = formatName(opponentsName)
                    pairsPartner = formatName(pairsPartner)
                    secondOpponent = formatName(secondOpponent)

                    # Store player stats
                    playerNameForResult = playerName
                    if pairsGame:
                        playerResults[playerName]['pairsPartners'].append(pairsPartner)
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
                            playerResults[playerName]['winningPairsPartners'].append(pairsPartner)
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
