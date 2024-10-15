import teamDetails

leaguesWithGamesTo26 = ['wednesday pairs airewharfe']
# Bradford saturday and Mirfield teams have 10 players except in low divisions
leaguesWith10Players = ['monday airewharfe', 'saturday airewharfe', 'saturday bradford', 'tuesday mirfield']
leaguesWith6Players = ['monday bradford', 'wednesday half holiday bradford', 'wednesday half holiday leeds']

cupText = [
    ' trophy',
    ' shield',
    ' plate',
    ' cup',
    ' on ',
    'prelims',
    'pre lim',
    'pre-lim',
    'preliminary',
    'round 1',
    'round 2',
    'qtr-finals',
    'quarter finals',
    'quarter-finals',
    'semi-finals',
    'semi finals',
    'final',
    'round of 16',
    'round of 32',
    'round of 64'
]

def standardiseName(name):
    name = name.lower().strip()
    name = name.replace(' - ', '-')
    name = name.replace(" 'a'", '')
    name = name.replace("'a'", '')
    name = name.replace(" 'b'", '')
    name = name.replace("'b'", '')
    return name

def returnTotalAggAvailablePerGame(team):
    if team.lower() in leaguesWithGamesTo26:
        return 26
    return 21

def returnListOfPlayerStats(days, includeTeamData, players):
    players.sort()
    playerStats = {}
    for player in players:
        playerObj = {
            'totalAgg': 0,
            'totalAggAgainst': 0,
            'availableAgg': 0,
            'availablePairsAgg': 0,
            'availableHomeAgg': 0,
            'availableAwayAgg': 0,
            'availablePairsHomeAgg': 0,
            'availablePairsAwayAgg': 0,
            'totalPairsAgg': 0,
            'totalPairsAggAgainst': 0,
            'totalHomeAgg': 0,
            'totalHomeAggAgainst': 0,
            'totalPairsHomeAgg': 0,
            'totalPairsHomeAggAgainst': 0,
            'totalAwayAgg': 0,
            'totalAwayAggAgainst': 0,
            'totalPairsAwayAgg': 0,
            'totalPairsAwayAggAgainst': 0,
            'homeWins': 0,
            'homeLosses': 0,
            'awayWins': 0,
            'awayLosses': 0,
            'cupWins': 0,
            'cupLosses': 0,
            'pairWins': 0,
            'pairLosses': 0,
            'pairHomeWins': 0,
            'pairHomeLosses': 0,
            'pairAwayWins': 0,
            'pairAwayLosses': 0,
            'pairCupWins': 0,
            'pairCupLosses': 0,
            'totalGamesPlayed': 0,
            'dayPlayed': [],
            'results': [],
        }

        if includeTeamData == True:
            for team in days:
                # this is to store first team data under the old name, to help with backward compatibility
                playerObj[team.replace(' (A)', '').lower()] = {
                    'games': 0,
                    'wins': 0,
                    'aggDiff': 0,
                }
        playerStats[player] = playerObj
    return playerStats

def checkValidPlayerOnDay(playerName, rowNumber, homeOrAway, teamNameUsedForLeague, league, allRowsInFile):
    playerName = teamDetails.deduplicateNames(playerName)
    if playerName in teamDetails.traitorPlayers[league]:
        return False
    
    for i in range(0, 13):
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

def findCupGameRows(allRowsInFile):
    cupGameRows = []
    for rowNumber, line in enumerate(allRowsInFile, start=0):
        row = allRowsInFile[rowNumber]
        if row and type(row) is str:
            for text in cupText:
                if text in row.lower():
                    for i in range(0, 13):
                        cupGameRows.append(rowNumber + i)
                    break
    return cupGameRows

def returnBaseRowDownNumber(cupGameBool, forAggAdjustmentBool):
    if cupGameBool or forAggAdjustmentBool:
        return 9
    return 10

def returnTeamScoreRowDownNumber(cupGameBool, allRowsInFile, rowNumber, league):
    baseAdjustment = returnBaseRowDownNumber(cupGameBool, False)
    rowsDownAdjustmentInt = 0
    rowsUpAdjustmentInt = 0
    totalNumberOfRowsAdjustmentInt = 0
    
    # AireWharfe and Bradford leagues display scores differently
    if 'bradford' in league.lower() or 'airewharfe' in league.lower():
        rowsUpAdjustmentInt += 1
        
    rowsUpAdjustmentInt = adjustRowNumberFor10PlayerTeams(league, rowsUpAdjustmentInt)
    rowsDownAdjustmentInt = adjustRowNumberFor6PlayerTeams(league, rowsDownAdjustmentInt)

    if cupGameBool:
        if 'wednesday pairs' in league.lower():
            rowsUpAdjustmentInt -= 1
        
        # To account for handicap row in cup games
        checkForTeamHandicap = allRowsInFile[rowNumber + baseAdjustment - rowsDownAdjustmentInt]
        if type(checkForTeamHandicap) is str and 'handicap' in checkForTeamHandicap.lower():
            rowsDownAdjustmentInt -= 1

    totalNumberOfRowsAdjustmentInt = baseAdjustment - rowsDownAdjustmentInt + rowsUpAdjustmentInt
    return totalNumberOfRowsAdjustmentInt

def adjustRowNumberFor10PlayerTeams(league, rowsUpAdjustmentInt):
    if league.lower() in leaguesWith10Players:
        return rowsUpAdjustmentInt + 2
    return rowsUpAdjustmentInt

def adjustRowNumberFor6PlayerTeams(league, rowsDownAdjustmentInt):
    if league.lower() in leaguesWith6Players:
        return rowsDownAdjustmentInt + 2
    return rowsDownAdjustmentInt

def returnAggRowDownNumber(league):
    if league.lower() == 'monday airewharfe':
        return 2
    if league.lower() == 'saturday airewharfe':
        return 2
    if league.lower() == 'saturday bradford':
        return 3
    if league.lower() == 'tuesday mirfield':
        return 4
    return 0

def isCupGame(cupRow):
    if cupRow and type(cupRow) is str:
        for text in cupText:
            if text.lower() in cupRow.lower():
                return True
    return False
