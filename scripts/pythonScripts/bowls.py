import json
import os
from datetime import date
import teamDetails
import utils
import re

year = str(date.today().year)

teamDays = teamDetails.teamDays
teamNames = teamDetails.teamNames
displayTeamName = teamDetails.preferredTeamName
players = teamDetails.players
duplicateTeamMemberNames = teamDetails.duplicateTeamMemberNames
traitorPlayers = teamDetails.traitorPlayers
playerStats = utils.returnListOfPlayerStats(teamDetails.teamDays, True)
formatName = utils.formatName
cupTextList = utils.cupText
returnTotalAggAvailablePerGame = utils.returnTotalAggAvailablePerGame
sanityChecksOnTeamStats = utils.sanityChecksOnTeamStats
sanityChecksOnPlayerStats = utils.sanityChecksOnPlayerStats
checkFileSize = utils.checkFileSize
teamsProcessed = []

allTeamResults = []
print('UPDATING STATS:', teamNames[0].upper())

for team in teamDays:
    print('Updating Stats: ' + team)
    
    league = team.replace(' (A)', '').replace(' (B)', '')
     # this is to store first team data under the old name, to help with backward compatibility
    teamNameToStoreData = team.replace(' (A)', '')

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
        
        # Find team name used by Stanningley in this league
        possibleTeamNamesUsed = []
        teamNameUsedForLeague = ''
        teamNameToUse = displayTeamName
    
        for rowNumber, line in enumerate(allRowsInFile, start=0):
            if rowNumber <= startingRow:
                continue
            row = allRowsInFile[rowNumber]
            if row and type(row) is str:
                for teamName in teamNames:
                    name = row.lower().strip()
                    if name.startswith(teamName.lower()):
                        name = teamName.lower()
                        if '(a)' in team.lower() and name.endswith(' b'):
                            continue
                        if '(b)' in team.lower() and name.endswith(' a'):
                            continue
                        if teamName.lower() in name:
                            possibleTeamNamesUsed.append(teamName)
                            if '(A)' in team:
                                teamNameToUse = displayTeamName + ' A'
                            if '(B)' in team:
                                teamNameToUse = displayTeamName + ' B'
        
    
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

        #### TEAM STATS ####
        # Find team's home and away games
        homeRow = []
        awayRow = []
        for rowNumber, line in enumerate(allRowsInFile, start=0):
            if rowNumber <= startingRow:
                continue
            row = allRowsInFile[rowNumber]
            if row and type(row) is str:
                # This ignores cup games hosted by the club
                hostedCupGame = False
                for cupText in cupTextList:
                    if cupText.lower() in row.lower():
                        hostedCupGame = True
                        break
                if hostedCupGame is False and teamNameUsedForLeague.lower() in row.lower():
                    words = row.strip().lower().split()
                    firstWord = words[0].lower() 
                    if firstWord == displayTeamName.lower():
                        homeRow.append(rowNumber)
                    else:
                        awayRow.append(rowNumber)

        # Find league position for teams
        currentLeaguePosition = -1
        for rowNumber, line in enumerate(allRowsInFile, start=0):
            # League position appears before player results
            if rowNumber > startingRow:
                break
            row = allRowsInFile[rowNumber]
            if row and type(row) is str:
                leagueTableText = re.search(r"\d\.\s", row.lower())
                if leagueTableText:
                    if teamNameUsedForLeague.lower() in row.lower():
                        leaguePosition = leagueTableText[0].split('.')[0]
                        currentLeaguePosition = int(leaguePosition)
                        break

        # Find team results and scores
        awayWins = 0
        awayLosses = 0
        homeWins = 0
        homeLosses = 0
        homeDraws = 0
        awayDraws = 0
        cupWins = 0
        cupLosses = 0
        wins = 0
        draws = 0
        losses = 0
        teamAgg = 0
        opponentAgg = 0
        results = []
        totalGamesPlayed = 0

        for rowNumber, line in enumerate(allRowsInFile, start=0):
            if rowNumber <= startingRow:
                continue
            row = allRowsInFile[rowNumber]
            
            rowsDownAdjustmentInt = 0
            rowsUpAdjustmentInt = 0
            totalNumberOfRowsAdjustmentInt = 0

            # Leeds half holiday team only has 6 players
            if 'half holiday' in team.lower():
                rowsDownAdjustmentInt = 2

            # AireWharfe pairs league display scores differently
            if 'pairs airewharfe' in team.lower():
                rowsUpAdjustmentInt = 1

            # Check if cup game
            # Cup games are based on aggregate, not score, and are played on neutral greens
            cupGame = False
            cupRow = allRowsInFile[rowNumber - 1]
            if cupRow and type(cupRow) is str:
                for cupText in cupTextList:
                    if cupText.lower() in cupRow.lower():
                        cupGame = True
                        break
            
            if cupGame:
                # To account for handicap row in cup games
                checkForTeamHandicap = allRowsInFile[rowNumber + 9 - rowsDownAdjustmentInt]
                if type(checkForTeamHandicap) is str and 'handicap' in checkForTeamHandicap.lower():
                    rowsDownAdjustmentInt = rowsDownAdjustmentInt - 1

                # Find the number of rows down for the team scores
                totalNumberOfRowsAdjustmentInt = 9 - rowsDownAdjustmentInt
            else:
                totalNumberOfRowsAdjustmentInt = 10 - rowsDownAdjustmentInt + rowsUpAdjustmentInt
            
            # Prevents attempting to process a line that doesn't exist
            if rowNumber + totalNumberOfRowsAdjustmentInt >= endRow:
                break
            
            # Save the scores
            text = allRowsInFile[rowNumber + totalNumberOfRowsAdjustmentInt]
            if text and type(text) is str:
                matchScore = re.findall(r'\d+', text)
            if len(matchScore) == 2:
                homeScore = int(matchScore[0].strip())
                awayScore = int(matchScore[1].strip())
                
            # Save the aggregates
            if cupGame:
                homeAgg = homeScore
                awayAgg = awayScore
            else:
                text = allRowsInFile[rowNumber + 9 - rowsDownAdjustmentInt]
                if text and type(text) is str:
                    matchAgg = re.findall(r'\d+', text)
                if len(matchAgg) == 2:
                    homeAgg = int(matchAgg[0].strip())
                    awayAgg = int(matchAgg[1].strip())

            # Home games
            rowText = allRowsInFile[rowNumber]
            if rowNumber in homeRow:
                opponent = rowText.split(teamNameUsedForLeague)[1].strip()
                opponent = opponent.replace('&amp;', '&')
                result = teamNameToUse + ' ' + \
                    str(homeScore) + ' - ' + str(awayScore) + \
                    ' ' + opponent
                results.append(result)
                if homeScore > awayScore:
                    if cupGame:
                        cupWins = cupWins + 1
                    else:
                        homeWins = homeWins + 1
                if homeScore < awayScore:
                    if cupGame:
                        cupLosses = cupLosses + 1
                    else:
                        homeLosses = homeLosses + 1
                if awayScore == homeScore:
                    homeDraws = homeDraws + 1
                teamAgg = teamAgg + homeAgg
                opponentAgg = opponentAgg + awayAgg

            # Away games
            if rowNumber in awayRow:
                opponent = rowText.split(teamNameUsedForLeague)[0].strip()
                result = opponent + ' ' + \
                    str(homeScore) + ' - ' + str(awayScore) + \
                    ' ' + teamNameToUse
                results.append(result)
                if awayScore > homeScore:
                    if cupGame:
                        cupWins = cupWins + 1
                    else:
                        awayWins = awayWins + 1
                if awayScore < homeScore:
                    if cupGame:
                        cupLosses = cupLosses + 1
                    else:
                        awayLosses = awayLosses + 1
                if awayScore == homeScore:
                    awayDraws = awayDraws + 1
                opponentAgg = opponentAgg + homeAgg
                teamAgg = teamAgg + awayAgg

        # Store team result data
        teamResults = {
            'day': teamNameToStoreData,
            'awayWins': awayWins,
            'homeWins': homeWins,
            'wins': awayWins + homeWins + cupWins,
            'awayLosses': awayLosses,
            'homeLosses': homeLosses,
            'homeDraws': homeDraws,
            'awayDraws': awayDraws,
            'draws': homeDraws + awayDraws,
            'cupWins': cupWins,
            'cupLosses': cupLosses,
            'losses': homeLosses + awayLosses + cupLosses,
            'totalGamesPlayed': awayWins + homeWins + cupWins + awayLosses + homeLosses + cupLosses + awayDraws + homeDraws,
            'agg': teamAgg,
            'opponentAgg': opponentAgg,
            'leaguePosition': currentLeaguePosition,
            'results': results
        }
        allTeamResults.append(teamResults)
        
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
                    previousRowValue = previousRowValue.lower().strip()
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

                playerStats[playerName][teamNameToStoreData.lower()]['games'] += 1
                playerStats[playerName]['totalGamesPlayed'] += 1

                playersResult = playerNameForResult + ' ' + \
                    str(aggregate) + ' - ' + \
                    str(opponentAggregate) + ' ' + opponentsName
                playerStats[playerName]['results'].append(
                    playersResult)

                # Wins
                if aggregate > opponentAggregate:
                    playerStats[playerName][teamNameToStoreData.lower()]['wins'] += 1
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
                playerStats[playerName][teamNameToStoreData.lower()]['aggDiff'] += aggregate - \
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
    'teamResults': allTeamResults,
    'lastUpdated': date.today().strftime("%d/%m/%Y"),
    'statsYear': year,
}

filename = 'src/data/bowlsStats' + year + '.json'
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
sanityChecksOnTeamStats(allTeamResults)
sanityChecksOnPlayerStats(playerStats, players)
newFileSize = checkFileSize(filename)
if newFileSize < previousFileSize:
    raise Exception(f'JSON file has fewer rows than before. Updated: {newFileSize}, previous: {previousFileSize}')
print(f'Sanity checks for {displayTeamName} stats complete')
print('------')
