# TODO split this config up into 2 files?

# Days played
teamDays = ['Monday', 'Tuesday', 'Thursday', 'Saturday']

# TODO change to (and in the data below too)
# leagues = ['Monday Combined Leeds', 'Tuesday Vets Leeds', 'Tuesday Leeds', 'Wednesday Half Holiday Leeds',
#            'Thursday Vets Leeds', 'Saturday Leeds']

# Every player (lowercase)
players = [
    'jeff allman', 'shirley allman', 'john armitage', 'mario biancardo', 'shirley biancardo',
    'paul bowes', 'clifford brogie', 'craig clarkson', 'steve gardner', 'andy marshall', 'bernie miller',
    'alyssa randell', 'andy waller', 'kevin waller', 'jim moorin', 'duncan mcphail', 'stewart watson',
    'dave hudson', 'neil porter', 'donald shaw', 'alison woodfine', 'joey broadbent', 'jack roberts', 'vanessa lancaster'
]

# Players with different spellings of name (lowercase)
duplicatePlayerNames = ['duncan mc phail',
                        'stuart watson', 'andrew marshall', 'cliff brogie', 'david hudson', 'Andrew Waller']


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
    if name == 'Duncan Mc Phail':
        name = 'Duncan McPhail'
    if name == 'Andrew Marshall':
        name = 'Andy Marshall'
    if name == 'Stuart Watson':
        name = 'Stewart Watson'
    if name == 'Cliff Brogie':
        name = 'Clifford Brogie'
    if name == 'David Hudson':
        name = 'Dave Hudson'
    if name == 'Andrew Waller':
        name = 'Andy Waller'
    return name.lower()


def anonymiseNames(name):
    if name.lower() == 'alison woodfine':
        name = 'Ali'
    if name.lower() == 'andy waller':
        name = 'Andy W'
    return name.lower()


def returnListOfPlayerStats():
    players.sort()
    playerStats = {}
    for player in players:
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
        }

        for team in teamDays:
            playerObj[team.lower()] = {
                'games': 0,
                'wins': 0,
                'aggDiff': 0,
            }
        playerStats[player] = playerObj
    return playerStats
