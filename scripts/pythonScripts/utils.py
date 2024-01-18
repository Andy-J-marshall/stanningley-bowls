import os
import teamDetails

teamPlayers = teamDetails.players
duplicateTeamMemberNames = teamDetails.duplicateTeamMemberNames
currentTeamDays = teamDetails.teamDays

# Add Saturday AireDale & Wharfedale and Monday Pairs?
otherLeagues = ['Tuesday Mirfield', 'Wednesday Spen Valley', 'Monday AireDale & Wharfedale', 
                'Tuesday AireDale & Wharfedale', 'Wednesday AireDale & Wharfedale', 'Monday Bradford', 
                'Wednesday Half Holiday Bradford', 'Thursday Vets Bradford', 'Saturday Bradford']
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

def sanityChecksOnTeamStats(allTeamResults):
    print('Running sanity checks on team stats')
    for team in allTeamResults:
        dayForTeam = team['day']

        if team['totalGamesPlayed'] > 0 and (team['leaguePosition'] <= 0 or team['leaguePosition'] > 13):
            raise Exception(f'leaguePosition for {dayForTeam} incorrect?')
        if team['agg'] < 0 or team['agg'] > 4000:
            raise Exception(f'agg for {dayForTeam} incorrect?')
        if team['opponentAgg'] < 0 or team['opponentAgg'] > 4000:
            raise Exception(f'opponentAgg for {dayForTeam} incorrect?')
        if len(team['results']) > 30:
            raise Exception(f'results for {dayForTeam} incorrect?')
        if team['totalGamesPlayed'] < 0 or team['totalGamesPlayed'] > 30:
            raise Exception(f'totalGamesPlayed for {dayForTeam} incorrect?')
        if team['wins'] < 0 or team['wins'] > 30:
            raise Exception(f'wins for {dayForTeam} incorrect?')
        if team['losses'] < 0 or team['losses'] > 30:
            raise Exception(f'losses for {dayForTeam} incorrect?')
        if team['draws'] < 0 or team['draws'] > 20:
            raise Exception(f'draws for {dayForTeam} incorrect?')
        if team['awayWins'] < 0 or team['awayWins'] > team['wins']:
            raise Exception(f'awayWins for {dayForTeam} incorrect?')
        if team['homeWins'] < 0 or team['homeWins'] > team['wins']:
            raise Exception(f'homeWins for {dayForTeam} incorrect?')
        if team['awayLosses'] < 0 or team['awayLosses'] > team['losses']:
            raise Exception(f'awayLosses for {dayForTeam} incorrect?')
        if team['homeLosses'] < 0 or team['homeLosses'] > team['losses']:
            raise Exception(f'homeLosses for {dayForTeam} incorrect?')
        if team['cupLosses'] < 0 or team['cupLosses'] > team['losses']:
            raise Exception(f'cupLosses for {dayForTeam} incorrect?')
        if team['cupWins'] < 0 or team['cupWins'] > team['wins']:
            raise Exception(f'cupWins for {dayForTeam} incorrect?')
        if team['homeDraws'] < 0 or team['homeDraws'] > team['draws']:
            raise Exception(f'homeDraws for {dayForTeam} incorrect?')
        if team['awayDraws'] < 0 or team['awayDraws'] > team['draws']:
            raise Exception(f'awayDraws for {dayForTeam} incorrect?')
