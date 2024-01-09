import datetime

# Team info (lowercase)
teamNames = ['stanningley', 'stanningley a',
             'stanningley park', 'stanningley park a']
preferredTeamName = 'Stanningley'

teamNamesForFirstTeam =['stanningley a', 'stanningley park a']
teamNamesForSecondTeam =['stanningley b', 'stanningley park b']

# Days played (duplicate days for second teams)
teamDays = ['Monday Combined Leeds', 'Tuesday Vets Leeds', 'Tuesday Leeds',
            'Wednesday Half Holiday Leeds', 'Wednesday Pairs AireWharfe', 'Thursday Vets Leeds', 'Saturday Leeds']

# Every player (lowercase)
players = [
    'john armitage', 'mario biancardo', 'shirley biancardo', 'paul bowes', 'clifford brogie',
    'craig clarkson', 'steve gardner', 'andy marshall', 'alyssa randell', 'andy waller',
    'kevin waller', 'jim moorin', 'duncan mcphail', 'stewart watson', 'tracey marshall',
    'donald shaw', 'alison woodfine', 'joey broadbent', 'jack roberts', 'vanessa lancaster', 'paul leonard',
    'malvin miller', 'stuart potter', 'colin haque', 'ken green', 'carole mcdermott', 'robin mcdermott',
    'derek wilson', 'david eaton', 'michael haigh', 'peter crowther', 'laila packer'
]

# Players with different spellings of name (lowercase)
duplicateTeamMemberNames = ['duncan mc phail',
                            'stuart watson', 'andrew marshall', 'cliff brogie']

traitorPlayers = {
    'Monday Combined Leeds': [],
    'Tuesday Vets Leeds': ['donald shaw', 'don shaw'],
    'Tuesday Leeds': [],
    'Wednesday Half Holiday Leeds': ['clifford brogie', 'cliff brogie', 'donald shaw', 'don shaw'],
    'Wednesday Pairs AireWharfe': [],
    'Thursday Vets Leeds': [],
    'Saturday Leeds': ['clifford brogie', 'cliff brogie', 'donald shaw', 'don shaw']
}

transferredPlayers = {
    'Monday Combined Leeds': [],
    'Tuesday Vets Leeds': [],
    'Tuesday Leeds': [],
    'Wednesday Half Holiday Leeds': [],
    'Wednesday Pairs AireWharfe': [],
    'Thursday Vets Leeds': [],
    'Saturday Leeds': []
}

clubCupWinners = {
    '2022': 'John Armitage',
    '2023': 'Paul Bowes'
}