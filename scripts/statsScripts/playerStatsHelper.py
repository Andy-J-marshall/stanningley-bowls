import re
import statsHelper


def returnListOfPlayerStats(days, includeTeamData, players):
    players.sort()
    playerStats = {}
    for player in players:
        playerObj = {
            "totalAgg": 0,
            "totalAggAgainst": 0,
            "availableAgg": 0,
            "availablePairsAgg": 0,
            "availableHomeAgg": 0,
            "availableAwayAgg": 0,
            "availablePairsHomeAgg": 0,
            "availablePairsAwayAgg": 0,
            "totalPairsAgg": 0,
            "totalPairsAggAgainst": 0,
            "totalHomeAgg": 0,
            "totalHomeAggAgainst": 0,
            "totalPairsHomeAgg": 0,
            "totalPairsHomeAggAgainst": 0,
            "totalAwayAgg": 0,
            "totalAwayAggAgainst": 0,
            "totalPairsAwayAgg": 0,
            "totalPairsAwayAggAgainst": 0,
            "homeWins": 0,
            "homeLosses": 0,
            "awayWins": 0,
            "awayLosses": 0,
            "cupWins": 0,
            "cupLosses": 0,
            "pairWins": 0,
            "pairLosses": 0,
            "pairHomeWins": 0,
            "pairHomeLosses": 0,
            "pairAwayWins": 0,
            "pairAwayLosses": 0,
            "pairCupWins": 0,
            "pairCupLosses": 0,
            "totalGamesPlayed": 0,
            "results": [],
        }

        if includeTeamData == True:
            for team in days:
                # this is to store first team data under the old name, to help with backward compatibility
                teamNameToStoreData = statsHelper.returnTeamNameToStoreData(
                    team
                ).lower()
                playerObj[teamNameToStoreData] = {
                    "games": 0,
                    "wins": 0,
                    "aggDiff": 0,
                }
        playerStats[player] = playerObj
    return playerStats


def calculatePlayerStats(
    playerStats,
    allRowsInFile,
    rowNumber,
    team,
    homeGame,
    awayGame,
    cupHome,
    cupAway,
    cupGameBool,
    includeTeamStatsBool,
    clubDetails,
):
    text = allRowsInFile[rowNumber]
    text = sanitisePlayerNames(text)
    findPossiblePlayerNames = re.findall(r"([A-za-z'\-()]+(?: [A-Za-z'\-()]+)+)", text)
    if homeGame or cupHome:
        opponentsName = findPossiblePlayerNames[1]

    if awayGame or cupAway:
        opponentsName = findPossiblePlayerNames[0]

    if "walkover" in opponentsName.lower() or "no player" in opponentsName.lower():
        return playerStats

    if homeGame or cupHome:
        playerName = findPossiblePlayerNames[0]

        matchAggregate = re.findall(r"\d+", text)
        if matchAggregate:
            aggregate = int(matchAggregate[0].strip())
            opponentAggregate = int(matchAggregate[1].strip())

    if awayGame or cupAway:
        playerName = findPossiblePlayerNames[1]

        matchAggregate = re.findall(r"\d+", text)
        if matchAggregate:
            aggregate = int(matchAggregate[1].strip())
            opponentAggregate = int(matchAggregate[0].strip())

    # Checks whether it's a pairs game
    pairsGame = isPairsGame(allRowsInFile, rowNumber, text)
    if pairsGame:
        pairsDetails = handlePairsGame(
            text, allRowsInFile, rowNumber, homeGame, awayGame, cupHome, cupAway
        )
        if pairsDetails["aggregate"] > 0:
            aggregate = pairsDetails["aggregate"]
        if pairsDetails["opponentAggregate"] > 0:
            opponentAggregate = pairsDetails["opponentAggregate"]
        if pairsDetails["pairsPartner"] != "":
            pairsPartner = pairsDetails["pairsPartner"]
        if pairsDetails["secondOpponent"] != "":
            secondOpponent = pairsDetails["secondOpponent"]
        pairsPartner = clubDetails.deduplicateNames(pairsPartner)
        secondOpponent = clubDetails.deduplicateNames(secondOpponent)

    # Format player names
    playerName = clubDetails.deduplicateNames(playerName)
    opponentsName = clubDetails.deduplicateNames(opponentsName)

    # Store player stats
    playerNameForResult = playerName
    if pairsGame:
        playerNameForResult = f"{playerName} & {pairsPartner}"
        opponentsName += f" & {secondOpponent}"
        playerStats[playerName][
            "availablePairsAgg"
        ] += statsHelper.returnTotalAggAvailablePerGame(team)
        playerStats[playerName]["totalPairsAgg"] += aggregate
        playerStats[playerName]["totalPairsAggAgainst"] += opponentAggregate

    playerStats[playerName]["totalGamesPlayed"] += 1

    playersResult = (
        f"{playerNameForResult} {aggregate} - {opponentAggregate} {opponentsName}"
    )
    playerStats[playerName]["results"].append(playersResult)

    # Wins
    if aggregate > opponentAggregate:
        if pairsGame:
            playerStats[playerName]["pairWins"] += 1
        if homeGame:
            playerStats[playerName]["homeWins"] += 1
            if pairsGame:
                playerStats[playerName]["pairHomeWins"] += 1
        if awayGame:
            playerStats[playerName]["awayWins"] += 1
            if pairsGame:
                playerStats[playerName]["pairAwayWins"] += 1
        if cupGameBool:
            playerStats[playerName]["cupWins"] += 1
            if pairsGame:
                playerStats[playerName]["pairCupWins"] += 1
    # Losses
    else:
        if pairsGame:
            playerStats[playerName]["pairLosses"] += 1
        if homeGame:
            playerStats[playerName]["homeLosses"] += 1
            if pairsGame:
                playerStats[playerName]["pairHomeLosses"] += 1
        if awayGame:
            playerStats[playerName]["awayLosses"] += 1
            if pairsGame:
                playerStats[playerName]["pairAwayLosses"] += 1
        if cupGameBool:
            playerStats[playerName]["cupLosses"] += 1
            if pairsGame:
                playerStats[playerName]["pairCupLosses"] += 1

    # Averages
    playerStats[playerName][
        "availableAgg"
    ] += statsHelper.returnTotalAggAvailablePerGame(team)
    playerStats[playerName]["totalAgg"] += aggregate
    playerStats[playerName]["totalAggAgainst"] += opponentAggregate
    if homeGame:
        playerStats[playerName][
            "availableHomeAgg"
        ] += statsHelper.returnTotalAggAvailablePerGame(team)
        playerStats[playerName]["totalHomeAgg"] += aggregate
        playerStats[playerName]["totalHomeAggAgainst"] += opponentAggregate
        if pairsGame:
            playerStats[playerName][
                "availablePairsHomeAgg"
            ] += statsHelper.returnTotalAggAvailablePerGame(team)
            playerStats[playerName]["totalPairsHomeAgg"] += aggregate
            playerStats[playerName]["totalPairsHomeAggAgainst"] += opponentAggregate
    if awayGame:
        playerStats[playerName][
            "availableAwayAgg"
        ] += statsHelper.returnTotalAggAvailablePerGame(team)
        playerStats[playerName]["totalAwayAgg"] += aggregate
        playerStats[playerName]["totalAwayAggAgainst"] += opponentAggregate
        if pairsGame:
            playerStats[playerName][
                "availablePairsAwayAgg"
            ] += statsHelper.returnTotalAggAvailablePerGame(team)
            playerStats[playerName]["totalPairsAwayAgg"] += aggregate
            playerStats[playerName]["totalPairsAwayAggAgainst"] += opponentAggregate

    if includeTeamStatsBool:
        teamNameToStoreData = statsHelper.returnTeamNameToStoreData(team).lower()
        playerStats[playerName][teamNameToStoreData]["games"] += 1
        playerStats[playerName][teamNameToStoreData]["aggDiff"] += (
            aggregate - opponentAggregate
        )
        if aggregate > opponentAggregate:
            playerStats[playerName][teamNameToStoreData]["wins"] += 1

    return playerStats


def sanitisePlayerNames(text):
    return text.replace("*A.N.Other*", "a n other")


def standardiseName(name):
    name = name.lower().strip()
    name = name.replace(" - ", "-")
    name = name.replace(" 'a'", "")
    name = name.replace("'a'", "")
    name = name.replace(" 'b'", "")
    name = name.replace("'b'", "")
    name = name.replace(" 'ab'", "")
    name = name.replace("'ab'", "")
    return name


def checkValidPlayerOnDay(
    playerName,
    rowNumber,
    homeOrAway,
    teamNameUsedForLeague,
    league,
    allRowsInFile,
    clubDetails,
):
    playerName = clubDetails.deduplicateNames(playerName)
    if playerName in clubDetails.traitorPlayers[league]:
        return False

    for i in range(0, 13):
        # Checks player is playing for correct team
        previousRowValue = allRowsInFile[rowNumber - i]
        if previousRowValue and type(previousRowValue) is str:
            previousRowValue = previousRowValue.lower().strip()
            if teamNameUsedForLeague.lower() in previousRowValue:
                if homeOrAway.lower() == "home" and previousRowValue.startswith(
                    teamNameUsedForLeague.lower()
                ):
                    return True
                if homeOrAway.lower() == "away" and not previousRowValue.startswith(
                    teamNameUsedForLeague.lower()
                ):
                    return True
                return False


def returnHomeAndAwayPlayerRowsForTeam(
    allRowsInFile, teamNameUsedForLeague, league, clubDetails
):
    homePlayerRow = []
    awayPlayerRow = []
    for rowNumber, line in enumerate(allRowsInFile, start=0):
        row = allRowsInFile[rowNumber]
        if row and type(row) is str:
            findPossiblePlayerNames = re.findall(
                r"([A-za-z'\-()]+(?: [A-Za-z'\-()]+)+)", row
            )
            if len(findPossiblePlayerNames) > 1:
                possiblePlayerNameHome = str(findPossiblePlayerNames[0]).strip()
                possiblePlayerNameHome = clubDetails.deduplicateNames(
                    possiblePlayerNameHome
                ).lower()
                if (
                    possiblePlayerNameHome in clubDetails.players
                    or possiblePlayerNameHome in clubDetails.duplicatePlayerNames
                ):
                    validPlayer = checkValidPlayerOnDay(
                        possiblePlayerNameHome,
                        rowNumber,
                        "home",
                        teamNameUsedForLeague,
                        league,
                        allRowsInFile,
                        clubDetails,
                    )
                    if validPlayer:
                        homePlayerRow.append(rowNumber)

                possiblePlayerNameAway = str(findPossiblePlayerNames[1]).strip()
                possiblePlayerNameAway = clubDetails.deduplicateNames(
                    possiblePlayerNameAway
                ).lower()
                if (
                    possiblePlayerNameAway in clubDetails.players
                    or possiblePlayerNameAway in clubDetails.duplicatePlayerNames
                ):
                    validPlayer = checkValidPlayerOnDay(
                        possiblePlayerNameAway,
                        rowNumber,
                        "away",
                        teamNameUsedForLeague,
                        league,
                        allRowsInFile,
                        clubDetails,
                    )
                    if validPlayer:
                        awayPlayerRow.append(rowNumber)

    combinedRows = homePlayerRow + awayPlayerRow
    return homePlayerRow, awayPlayerRow, combinedRows


def returnHomeAndAwayPlayerRowsForAllTeams(allRowsInFile, clubDetails):
    homePlayerRow = []
    awayPlayerRow = []
    for rowNumber, line in enumerate(allRowsInFile, start=0):
        row = allRowsInFile[rowNumber]
        if row and type(row) is str:
            row = sanitisePlayerNames(row)
            findPossiblePlayerNames = re.findall(
                r"([A-za-z'\-()]+(?: [A-Za-z'\-()]+)+)", row
            )
            if len(findPossiblePlayerNames) > 1:
                possiblePlayerNameHome = str(findPossiblePlayerNames[0]).strip()
                possiblePlayerNameHome = standardiseName(possiblePlayerNameHome)
                if (
                    possiblePlayerNameHome in clubDetails.players
                    or possiblePlayerNameHome in clubDetails.duplicatePlayerNames
                ):
                    homePlayerRow.append(rowNumber)

                possiblePlayerNameAway = str(findPossiblePlayerNames[1]).strip()
                possiblePlayerNameAway = standardiseName(possiblePlayerNameAway)
                if (
                    possiblePlayerNameAway in clubDetails.players
                    or possiblePlayerNameAway in clubDetails.duplicatePlayerNames
                ):
                    awayPlayerRow.append(rowNumber)
    return homePlayerRow, awayPlayerRow


def checkCorrectTeamForPlayer(
    allRowsInFile, rowNumber, homeGame, awayGame, cupHome, cupAway, clubDetails
):
    for i in range(0, 13):
        possibleTeamText = allRowsInFile[rowNumber - i]

        if type(possibleTeamText) is str:
            possibleTeamText = possibleTeamText.lower().strip()

            # Checks against full team name first
            for team in clubDetails.teamsTracking:
                team = team.lower()
                if team in possibleTeamText:
                    if (homeGame or cupHome) and possibleTeamText.startswith(team):
                        return True
                    if (awayGame or cupAway) and not possibleTeamText.startswith(team):
                        return True
                    if possibleTeamText.count(team) == 2:
                        return True
    return False


def isPairsGame(allRowsInFile, rowNumber, text):
    scoreFoundInText = any(char.isdigit() for char in text)
    if scoreFoundInText is False:
        return True
    else:
        rowBelowText = allRowsInFile[rowNumber + 1]
        pairsAggregateMatch = re.findall(r"\d+", rowBelowText)
        if len(pairsAggregateMatch) == 0:
            return True
    return False


def handlePairsGame(
    text, allRowsInFile, rowNumber, homeGame, awayGame, cupHome, cupAway
):
    scoreFoundInText = any(char.isdigit() for char in text)
    pairsPartner = ""
    secondOpponent = ""
    aggregate = 0
    opponentAggregate = 0

    if scoreFoundInText is False:
        rowBelowText = allRowsInFile[rowNumber - 1]
        findPossiblePairsPlayerNames = re.findall(
            r"([A-za-z'\-()]+(?: [A-Za-z'\-()]+)+)", rowBelowText
        )
        pairsAggregateMatch = re.findall(r"\d+", rowBelowText)

        if homeGame or cupHome:
            pairsPartner = findPossiblePairsPlayerNames[0]
            secondOpponent = findPossiblePairsPlayerNames[1]
            aggregate = int(pairsAggregateMatch[0].strip())
            opponentAggregate = int(pairsAggregateMatch[1].strip())
        elif awayGame or cupAway:
            pairsPartner = findPossiblePairsPlayerNames[1]
            secondOpponent = findPossiblePairsPlayerNames[0]
            aggregate = int(pairsAggregateMatch[1].strip())
            opponentAggregate = int(pairsAggregateMatch[0].strip())

    else:
        rowBelowText = allRowsInFile[rowNumber + 1]
        findPossiblePairsPlayerNames = re.findall(
            r"([A-za-z'\-()]+(?: [A-Za-z'\-()]+)+)", rowBelowText
        )
        pairsAggregateMatch = re.findall(r"\d+", rowBelowText)

        if len(pairsAggregateMatch) == 0:
            if homeGame or cupHome:
                pairsPartner = findPossiblePairsPlayerNames[0]
                secondOpponent = findPossiblePairsPlayerNames[1]
            elif awayGame or cupAway:
                pairsPartner = findPossiblePairsPlayerNames[1]
                secondOpponent = findPossiblePairsPlayerNames[0]

    return {
        "pairsPartner": pairsPartner,
        "secondOpponent": secondOpponent,
        "aggregate": aggregate,
        "opponentAggregate": opponentAggregate,
    }
