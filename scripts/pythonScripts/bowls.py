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
players = teamDetails.players
duplicateTeamMemberNames = teamDetails.duplicateTeamMemberNames
traitorPlayers = teamDetails.traitorPlayers
playerStats = utils.returnListOfPlayerStats(teamDetails.teamDays)
formatName = utils.formatName
calculateGamePoints = teamDetails.calculateGamePoints
preferredTeamName = teamDetails.preferredTeamName
transferredPlayers = teamDetails.transferredPlayers
lastResultRowsForTransferredPlayer = {}

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

cupText = ['qtr-finals', 'semi-finals', 'final', 'round of 16', 'round of 32']

# Open Excel file
path = str(Path.cwd()) + '/files/' + 'bowlsresults' + year + '.xlsx'
wb = openpyxl.load_workbook(path)

allTeamResults = []
print('UPDATING STATS:', teamNames[0].upper())

for day in teamDays:
    # Goes through each sheet in turn
    sheet = wb[day]
    print('Processing ' + day)

    # Find rows in spreadsheet for team games
    startingRow = 0
    startingRowIndex = 1
    for row in sheet['A']:
        if row.value and type(row.value) is str and 'FULL RESULTS' in row.value.upper():
            startingRow = startingRowIndex
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
        if row.value and type(row.value) is str and row.value.lower() in teamNames:
            if homeIndex > startingRow:
                homeRow.append(homeIndex)
        homeIndex = homeIndex + 1

    awayIndex = 1
    awayRow = []
    for row in sheet[awayTeamNameCol]:
        if row.value and type(row.value) is str and row.value.lower() in teamNames:
            if awayIndex > startingRow:
                awayRow.append(awayIndex)
        awayIndex = awayIndex + 1

    # Find league position for teams
    currentLeaguePosition = -1
    leaguePositionIndex = 1
    leaguePositionRow = 0
    leaguePositionCol = 'A'
    satAndWedLeaguePositionCol = 'B'
    leagueTeamNameCol = 'B'
    satAndWedLeagueTeamNameCol = 'C'

    if 'saturday' in day.lower() or 'wednesday' in day.lower():
        leagueTeamNameCol = satAndWedLeagueTeamNameCol
        leaguePositionCol = satAndWedLeaguePositionCol

    for row in sheet[leagueTeamNameCol]:
        if row.value and type(row.value) is str and row.value.lower() in teamNames:
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
    teamAgg = 0
    teamTotalPoints = 0
    opponentAgg = 0
    opponentTotalPoints = 0
    beaten = []
    beatenBy = []
    drawnWith = []
    results = []

    for row in range(1, sheet.max_row + 1):
        # Leeds half holiday team only has 6 players
        if 'half holiday' in day.lower():
            rowsDownIntModifier = 2
        else:
            rowsDownIntModifier = 0

        # Check if cup game
        cupGame = False
        cupCell = ''
        # Cup games are based on aggregate, not score, and are played on neutral greens
        if row > 2:
            cupCell = sheet[homeTeamNameCol + str(row - 1)].value
        if (cupCell and type(cupCell) is str) and cupCell.lower() in cupText:
            cupGame = True
            homeScore = sheet[homeTeamScoreCol +
                              str(row + 9 - rowsDownIntModifier)].value
            awayScore = sheet[awayTeamScoreCol +
                              str(row + 9 - rowsDownIntModifier)].value
        else:
            homeScore = sheet[homeTeamScoreCol +
                              str(row + 10 - rowsDownIntModifier)].value
            awayScore = sheet[awayTeamScoreCol +
                              str(row + 10 - rowsDownIntModifier)].value

        gameDate = ''
        if (row in homeRow or row in awayRow) and row > startingRow:
            gameDate = sheet[awayTeamNameCol + str(row - 1)].value
            if type(gameDate) is str:
                if 'On ' in gameDate or '(from ' in gameDate:
                    gameDate = sheet[awayTeamNameCol + str(row - 2)].value
            else:
                gameDate = ''

            # Finds last result before player has been transferred
            if (transferredPlayers[day]):
                gameDates = datefinder.find_dates(gameDate)
                for formattedGameDate in gameDates:
                    if (formattedGameDate < transferredPlayers[day]["date"]):
                        lastResultRowsForTransferredPlayer[transferredPlayers[day]["player"]] = row

        # Home games
        if row in homeRow:
            if row != leaguePositionRow:
                opponent = sheet[awayTeamNameCol + str(row)].value
                result = preferredTeamName + ' ' + \
                    str(homeScore) + ' - ' + str(awayScore) + \
                    ' ' + opponent + ' (' + gameDate + ')'
                results.append(result)
                if homeScore > awayScore:
                    if cupGame:
                        beaten.append(opponent + ' (cup)')
                        cupWins = cupWins + 1
                    else:
                        beaten.append(opponent + ' (home)')
                        homeWins = homeWins + 1
                if homeScore < awayScore:
                    if cupGame:
                        beatenBy.append(opponent + ' (cup)')
                        cupLosses = cupLosses + 1
                    else:
                        beatenBy.append(opponent + ' (home)')
                        homeLosses = homeLosses + 1
                if awayScore == homeScore:
                    drawnWith.append(opponent + (' (home)'))
                    homeDraws = homeDraws + 1
                teamAgg = teamAgg + \
                    sheet[homeAggCol +
                          str(row + 9 - rowsDownIntModifier)].value
                opponentAgg = opponentAgg + \
                    sheet[awayAggCol +
                          str(row + 9 - rowsDownIntModifier)].value
                if not cupGame:
                    teamTotalPoints = teamTotalPoints + homeScore
                    opponentTotalPoints = opponentTotalPoints + awayScore

        # Away games
        if row in awayRow:
            if row != leaguePositionRow:
                opponent = sheet[homeTeamNameCol + str(row)].value
                result = opponent + ' ' + \
                    str(homeScore) + ' - ' + str(awayScore) + \
                    ' ' + preferredTeamName + ' (' + gameDate + ')'
                results.append(result)
                if awayScore > homeScore:
                    if cupGame:
                        beaten.append(opponent + ' (cup)')
                        cupWins = cupWins + 1
                    else:
                        beaten.append(opponent + ' (away)')
                        awayWins = awayWins + 1
                if awayScore < homeScore:
                    if cupGame:
                        beatenBy.append(opponent + ' (cup)')
                        cupLosses = cupLosses + 1
                    else:
                        beatenBy.append(opponent + ' (away)')
                        awayLosses = awayLosses + 1
                if awayScore == homeScore:
                    drawnWith.append(opponent + ' (away)')
                    awayDraws = awayDraws + 1
                opponentAgg = opponentAgg + \
                    sheet[homeAggCol + str(row + 9 - rowsDownIntModifier)].value
                teamAgg = teamAgg + \
                    sheet[awayAggCol + str(row + 9 - rowsDownIntModifier)].value
                if not cupGame:
                    teamTotalPoints = teamTotalPoints + awayScore
                    opponentTotalPoints = opponentTotalPoints + homeScore

    # Store team result data
    teamResults = {
        'day': day,
        'awayWins': awayWins,
        'homeWins': homeWins,
        'awayLosses': awayLosses,
        'homeLosses': homeLosses,
        'homeDraws': homeDraws,
        'awayDraws': awayDraws,
        'cupWins': cupWins,
        'cupLosses': cupLosses,
        'agg': teamAgg,
        'totalPoints': teamTotalPoints,
        'opponentAgg': opponentAgg,
        'opponentTotalPoints': opponentTotalPoints,
        'beaten': beaten,
        'beatenBy': beatenBy,
        'drawnWith': drawnWith,
        'leaguePosition': currentLeaguePosition,
        'results': results
    }
    allTeamResults.append(teamResults)

    # Find rows in spreadsheet for players' games
    homePlayerIndex = 1
    homePlayerRow = []
    for homePlayer in sheet[homePlayerCol]:
        homePlayerName = homePlayer.value
        if (homePlayerName and type(homePlayerName) is str) and (homePlayerName.lower() in players or homePlayerName.lower() in duplicateTeamMemberNames):
            # Checks if player plays for team on selected day
            if homePlayerName.lower() not in traitorPlayers[day]:
                # Only adds result to list if they haven't been transferred to another team
                if homePlayerName.lower() in lastResultRowsForTransferredPlayer:
                    lastGameBeforeTransfer = lastResultRowsForTransferredPlayer[homePlayerName.lower()]
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
            # Checks if player plays for team on selected day
            if awayPlayerName.lower() not in traitorPlayers[day]:
                # Only adds result to list if they haven't been transferred to another team
                if awayPlayerName.lower() in lastResultRowsForTransferredPlayer:
                    lastGameBeforeTransfer = lastResultRowsForTransferredPlayer[awayPlayerName.lower()]
                    if awayPlayerIndex <= lastGameBeforeTransfer:
                        awayPlayerRow.append(awayPlayerIndex)
                else:
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

                for i in range(1, 10):
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
                    playerStats[playerName]['totalPairsAgg'] += aggregate
                    playerStats[playerName]['totalPairsAggAgainst'] += opponentAggregate

                playerStats[playerName][day.lower()]['games'] += 1

                playersResult = playerNameForResult + ' ' + \
                    str(aggregate) + ' - ' + \
                    str(opponentAggregate) + ' ' + opponentsName
                playerStats[playerName]['results'].append(
                    playersResult)

                # Wins
                if aggregate > opponentAggregate:
                    playerStats[playerName][day.lower(
                    )]['wins'] += 1
                    playerStats[playerName]['beatenOpponents'].append(
                        opponentsName)
                    playerStats[playerName]['beatenTeam'].append(
                        opponentTeam + ' (' + day + ')')
                    if pairsGame:
                        playerStats[playerName]['winningPairsPartners'].append(
                            pairsPartner)
                        playerStats[playerName]['pairWins'] += 1
                    if homeGame:
                        playerStats[playerName]['homeWins'] += 1
                    if awayGame:
                        playerStats[playerName]['awayWins'] += 1
                    if cupGame:
                        playerStats[playerName]['cupWins'] += 1
                # Losses
                else:
                    playerStats[playerName]['beatenBy'].append(
                        opponentsName)
                    playerStats[playerName]['beatenByTeam'].append(
                        opponentTeam + ' (' + day + ')')
                    if pairsGame:
                        playerStats[playerName]['losingPairsPartners'].append(
                            pairsPartner)
                        playerStats[playerName]['pairLosses'] += 1
                    if homeGame:
                        playerStats[playerName]['homeLosses'] += 1
                    if awayGame:
                        playerStats[playerName]['awayLosses'] += 1
                    if cupGame:
                        playerStats[playerName]['cupLosses'] += 1
                points = 0
                opponentPoints = 0
                if not cupGame:
                    points = calculateGamePoints(aggregate)
                    opponentPoints = calculateGamePoints(opponentAggregate)

                # Averages
                playerStats[playerName]['totalAgg'] += aggregate
                playerStats[playerName]['totalAggAgainst'] += opponentAggregate
                playerStats[playerName][day.lower()]['aggDiff'] += aggregate - \
                    opponentAggregate
                if homeGame:
                    playerStats[playerName]['totalHomeAgg'] += aggregate
                    playerStats[playerName]['totalHomeAggAgainst'] += opponentAggregate
                    playerStats[playerName]['totalHomePoints'] += points
                    playerStats[playerName]['totalHomePointsAgainst'] += opponentPoints
                if awayGame:
                    playerStats[playerName]['totalAwayAgg'] += aggregate
                    playerStats[playerName]['totalAwayAggAgainst'] += opponentAggregate
                    playerStats[playerName]['totalAwayPoints'] += points
                    playerStats[playerName]['totalAwayPointsAgainst'] += opponentPoints
                playerStats[playerName]['totalPoints'] += points
                playerStats[playerName]['totalPointsAgainst'] += opponentPoints
                playerStats[playerName]['dayPlayed'].append(day)

                if row in homePlayerRow and row in awayPlayerRow:
                    raise Exception(
                        'Row appears in home row and away row. Check the opponent name. Row: ' + str(row))

# Create JSON file
dataToExport = {
    'playerResults': playerStats,
    'teamResults': allTeamResults,
    'lastUpdated': date.today().strftime("%d/%m/%Y"),
    'statsYear': year
}

filename = 'src/data/bowlsStats' + year + '.json'
if os.path.exists(filename):
    os.remove(filename)

with open(filename, 'w') as f:
    json.dump(dataToExport, f)
    print(filename + ' created')
    print('------')
