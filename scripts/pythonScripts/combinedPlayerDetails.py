# Days played
leagues = ['Monday', 'Tuesday', 'Thursday', 'Saturday']

# TODO change to (and in the data below too)
# leagues = ['Monday Combined Leeds', 'Tuesday Vets Leeds',
#            'Thursday Vets Leeds', 'Saturday Leeds']

# Every player (lowercase)
players = [
    'mario biancardo'
]
# TODO add all players back in
# players = [
#     'jeff allman', 'shirley allman', 'john armitage', 'mario biancardo', 'shirley biancardo',
#     'paul bowes', 'clifford brogie', 'craig clarkson', 'steve gardner', 'andy marshall', 'bernie miller',
#     'alyssa randell', 'andy waller', 'kevin waller', 'jim moorin', 'duncan mcphail', 'stewart watson',
#     'dave hudson', 'neil porter', 'donald shaw', 'alison woodfine', 'joey broadbent', 'jack roberts', 'vanessa lancaster'
# ]

# Players with different spellings of name (lowercase)
# TODO any more?
# duplicatePlayerNames = ['duncan mc phail',
#                         'stuart watson', 'andrew marshall', 'cliff brogie', 'david hudson']
duplicatePlayerNames = []


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
    return name.lower()


# Base information for each player. New players need adding to this
playerResults = {
    'mario biancardo': {
        'totalAgg': 0,
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
        'leaguePlayed': [],
        'totalPairsAgg': 0,
        'totalPairsAggAgainst': 0,
        'winningPairsPartners': [],
        'losingPairsPartners': [],
        'totalHomeAgg': 0,
        'totalHomeAggAgainst': 0,
        'totalAwayAgg': 0,
        'totalAwayAggAgainst': 0,
        'cupWins': 0,
        'cupLosses': 0,
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
        'wednesday': {
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
    },
}
