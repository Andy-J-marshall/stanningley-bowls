import playerStatsHelper

# Team info (lowercase)
teamNames = [
    'Stanningley', 
    'Stanningley A', 
    'Stanningley B',
    'Stanningley Park', 
    'Stanningley Park A', 
    'Stanningley Park B'
]
displayTeamName = 'Stanningley'

# Days played (add duplicate days for second teams suffixed with (A) or (B) etc.)
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
    'john armitage', 
    'paul bowes', 
    'clifford brogie', 
    'harvey leonard', 
    'rob packer', 
    'neil porter',
    'craig clarkson', 
    'steve gardner', 
    'andy marshall', 
    'alyssa randell', 
    'andy waller', 
    'phil sutcliffe',
    'jim moorin', 
    'duncan mcphail', 
    'stewart watson', 
    'tracey marshall', 
    'derek wilson', 
    'donald shaw',
    'alison woodfine', 
    'joey broadbent', 
    'vanessa lancaster', 
    'paul leonard', 
    'martin fulton',
    'malvin miller', 
    'stuart potter', 
    'colin haque', 
    'ken green', 
    'robin mcdermott', 
    'stephen tiernan',
    'david eaton', 
    'mary spears', 
    'peter crowther', 
    'laila packer', 
    'richard hodgson', 
    'jim swailes',
    'nicola bona', 
    'karl chapman', 
    'phil thornton', 
    'linda barrand'
]

# Players with different spellings of name (lowercase). Also need to add to deduplicateNames function
duplicatePlayerNames = [
    'duncan mc phail', 
    'phillip thornton', 
    'philip thornton',
    'stuart watson', 
    'andrew marshall', 
    'cliff brogie', 
    'james moorin'
]

# Add alternative names for players (lowercase)
def deduplicateNames(name):
    name = playerStatsHelper.standardiseName(name)
    if name == 'duncan mc phail':
        name = 'duncan mcphail'
    if name == 'andrew marshall':
        name = 'andy marshall'
    if name == 'stuart watson':
        name = 'stewart watson'
    if name == 'cliff brogie':
        name = 'clifford brogie'
    if name == 'andrew waller':
        name = 'andy waller'
    if name == 'don shaw':
        name = 'donald shaw'
    if name == 'james moorin':
        name = 'jim moorin'
    if name == 'philip thornton':
        name = 'phil thornton'
    if name == 'phillip thornton':
        name = 'phil thornton'
    return name

# Add players who play for other teams in leagues the team player in (lowercase)
traitorPlayers = {
    'Monday Combined Leeds': ['neil porter'],
    'Tuesday Vets Leeds': [],
    'Tuesday Leeds': ['neil porter'],
    'Wednesday Half Holiday Leeds': ['clifford brogie'],
    'Wednesday Pairs AireWharfe': [],
    'Thursday Vets Leeds': ['neil porter'],
    'Saturday Leeds': ['clifford brogie', 'neil porter']
}

# Other leagues that players play in for other teams (lowercase)
otherLeagues = [
    'Tuesday Mirfield', 
    'Wednesday Spen Valley',
    'Monday AireWharfe',
    'Tuesday AireWharfe',
    'Monday Bradford',
    'Wednesday Half Holiday Bradford',
    'Thursday Vets Bradford', 
    'Saturday Bradford'
]

# Other teams that players play for (lowercase)
otherTeams = [
    'new wortley', 
    'new armley', 
    'pudsey', 
    'pudsey park', 
    'burley', 
    'wibsey', 
    'littlemoor', 
    'farsley', 
    'bramley'
]

allDays = teamDays + otherLeagues
teamsTracking = teamNames + otherTeams
