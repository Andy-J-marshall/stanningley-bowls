import os
import teamDetails

teamPlayers = teamDetails.players
duplicateTeamMemberNames = teamDetails.duplicateTeamMemberNames
currentTeamDays = teamDetails.teamDays

# Saturday AireDale & Wharfedale? And pairs leagues?
# Can remove Wednesday AireDale & Wharfedale?
otherLeagues = ['Monday AireDale & Wharfedale', 'Tuesday AireDale & Wharfedale', 'Wednesday AireDale & Wharfedale',
                'Monday Bradford', 'Wednesday Half Holiday Bradford', 'Saturday Bradford',
                'Wednesday Spen Valley', 'Tuesday Mirfield', 'Thursday Vets Bradford']
teamDays = currentTeamDays + otherLeagues
extraPlayers = [] # this is to track players who only play for a different team
players = teamPlayers + extraPlayers
otherDuplicatePlayers = ['cliff brogie', 'david hudson']
duplicatePlayerNames = duplicateTeamMemberNames + otherDuplicatePlayers
otherTeams = ['pudsey park', 'pudsey', 'burley', 'wibsey',
              'tarnfield', 'littlemoor', 'farsley', 'bramley', 'bramley park']
teamsTracking = teamDetails.teamNames + otherTeams

cupText = ['qtr-finals', 'semi-finals', 'final', 'round of 16', 'round of 32']

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
    if name == 'David Hudson':
        name = 'Dave Hudson'
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


def returnListOfPlayerStats(days):
    players.sort()
    playerStats = {}
    for player in players:
        player = anonymiseNames(player)
        playerObj = {
            'totalPoints': 0,
            'totalPointsAgainst': 0,
            'totalAgg': 0,
            'totalAggAgainst': 0,
            'totalPairsAgg': 0,
            'totalPairsAggAgainst': 0,
            'totalHomeAgg': 0,
            'totalHomeAggAgainst': 0,
            'totalAwayAgg': 0,
            'totalAwayAggAgainst': 0,
            'totalHomePoints': 0,
            'totalHomePointsAgainst': 0,
            'totalAwayPoints': 0,
            'totalAwayPointsAgainst': 0,
            'homeWins': 0,
            'homeLosses': 0,
            'awayWins': 0,
            'awayLosses': 0,
            'cupWins': 0,
            'cupLosses': 0,
            'pairWins': 0,
            'pairLosses': 0,
            'beatenOpponents': [],
            'beatenBy': [],
            'dayPlayed': [],
            'pairsPartners': [],
            'winningPairsPartners': [],
            'losingPairsPartners': [],
            'beatenTeam': [],
            'beatenByTeam': [],
            'results': [],
        }

        for team in days:
            playerObj[team.lower()] = {
                'games': 0,
                'wins': 0,
                'aggDiff': 0,
            }
        playerStats[player] = playerObj
    return playerStats
