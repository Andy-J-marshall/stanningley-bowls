import openpyxl
from pathlib import Path
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
clubCupWinners = teamDetails.clubCupWinners
returnTotalAggAvailablePerGame = utils.returnTotalAggAvailablePerGame
sanityChecksOnTeamStats = utils.sanityChecksOnTeamStats
sanityChecksOnPlayerStats = utils.sanityChecksOnPlayerStats
teamsProcessed = []

# Open Excel file
path = str(Path.cwd()) + '/files/' + 'bowlsresults' + year + '.xlsx'
wb = openpyxl.load_workbook(path)

allTeamResults = []
print('UPDATING STATS:', teamNames[0].upper())

for team in teamDays:
    league = team.replace(' (A)', '').replace(' (B)', '')
     # this is to store first team data under the old name, to help with backward compatibility
    teamNameToStoreData = team.replace(' (A)', '')

    if team in teamsProcessed:
        raise Exception('team is being processed twice: ' + team)
    teamsProcessed.append(team)
    
    # Goes through each sheet in turn
    sheet = wb[league]
    print('Processing ' + team)
    
    # Find the stating row to check the stats
    startingRow = 0
    startingRowIndex = 1
    for row in sheet['A']:
        if row.value and type(row.value) is str and 'FULL RESULTS' in row.value.upper():
            startingRow = startingRowIndex
            break
        startingRowIndex += 1
    
    # Find team name used by Stanningley in this league
    possibleTeamNamesUsed = []
    teamNameUsedForLeague = ''
    teamNameToUse = displayTeamName
    for row in sheet['A']:
        if row.row <= startingRow:
            continue
        if row.value and type(row.value) is str:
            for teamName in teamNames:
                if row.value.lower().strip().startswith(teamName.lower()):
                    if '(A)' in team and row.value.lower().endswith('b'):
                        continue
                    if '(B)' in team and row.value.lower().endswith('a'):
                        continue
                    if teamName.lower() in row.value.lower():
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
    for row in sheet['A']:
        if row.row <= startingRow:
            continue
        if row.value and type(row.value) is str:
            for cupText in cupTextList:
                if cupText in row.value.lower():
                    for i in range(0, 11):
                        cupGameRows.append(row.row + i)
                    break

    #### TEAM STATS ####
    # Find Stanningley games
    homeRow = []
    awayRow = []
    for row in sheet['A']:
        if row.row <= startingRow:
            continue
        if row.value and type(row.value) is str:
            # This ignores cup games hosted on Stanningley
            hostedCupGame = False
            for cupText in cupTextList:
                if cupText.lower() in row.value.lower():
                    hostedCupGame = True
                    break
            if hostedCupGame is False and teamNameUsedForLeague.lower() in row.value.lower():
                words = row.value.strip().lower().split()
                firstWord = words[0].lower() 
                if firstWord == displayTeamName.lower():
                    homeRow.append(row.row)
                else:
                    awayRow.append(row.row)

    # Find league position for teams
    currentLeaguePosition = -1
    leaguePositionRow = 0
    for row in sheet['A']:
        # League position appears before player results
        if row.row > startingRow:
            break
        if row.value and type(row.value) is str:
            leagueTableText = re.search(r"\d\.\s", row.value.lower())
            if leagueTableText:
                if teamNameUsedForLeague.lower() in row.value.lower():
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

    for row in range(1, sheet.max_row + 1):
        if row <= startingRow:
            continue
        
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
        cupCell = sheet['A' + str(row - 1)].value
        if cupCell and type(cupCell) is str:
            for cupText in cupTextList:
                if cupText.lower() in cupCell.lower():
                    cupGame = True
                    break
        
        if cupGame:
            # To account for handicap row in cup games
            checkForTeamHandicap = sheet['A' +
                                 str(row + 9 - rowsDownAdjustmentInt)].value
            if type(checkForTeamHandicap) is str and 'handicap' in checkForTeamHandicap.lower():
                rowsDownAdjustmentInt = rowsDownAdjustmentInt - 1

            # Find the number of rows down for the team scores
            totalNumberOfRowsAdjustmentInt = 9 - rowsDownAdjustmentInt
        else:
            totalNumberOfRowsAdjustmentInt = 10 - rowsDownAdjustmentInt + rowsUpAdjustmentInt
        
        # Save the scores
        text = sheet['A' + str(row + totalNumberOfRowsAdjustmentInt)].value
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
            text = sheet['A' + str(row + 9 - rowsDownAdjustmentInt)].value
            if text and type(text) is str:
                matchAgg = re.findall(r'\d+', text)
            if len(matchAgg) == 2:
                homeAgg = int(matchAgg[0].strip())
                awayAgg = int(matchAgg[1].strip())

        # Finds the date of the match
        gameDate = ''
        if (row in homeRow or row in awayRow) and row > startingRow:
            gameDateRowModifier = 1
            if 'saturday leeds' in team.lower():
                gameDateRowModifier += 1

            gameDate = sheet['A' + str(row - gameDateRowModifier)].value
            
            if type(gameDate) is str:
                if 'On ' in gameDate or '(from ' in gameDate:
                    gameDateRowModifier += 1
                    gameDate = sheet['A' + str(row - gameDateRowModifier)].value
                    
            else:
                gameDate = ''
                
        if gameDate:
            gameDateParts = re.split(r"(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s+", gameDate)
            gameDate = gameDateParts[2]
            # This might happen if date if cup text includes the day
            if len(gameDateParts) > 4:
                gameDate = gameDateParts[4]
            
            # Sanity check on the date
            dateContainsDayOfWeekBool = re.search(r"(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)", gameDate)
            if dateContainsDayOfWeekBool is None:
                raise Exception(gameDate + ' date is incorrect for row: ' + str(row))

        # Home games
        rowText = sheet['A' + str(row)].value
        if row in homeRow:
            if row != leaguePositionRow:
                opponent = rowText.split(teamNameUsedForLeague)[1].strip()
                result = teamNameToUse + ' ' + \
                    str(homeScore) + ' - ' + str(awayScore) + \
                    ' ' + opponent + ' (' + gameDate + ')'
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
        if row in awayRow:
            if row != leaguePositionRow:
                opponent = rowText.split(teamNameUsedForLeague)[0].strip()
                result = opponent + ' ' + \
                    str(homeScore) + ' - ' + str(awayScore) + \
                    ' ' + teamNameToUse + ' (' + gameDate + ')'
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
    
    def checkValidPlayerOnDay(playerName, row):
        # Checks if player plays for team on selected day
        playerName = formatName(playerName)
        if playerName in traitorPlayers[league]:
            return False
        
        for i in range(1, 10):
            if row.row - i <= startingRow:
                break
            
            # Checks player is playing for correct team
            previousRowValue = sheet['A' + str(row.row - i)]
            if previousRowValue and type(previousRowValue.value) is str:
                if teamNameUsedForLeague.lower() in previousRowValue.value.lower():
                    return True

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
                possiblePlayerNameHome = formatName(possiblePlayerNameHome).lower()
                if possiblePlayerNameHome in players or possiblePlayerNameHome in duplicateTeamMemberNames:
                    validPlayer = checkValidPlayerOnDay(possiblePlayerNameHome, row)
                    if validPlayer:
                        homePlayerRow.append(playerIndex)

                possiblePlayerNameAway = str(findPossiblePlayerNames[1]).strip()
                possiblePlayerNameAway = formatName(possiblePlayerNameAway).lower()
                if possiblePlayerNameAway in players or possiblePlayerNameAway in duplicateTeamMemberNames:
                    validPlayer = checkValidPlayerOnDay(possiblePlayerNameAway, row)
                    if validPlayer:
                        awayPlayerRow.append(playerIndex)
        playerIndex = playerIndex + 1
    
    # Find each players' results
    combinedRows = homePlayerRow + awayPlayerRow
    
    for row in sorted(combinedRows):
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
        if row in cupGameRows:
            cupGame = True
            if row in homePlayerRow:
                cupHome = True
            if row in awayPlayerRow:
                cupAway = True

        if row in homePlayerRow:
            if not cupGame:
                homeGame = True

        if row in awayPlayerRow:
            if not cupGame:
                awayGame = True

        # Find result details
        text = sheet['A' + str(row)].value

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

            if row in homePlayerRow and row in awayPlayerRow:
                raise Exception(
                    'Row appears in home row and away row. Check the opponent name. Row: ' + str(row))

if year in clubCupWinners:
    clubCupWinner = clubCupWinners[year]
else:
    clubCupWinner = ''

# Create JSON file
dataToExport = {
    'playerResults': playerStats,
    'teamResults': allTeamResults,
    'clubCupWinner': clubCupWinner,
    'lastUpdated': date.today().strftime("%d/%m/%Y"),
    'statsYear': year,
}

filename = 'src/data/bowlsStats' + year + '.json'
if os.path.exists(filename):
    os.remove(filename)

with open(filename, 'w') as f:
    json.dump(dataToExport, f)
    print(filename + ' created')
    print('------')

# Sanity checks on the data
sanityChecksOnTeamStats(allTeamResults)
sanityChecksOnPlayerStats(playerStats, players)
print(f'Sanity checks for {displayTeamName} stats complete')
print('------')
