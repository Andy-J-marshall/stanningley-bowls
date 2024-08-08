import json
import os
from datetime import date
import teamDetailsPudsey
import utils
import re

year = str(date.today().year)

teamDays = teamDetailsPudsey.teamDays
teamNames = teamDetailsPudsey.teamNames
displayTeamName = teamDetailsPudsey.preferredTeamName
players = teamDetailsPudsey.players
duplicateTeamMemberNames = teamDetailsPudsey.duplicateTeamMemberNames
traitorPlayers = teamDetailsPudsey.traitorPlayers
playerStats = utils.returnListOfPlayerStats(teamDays, True, players)
formatName = utils.formatName
cupTextList = utils.cupText
returnTotalAggAvailablePerGame = utils.returnTotalAggAvailablePerGame
sanityChecksOnPlayerStats = utils.sanityChecksOnPlayerStats
checkFileSize = utils.checkFileSize
teamsProcessed = []

print('UPDATING STATS:', teamNames[0].upper())

for team in teamDays:
    print('Updating Stats: ' + team)
    
    teamNameToStoreData = team.replace(' (A)', '').lower()
    league = team.replace(' (A)', '').replace(' (B)', '').replace(' (C)', '').replace(' (D)', '')

    if team in teamsProcessed:
        raise Exception('team is being processed twice: ' + team)
    teamsProcessed.append(team)
    
    with open('bowlsnetReports/' + year + '/' + league + '.txt', 'r') as file:
        allRowsInFile = file.readlines()
        
        # Find the number of rows in the file and the stating row to check the stats
        startingRow = 0
        endRow = 0
        for rowNumber, line in enumerate(allRowsInFile, start=0):
            row = allRowsInFile[rowNumber]
            if row and type(row) is str and 'FULL RESULTS' in row.upper():
                startingRow = rowNumber
            endRow = rowNumber
                    
        if endRow == 0:
            raise Exception('Report file is empty')
        
        # Find team name used by Pudsey in this league
        possibleTeamNamesUsed = []
        teamNameUsedForLeague = ''
        teamNameToUse = displayTeamName
    
        for rowNumber, line in enumerate(allRowsInFile, start=0):
            if rowNumber <= startingRow:
                continue
            row = allRowsInFile[rowNumber]
            if row and type(row) is str:
                for teamName in teamNames:
                    name = row.lower().strip().replace('\'', '').replace(' - ', ' ').replace(' bc', '')
                    if name.startswith(teamName.lower()):
                        name = teamName.lower()
                        if '(a)' in team.lower() and (name.endswith(' b') or name.endswith(' c') or name.endswith(' d')):
                            continue
                        if '(b)' in team.lower() and (name.endswith(' a') or name.endswith(' c') or name.endswith(' d')):
                            continue
                        if '(c)' in team.lower() and (name.endswith(' a') or name.endswith(' b') or name.endswith(' d')):
                            continue
                        if '(d)' in team.lower() and (name.endswith(' a') or name.endswith(' b') or name.endswith(' c')):
                            continue
                        if teamName.lower() in name:
                            possibleTeamNamesUsed.append(teamName)
                            if '(a)' in team.lower():
                                teamNameToUse = displayTeamName + ' A'
                            if '(b)' in team.lower():
                                teamNameToUse = displayTeamName + ' B'
                            if '(c)' in team.lower():
                                teamNameToUse = displayTeamName + ' C'
                            if '(d)' in team.lower():
                                teamNameToUse = displayTeamName + ' D'
    
        if len(possibleTeamNamesUsed) == 0:
            raise Exception('No team name found')
        
        teamNameUsedForLeague = max(possibleTeamNamesUsed, key=len)
        if displayTeamName.lower() not in teamNameUsedForLeague.lower():
            raise Exception('Incorrect team name found')

        # Find the cup games in the stats
        cupGameRows = []
        for rowNumber, line in enumerate(allRowsInFile, start=0):
            if rowNumber <= startingRow:
                continue
            row = allRowsInFile[rowNumber]
            if row and type(row) is str:
                for cupText in cupTextList:
                    if cupText in row.lower():
                        for i in range(0, 11):
                            cupGameRows.append(rowNumber + i)
                        break
        
        #### PLAYER STATS ####
        def checkValidPlayerOnDay(playerName, rowNumber, homeOrAway):
            # Checks if player plays for team on selected day
            playerName = formatName(playerName)
            if playerName in traitorPlayers[league]:
                return False
            
            for i in range(1, 13):
                if rowNumber - i <= startingRow:
                    break
                
                # Checks player is playing for correct team
                previousRowValue = allRowsInFile[rowNumber - i]
                if previousRowValue and type(previousRowValue) is str:
                    previousRowValue = previousRowValue.lower().strip().replace('\'', '').replace(' - ', ' ').replace(' bc', '')
                    if teamNameUsedForLeague.lower() in previousRowValue:
                        if homeOrAway.lower() == 'home' and previousRowValue.startswith(teamNameUsedForLeague.lower()):
                            return True
                        if homeOrAway.lower() == 'away' and not previousRowValue.startswith(teamNameUsedForLeague.lower()):
                            return True
                        return False

        # Find rows in spreadsheet for players' games
        homePlayerRow = []
        awayPlayerRow = []
        for rowNumber, line in enumerate(allRowsInFile, start=0):
            if rowNumber < startingRow:
                continue
            row = allRowsInFile[rowNumber]
            if (row and type(row) is str):
                findPossiblePlayerNames = re.findall(r"([A-za-z'\-()]+(?: [A-Za-z'\-()]+)+)", row)
                if len(findPossiblePlayerNames) > 1:                
                    possiblePlayerNameHome = str(findPossiblePlayerNames[0]).strip()
                    possiblePlayerNameHome = formatName(possiblePlayerNameHome).lower()
                    if possiblePlayerNameHome in players or possiblePlayerNameHome in duplicateTeamMemberNames:
                        validPlayer = checkValidPlayerOnDay(possiblePlayerNameHome, rowNumber, 'home')
                        if validPlayer:
                            homePlayerRow.append(rowNumber)

                    possiblePlayerNameAway = str(findPossiblePlayerNames[1]).strip()
                    possiblePlayerNameAway = formatName(possiblePlayerNameAway).lower()
                    if possiblePlayerNameAway in players or possiblePlayerNameAway in duplicateTeamMemberNames:
                        validPlayer = checkValidPlayerOnDay(possiblePlayerNameAway, rowNumber, 'away')
                        if validPlayer:
                            awayPlayerRow.append(rowNumber)
        
        # Find each players' results
        combinedRows = homePlayerRow + awayPlayerRow
        
        for rowNumber in sorted(combinedRows):
            # reset variable values
            aggregate = 0
            opponentAggregate = 0
            secondOpponent = ''
            playerName = ''
            opponentsName = ''
            pairsGame = False
            pairsPartner = ''
            opponentTeam = ''
            homeGame = None
            awayGame = None
            cupGame = False
            cupHome = False
            cupAway = False

            # Find columns
            if rowNumber in cupGameRows:
                cupGame = True
                if rowNumber in homePlayerRow:
                    cupHome = True
                if rowNumber in awayPlayerRow:
                    cupAway = True

            if rowNumber in homePlayerRow:
                if not cupGame:
                    homeGame = True

            if rowNumber in awayPlayerRow:
                if not cupGame:
                    awayGame = True

            # Find result details
            text = allRowsInFile[rowNumber]

            findPossiblePlayerNames = re.findall(r"([A-za-z'\-()]+(?: [A-Za-z'\-()]+)+)", text)
            if homeGame or cupHome:
                opponentsName = findPossiblePlayerNames[1]
            
            if awayGame or cupAway:
                opponentsName = findPossiblePlayerNames[0]
                
            if 'walkover' not in opponentsName.lower() and 'no player' not in opponentsName.lower():
                if homeGame or cupHome:
                    playerName = findPossiblePlayerNames[0]
                    
                    matchScore = re.findall(r'\d+', text)
                    if matchScore:
                        aggregate = int(matchScore[0].strip())
                        opponentAggregate = int(matchScore[1].strip())

                if awayGame or cupAway:
                    playerName = findPossiblePlayerNames[1]
                    
                    matchScore = re.findall(r'\d+', text)
                    if matchScore:
                        aggregate = int(matchScore[1].strip())
                        opponentAggregate = int(matchScore[0].strip())

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

                playerName = formatName(playerName)
                opponentsName = formatName(opponentsName)
                pairsPartner = formatName(pairsPartner)
                secondOpponent = formatName(secondOpponent)
                    
                # Store player stats
                playerNameForResult = playerName
                if pairsGame:
                    playerStats[playerName]['pairsPartners'].append(pairsPartner)
                    playerNameForResult = playerName + ' & ' + pairsPartner
                    opponentsName = opponentsName + ' & ' + secondOpponent
                    playerStats[playerName]['availablePairsAgg'] += returnTotalAggAvailablePerGame(team)
                    playerStats[playerName]['totalPairsAgg'] += aggregate
                    playerStats[playerName]['totalPairsAggAgainst'] += opponentAggregate

                playerStats[playerName][teamNameToStoreData]['games'] += 1
                playerStats[playerName]['totalGamesPlayed'] += 1

                playersResult = playerNameForResult + ' ' + \
                    str(aggregate) + ' - ' + \
                    str(opponentAggregate) + ' ' + opponentsName
                playerStats[playerName]['results'].append(
                    playersResult)

                # Wins
                if aggregate > opponentAggregate:
                    playerStats[playerName][teamNameToStoreData]['wins'] += 1
                    if pairsGame:
                        playerStats[playerName]['winningPairsPartners'].append(pairsPartner)
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
                        playerStats[playerName]['losingPairsPartners'].append(pairsPartner)
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
                playerStats[playerName]['availableAgg'] += returnTotalAggAvailablePerGame(team)
                playerStats[playerName]['totalAgg'] += aggregate
                playerStats[playerName]['totalAggAgainst'] += opponentAggregate
                playerStats[playerName][teamNameToStoreData]['aggDiff'] += aggregate - \
                    opponentAggregate
                if homeGame:
                    playerStats[playerName]['availableHomeAgg'] += returnTotalAggAvailablePerGame(team)
                    playerStats[playerName]['totalHomeAgg'] += aggregate
                    playerStats[playerName]['totalHomeAggAgainst'] += opponentAggregate
                    if pairsGame:
                        playerStats[playerName]['availablePairsHomeAgg'] += returnTotalAggAvailablePerGame(team)
                        playerStats[playerName]['totalPairsHomeAgg'] += aggregate
                        playerStats[playerName]['totalPairsHomeAggAgainst'] += opponentAggregate
                if awayGame:
                    playerStats[playerName]['availableAwayAgg'] += returnTotalAggAvailablePerGame(team)
                    playerStats[playerName]['totalAwayAgg'] += aggregate
                    playerStats[playerName]['totalAwayAggAgainst'] += opponentAggregate
                    if pairsGame:
                        playerStats[playerName]['availablePairsAwayAgg'] += returnTotalAggAvailablePerGame(team)
                        playerStats[playerName]['totalPairsAwayAgg'] += aggregate
                        playerStats[playerName]['totalPairsAwayAggAgainst'] += opponentAggregate
                playerStats[playerName]['dayPlayed'].append(team)

                if rowNumber in homePlayerRow and rowNumber in awayPlayerRow:
                    raise Exception(
                        'Row appears in home row and away row. Check the opponent name. Row: ' + str(rowNumber))
    file.close()

# Create JSON file
dataToExport = {
    'playerResults': playerStats,
    'lastUpdated': date.today().strftime("%d/%m/%Y"),
    'statsYear': year,
}

filename = 'src/data/pudsey/bowlsStatsPudsey' + year + '.json'
previousFileSize = 0
if os.path.exists(filename):
    previousFileSize = checkFileSize(filename)
    os.remove(filename)

with open(filename, 'w') as jsonFile:
    json.dump(dataToExport, jsonFile, indent=4)
    print(filename + ' created')
    print('------')
    jsonFile.close()

# Sanity checks on the data
sanityChecksOnPlayerStats(playerStats, players)
newFileSize = checkFileSize(filename)
if newFileSize < previousFileSize:
    raise Exception(f'JSON file has fewer rows than before. Updated: {newFileSize}, previous: {previousFileSize}')
print(f'Sanity checks for {displayTeamName} stats complete')
print('------')
