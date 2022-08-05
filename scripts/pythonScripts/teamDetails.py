# Team info (lowercase)
teamNames = ['stanningley', 'stanningley a',
             'stanningley park', 'stanningley park a']

preferredTeamName = 'Stanningley'

# Days played
teamDays = ['Monday Combined Leeds', 'Tuesday Vets Leeds',
            'Thursday Vets Leeds', 'Saturday Leeds']

# Every player (lowercase)
players = [
    'jeff allman', 'shirley allman', 'john armitage', 'mario biancardo', 'shirley biancardo',
    'paul bowes', 'clifford brogie', 'craig clarkson', 'steve gardner', 'andy marshall', 'bernie miller',
    'alyssa randell', 'andy waller', 'kevin waller', 'jim moorin', 'duncan mcphail', 'stewart watson',
    'dave hudson', 'neil porter', 'donald shaw', 'alison woodfine', 'joey broadbent', 'jack roberts', 'vanessa lancaster'
]

# Players with different spellings of name (lowercase)
duplicateTeamMemberNames = ['duncan mc phail',
                            'stuart watson', 'andrew marshall']

traitorPlayers = {
    'Monday Combined Leeds': [],
    'Tuesday Vets Leeds': [],
    'Thursday Vets Leeds': ['mario biancardo', 'shirley biancardo'],
    'Saturday Leeds': ['mario biancardo', 'shirley biancardo', 'dave hudson', 'clifford brogie'],
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
