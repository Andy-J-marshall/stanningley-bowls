leaguesWithGamesTo26 = ['wednesday pairs airewharfe']

cupText = ['prelims', 'pre lim', 'pre-lim', 'preliminary', 'qtr-finals', 'quarter finals', 'quarter-finals', 'semi-finals', 'semi finals', 'final', 'round of 16', 'round of 32']

def deduplicateNames(name):
    if name == 'Duncan Mc Phail':
        name = 'Duncan McPhail'
    if name == 'Andrew Marshall':
        name = 'Andy Marshall'
    if name == 'Stuart Watson':
        name = 'Stewart Watson'
    if name == 'Cliff Brogie':
        name = 'Clifford Brogie'
    if name == 'Andrew Waller':
        name = 'Andy Waller'
    if name == 'Don Shaw':
        name = 'Donald Shaw'
    if name == 'James Moorin':
        name = 'Jim Moorin'
    if name == 'Philip Thornton':
        name = 'Phil Thornton'
    if name == 'Phillip Thornton':
        name = 'Phil Thornton'
    return name.lower()

def standardiseName(name):
    name = name.replace(' - ', '-')
    name = name.replace(' \'A\'', '')
    name = name.replace('\'A\'', '')
    name = name.replace(' \'a\'', '')
    name = name.replace('\'a\'', '')
    name = name.replace(' \'B\'', '')
    name = name.replace('\'B\'', '')
    name = name.replace(' \'b\'', '')
    name = name.replace('\'b\'', '')
    return name

def formatName(name):
    name = standardiseName(name)
    name = deduplicateNames(name)
    return name.lower()

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
            'pairsPartners': [],
            'winningPairsPartners': [],
            'losingPairsPartners': [],
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
                
def checkForDuplicateResults(results, player):
    potentialDuplicatesFound = len(results) != len(set(results))
    if potentialDuplicatesFound:
        print('***')
        print('check for potential duplicate results for player:' + player)
        print(results)
        print('***')
        raise Exception('Duplicate results')

def sanityChecksOnTeamStats(allTeamResults):
    print('Running sanity checks on team stats')
    for team in allTeamResults:
        dayForTeam = team['day']

        if team['totalGamesPlayed'] > 0 and (team['leaguePosition'] <= 0 or team['leaguePosition'] > 13):
            raise Exception(f'leaguePosition for {dayForTeam} incorrect?')
        if team['agg'] < 0 or team['agg'] > 4000:
            raise Exception(f'agg for {dayForTeam} incorrect?')
        if team['opponentAgg'] < 0 or team['opponentAgg'] > 4000:
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

def sanityChecksOnPlayerStats(playerStats, players):
    print('Running sanity checks on player stats')
    for p in players:
        player = formatName(p)
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
        if len(stats['dayPlayed']) != stats['totalGamesPlayed']:
            raise Exception(f'dayPlayed for {player} incorrect?')
        if len(stats['pairsPartners']) != (stats['pairWins'] + stats['pairLosses']):
            raise Exception(f'pairsPartners for {player} incorrect?')
        if len(stats['winningPairsPartners']) != stats['pairWins']:
            raise Exception(f'winningPairsPartners for {player} incorrect?')
        if len(stats['losingPairsPartners']) != stats['pairLosses']:
            raise Exception(f'losingPairsPartners for {player} incorrect?')
        
        checkForDuplicateResults(stats['results'], player)

def checkFileSize(fileName):
    newEndRow = 0
    with open(fileName, 'r') as jsonFile:
        allRowsInFile = jsonFile.readlines()    
        for rowNumber, line in enumerate(allRowsInFile, start=0):
            newEndRow = rowNumber
    
    if newEndRow == 0:
        raise Exception('JSON is empty')
    return newEndRow
                    