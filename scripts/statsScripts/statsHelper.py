import re
import teamDetailsLittlemoor as teamDetails

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

def returnBaseRowDownNumber(cupGameBool, forAggAdjustmentBool):
    if cupGameBool or forAggAdjustmentBool:
        return 9
    return 10

def returnTeamScoreRowDownNumber(cupGameBool, allRowsInFile, rowNumber, league):
    baseAdjustment = returnBaseRowDownNumber(cupGameBool, False)
    rowsDownAdjustmentInt = 0
    rowsUpAdjustmentInt = 0
    totalNumberOfRowsAdjustmentInt = 0
    
    # AireWharfe, Mirfield and Bradford leagues display scores differently
    if 'bradford' in league.lower() or 'airewharfe' in league.lower():
        rowsUpAdjustmentInt += 1

    if 'mirfield' in league.lower():
        rowsDownAdjustmentInt += 1
    
    rowsUpAdjustmentInt = adjustRowNumberFor10PlayerTeams(league, rowsUpAdjustmentInt)
    rowsDownAdjustmentInt = returnAdjustedRowNumberFor6PlayerTeams(league, rowsDownAdjustmentInt)

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

def returnAdjustedRowNumberFor6PlayerTeams(league, rowsDownAdjustmentInt):
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

def returnTeamNameForLeague(allRowsInFile, teamNameForLeague):
    possibleTeamNamesUsed = []
    teamNameToUse = teamDetails.displayTeamName

    for rowNumber, line in enumerate(allRowsInFile, start=0):
        row = allRowsInFile[rowNumber]
        if row and type(row) is str:
            for possibleTeamName in teamDetails.teamNames:
                rowValue = row.lower().strip()
                if possibleTeamName.lower() in rowValue:
                    # Filter out A team stats for B team and vice versa
                    if teamNameForLeague.lower().endswith(' (a)'):
                        if possibleTeamName.lower().endswith((' b', " 'b'")):
                            continue
                        teamNameToUse = teamDetails.displayTeamName + ' A'
                    elif teamNameForLeague.lower().endswith(' (b)'):
                        if possibleTeamName.lower().endswith((' a', " 'a'")):
                            continue
                        teamNameToUse = teamDetails.displayTeamName + ' B'
                    possibleTeamNamesUsed.append(possibleTeamName)
    
    
    if len(possibleTeamNamesUsed) == 0:
        raise Exception('No team name found')
    
    teamNameUsedForLeague = max(possibleTeamNamesUsed, key=len)
    return teamNameUsedForLeague, teamNameToUse

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

def findHomeAndAwayTeamGameRows(allRowsInFile, teamNameUsedForLeague):
    homeRow = []
    awayRow = []
    for rowNumber, line in enumerate(allRowsInFile, start=0):
        row = allRowsInFile[rowNumber]
        if row and type(row) is str:
            # This ignores cup games hosted by the club
            hostedCupGame = isCupGame(row.lower())

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

    return homeRow, awayRow

def returnHomeAndAwayPlayerRowsForTeam(allRowsInFile, teamNameUsedForLeague, league):
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
                    validPlayer = checkValidPlayerOnDay(possiblePlayerNameHome, rowNumber, 'home', teamNameUsedForLeague, league, allRowsInFile)
                    if validPlayer:
                        homePlayerRow.append(rowNumber)

                possiblePlayerNameAway = str(findPossiblePlayerNames[1]).strip()
                possiblePlayerNameAway = teamDetails.deduplicateNames(possiblePlayerNameAway).lower()
                if possiblePlayerNameAway in teamDetails.players or possiblePlayerNameAway in teamDetails.duplicatePlayerNames:
                    validPlayer = checkValidPlayerOnDay(possiblePlayerNameAway, rowNumber, 'away', teamNameUsedForLeague, league, allRowsInFile)
                    if validPlayer:
                        awayPlayerRow.append(rowNumber)
                        
    combinedRows = homePlayerRow + awayPlayerRow
    return homePlayerRow, awayPlayerRow, combinedRows

def returnHomeAndAwayPlayerRowsForAllTeams(allRowsInFile):
    homePlayerRow = []
    awayPlayerRow = []
    for rowNumber, line in enumerate(allRowsInFile, start=0):
        row = allRowsInFile[rowNumber]
        if (row and type(row) is str):
            findPossiblePlayerNames = re.findall(r"([A-za-z'\-()]+(?: [A-Za-z'\-()]+)+)", row)
            if len(findPossiblePlayerNames) > 1:
                possiblePlayerNameHome = str(findPossiblePlayerNames[0]).strip()
                possiblePlayerNameHome = standardiseName(possiblePlayerNameHome)
                if possiblePlayerNameHome in teamDetails.players or possiblePlayerNameHome in teamDetails.duplicatePlayerNames:
                    homePlayerRow.append(rowNumber)

                possiblePlayerNameAway = str(findPossiblePlayerNames[1]).strip()
                possiblePlayerNameAway = standardiseName(possiblePlayerNameAway)
                if possiblePlayerNameAway in teamDetails.players or possiblePlayerNameAway in teamDetails.duplicatePlayerNames:
                    awayPlayerRow.append(rowNumber)
    return homePlayerRow, awayPlayerRow

def checkCorrectTeamForPlayer(allRowsInFile, rowNumber, homeGame, awayGame, cupHome, cupAway):
    for i in range(0, 13):
        possibleTeamText = allRowsInFile[rowNumber - i]
        
        if type(possibleTeamText) is str:
            possibleTeamText = possibleTeamText.lower().strip()
            
            # Checks against full team name first
            for team in teamDetails.teamsTracking:
                team = team.lower()
                if team in possibleTeamText:
                    if (homeGame or cupHome) and possibleTeamText.startswith(team):
                        return True
                    if (awayGame or cupAway) and not possibleTeamText.startswith(team):
                        return True
                    if possibleTeamText.count(team) == 2:
                        return True
    return False

def isPairsGame(allRowsInFile, rowNumber, text):
    scoreFoundInText = any(char.isdigit() for char in text)
    if scoreFoundInText is False:
        return True
    else:
        rowBelowText = allRowsInFile[rowNumber + 1]
        pairsAggregateMatch = re.findall(r'\d+', rowBelowText)
        if len(pairsAggregateMatch) == 0:
            return True
    return False

def handlePairsGame(text, allRowsInFile, rowNumber, homeGame, awayGame, cupHome, cupAway):
    scoreFoundInText = any(char.isdigit() for char in text)
    pairsPartner = ''
    secondOpponent = ''
    aggregate = 0
    opponentAggregate = 0
    
    if scoreFoundInText is False:
        rowBelowText = allRowsInFile[rowNumber - 1]
        findPossiblePairsPlayerNames = re.findall(r"([A-za-z'\-()]+(?: [A-Za-z'\-()]+)+)", rowBelowText)
        pairsAggregateMatch = re.findall(r'\d+', rowBelowText)
        
        if homeGame or cupHome:
            pairsPartner = findPossiblePairsPlayerNames[0]
            secondOpponent = findPossiblePairsPlayerNames[1]
            aggregate = int(pairsAggregateMatch[0].strip())
            opponentAggregate = int(pairsAggregateMatch[1].strip())
        elif awayGame or cupAway:
            pairsPartner = findPossiblePairsPlayerNames[1]
            secondOpponent = findPossiblePairsPlayerNames[0]
            aggregate = int(pairsAggregateMatch[1].strip())
            opponentAggregate = int(pairsAggregateMatch[0].strip())
            
    else:
        rowBelowText = allRowsInFile[rowNumber + 1]
        findPossiblePairsPlayerNames = re.findall(r"([A-za-z'\-()]+(?: [A-Za-z'\-()]+)+)", rowBelowText)
        pairsAggregateMatch = re.findall(r'\d+', rowBelowText)
        
        if len(pairsAggregateMatch) == 0:
            if homeGame or cupHome:
                pairsPartner = findPossiblePairsPlayerNames[0]
                secondOpponent = findPossiblePairsPlayerNames[1]
            elif awayGame or cupAway:
                pairsPartner = findPossiblePairsPlayerNames[1]
                secondOpponent = findPossiblePairsPlayerNames[0]

    return {
        'pairsPartner': pairsPartner,
        'secondOpponent': secondOpponent,
        'aggregate': aggregate,
        'opponentAggregate': opponentAggregate
    }
