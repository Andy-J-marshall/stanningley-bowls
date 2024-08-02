import teamDetailsPudsey

# TODO paramertise these 3
teamPlayers = teamDetailsPudsey.players
duplicateTeamMemberNames = teamDetailsPudsey.duplicateTeamMemberNames
currentTeamDays = teamDetailsPudsey.teamDays

# TODO split the generic methods into a separate file
# TODO move to teamDetailsPudsey.py
otherLeagues = ['Tuesday AireDale & Wharfedale', 'Monday Combined Leeds', 'Tuesday Vets Leeds', 'Tuesday Leeds',
            'Wednesday Half Holiday Leeds', 'Wednesday Pairs AireWharfe', 'Thursday Vets Leeds', 'Saturday Leeds',]
leaguesWithGamesTo26 = ['wednesday pairs airewharfe']
teamDays = currentTeamDays + otherLeagues
extraPlayers = []  # this is to track players who only play for a different team
players = teamPlayers + extraPlayers
otherDuplicatePlayers = []
duplicatePlayerNames = duplicateTeamMemberNames + otherDuplicatePlayers
otherTeams = ['stanningley', 'new wortley', 'new armley', 'pudsey', 'pudsey park', 'burley', 'wibsey', 'littlemoor', 'farsley', 'bramley']
# TODO paramertise this? Or just hardcode
teamsTracking = teamDetailsPudsey.teamNames + otherTeams
cupText = ['prelims', 'pre lim', 'pre-lim', 'preliminary', 'qtr-finals', 'quarter finals', 'quarter-finals', 'semi-finals', 'semi finals', 'final', 'round of 16', 'round of 32']

# TODO move this to teamDetailsPudsey.py? Or just one big method?
def deduplicateNames(name):
    if name == 'Tom Hanson':
        name = 'Thomas Hanson'
    if name == 'Stuart Watson':
        name = 'Stewart Watson'
    if name == 'David Smith':
        name = 'Dave Smith'
    if name == 'Christopher Mordue':
        name = 'Chris Mordue'
    if name == 'Joshua Mordue':
        name = 'Josh Mordue'
    if name == 'Jonathon Edmondson':
        name = 'Jon Edmondson'
    if name == 'Andy Sykes':
        name = 'Andrew Sykes'
    if name == 'Phil Wilsdon':
        name = 'Philip Wilsdon'
    if name == 'Dave Poole':
        name = 'David Poole'
    return name.lower()

def standardiseName(name):
    name = name.replace(' - ', '-')
    name = name.replace(' \'A\'', '')
    name = name.replace('\'A\'', '')
    name = name.replace(' \'a\'', '')
    name = name.replace('\'a\'', '')
    return name

def formatName(name):
    name = standardiseName(name)
    name = deduplicateNames(name)
    return name.lower()

def returnTotalAggAvailablePerGame(team):
    if team.lower() in leaguesWithGamesTo26:
        return 26
    return 21

def returnListOfPlayerStats(days, includeTeamData):
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
                playerObj[team.lower()] = {
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
                    