import os
import teamDetails

teamPlayers = teamDetails.players
duplicateTeamMemberNames = teamDetails.duplicateTeamMemberNames
currentTeamDays = teamDetails.teamDays

# Add Saturday AireDale & Wharfedale and Monday Pairs?
otherLeagues = ['Monday AireDale & Wharfedale', 'Tuesday AireDale & Wharfedale', 'Wednesday AireDale & Wharfedale',
                'Monday Bradford', 'Wednesday Half Holiday Bradford', 'Saturday Bradford',
                'Wednesday Spen Valley', 'Tuesday Mirfield', 'Thursday Vets Bradford']
leaguesWithGamesTo26 = ['wednesday pairs airewharfe', 'monday pairs airewharfe']
teamDays = currentTeamDays + otherLeagues
extraPlayers = []  # this is to track players who only play for a different team
players = teamPlayers + extraPlayers
otherDuplicatePlayers = ['cliff brogie']
duplicatePlayerNames = duplicateTeamMemberNames + otherDuplicatePlayers
otherTeams = ['pudsey', 'burley', 'wibsey', 'tarnfield', 'littlemoor', 'farsley', 'bramley']
teamsTracking = teamDetails.teamNames + otherTeams

cupText = ['pre lim', 'pre-lim', 'preliminary', 'qtr-finals', 'quarter finals', 'quarter-finals', 'semi-finals', 'semi finals', 'final', 'round of 16', 'round of 32']

def findHtmlFiles():
    files = []
    for team in teamDays:
        files.append(os.getcwd() + '/files/htmlFiles/' + team + '.html')
    return files


def deduplicateNames(name):
    if name == 'Duncan Mc Phail':
        name = 'Duncan McPhail'
    if name == 'Andrew Marshall':
        name = 'Andy Marshall'
    if name == 'Stuart Watson':
        name = 'Stewart Watson'
    if name == 'Cliff Brogie':
        name = 'Clifford Brogie'
    if name == 'Andrew Waller':
        name = 'Andy Waller'
    if name == 'Don Shaw':
        name = 'Donald Shaw'
    return name.lower()


def anonymiseNames(name):
    if name.lower() == 'alison woodfine':
        name = 'Alison'
    return name.lower()


def standardiseName(name):
    name = name.replace(' - ', '-')
    name = name.replace(' \'A\'', '')
    return name

def formatName(name):
    name = standardiseName(name)
    name = deduplicateNames(name)
    name = anonymiseNames(name)
    return name.lower()

def returnTotalAggAvailablePerGame(team):
    if team.lower() in leaguesWithGamesTo26:
        return 26
    return 21

def returnListOfPlayerStats(days, includeTeamData):
    players.sort()
    playerStats = {}
    for player in players:
        player = anonymiseNames(player)
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
                playerObj[team.replace(' (A)', '').lower()] = {
                    'games': 0,
                    'wins': 0,
                    'aggDiff': 0,
                }
        playerStats[player] = playerObj
    return playerStats

def formatTeamName(possibleTeamName):
    teamName = possibleTeamName
    teamName = teamName.replace(
        'Stanningley Park', 'Stanningley')
    teamName = teamName.replace(
        'Pudsey Littlemoor', 'Littlemoor')
    teamName = teamName.replace(
        'S&SC', '')
    teamName = teamName.replace(
        'S & SC', '')
    teamName = teamName.replace(' BC', '')
    teamName = teamName.replace('\'', '')
    teamName = teamName.replace('-', ' ')
    teamName = teamName.replace('   ', ' ')
    teamName = teamName.replace('  ', ' ')
    teamName = teamName.strip()
    return teamName