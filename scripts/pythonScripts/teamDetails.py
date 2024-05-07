import datetime

# Team info (lowercase)
teamNames = ['stanningley', 'stanningley a', 'stanningley b',
             'stanningley park', 'stanningley park a', 'stanningley park b']
preferredTeamName = 'Stanningley'

teamNamesForFirstTeam =['stanningley a', 'stanningley park a']
teamNamesForSecondTeam =['stanningley b', 'stanningley park b']

# Days played (duplicate days for second teams)
teamDays = ['Monday Combined Leeds', 'Tuesday Vets Leeds', 'Tuesday Leeds',
            'Wednesday Half Holiday Leeds', 'Wednesday Pairs AireWharfe', 'Thursday Vets Leeds', 'Saturday Leeds (A)', 'Saturday Leeds (B)' ]

# Every player (lowercase)
players = [
    'john armitage', 'paul bowes', 'clifford brogie', 'harvey leonard', 'rob packer', 'neil porter',
    'craig clarkson', 'steve gardner', 'andy marshall', 'alyssa randell', 'andy waller', 'phil sutcliffe',
    'jim moorin', 'duncan mcphail', 'stewart watson', 'tracey marshall', 'derek wilson', 'donald shaw',
    'alison woodfine', 'joey broadbent', 'vanessa lancaster', 'paul leonard', 'martin fulton',
    'malvin miller', 'stuart potter', 'colin haque', 'ken green', 'robin mcdermott', 'stephen tiernan',
    'david eaton', 'mary spears', 'peter crowther', 'laila packer', 'richard hodgson', 'jim swailes',
    'nicola bona', 'karl chapman', 'phil thornton'
]

# Players with different spellings of name (lowercase)
duplicateTeamMemberNames = ['duncan mc phail', 'phillip thornton', 'philip thornton',
                            'stuart watson', 'andrew marshall', 'cliff brogie', 'james moorin']

traitorPlayers = {
    'Monday Combined Leeds': ['neil porter'],
    'Tuesday Vets Leeds': [],
    'Tuesday Leeds': ['neil porter'],
    'Wednesday Half Holiday Leeds': ['clifford brogie'],
    'Wednesday Pairs AireWharfe': [],
    'Thursday Vets Leeds': ['neil porter'],
    'Saturday Leeds': ['clifford brogie', 'neil porter']
}

transferredPlayers = {
    'Monday Combined Leeds': {},
    'Tuesday Vets Leeds': {},
    'Tuesday Leeds': {},
    'Wednesday Half Holiday Leeds': {},
    'Wednesday Pairs AireWharfe': {},
    'Thursday Vets Leeds': {},
    'Saturday Leeds': {}
}

clubCupWinners = {
    '2022': 'John Armitage',
    '2023': 'Paul Bowes'
}