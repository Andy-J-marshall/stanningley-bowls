import statsHelper

# Bradford saturday and Mirfield teams have 10 players except in low divisions
leaguesWith10Players = [
    "monday airewharfe",
    "saturday airewharfe",
    "saturday bradford",
    "mirfield",
]
leaguesWith6Players = [
    "monday bradford",
    "wednesday half holiday bradford",
    "wednesday half holiday leeds",
]


def returnBaseRowDownNumber(cupGameBool, forAggAdjustmentBool):
    if cupGameBool or forAggAdjustmentBool:
        return 9
    return 10


def returnTeamScoreRowDownNumber(cupGameBool, allRowsInFile, rowNumber, league):
    baseAdjustment = returnBaseRowDownNumber(cupGameBool, False)
    rowsDownAdjustmentInt = 0
    rowsUpAdjustmentInt = 0
    totalNumberOfRowsAdjustmentInt = 0

    # AireWharfe, Mirfield and Bradford leagues display scores differently
    if "bradford" in league.lower() or "airewharfe" in league.lower():
        rowsUpAdjustmentInt += 1

    if "mirfield" in league.lower():
        rowsDownAdjustmentInt += 1

    rowsUpAdjustmentInt = adjustRowNumberFor10PlayerTeams(league, rowsUpAdjustmentInt)
    rowsDownAdjustmentInt = returnAdjustedRowNumberFor6PlayerTeams(
        league, rowsDownAdjustmentInt
    )

    if cupGameBool:
        if "wednesday pairs" in league.lower():
            rowsUpAdjustmentInt -= 1

        # To account for handicap row in cup games
        checkForTeamHandicap = allRowsInFile[
            rowNumber + baseAdjustment - rowsDownAdjustmentInt
        ]
        if (
            type(checkForTeamHandicap) is str
            and "handicap" in checkForTeamHandicap.lower()
        ):
            rowsDownAdjustmentInt -= 1

    totalNumberOfRowsAdjustmentInt = (
        baseAdjustment - rowsDownAdjustmentInt + rowsUpAdjustmentInt
    )
    return totalNumberOfRowsAdjustmentInt


def adjustRowNumberFor10PlayerTeams(league, rowsUpAdjustmentInt):
    if league.lower() in leaguesWith10Players:
        return rowsUpAdjustmentInt + 2
    return rowsUpAdjustmentInt


def returnAdjustedRowNumberFor6PlayerTeams(league, rowsDownAdjustmentInt):
    if league.lower() in leaguesWith6Players:
        return rowsDownAdjustmentInt + 2
    return rowsDownAdjustmentInt


def returnAggRowDownNumber(league):
    if league.lower() == "monday airewharfe":
        return 2
    if league.lower() == "saturday airewharfe":
        return 2
    # TODO this won't work for saturday bradford teams in division 3 or below from 2025 due to 8 players in lower leagues
    if league.lower() == "saturday bradford":
        return 3
    if league.lower() == "mirfield":
        return 4
    return 0


def isCupGame(cupRow):
    if cupRow and type(cupRow) is str:
        for text in statsHelper.cupText:
            if text.lower() in cupRow.lower():
                return True
    return False


def findHomeAndAwayTeamGameRows(allRowsInFile, teamNameUsedForLeague, clubDetails):
    homeRow = []
    awayRow = []
    for rowNumber, line in enumerate(allRowsInFile, start=0):
        row = allRowsInFile[rowNumber]
        if row and type(row) is str:
            # This ignores cup games hosted by the club
            hostedCupGame = isCupGame(row.lower())

            # Check if A and B team are playing each other
            aTeamPlayingBTeamBool = False
            if (
                not hostedCupGame
                and row.lower().count(clubDetails.displayTeamName.lower()) > 1
            ):
                aTeamPlayingBTeamBool = True
                teamLower = teamNameUsedForLeague.lower()
                rowLower = row.lower().strip()
                if teamLower in rowLower:
                    # Determine if A or B team is playing at home and store the rows
                    if rowLower.endswith((" a", " 'a'")):
                        if teamLower.endswith((" a", " 'a'")):
                            awayRow.append(rowNumber)
                        elif teamLower.endswith((" b", " 'b'")):
                            homeRow.append(rowNumber)
                    elif rowLower.endswith((" b", " 'b'")):
                        if teamLower.endswith((" b", " 'b'")):
                            awayRow.append(rowNumber)
                        elif teamLower.endswith((" a", " 'a'")):
                            homeRow.append(rowNumber)

            # Store home and away game rows
            if (
                aTeamPlayingBTeamBool is False
                and hostedCupGame is False
                and teamNameUsedForLeague.lower() in row.lower()
            ):
                words = row.strip().lower().split()
                firstWord = words[0].lower()
                if firstWord == clubDetails.displayTeamName.lower():
                    homeRow.append(rowNumber)
                else:
                    awayRow.append(rowNumber)

    return homeRow, awayRow
