import datetime

# Team info (lowercase)
teamNames = ['stanningley', 'stanningley a',
             'stanningley park', 'stanningley park a']

preferredTeamName = 'Stanningley'

# Days played
teamDays = ['Monday Combined Leeds', 'Tuesday Vets Leeds', 'Tuesday Leeds',
            'Wednesday Half Holiday Leeds', 'Thursday Vets Leeds', 'Saturday Leeds']

# Every player (lowercase)
players = [
    'john armitage', 'mario biancardo', 'shirley biancardo', 'paul bowes', 'clifford brogie',
    'craig clarkson', 'steve gardner', 'andy marshall', 'alyssa randell', 'andy waller',
    'kevin waller', 'jim moorin', 'duncan mcphail', 'stewart watson', 'dave hudson',
    'donald shaw', 'alison woodfine', 'joey broadbent', 'jack roberts', 'vanessa lancaster', 'paul leonard',
    'malvin miller', 'stuart potter', 'colin haque', 'ken green', 'tracey marshall', 'carole mcdermott', 'robin mcdermott',
    'derek wilson', 'david eaton', 'michael haigh', 'peter crowther', 'laila packer'
]

# Players with different spellings of name (lowercase)
duplicateTeamMemberNames = ['duncan mc phail',
                            'stuart watson', 'andrew marshall', 'cliff brogie']

traitorPlayers = {
    'Monday Combined Leeds': [],
    'Tuesday Vets Leeds': [],
    'Tuesday Leeds': [],
    'Wednesday Half Holiday Leeds': ['dave hudson', 'david hudson', 'clifford brogie', 'cliff brogie'],
    'Thursday Vets Leeds': [],
    'Saturday Leeds': ['dave hudson', 'david hudson', 'clifford brogie', 'cliff brogie'],
}

# TODO need to change this to an array?
transferredPlayers = {
    'Monday Combined Leeds': [],
    'Tuesday Vets Leeds': [],
    'Tuesday Leeds': [],
    'Wednesday Half Holiday Leeds': [],
    'Thursday Vets Leeds': [],
    'Saturday Leeds':
    {
        'player': 'donald shaw',
        'date': datetime.datetime(2023, 5, 10),
    }
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
