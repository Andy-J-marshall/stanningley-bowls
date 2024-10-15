import os
from datetime import date
import re
# TODO find long term solution
import teamDetailsLittlemoor as teamDetails
import statsHelper
import sanityChecks
import utils

playerStats = statsHelper.returnListOfPlayerStats(teamDetails.teamDays, True, teamDetails.players)
teamsProcessed = []
allTeamResults = []

print('UPDATING STATS:', teamDetails.teamNames[0].upper())

for team in teamDetails.teamDays:
    print('Updating Stats: ' + team)
    
    league = team.replace(' (A)', '').replace(' (B)', '')
     # this is to store first team data under the old name, to help with backward compatibility
    teamNameToStoreData = team.replace(' (A)', '')

    if team in teamsProcessed:
        raise Exception('team is being processed twice: ' + team)
    teamsProcessed.append(team)
    
    with open('bowlsnetReports/' + utils.year + '/' + league + '.txt', 'r') as file:
        allRowsInFile = file.readlines()

        # Find the number of rows in the file
        endRow = utils.findEndRowOfFile(league, allRowsInFile)
        
        # Find team name used by team in this league
        possibleTeamNamesUsed = []
        teamNameUsedForLeague = ''
        teamNameToUse = teamDetails.displayTeamName
    
        for rowNumber, line in enumerate(allRowsInFile, start=0):
            row = allRowsInFile[rowNumber]
            if row and type(row) is str:
                for possibleTeamName in teamDetails.teamNames:
                    rowValue = row.lower().strip()
                    if possibleTeamName.lower() in rowValue:
                        # Filter out A team stats for B team and vice versa
                        if team.lower().endswith(' (a)'):
                            if possibleTeamName.lower().endswith((' b', ' \'b\'')):
                                continue
                            teamNameToUse = teamDetails.displayTeamName + ' A'
                        elif team.lower().endswith(' (b)'):
                            if possibleTeamName.lower().endswith((' a', ' \'a\'')):
                                continue
                            teamNameToUse = teamDetails.displayTeamName + ' B'
                        possibleTeamNamesUsed.append(possibleTeamName)
    
        if len(possibleTeamNamesUsed) == 0:
            raise Exception('No team name found')
        
        teamNameUsedForLeague = max(possibleTeamNamesUsed, key=len)
        
        sanityChecks.checkTeamName(team, teamNameUsedForLeague, teamDetails.displayTeamName)        

        # Find the cup games in the stats
        cupGameRows = statsHelper.findCupGameRows(allRowsInFile)

        #### TEAM STATS ####
        # Find team's home and away games
        homeRow = []
        awayRow = []
        for rowNumber, line in enumerate(allRowsInFile, start=0):
            row = allRowsInFile[rowNumber]
            if row and type(row) is str:
                # This ignores cup games hosted by the club
                hostedCupGame = statsHelper.isCupGame(row.lower())

                # Check if A and B team are playing each other
                aTeamPlayingBTeamBool = False
                if not hostedCupGame and row.lower().count(teamDetails.displayTeamName.lower()) > 1:
                    aTeamPlayingBTeamBool = True
                    teamLower = teamNameUsedForLeague.lower()
                    rowLower = row.lower().strip()
                    if teamLower in rowLower:
                        # Determine if A or B team is playing at home and store the rows
                        if rowLower.endswith((' a', " 'a'")):
                            if teamLower.endswith((' a', " 'a'")):
                                awayRow.append(rowNumber)
                            elif teamLower.endswith((' b', " 'b'")):
                                homeRow.append(rowNumber)
                        elif rowLower.endswith((' b', " 'b'")):
                            if teamLower.endswith((' b', " 'b'")):
                                awayRow.append(rowNumber)
                            elif teamLower.endswith((' a', " 'a'")):
                                homeRow.append(rowNumber)
                
                # Store home and away game rows
                if aTeamPlayingBTeamBool is False and hostedCupGame is False and teamNameUsedForLeague.lower() in row.lower():
                    words = row.strip().lower().split()
                    firstWord = words[0].lower()
                    if firstWord == teamDetails.displayTeamName.lower():
                        homeRow.append(rowNumber)
                    else:
                        awayRow.append(rowNumber)

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
            row = allRowsInFile[rowNumber]

            # Check if cup game
            cupRow = allRowsInFile[rowNumber - 1]
            cupGameBool = statsHelper.isCupGame(cupRow)
            
            # Find the number of rows down for the team scores                       
            totalNumberOfRowsAdjustmentInt = statsHelper.returnTeamScoreRowDownNumber(cupGameBool, allRowsInFile, rowNumber, league)
            
            # Prevents attempting to process a line that doesn't exist
            if rowNumber + totalNumberOfRowsAdjustmentInt >= endRow:
                break
            
            # Save the scores
            text = allRowsInFile[rowNumber + totalNumberOfRowsAdjustmentInt]
            if text and type(text) is str:
                matchScore = re.findall(r'\d+\.?\d*', text)
            if len(matchScore) == 2:
                # Check whether score is an integer or float (needed for Ronnie Collins cup)
                if '.' in matchScore[0] or '.' in matchScore[1]:
                    homeScore = float(matchScore[0].strip())
                    awayScore = float(matchScore[1].strip())
                else:
                    homeScore = int(matchScore[0].strip())
                    awayScore = int(matchScore[1].strip())
                
            # Save the aggregates
            if cupGameBool:
                # Only save the score as the aggregate if it's an integer
                if isinstance(homeScore, int) and isinstance(awayScore, int):
                    homeAgg = homeScore
                    awayAgg = awayScore
            else:
                baseRowDownAdjustment = statsHelper.returnBaseRowDownNumber(False, True)
                adjustmentForLeagueInt = statsHelper.returnAggRowDownNumber(league)
                adjustFor6PlayerTeamsInt = statsHelper.adjustRowNumberFor6PlayerTeams(league, 0)
                text = allRowsInFile[rowNumber + baseRowDownAdjustment + adjustmentForLeagueInt - adjustFor6PlayerTeamsInt]
                if text and type(text) is str:
                    matchAgg = re.findall(r'\d+', text)
                if len(matchAgg) == 2:
                    homeAgg = int(matchAgg[0].strip())
                    awayAgg = int(matchAgg[1].strip())

            # Home games
            rowText = allRowsInFile[rowNumber]
            if rowNumber in homeRow:
                opponent = rowText.split(teamNameUsedForLeague)[1]
                opponent = opponent.replace('&amp;', '&').strip()
                result = teamNameToUse + ' ' + \
                    str(homeScore) + ' - ' + str(awayScore) + \
                    ' ' + opponent
                results.append(result)
                if homeScore > awayScore:
                    if cupGameBool:
                        cupWins = cupWins + 1
                    else:
                        homeWins = homeWins + 1
                elif homeScore < awayScore:
                    if cupGameBool:
                        cupLosses = cupLosses + 1
                    else:
                        homeLosses = homeLosses + 1
                elif awayScore == homeScore:
                    homeDraws = homeDraws + 1
                teamAgg = teamAgg + homeAgg
                opponentAgg = opponentAgg + awayAgg

            # Away games
            if rowNumber in awayRow:
                opponent = rowText.split(teamNameUsedForLeague)[0]
                opponent = opponent.replace('&amp;', '&').strip()
                result = opponent + ' ' + \
                    str(homeScore) + ' - ' + str(awayScore) + \
                    ' ' + teamNameToUse
                results.append(result)
                if awayScore > homeScore:
                    if cupGameBool:
                        cupWins = cupWins + 1
                    else:
                        awayWins = awayWins + 1
                elif awayScore < homeScore:
                    if cupGameBool:
                        cupLosses = cupLosses + 1
                    else:
                        awayLosses = awayLosses + 1
                elif awayScore == homeScore:
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
            'results': results
        }
        allTeamResults.append(teamResults)
        
        #### PLAYER STATS ####
        
        # Find rows in spreadsheet for players' games
        homePlayerRow = []
        awayPlayerRow = []
        for rowNumber, line in enumerate(allRowsInFile, start=0):
            row = allRowsInFile[rowNumber]
            if (row and type(row) is str):
                findPossiblePlayerNames = re.findall(r"([A-za-z'\-()]+(?: [A-Za-z'\-()]+)+)", row)
                if len(findPossiblePlayerNames) > 1:
                    possiblePlayerNameHome = str(findPossiblePlayerNames[0]).strip()
                    possiblePlayerNameHome = teamDetails.deduplicateNames(possiblePlayerNameHome).lower()
                    if possiblePlayerNameHome in teamDetails.players or possiblePlayerNameHome in teamDetails.duplicatePlayerNames:
                        validPlayer = statsHelper.checkValidPlayerOnDay(possiblePlayerNameHome, rowNumber, 'home', teamNameUsedForLeague, league, allRowsInFile)
                        if validPlayer:
                            homePlayerRow.append(rowNumber)

                    possiblePlayerNameAway = str(findPossiblePlayerNames[1]).strip()
                    possiblePlayerNameAway = teamDetails.deduplicateNames(possiblePlayerNameAway).lower()
                    if possiblePlayerNameAway in teamDetails.players or possiblePlayerNameAway in teamDetails.duplicatePlayerNames:
                        validPlayer = statsHelper.checkValidPlayerOnDay(possiblePlayerNameAway, rowNumber, 'away', teamNameUsedForLeague, league, allRowsInFile)
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
            cupGameBool = False
            cupHome = False
            cupAway = False

            # Find columns
            if rowNumber in cupGameRows:
                cupGameBool = True
                if rowNumber in homePlayerRow:
                    cupHome = True
                if rowNumber in awayPlayerRow:
                    cupAway = True

            if rowNumber in homePlayerRow:
                if not cupGameBool:
                    homeGame = True

            if rowNumber in awayPlayerRow:
                if not cupGameBool:
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

                playerName = teamDetails.deduplicateNames(playerName)
                opponentsName = teamDetails.deduplicateNames(opponentsName)
                pairsPartner = teamDetails.deduplicateNames(pairsPartner)
                secondOpponent = teamDetails.deduplicateNames(secondOpponent)
                    
                # Store player stats
                playerNameForResult = playerName
                if pairsGame:
                    playerNameForResult = playerName + ' & ' + pairsPartner
                    opponentsName = opponentsName + ' & ' + secondOpponent
                    playerStats[playerName]['availablePairsAgg'] += statsHelper.returnTotalAggAvailablePerGame(team)
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
                        playerStats[playerName]['pairWins'] += 1
                    if homeGame:
                        playerStats[playerName]['homeWins'] += 1
                        if pairsGame:
                            playerStats[playerName]['pairHomeWins'] += 1
                    if awayGame:
                        playerStats[playerName]['awayWins'] += 1
                        if pairsGame:
                            playerStats[playerName]['pairAwayWins'] += 1
                    if cupGameBool:
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
                    if cupGameBool:
                        playerStats[playerName]['cupLosses'] += 1
                        if pairsGame:
                            playerStats[playerName]['pairCupLosses'] += 1

                # Averages
                playerStats[playerName]['availableAgg'] += statsHelper.returnTotalAggAvailablePerGame(team)
                playerStats[playerName]['totalAgg'] += aggregate
                playerStats[playerName]['totalAggAgainst'] += opponentAggregate
                playerStats[playerName][teamNameToStoreData.lower()]['aggDiff'] += aggregate - \
                    opponentAggregate
                if homeGame:
                    playerStats[playerName]['availableHomeAgg'] += statsHelper.returnTotalAggAvailablePerGame(team)
                    playerStats[playerName]['totalHomeAgg'] += aggregate
                    playerStats[playerName]['totalHomeAggAgainst'] += opponentAggregate
                    if pairsGame:
                        playerStats[playerName]['availablePairsHomeAgg'] += statsHelper.returnTotalAggAvailablePerGame(team)
                        playerStats[playerName]['totalPairsHomeAgg'] += aggregate
                        playerStats[playerName]['totalPairsHomeAggAgainst'] += opponentAggregate
                if awayGame:
                    playerStats[playerName]['availableAwayAgg'] += statsHelper.returnTotalAggAvailablePerGame(team)
                    playerStats[playerName]['totalAwayAgg'] += aggregate
                    playerStats[playerName]['totalAwayAggAgainst'] += opponentAggregate
                    if pairsGame:
                        playerStats[playerName]['availablePairsAwayAgg'] += statsHelper.returnTotalAggAvailablePerGame(team)
                        playerStats[playerName]['totalPairsAwayAgg'] += aggregate
                        playerStats[playerName]['totalPairsAwayAggAgainst'] += opponentAggregate
                playerStats[playerName]['dayPlayed'].append(team)

                sanityChecks.validatePlayerNotProcessedTwice(rowNumber, homePlayerRow, awayPlayerRow)
    file.close()

# Create JSON file
dataToExport = {
    'playerResults': playerStats,
    'teamResults': allTeamResults,
    'lastUpdated': date.today().strftime("%d/%m/%Y"),
    'statsYear': utils.year,
}

# TODO find long term solution
filename = 'src/data/bowlsStatsLittlemoor' + utils.year + '.json'
previousFileSize = 0
if os.path.exists(filename):
    previousFileSize = sanityChecks.getFileSize(filename)
    os.remove(filename)    

utils.saveFile(filename, dataToExport)

# Sanity checks on the data
sanityChecks.checksTeamStats(allTeamResults)
sanityChecks.checkPlayerStats(playerStats, teamDetails.players)
newFileSize = sanityChecks.getFileSize(filename)
sanityChecks.checkFileSizeHasGrown(previousFileSize, newFileSize)
