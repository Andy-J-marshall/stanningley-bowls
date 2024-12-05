leaguesWithGamesTo26 = ["wednesday pairs airewharfe"]

cupText = [
    " trophy",
    " shield",
    " plate",
    " cup",
    "knockout",
    " on ",
    "prelims",
    "pre lim",
    "pre-lim",
    "preliminary",
    "round 1",
    "round 2",
    "1st round",
    "2nd round",
    "qtr-finals",
    "quarter finals",
    "quarter-finals",
    "semi-finals",
    "semi finals",
    "q/finals",
    "s/finals",
    "final",
    "round of 16",
    "round of 32",
    "round of 64",
]


def returnTeamNameToStoreData(team):
    return team.replace(" (A)", "")


def removeSuffixFromTeamName(team):
    return (
        team.replace(" (A)", "")
        .replace(" (B)", "")
        .replace(" (C)", "")
        .replace(" (D)", "")
    )


def returnTotalAggAvailablePerGame(team):
    if team.lower() in leaguesWithGamesTo26:
        return 26
    return 21


def findCupGameRows(allRowsInFile, endRow):
    cupGameRows = []
    for rowNumber, line in enumerate(allRowsInFile, start=0):
        row = allRowsInFile[rowNumber]
        if row and type(row) is str:
            for text in cupText:
                if text in row.lower():
                    for i in range(0, 13):
                        # check if row above is a bye
                        if rowNumber + i > endRow:
                            break
                        if "manual award" in allRowsInFile[rowNumber + i].lower():
                            break
                        cupGameRows.append(rowNumber + i)
                    break
    return cupGameRows


def returnTeamNameForLeague(
    allRowsInFile, teamNameForLeague, displayTeamName, teamNames
):
    possibleTeamNamesUsed = []
    teamNameToUse = displayTeamName

    for rowNumber, line in enumerate(allRowsInFile, start=0):
        row = allRowsInFile[rowNumber]
        if row and type(row) is str:
            for possibleTeamName in teamNames:
                rowValue = row.lower().strip()
                if possibleTeamName.lower() in rowValue:
                    # Filter out A team stats for B team and vice versa
                    if teamNameForLeague.lower().endswith(" (a)"):
                        if possibleTeamName.lower().endswith(
                            (" b", " 'b'", " c", " 'c'", " d", " 'd'")
                        ):
                            continue

                        teamNameToUse = displayTeamName + " A"
                    elif teamNameForLeague.lower().endswith(" (b)"):
                        if possibleTeamName.lower().endswith(
                            (" a", " 'a'", " c", " 'c'", " d", " 'd'")
                        ):
                            continue

                        teamNameToUse = displayTeamName + " B"
                    elif teamNameForLeague.lower().endswith(" (c)"):
                        if possibleTeamName.lower().endswith(
                            (" a", " 'a'", " b", " 'b'", " d", " 'd'")
                        ):
                            continue

                        teamNameToUse = displayTeamName + " C"
                    elif teamNameForLeague.lower().endswith(" (d)"):
                        if possibleTeamName.lower().endswith(
                            (" a", " 'a'", " b", " 'b'", " c", " 'c'")
                        ):
                            continue

                        teamNameToUse = displayTeamName + " D"
                    possibleTeamNamesUsed.append(possibleTeamName)

    if len(possibleTeamNamesUsed) == 0:
        raise Exception("No team name found")

    teamNameUsedForLeague = max(possibleTeamNamesUsed, key=len)
    return teamNameUsedForLeague, teamNameToUse
