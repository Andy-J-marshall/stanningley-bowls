import os
from datetime import date
import re
import statsHelper
import sanityChecks
import teamDetails
import utils

playerStats = statsHelper.returnListOfPlayerStats(teamDetails.allDays, False, teamDetails.players)
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
        homePlayerRow, awayPlayerRow = statsHelper.returnHomeAndAwayPlayerRowsForAllTeams(allRowsInFile)

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
                correctPlayerFound = statsHelper.checkCorrectTeamForPlayer(allRowsInFile, rowNumber, homeGame, awayGame, cupHome, cupAway)

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
                            
                            matchAggregate = re.findall(r'\d+', text)
                            if matchAggregate:
                                aggregate = int(matchAggregate[0].strip())
                                opponentAggregate = int(matchAggregate[1].strip())

                        if awayGame or cupAway:
                            playerName = findPossiblePlayerNames[1]
                            
                            matchAggregate = re.findall(r'\d+', text)
                            if matchAggregate:
                                aggregate = int(matchAggregate[1].strip())
                                opponentAggregate = int(matchAggregate[0].strip())

                        # Checks whether it's a pairs game
                        pairsGame = statsHelper.isPairsGame(allRowsInFile, rowNumber, text)                  
                        if pairsGame:
                            pairsDetails = statsHelper.handlePairsGame(text, allRowsInFile, rowNumber, homeGame, awayGame, cupHome, cupAway)
                            if pairsDetails['aggregate'] > 0:
                                aggregate = pairsDetails['aggregate']
                            if pairsDetails['opponentAggregate'] > 0:
                                opponentAggregate = pairsDetails['opponentAggregate']
                            if pairsDetails['pairsPartner'] != '':
                                pairsPartner = pairsDetails['pairsPartner']
                            if pairsDetails['secondOpponent'] != '':
                                secondOpponent = pairsDetails['secondOpponent']
                        
                        # Format player names
                        playerName = teamDetails.deduplicateNames(playerName)
                        opponentsName = teamDetails.deduplicateNames(opponentsName)
                        pairsPartner = teamDetails.deduplicateNames(pairsPartner)
                        secondOpponent = teamDetails.deduplicateNames(secondOpponent)

                        # Store player stats
                        playerNameForResult = playerName
                        if pairsGame:
                            playerNameForResult = playerName + ' & ' + pairsPartner
                            opponentsName = opponentsName + ' & ' + secondOpponent
                            playerStats[playerName]['availablePairsAgg'] += statsHelper.returnTotalAggAvailablePerGame(league)
                            playerStats[playerName]['totalPairsAgg'] += aggregate
                            playerStats[playerName]['totalPairsAggAgainst'] += opponentAggregate

                        playerStats[playerName]['totalGamesPlayed'] += 1
                        playersResult = playerNameForResult + ' ' + \
                            str(aggregate) + ' - ' + \
                            str(opponentAggregate) + ' ' + opponentsName
                        playerStats[playerName]['results'].append(
                            playersResult)

                        # Wins
                        if aggregate > opponentAggregate:
                            if pairsGame:
                                playerStats[playerName]['pairWins'] += 1
                            if homeGame:
                                playerStats[playerName]['homeWins'] += 1
                                if pairsGame:
                                    playerStats[playerName]['pairHomeWins'] += 1
                            if awayGame:
                                playerStats[playerName]['awayWins'] += 1
                                if pairsGame:
                                    playerStats[playerName]['pairAwayWins'] += 1
                            if cupGame:
                                playerStats[playerName]['cupWins'] += 1
                                if pairsGame:
                                    playerStats[playerName]['pairCupWins'] += 1
                        # Losses
                        else:
                            if pairsGame:
                                playerStats[playerName]['pairLosses'] += 1
                            if homeGame:
                                playerStats[playerName]['homeLosses'] += 1
                                if pairsGame:
                                    playerStats[playerName]['pairHomeLosses'] += 1
                            if awayGame:
                                playerStats[playerName]['awayLosses'] += 1
                                if pairsGame:
                                    playerStats[playerName]['pairAwayLosses'] += 1
                            if cupGame:
                                playerStats[playerName]['cupLosses'] += 1
                                if pairsGame:
                                    playerStats[playerName]['pairCupLosses'] += 1

                        # Averages
                        playerStats[playerName]['availableAgg'] += statsHelper.returnTotalAggAvailablePerGame(league)
                        playerStats[playerName]['totalAgg'] += aggregate
                        playerStats[playerName]['totalAggAgainst'] += opponentAggregate
                        if homeGame:
                            playerStats[playerName]['availableHomeAgg'] += statsHelper.returnTotalAggAvailablePerGame(league)
                            playerStats[playerName]['totalHomeAgg'] += aggregate
                            playerStats[playerName]['totalHomeAggAgainst'] += opponentAggregate
                            if pairsGame:
                                playerStats[playerName]['availablePairsHomeAgg'] += statsHelper.returnTotalAggAvailablePerGame(league)
                                playerStats[playerName]['totalPairsHomeAgg'] += aggregate
                                playerStats[playerName]['totalPairsHomeAggAgainst'] += opponentAggregate
                        if awayGame:
                            playerStats[playerName]['availableAwayAgg'] += statsHelper.returnTotalAggAvailablePerGame(league)
                            playerStats[playerName]['totalAwayAgg'] += aggregate
                            playerStats[playerName]['totalAwayAggAgainst'] += opponentAggregate
                            if pairsGame:
                                playerStats[playerName]['availablePairsAwayAgg'] += statsHelper.returnTotalAggAvailablePerGame(league)
                                playerStats[playerName]['totalPairsAwayAgg'] += aggregate
                                playerStats[playerName]['totalPairsAwayAggAgainst'] += opponentAggregate
                        playerStats[playerName]['dayPlayed'].append(league)
    file.close()

# Create JSON file
dataToExport = {
    'playerResults': playerStats,
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
sanityChecks.checkPlayerStats(playerStats, teamDetails.players)
newFileSize = sanityChecks.getFileSize(filename)
sanityChecks.checkFileSizeHasGrown(previousFileSize, newFileSize)
