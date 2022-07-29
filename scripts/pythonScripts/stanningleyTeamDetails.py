# Team info (lowercase)
stanningleyTeamNames = ['stanningley', 'stanningley a',
                        'stanningley park', 'stanningley park a']

# Days played
stanningleyTeamDays = ['Monday', 'Tuesday', 'Thursday', 'Saturday']

# Every Stanningley player (lowercase)
stanningleyPlayers = [
    'jeff allman', 'shirley allman', 'john armitage', 'mario biancardo', 'shirley biancardo',
    'paul bowes', 'clifford brogie', 'craig clarkson', 'steve gardner', 'andy marshall', 'bernie miller',
    'alyssa randell', 'andy waller', 'kevin waller', 'jim moorin', 'duncan mcphail', 'stewart watson',
    'dave hudson', 'neil porter', 'donald shaw', 'alison woodfine', 'joey broadbent', 'jack roberts', 'vanessa lancaster'
]

# Stanningley players with different spellings of name (lowercase)
duplicateTeamMemberNames = ['duncan mc phail',
                            'stuart watson', 'andrew marshall']

traitorPlayers = {
    'Monday': [],
    'Tuesday': [],
    'Thursday': ['mario biancardo', 'shirley biancardo'],
    'Saturday': ['mario biancardo', 'shirley biancardo', 'dave hudson', 'clifford brogie'],
}


def calculateGamePoints(points):
    if points == 21:
        gamePoints = 5
    if points < 5:
        gamePoints = 0
    if points >= 5 and points < 10:
        gamePoints = 1
    if points >= 10 and points < 15:
        gamePoints = 2
    if points >= 15 and points < 18:
        gamePoints = 3
    if points >= 18 and points < 21:
        gamePoints = 4
    return gamePoints


def deduplicateNames(name):
    name = name.lower()
    if name == 'duncan mc phail':
        name = 'duncan mcphail'
    if name == 'andrew marshall':
        name = 'andy marshall'
    if name == 'stuart watson':
        name = 'stewart watson'
    return name.lower()


def anonymiseNames(name):
    if name.lower() == 'alison woodfine':
        name = 'Ali'
    if name.lower() == 'andy waller':
        name = 'Andy W'
    return name.lower()


def returnListOfPlayerStats():
    stanningleyPlayers.sort()
    stanningleyPlayerResults = {}
    for player in stanningleyPlayers:
        player = anonymiseNames(player)
        playerObj = {
            'totalPoints': 0,
            'totalAgg': 0,
            'totalPointsAgainst': 0,
            'totalAggAgainst': 0,
            'homeWins': 0,
            'homeLosses': 0,
            'awayWins': 0,
            'awayLosses': 0,
            'pairWins': 0,
            'pairLosses': 0,
            'pairsPartners': [],
            'beatenOpponents': [],
            'beatenBy': [],
            'dayPlayed': [],
            'totalPairsAgg': 0,
            'totalPairsAggAgainst': 0,
            'winningPairsPartners': [],
            'losingPairsPartners': [],
            'totalHomeAgg': 0,
            'totalHomeAggAgainst': 0,
            'totalAwayAgg': 0,
            'totalAwayAggAgainst': 0,
            'totalHomePoints': 0,
            'totalHomePointsAgainst': 0,
            'totalAwayPoints': 0,
            'totalAwayPointsAgainst': 0,
            'cupWins': 0,
            'cupLosses': 0,
            'beatenTeam': [],
            'beatenByTeam': [],
            'results': [],
            'monday': {
                'games': 0,
                'wins': 0,
                'aggDiff': 0,
            },
            'tuesday': {
                'games': 0,
                'wins': 0,
                'aggDiff': 0,
            },
            'thursday': {
                'games': 0,
                'wins': 0,
                'aggDiff': 0,
            },
            'saturday': {
                'games': 0,
                'wins': 0,
                'aggDiff': 0,
            },
        }
        stanningleyPlayerResults[player] = playerObj
    return stanningleyPlayerResults
