# Team info (lowercase)
teamNames = ['Stanningley', 'Stanningley A', 'Stanningley B',
             'Stanningley Park', 'Stanningley Park A', 'Stanningley Park B']
preferredTeamName = 'Stanningley'

# Days played (duplicate days for second teams)
teamDays = [
    'Monday Combined Leeds',
    'Tuesday Vets Leeds',
    'Tuesday Leeds',
    'Wednesday Half Holiday Leeds',
    'Wednesday Pairs AireWharfe', 
    'Thursday Vets Leeds', 
    'Saturday Leeds (A)', 
    'Saturday Leeds (B)' 
]

# Every player (lowercase)
players = [
    'john armitage', 'paul bowes', 'clifford brogie', 'harvey leonard', 'rob packer', 'neil porter',
    'craig clarkson', 'steve gardner', 'andy marshall', 'alyssa randell', 'andy waller', 'phil sutcliffe',
    'jim moorin', 'duncan mcphail', 'stewart watson', 'tracey marshall', 'derek wilson', 'donald shaw',
    'alison woodfine', 'joey broadbent', 'vanessa lancaster', 'paul leonard', 'martin fulton',
    'malvin miller', 'stuart potter', 'colin haque', 'ken green', 'robin mcdermott', 'stephen tiernan',
    'david eaton', 'mary spears', 'peter crowther', 'laila packer', 'richard hodgson', 'jim swailes',
    'nicola bona', 'karl chapman', 'phil thornton', 'linda barrand'
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

otherLeagues = [
    'Tuesday Mirfield', 
    'Wednesday Spen Valley',
    'Monday AireDale & Wharfedale',
    'Tuesday AireDale & Wharfedale',
    'Monday Bradford',
    'Wednesday Half Holiday Bradford',
    'Thursday Vets Bradford', 
    'Saturday Bradford'
]
allDays = teamDays + otherLeagues
extraPlayers = []  # this is to track players who only play for a different team
players = players + extraPlayers
otherDuplicatePlayers = []
duplicatePlayerNames = duplicateTeamMemberNames + otherDuplicatePlayers
otherTeams = ['new wortley', 'new armley', 'pudsey', 'pudsey park', 'burley', 'wibsey', 'littlemoor', 'farsley', 'bramley']
teamsTracking = teamNames + otherTeams
