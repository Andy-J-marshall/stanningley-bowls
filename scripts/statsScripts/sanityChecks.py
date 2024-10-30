import playerStatsHelper

def getFileSize(fileName):
    newEndRow = 0
    with open(fileName, 'r') as jsonFile:
        allRowsInFile = jsonFile.readlines()    
        for rowNumber, line in enumerate(allRowsInFile, start=0):
            newEndRow = rowNumber
    
    if newEndRow == 0:
        raise Exception('JSON is empty')
    return newEndRow

def checkPlayerStats(playerStats, players):
    print('Running sanity checks on player stats')
    for p in players:
        player = playerStatsHelper.standardiseName(p)
        stats = playerStats[player]
        # check games played
        if stats['totalGamesPlayed'] < 0 or stats['totalGamesPlayed'] > 200:
            raise Exception(f'totalGamesPlayed for {player} incorrect?')
        if stats['totalGamesPlayed'] != (stats['homeWins'] + stats['homeLosses'] + stats['awayWins'] + stats['awayLosses'] + stats['cupWins'] + stats['cupLosses']):
            raise Exception(f'totalGamesPlayed value does not match wins/losses values for {player}')
        
        # check wins/losses
        if stats['pairWins'] != (stats['pairHomeWins'] + stats['pairAwayWins'] + stats['pairCupWins']):
            raise Exception(f'pairWins value does not match pairs home/away/cup wins values for {player}')
        if stats['pairLosses'] != (stats['pairHomeLosses'] + stats['pairAwayLosses'] + stats['pairCupLosses']):
            raise Exception(f'pairLosses value does not match pairs home/away/cup losses values for {player}')

        # check aggregates
        if stats['totalAgg'] < 0 or stats['totalAgg'] > 3500:
            raise Exception(f'totalAgg for {player} incorrect?')
        if stats['totalAggAgainst'] < 0 or stats['totalAggAgainst'] > 3500:
            raise Exception(f'totalAggAgainst for {player} incorrect?')
        if stats['availableAgg'] < 0 or stats['availableAgg'] < stats['totalAgg'] or stats['availableAgg'] < stats['totalAggAgainst']:
            raise Exception(f'availableAgg for {player} incorrect?')
        if stats['totalHomeAgg'] < 0 or stats['totalHomeAgg'] > stats['availableHomeAgg']:
            raise Exception(f'totalHomeAgg for {player} incorrect?')
        if stats['totalAwayAgg'] < 0 or stats['totalAwayAgg'] > stats['availableAwayAgg']:
            raise Exception(f'totalAwayAgg for {player} incorrect?')
        if stats['totalHomeAggAgainst'] < 0 or stats['totalHomeAggAgainst'] > stats['availableHomeAgg']:
            raise Exception(f'totalHomeAggAgainst for {player} incorrect?')
        if stats['totalAwayAggAgainst'] < 0 or stats['totalAwayAggAgainst'] > stats['availableAwayAgg']:
            raise Exception(f'totalAwayAggAgainst for {player} incorrect?')
        
        # check pairs aggregates
        if stats['totalPairsAgg'] < 0 or stats['totalPairsAgg'] > stats['totalAgg']:
            raise Exception(f'totalPairsAgg for {player} incorrect?')
        if stats['availablePairsAgg'] < 0 or stats['availablePairsAgg'] < stats['totalPairsAgg'] or stats['availablePairsAgg'] < stats['totalPairsAggAgainst'] or stats['availablePairsAgg'] > stats['availableAgg']:
            raise Exception(f'availablePairsAgg for {player} incorrect?')
        if stats['totalPairsAggAgainst'] < 0 or stats['totalPairsAggAgainst'] > stats['totalAggAgainst']:
            raise Exception(f'totalPairsAggAgainst for {player} incorrect?')
        if (stats['availablePairsHomeAgg'] + stats['availablePairsAwayAgg']) > stats['availablePairsAgg']:
            raise Exception(f'availablePairsHomeAgg and/or availablePairsAwayAgg for {player} incorrect?')
        if stats['totalPairsAwayAgg'] < 0 or stats['totalPairsAwayAgg'] > stats['totalPairsAgg']:
            raise Exception(f'totalPairsAwayAgg for {player} incorrect?')
        if stats['totalPairsHomeAgg'] < 0 or stats['totalPairsHomeAgg'] > stats['totalPairsAgg']:
            raise Exception(f'totalPairsHomeAgg for {player} incorrect?')
        if stats['totalPairsAwayAggAgainst'] < 0 or stats['totalPairsAwayAggAgainst'] > stats['totalPairsAggAgainst']:
            raise Exception(f'totalPairsAwayAggAgainst for {player} incorrect?')
        if stats['totalPairsHomeAggAgainst'] < 0 or stats['totalPairsHomeAggAgainst'] > stats['totalPairsAggAgainst']:
            raise Exception(f'totalPairsHomeAggAgainst for {player} incorrect?')
        
        # checks arrays
        if len(stats['results']) != stats['totalGamesPlayed']:
            raise Exception(f'results for {player} incorrect?')
        
        checkForDuplicateResults(stats['results'], player)

def checksTeamStats(allTeamResults):
    print('Running sanity checks on team stats')
    for team in allTeamResults:
        dayForTeam = team['day']

        if team['agg'] < 0 or team['agg'] > 5000:
            raise Exception(f'agg for {dayForTeam} incorrect?')
        if team['opponentAgg'] < 0 or team['opponentAgg'] > 5000:
            raise Exception(f'opponentAgg for {dayForTeam} incorrect?')
        if len(team['results']) > 30:
            raise Exception(f'results for {dayForTeam} incorrect?')
        if team['totalGamesPlayed'] < 0 or team['totalGamesPlayed'] > 30:
            raise Exception(f'totalGamesPlayed for {dayForTeam} incorrect?')
        if team['wins'] < 0 or team['wins'] > 30:
            raise Exception(f'wins for {dayForTeam} incorrect?')
        if team['losses'] < 0 or team['losses'] > 30:
            raise Exception(f'losses for {dayForTeam} incorrect?')
        if team['draws'] < 0 or team['draws'] > 20:
            raise Exception(f'draws for {dayForTeam} incorrect?')
        if team['awayWins'] < 0 or team['awayWins'] > team['wins']:
            raise Exception(f'awayWins for {dayForTeam} incorrect?')
        if team['homeWins'] < 0 or team['homeWins'] > team['wins']:
            raise Exception(f'homeWins for {dayForTeam} incorrect?')
        if team['awayLosses'] < 0 or team['awayLosses'] > team['losses']:
            raise Exception(f'awayLosses for {dayForTeam} incorrect?')
        if team['homeLosses'] < 0 or team['homeLosses'] > team['losses']:
            raise Exception(f'homeLosses for {dayForTeam} incorrect?')
        if team['cupLosses'] < 0 or team['cupLosses'] > team['losses']:
            raise Exception(f'cupLosses for {dayForTeam} incorrect?')
        if team['cupWins'] < 0 or team['cupWins'] > team['wins']:
            raise Exception(f'cupWins for {dayForTeam} incorrect?')
        if team['homeDraws'] < 0 or team['homeDraws'] > team['draws']:
            raise Exception(f'homeDraws for {dayForTeam} incorrect?')
        if team['awayDraws'] < 0 or team['awayDraws'] > team['draws']:
            raise Exception(f'awayDraws for {dayForTeam} incorrect?')

def checkForDuplicateResults(results, player):
    potentialDuplicatesFound = len(results) != len(set(results))
    if potentialDuplicatesFound:
        print('----------------')
        print('WARNING: check for potential duplicate results for player:' + player)
        print(results)
        print('----------------')

def checkTeamName(team, teamNameUsedForLeague, expectedTeamDisplayName):
    if team.lower().endswith(' (a)') and teamNameUsedForLeague.lower().endswith(' b'):
        raise Exception('B team found for A team stats')
    if team.lower().endswith(' (b)') and teamNameUsedForLeague.lower().endswith(' a'):
        raise Exception('A team found for B team stats')
    if expectedTeamDisplayName.lower() not in teamNameUsedForLeague.lower():
        raise Exception('Incorrect team name found')
    
def checkFileSizeHasGrown(previousFileSize, newFileSize):
    if newFileSize < previousFileSize:
        raise Exception(f'JSON file has fewer rows than before. Updated: {newFileSize}, previous: {previousFileSize}')
    print('Sanity checks complete')
    print('-------------------------')
    
def validatePlayerNotProcessedTwice(rowNumber, homePlayerRow, awayPlayerRow):
    if rowNumber in homePlayerRow and rowNumber in awayPlayerRow:
        raise Exception('Row appears in home row and away row. Check the opponent name. Row: ' + str(rowNumber))
