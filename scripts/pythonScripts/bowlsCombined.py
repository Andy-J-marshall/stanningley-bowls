import os
from datetime import date
import re
import statsHelper
import sanityChecks
import teamDetails
import utils

playerResults = statsHelper.returnListOfPlayerStats(teamDetails.allDays, False, teamDetails.players)
leaguesProcessed = []

print('UPDATING ALL PLAYER STATS')

for league in teamDetails.allDays:
    # To prevent duplication
    league = league.replace(' (A)', '').replace(' (B)', '')
    if league in leaguesProcessed:
        continue
    leaguesProcessed.append(league)

    # Goes through each sheet in turn
    with open('bowlsnetReports/' + utils.year + '/' + league + '.txt', 'r') as file:
        print('Updating Stats: ' + league)
        allRowsInFile = file.readlines()

        # Find the number of rows in the file
        endRow = utils.findEndRowOfFile(league, allRowsInFile)

        # Find the cup games in the stats
        cupGameRows = statsHelper.findCupGameRows(allRowsInFile)

        # Find rows in spreadsheet for players' games
        homePlayerRow = []
        awayPlayerRow = []
        for rowNumber, line in enumerate(allRowsInFile, start=0):
            row = allRowsInFile[rowNumber]
            if (row and type(row) is str):
                findPossiblePlayerNames = re.findall(r"([A-za-z'\-()]+(?: [A-Za-z'\-()]+)+)", row)
                if len(findPossiblePlayerNames) > 1:                
                    possiblePlayerNameHome = str(findPossiblePlayerNames[0]).strip()
                    possiblePlayerNameHome = statsHelper.standardiseName(possiblePlayerNameHome)
                    if possiblePlayerNameHome in teamDetails.players or possiblePlayerNameHome in teamDetails.duplicatePlayerNames:
                        homePlayerRow.append(rowNumber)

                    possiblePlayerNameAway = str(findPossiblePlayerNames[1]).strip()
                    possiblePlayerNameAway = statsHelper.standardiseName(possiblePlayerNameAway)
                    if possiblePlayerNameAway in teamDetails.players or possiblePlayerNameAway in teamDetails.duplicatePlayerNames:
                        awayPlayerRow.append(rowNumber)

        # Find each players' results
        for rowNumber in range(0, endRow + 1):
            # Create list as players may be playing against one another
            playerRows = []
            playerToProcess = False
            
            if rowNumber in homePlayerRow:
                playerToProcess = True
                playerRows.append('home')

            if rowNumber in awayPlayerRow:
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
                correctPlayerFound = False
                homeGame = None
                awayGame = None
                cupGame = False
                cupHome = False
                cupAway = False

                # Find columns
                if rowNumber in cupGameRows:
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
                    possibleTeamText = allRowsInFile[rowNumber - i]
                    
                    if type(possibleTeamText) is str:
                        possibleTeamText = possibleTeamText.lower().strip()
                        
                        # Checks against full team name first
                        for team in teamDetails.teamsTracking:
                            team = team.lower()
                            if team in possibleTeamText:
                                if (homeGame or cupHome) and possibleTeamText.startswith(team):
                                    correctPlayerFound = True
                                    break
                                if (awayGame or cupAway) and not possibleTeamText.startswith(team):
                                    correctPlayerFound = True
                                    break
                                if possibleTeamText.count(team) == 2:
                                    correctPlayerFound = True
                                    break
                        
                        if correctPlayerFound is True:
                            break

                # Find result details
                if correctPlayerFound:
                    text = allRowsInFile[rowNumber]

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
                            rowBelowText = allRowsInFile[rowNumber - 1]
                            
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
                            rowBelowText = allRowsInFile[rowNumber + 1]
                            
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

                        playerName = teamDetails.deduplicateNames(playerName)
                        opponentsName = teamDetails.deduplicateNames(opponentsName)
                        pairsPartner = teamDetails.deduplicateNames(pairsPartner)
                        secondOpponent = teamDetails.deduplicateNames(secondOpponent)

                        # Store player stats
                        playerNameForResult = playerName
                        if pairsGame:
                            playerNameForResult = playerName + ' & ' + pairsPartner
                            opponentsName = opponentsName + ' & ' + secondOpponent
                            playerResults[playerName]['availablePairsAgg'] += statsHelper.returnTotalAggAvailablePerGame(league)
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
                        playerResults[playerName]['availableAgg'] += statsHelper.returnTotalAggAvailablePerGame(league)
                        playerResults[playerName]['totalAgg'] += aggregate
                        playerResults[playerName]['totalAggAgainst'] += opponentAggregate
                        if homeGame:
                            playerResults[playerName]['availableHomeAgg'] += statsHelper.returnTotalAggAvailablePerGame(league)
                            playerResults[playerName]['totalHomeAgg'] += aggregate
                            playerResults[playerName]['totalHomeAggAgainst'] += opponentAggregate
                            if pairsGame:
                                playerResults[playerName]['availablePairsHomeAgg'] += statsHelper.returnTotalAggAvailablePerGame(league)
                                playerResults[playerName]['totalPairsHomeAgg'] += aggregate
                                playerResults[playerName]['totalPairsHomeAggAgainst'] += opponentAggregate
                        if awayGame:
                            playerResults[playerName]['availableAwayAgg'] += statsHelper.returnTotalAggAvailablePerGame(league)
                            playerResults[playerName]['totalAwayAgg'] += aggregate
                            playerResults[playerName]['totalAwayAggAgainst'] += opponentAggregate
                            if pairsGame:
                                playerResults[playerName]['availablePairsAwayAgg'] += statsHelper.returnTotalAggAvailablePerGame(league)
                                playerResults[playerName]['totalPairsAwayAgg'] += aggregate
                                playerResults[playerName]['totalPairsAwayAggAgainst'] += opponentAggregate
                        playerResults[playerName]['dayPlayed'].append(league)
    file.close()

# Create JSON file
dataToExport = {
    'playerResults': playerResults,
    'lastUpdated': date.today().strftime("%d/%m/%Y"),
    'statsYear': utils.year
}

filename = 'src/data/allPlayerStats' + utils.year + '.json'
previousFileSize = 0
if os.path.exists(filename):
    previousFileSize = sanityChecks.getFileSize(filename)
    os.remove(filename)

utils.saveFile(filename, dataToExport)

# Sanity checks on the data
sanityChecks.checkPlayerStats(playerResults, teamDetails.players)
newFileSize = sanityChecks.getFileSize(filename)
sanityChecks.checkFileSizeHasGrown(previousFileSize, newFileSize)
