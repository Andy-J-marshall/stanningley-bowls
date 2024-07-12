import openpyxl
from pathlib import Path
import json
import os
from datetime import date
import datefinder
import teamDetails
import utils

year = str(date.today().year)

teamNames = teamDetails.teamNames
teamDays = teamDetails.teamDays
teamNamesForSecondTeam = teamDetails.teamNamesForSecondTeam
teamNamesForFirstTeam = teamDetails.teamNamesForFirstTeam
players = teamDetails.players
duplicateTeamMemberNames = teamDetails.duplicateTeamMemberNames
traitorPlayers = teamDetails.traitorPlayers
playerStats = utils.returnListOfPlayerStats(teamDetails.teamDays, True)
formatName = utils.formatName
cupText = utils.cupText
preferredTeamName = teamDetails.preferredTeamName
transferredPlayers = teamDetails.transferredPlayers
clubCupWinners = teamDetails.clubCupWinners
returnTotalAggAvailablePerGame = utils.returnTotalAggAvailablePerGame
sanityChecksOnTeamStats = utils.sanityChecksOnTeamStats
sanityChecksOnPlayerStats = utils.sanityChecksOnPlayerStats
lastResultRowsForTransferredPlayer = {}
teamsProcessed = []

# Spreadsheet info
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

    expectedTeamNames = teamNames
    teamNameToUse = preferredTeamName
    if '(A)' in team:
        expectedTeamNames = teamNamesForFirstTeam
        teamNameToUse = preferredTeamName + ' A'
    if '(B)' in team:
        expectedTeamNames = teamNamesForSecondTeam
        teamNameToUse = preferredTeamName + ' B'

    lastResultRowsForTransferredPlayer[league] = {}

    # Goes through each sheet in turn
    sheet = wb[league]
    print('Processing ' + team)

    #### TEAM STATS ####
    # Find rows in spreadsheet for team games
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
        if row.value and type(row.value) is str:
            if cupGameIndex > startingRow and row.value.lower() in cupText:
                for i in range(0, 11):
                    cupGameRows.append(cupGameIndex + i)
        cupGameIndex += 1

    homeIndex = 1
    homeRow = []
    for row in sheet[homeTeamNameCol]:
        if row.value and type(row.value) is str and row.value.lower() in expectedTeamNames:
            if homeIndex > startingRow:
                homeRow.append(homeIndex)
        homeIndex = homeIndex + 1

    awayIndex = 1
    awayRow = []
    for row in sheet[awayTeamNameCol]:
        if row.value and type(row.value) is str and row.value.lower() in expectedTeamNames:
            if awayIndex > startingRow:
                awayRow.append(awayIndex)
        awayIndex = awayIndex + 1

    # Find league position for teams
    currentLeaguePosition = -1
    leaguePositionIndex = 1
    leaguePositionRow = 0
    leaguePositionCol = 'A'
    leagueTeamNameCol = 'B'

    for row in sheet[leagueTeamNameCol]:
        if row.value and type(row.value) is str and row.value.lower() in expectedTeamNames:
            leaguePosition = sheet[leaguePositionCol +
                                   str(leaguePositionIndex)].value
            if type(leaguePosition) is int:
                leaguePositionRow = leaguePositionIndex
                currentLeaguePosition = leaguePosition
        leaguePositionIndex = leaguePositionIndex + 1
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
        cupCell = ''
        if row > 2:
            cupCell = sheet[homeTeamNameCol + str(row - 1)].value
        if (cupCell and type(cupCell) is str) and cupCell.lower() in cupText:
            cupGame = True

            # To account for handicap row in cup games
            checkForTeamHandicap = sheet[homeTeamNameCol +
                                 str(row + 9 - rowsDownAdjustmentInt)].value
            if type(checkForTeamHandicap) is str and 'handicap' in checkForTeamHandicap.lower():
                rowsDownAdjustmentInt = rowsDownAdjustmentInt - 1

            # Find the number of rows down for the team scores
            totalNumberOfRowsAdjustmentInt = 9 - rowsDownAdjustmentInt
        else:
            totalNumberOfRowsAdjustmentInt = 10 - rowsDownAdjustmentInt + rowsUpAdjustmentInt
        
        # Save the scores
        homeScore = sheet[homeTeamScoreCol + str(row + totalNumberOfRowsAdjustmentInt)].value
        awayScore = sheet[awayTeamScoreCol + str(row + totalNumberOfRowsAdjustmentInt)].value

        # Finds the date of the match
        gameDate = ''
        if (row in homeRow or row in awayRow) and row > startingRow:
            gameDateRowModifier = 1
            if 'Saturday Leeds' in team:
                gameDateRowModifier += 1

            gameDate = sheet[awayTeamNameCol + str(row - gameDateRowModifier)].value
            
            if type(gameDate) is str:
                if 'On ' in gameDate or '(from ' in gameDate:
                    gameDateRowModifier += 1
                    gameDate = sheet[awayTeamNameCol + str(row - gameDateRowModifier)].value
            else:
                gameDate = ''

            # Finds last result before player has been transferred
            if (transferredPlayers[league]):
                gameDates = datefinder.find_dates(gameDate)
                for formattedGameDate in gameDates:
                    if (formattedGameDate < transferredPlayers[league]["date"]):
                        playerTransferred = transferredPlayers[league]["player"]
                        lastResultRowsForTransferredPlayer[league][playerTransferred] = row

        # Home games
        if row in homeRow:
            if row != leaguePositionRow:
                opponent = sheet[awayTeamNameCol + str(row)].value
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
                teamAgg = teamAgg + \
                    sheet[homeAggCol +
                          str(row + 9 - rowsDownAdjustmentInt)].value
                opponentAgg = opponentAgg + \
                    sheet[awayAggCol +
                          str(row + 9 - rowsDownAdjustmentInt)].value

        # Away games
        if row in awayRow:
            if row != leaguePositionRow:
                opponent = sheet[homeTeamNameCol + str(row)].value
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
                opponentAgg = opponentAgg + \
                    sheet[homeAggCol +
                          str(row + 9 - rowsDownAdjustmentInt)].value
                teamAgg = teamAgg + \
                    sheet[awayAggCol +
                          str(row + 9 - rowsDownAdjustmentInt)].value

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

    # Find rows in spreadsheet for players' games
    homePlayerIndex = 1
    homePlayerRow = []
    for homePlayer in sheet[homePlayerCol]:
        homePlayerName = homePlayer.value
        if (homePlayerName and type(homePlayerName) is str) and (homePlayerName.lower() in players or homePlayerName.lower() in duplicateTeamMemberNames):
            # Checks if player is playing for A or B team
            includeHomePlayer = False
            if team.endswith('(A)') or team.endswith('(B)'):
                if team.endswith('(A)'):
                    for i in range(1, 10):
                        if homePlayer.row - i <= startingRow:
                            break
                        homeATeamRow = sheet[homeTeamNameCol + str(homePlayer.row - i)]
                        if homeATeamRow and type(homeATeamRow.value) is str and homeATeamRow.value.lower() in teamNamesForFirstTeam:
                            includeHomePlayer = True
                            break

                if team.endswith('(B)'):
                    for i in range(1, 10):
                        if homePlayer.row - i <= startingRow:
                            break
                        homeBTeamRow = sheet[homeTeamNameCol + str(homePlayer.row - i)]
                        if homeBTeamRow and type(homeBTeamRow.value) is str and homeBTeamRow.value.lower() in teamNamesForSecondTeam:
                            includeHomePlayer = True
                            break
            else:
                includeHomePlayer = True

            # Checks if player plays for team on selected day
            homePlayerName = formatName(homePlayerName)
            if homePlayerName not in traitorPlayers[league] and includeHomePlayer is True:
                # Only adds result to list if they haven't been transferred to another team
                if homePlayerName in lastResultRowsForTransferredPlayer[league]:
                    lastGameBeforeTransfer = lastResultRowsForTransferredPlayer[league][homePlayerName]
                    if homePlayerIndex <= lastGameBeforeTransfer:
                        homePlayerRow.append(homePlayerIndex)
                else:
                    homePlayerRow.append(homePlayerIndex)
        homePlayerIndex = homePlayerIndex + 1

    awayPlayerIndex = 1
    awayPlayerRow = []
    for awayPlayer in sheet[awayPlayerCol]:
        awayPlayerName = awayPlayer.value
        if (awayPlayerName and type(awayPlayerName) is str) and (awayPlayerName.lower() in players or awayPlayerName.lower() in duplicateTeamMemberNames):
            # Checks if player is playing for A or B team
            includeAwayPlayer = False
            if team.endswith('(A)') or team.endswith('(B)'):
                if team.endswith('(A)'):
                    for i in range(1, 10):
                        if awayPlayer.row - i <= startingRow:
                            break
                        awayATeamRow = sheet[awayTeamNameCol + str(awayPlayer.row - i)]
                        if awayATeamRow and type(awayATeamRow.value) is str and awayATeamRow.value.lower() in teamNamesForFirstTeam:
                            includeAwayPlayer = True
                            break

                if team.endswith('(B)'):
                    for i in range(1, 10):
                        if awayPlayer.row - i <= startingRow:
                            break
                        awayBTeamRow = sheet[awayTeamNameCol + str(awayPlayer.row - i)]
                        if awayBTeamRow and type(awayBTeamRow.value) is str and awayBTeamRow.value.lower() in teamNamesForSecondTeam:
                            includeAwayPlayer = True
                            break
            else:
                includeAwayPlayer = True

            # Checks if player plays for team on selected day
            awayPlayerName = formatName(awayPlayerName)
            if awayPlayerName not in traitorPlayers[league] and includeAwayPlayer is True:
                # Only adds result to list if they haven't been transferred to another team
                if awayPlayerName in lastResultRowsForTransferredPlayer[league]:
                    lastGameBeforeTransfer = lastResultRowsForTransferredPlayer[league][awayPlayerName]
                    if awayPlayerIndex <= lastGameBeforeTransfer:
                        awayPlayerRow.append(awayPlayerIndex)
                else:
                    awayPlayerRow.append(awayPlayerIndex)

        awayPlayerIndex = awayPlayerIndex + 1

    # Find each players' results
    for row in range(startingRow, sheet.max_row + 1):              
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

        # Find columns
        if row in cupGameRows:
            cupGame = True

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

            if 'walkover' not in opponentsName.lower() and 'no player' not in opponentsName.lower():
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

                for i in range(1, 10):
                    if row - i <= startingRow:
                        break
                    opponentTeamRow = sheet[awayTeamNameCol + str(row - i)]
                    if opponentTeamRow.row in homeRow:
                        opponentTeam = sheet[awayTeamNameCol +
                                             str(row - i)].value
                    if opponentTeamRow.row in awayRow:
                        opponentTeam = sheet[homeTeamNameCol +
                                             str(row - i)].value

                pairsPartner = formatName(pairsPartner)
                secondOpponent = formatName(secondOpponent)
                playerName = formatName(playerName)
                opponentsName = formatName(opponentsName)
                    
                # Store player stats
                playerNameForResult = playerName
                if pairsGame:
                    playerStats[playerName]['pairsPartners'].append(
                        pairsPartner)
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
                        playerStats[playerName]['winningPairsPartners'].append(
                            pairsPartner)
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
                        playerStats[playerName]['losingPairsPartners'].append(
                            pairsPartner)
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
print(f'Sanity checks for {preferredTeamName} stats complete')
print('------')
