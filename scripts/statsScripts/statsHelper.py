import teamDetails

leaguesWithGamesTo26 = ['wednesday pairs airewharfe']

cupText = [
    ' trophy',
    ' shield',
    ' plate',
    ' cup',
    # ' on ', # TODO this is sometimes confusing
    'prelims',
    'pre lim',
    'pre-lim',
    'preliminary',
    'round 1',
    'round 2',
    'qtr-finals',
    'quarter finals',
    'quarter-finals',
    'semi-finals',
    'semi finals',
    'final',
    'round of 16',
    'round of 32',
    'round of 64'
]

def returnTeamNameToStoreData(team):
    return team.replace(' (A)', '')

def removeSuffixFromTeamName(team):
    return team.replace(' (A)', '').replace(' (B)', '').replace(' (C)', '').replace(' (D)', '')

def returnTotalAggAvailablePerGame(team):
    if team.lower() in leaguesWithGamesTo26:
        return 26
    return 21

def findCupGameRows(allRowsInFile):
    cupGameRows = []
    for rowNumber, line in enumerate(allRowsInFile, start=0):
        row = allRowsInFile[rowNumber]
        if row and type(row) is str:
            for text in cupText:
                if text in row.lower():
                    for i in range(0, 13):
                        # check if row above is a bye
                        if 'manual award' in allRowsInFile[rowNumber + i].lower():
                            break
                        cupGameRows.append(rowNumber + i)
                    break
    return cupGameRows

def returnTeamNameForLeague(allRowsInFile, teamNameForLeague):
    possibleTeamNamesUsed = []
    teamNameToUse = teamDetails.displayTeamName

    for rowNumber, line in enumerate(allRowsInFile, start=0):
        row = allRowsInFile[rowNumber]
        if row and type(row) is str:
            for possibleTeamName in teamDetails.teamNames:
                rowValue = row.lower().strip()
                if possibleTeamName.lower() in rowValue:
                    # Filter out A team stats for B team and vice versa
                    if teamNameForLeague.lower().endswith(' (a)'):
                        if possibleTeamName.lower().endswith((' b', " 'b'")):
                            continue
                        teamNameToUse = teamDetails.displayTeamName + ' A'
                    elif teamNameForLeague.lower().endswith(' (b)'):
                        if possibleTeamName.lower().endswith((' a', " 'a'")):
                            continue
                        teamNameToUse = teamDetails.displayTeamName + ' B'
                    possibleTeamNamesUsed.append(possibleTeamName)
    
    
    if len(possibleTeamNamesUsed) == 0:
        raise Exception('No team name found')
    
    teamNameUsedForLeague = max(possibleTeamNamesUsed, key=len)
    return teamNameUsedForLeague, teamNameToUse
