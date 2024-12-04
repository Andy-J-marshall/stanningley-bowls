import json
import os
import playerStatsHelper
import statsHelper


def checkPlayerStats(playerStats, filePath, checkTeamStatsBool, clubDetails):
    print("Running sanity checks on player stats")
    print("------------")

    if len(clubDetails.players) != len(clubDetails.players):
        raise Exception("Missing players from player stats")

    for p in clubDetails.players:
        player = playerStatsHelper.standardiseName(p)
        stats = playerStats[player]

        # Check values have increased or stayed the same compared to the previous stats in the file
        checkPlayerStatsValuesIncreased(
            stats, player, filePath, checkTeamStatsBool, clubDetails
        )

        if checkTeamStatsBool:
            checkPlayerTeamStats(stats, clubDetails)

        # check games played
        if stats["totalGamesPlayed"] < 0 or stats["totalGamesPlayed"] > 200:
            raise Exception(f"totalGamesPlayed for {player} incorrect?")
        if stats["totalGamesPlayed"] != (
            stats["homeWins"]
            + stats["homeLosses"]
            + stats["awayWins"]
            + stats["awayLosses"]
            + stats["cupWins"]
            + stats["cupLosses"]
        ):
            raise Exception(
                f"totalGamesPlayed value does not match wins/losses values for {player}"
            )

        # check wins/losses
        if stats["pairWins"] != (
            stats["pairHomeWins"] + stats["pairAwayWins"] + stats["pairCupWins"]
        ):
            raise Exception(
                f"pairWins value does not match pairs home/away/cup wins values for {player}"
            )
        if stats["pairLosses"] != (
            stats["pairHomeLosses"] + stats["pairAwayLosses"] + stats["pairCupLosses"]
        ):
            raise Exception(
                f"pairLosses value does not match pairs home/away/cup losses values for {player}"
            )

        # check aggregates
        if stats["totalAgg"] < 0 or stats["totalAgg"] > 3500:
            raise Exception(f"totalAgg for {player} incorrect?")
        if stats["totalAggAgainst"] < 0 or stats["totalAggAgainst"] > 3500:
            raise Exception(f"totalAggAgainst for {player} incorrect?")
        if (
            stats["availableAgg"] < 0
            or stats["availableAgg"] < stats["totalAgg"]
            or stats["availableAgg"] < stats["totalAggAgainst"]
        ):
            raise Exception(f"availableAgg for {player} incorrect?")
        if (
            stats["totalHomeAgg"] < 0
            or stats["totalHomeAgg"] > stats["availableHomeAgg"]
        ):
            raise Exception(f"totalHomeAgg for {player} incorrect?")
        if (
            stats["totalAwayAgg"] < 0
            or stats["totalAwayAgg"] > stats["availableAwayAgg"]
        ):
            raise Exception(f"totalAwayAgg for {player} incorrect?")
        if (
            stats["totalHomeAggAgainst"] < 0
            or stats["totalHomeAggAgainst"] > stats["availableHomeAgg"]
        ):
            raise Exception(f"totalHomeAggAgainst for {player} incorrect?")
        if (
            stats["totalAwayAggAgainst"] < 0
            or stats["totalAwayAggAgainst"] > stats["availableAwayAgg"]
        ):
            raise Exception(f"totalAwayAggAgainst for {player} incorrect?")

        # check pairs aggregates
        if stats["totalPairsAgg"] < 0 or stats["totalPairsAgg"] > stats["totalAgg"]:
            raise Exception(f"totalPairsAgg for {player} incorrect?")
        if (
            stats["availablePairsAgg"] < 0
            or stats["availablePairsAgg"] < stats["totalPairsAgg"]
            or stats["availablePairsAgg"] < stats["totalPairsAggAgainst"]
            or stats["availablePairsAgg"] > stats["availableAgg"]
        ):
            raise Exception(f"availablePairsAgg for {player} incorrect?")
        if (
            stats["totalPairsAggAgainst"] < 0
            or stats["totalPairsAggAgainst"] > stats["totalAggAgainst"]
        ):
            raise Exception(f"totalPairsAggAgainst for {player} incorrect?")
        if (stats["availablePairsHomeAgg"] + stats["availablePairsAwayAgg"]) > stats[
            "availablePairsAgg"
        ]:
            raise Exception(
                f"availablePairsHomeAgg and/or availablePairsAwayAgg for {player} incorrect?"
            )
        if (
            stats["totalPairsAwayAgg"] < 0
            or stats["totalPairsAwayAgg"] > stats["totalPairsAgg"]
        ):
            raise Exception(f"totalPairsAwayAgg for {player} incorrect?")
        if (
            stats["totalPairsHomeAgg"] < 0
            or stats["totalPairsHomeAgg"] > stats["totalPairsAgg"]
        ):
            raise Exception(f"totalPairsHomeAgg for {player} incorrect?")
        if (
            stats["totalPairsAwayAggAgainst"] < 0
            or stats["totalPairsAwayAggAgainst"] > stats["totalPairsAggAgainst"]
        ):
            raise Exception(f"totalPairsAwayAggAgainst for {player} incorrect?")
        if (
            stats["totalPairsHomeAggAgainst"] < 0
            or stats["totalPairsHomeAggAgainst"] > stats["totalPairsAggAgainst"]
        ):
            raise Exception(f"totalPairsHomeAggAgainst for {player} incorrect?")

        # checks arrays
        if len(stats["results"]) != stats["totalGamesPlayed"]:
            raise Exception(f"results for {player} incorrect?")

        checkForDuplicateResults(stats["results"], player)


def checkPlayerStatsValuesIncreased(
    updatedStats, player, filePath, checkTeamStatsBool, clubDetails
):
    if not os.path.exists(filePath):
        print("No previous stats to compare against")
        return

    with open(filePath, "r") as jsonFile:
        file = json.load(jsonFile)
        existingPlayerStats = file["playerResults"][player]

        # Check total games
        if existingPlayerStats["totalGamesPlayed"] > updatedStats["totalGamesPlayed"]:
            raise Exception(f"totalGamesPlayed for {player} lower than before")

        # Check wins
        if existingPlayerStats["homeWins"] > updatedStats["homeWins"]:
            raise Exception(f"homeWins for {player} lower than before")
        if existingPlayerStats["awayWins"] > updatedStats["awayWins"]:
            raise Exception(f"awayWins for {player} lower than before")
        if existingPlayerStats["cupWins"] > updatedStats["cupWins"]:
            raise Exception(f"cupWins for {player} lower than before")

        # Check losses
        if existingPlayerStats["homeLosses"] > updatedStats["homeLosses"]:
            raise Exception(f"homeLosses for {player} lower than before")
        if existingPlayerStats["awayLosses"] > updatedStats["awayLosses"]:
            raise Exception(f"awayLosses for {player} lower than before")
        if existingPlayerStats["cupLosses"] > updatedStats["cupLosses"]:
            raise Exception(f"cupLosses for {player} lower than before")

        # Check pairs wins/losses
        if existingPlayerStats["pairWins"] > updatedStats["pairWins"]:
            raise Exception(f"pairWins for {player} lower than before")
        if existingPlayerStats["pairLosses"] > updatedStats["pairLosses"]:
            raise Exception(f"pairLosses for {player} lower than before")

        # check pairs home/away/cup wins
        if existingPlayerStats["pairHomeWins"] > updatedStats["pairHomeWins"]:
            raise Exception(f"pairHomeWins for {player} lower than before")
        if existingPlayerStats["pairAwayWins"] > updatedStats["pairAwayWins"]:
            raise Exception(f"pairAwayWins for {player} lower than before")
        if existingPlayerStats["pairCupWins"] > updatedStats["pairCupWins"]:
            raise Exception(f"pairCupWins for {player} lower than before")

        # check pairs home/away/cup losses
        if existingPlayerStats["pairHomeLosses"] > updatedStats["pairHomeLosses"]:
            raise Exception(f"pairHomeLosses for {player} lower than before")
        if existingPlayerStats["pairAwayLosses"] > updatedStats["pairAwayLosses"]:
            raise Exception(f"pairAwayLosses for {player} lower than before")
        if existingPlayerStats["pairCupLosses"] > updatedStats["pairCupLosses"]:
            raise Exception(f"pairCupLosses for {player} lower than before")

        # Check aggregates
        if existingPlayerStats["totalAgg"] > updatedStats["totalAgg"]:
            raise Exception(f"totalAgg for {player} lower than before")
        if existingPlayerStats["totalAggAgainst"] > updatedStats["totalAggAgainst"]:
            raise Exception(f"totalAggAgainst for {player} lower than before")

        # Check available aggregates
        if existingPlayerStats["availableAgg"] > updatedStats["availableAgg"]:
            raise Exception(f"availableAgg for {player} lower than before")
        if existingPlayerStats["availableHomeAgg"] > updatedStats["availableHomeAgg"]:
            raise Exception(f"availableHomeAgg for {player} lower than before")
        if existingPlayerStats["availableAwayAgg"] > updatedStats["availableAwayAgg"]:
            raise Exception(f"availableAwayAgg for {player} lower than before")

        # Check home/away aggregates
        if existingPlayerStats["totalHomeAgg"] > updatedStats["totalHomeAgg"]:
            raise Exception(f"totalHomeAgg for {player} lower than before")
        if existingPlayerStats["totalAwayAgg"] > updatedStats["totalAwayAgg"]:
            raise Exception(f"totalAwayAgg for {player} lower than before")
        if (
            existingPlayerStats["totalHomeAggAgainst"]
            > updatedStats["totalHomeAggAgainst"]
        ):
            raise Exception(f"totalHomeAggAgainst for {player} lower than before")
        if (
            existingPlayerStats["totalAwayAggAgainst"]
            > updatedStats["totalAwayAggAgainst"]
        ):
            raise Exception(f"totalAwayAggAgainst for {player} lower than before")

        # Check pairs aggregates
        if existingPlayerStats["totalPairsAgg"] > updatedStats["totalPairsAgg"]:
            raise Exception(f"totalPairsAgg for {player} lower than before")
        if (
            existingPlayerStats["totalPairsAggAgainst"]
            > updatedStats["totalPairsAggAgainst"]
        ):
            raise Exception(f"totalPairsAggAgainst for {player} lower than before")
        if existingPlayerStats["availablePairsAgg"] > updatedStats["availablePairsAgg"]:
            raise Exception(f"availablePairsAgg for {player} lower than before")

        # Check pairs home aggregates
        if existingPlayerStats["totalPairsHomeAgg"] > updatedStats["totalPairsHomeAgg"]:
            raise Exception(f"totalPairsHomeAgg for {player} lower than before")
        if (
            existingPlayerStats["totalPairsHomeAggAgainst"]
            > updatedStats["totalPairsHomeAggAgainst"]
        ):
            raise Exception(f"totalPairsHomeAggAgainst for {player} lower than before")
        if (
            existingPlayerStats["availablePairsHomeAgg"]
            > updatedStats["availablePairsHomeAgg"]
        ):
            raise Exception(f"availablePairsHomeAgg for {player} lower than before")

        # Check pairs away aggregates
        if existingPlayerStats["totalPairsAwayAgg"] > updatedStats["totalPairsAwayAgg"]:
            raise Exception(f"totalPairsAwayAgg for {player} lower than before")
        if (
            existingPlayerStats["totalPairsAwayAggAgainst"]
            > updatedStats["totalPairsAwayAggAgainst"]
        ):
            raise Exception(f"totalPairsAwayAggAgainst for {player} lower than before")
        if (
            existingPlayerStats["availablePairsAwayAgg"]
            > updatedStats["availablePairsAwayAgg"]
        ):
            raise Exception(f"availablePairsAwayAgg for {player} lower than before")

        # Check results
        if len(existingPlayerStats["results"]) > len(updatedStats["results"]):
            raise Exception(f"fewer results for {player} than before")

        # Check team stats
        if checkTeamStatsBool:
            for team in clubDetails.teamDays:
                teamName = statsHelper.returnTeamNameToStoreData(team).lower()
                playerTeamStats = updatedStats[teamName]

                if playerTeamStats["games"] > existingPlayerStats[teamName]["games"]:
                    raise Exception(f"{teamName} games for {player} lower than before")
                if playerTeamStats["wins"] > existingPlayerStats[teamName]["wins"]:
                    raise Exception(f"{teamName} wins for {player} lower than before")
                if (
                    playerTeamStats["aggDiff"]
                    > existingPlayerStats[teamName]["aggDiff"]
                ):
                    raise Exception(
                        f"{teamName} aggDiff for {player} lower than before"
                    )


def checkPlayerTeamStats(updatedStats, clubDetails):
    for team in clubDetails.teamDays:
        teamName = statsHelper.returnTeamNameToStoreData(team)
        playerTeamStats = updatedStats[teamName.lower()]

        if playerTeamStats["games"] < 0 or playerTeamStats["games"] > 150:
            raise Exception(f"games for {team} incorrect?")
        if playerTeamStats["wins"] < 0 or playerTeamStats["wins"] > 140:
            raise Exception(f"wins for {team} incorrect?")
        if playerTeamStats["aggDiff"] < -1000 or playerTeamStats["aggDiff"] > 1000:
            raise Exception(f"aggDiff for {team} incorrect?")


def checksTeamStats(allTeamResults, filePath, clubDetails):
    print("Running sanity checks on team stats")
    print("------------")

    # Check values have increased or stayed the same compared to the previous stats in the file
    checkTeamStatsValuesIncreased(allTeamResults, filePath, clubDetails)

    # Check the A and B teams are not mixed up
    checkTeamNotProcessedTwice(allTeamResults)

    for team in allTeamResults:
        dayForTeam = team["day"]

        if team["agg"] < 0 or team["agg"] > 5000:
            raise Exception(f"agg for {dayForTeam} incorrect?")
        if team["opponentAgg"] < 0 or team["opponentAgg"] > 5000:
            raise Exception(f"opponentAgg for {dayForTeam} incorrect?")
        if team["totalGamesPlayed"] < 0 or team["totalGamesPlayed"] > 30:
            raise Exception(f"totalGamesPlayed for {dayForTeam} incorrect?")
        if team["wins"] < 0 or team["wins"] > 30:
            raise Exception(f"wins for {dayForTeam} incorrect?")
        if team["losses"] < 0 or team["losses"] > 30:
            raise Exception(f"losses for {dayForTeam} incorrect?")
        if team["draws"] < 0 or team["draws"] > 20:
            raise Exception(f"draws for {dayForTeam} incorrect?")
        if team["awayWins"] < 0 or team["awayWins"] > team["wins"]:
            raise Exception(f"awayWins for {dayForTeam} incorrect?")
        if team["homeWins"] < 0 or team["homeWins"] > team["wins"]:
            raise Exception(f"homeWins for {dayForTeam} incorrect?")
        if team["awayLosses"] < 0 or team["awayLosses"] > team["losses"]:
            raise Exception(f"awayLosses for {dayForTeam} incorrect?")
        if team["homeLosses"] < 0 or team["homeLosses"] > team["losses"]:
            raise Exception(f"homeLosses for {dayForTeam} incorrect?")
        if team["cupLosses"] < 0 or team["cupLosses"] > team["losses"]:
            raise Exception(f"cupLosses for {dayForTeam} incorrect?")
        if team["cupWins"] < 0 or team["cupWins"] > team["wins"]:
            raise Exception(f"cupWins for {dayForTeam} incorrect?")
        if team["homeDraws"] < 0 or team["homeDraws"] > team["draws"]:
            raise Exception(f"homeDraws for {dayForTeam} incorrect?")
        if team["awayDraws"] < 0 or team["awayDraws"] > team["draws"]:
            raise Exception(f"awayDraws for {dayForTeam} incorrect?")
        if len(team["results"]) != team["totalGamesPlayed"]:
            raise Exception(f"results for {dayForTeam} incorrect?")

        checkForDuplicateResults(team["results"], dayForTeam)


def checkTeamStatsValuesIncreased(updatedStats, filePath, clubDetails):
    if not os.path.exists(filePath):
        print("No previous stats to compare against")
        return

    with open(filePath, "r") as jsonFile:
        file = json.load(jsonFile)
        existingTeamStats = file["teamResults"]

        if len(updatedStats) != len(clubDetails.teamDays):
            raise Exception("Team missing from team stats")

        for team in existingTeamStats:
            updatedTeam = next(
                (t for t in updatedStats if t["day"] == team["day"]), None
            )
            if not updatedTeam:
                raise Exception(f"No matching team found for day {team['day']}")

            # Wins
            if team["awayWins"] > updatedTeam["awayWins"]:
                raise Exception(f"awayWins for {team["day"]} lower than before")
            if team["homeWins"] > updatedTeam["homeWins"]:
                raise Exception(f"homeWins for {team["day"]} lower than before")
            if team["cupWins"] > updatedTeam["cupWins"]:
                raise Exception(f"cupWins for {team["day"]} lower than before")
            if team["wins"] > updatedTeam["wins"]:
                raise Exception(f"wins for {team["day"]} lower than before")

            # Losses
            if team["awayLosses"] > updatedTeam["awayLosses"]:
                raise Exception(f"awayLosses for {team["day"]} lower than before")
            if team["homeLosses"] > updatedTeam["homeLosses"]:
                raise Exception(f"homeLosses for {team["day"]} lower than before")
            if team["cupLosses"] > updatedTeam["cupLosses"]:
                raise Exception(f"cupLosses for {team["day"]} lower than before")
            if team["losses"] > updatedTeam["losses"]:
                raise Exception(f"losses for {team["day"]} lower than before")

            # Draws
            if team["homeDraws"] > updatedTeam["homeDraws"]:
                raise Exception(f"homeDraws for {team["day"]} lower than before")
            if team["awayDraws"] > updatedTeam["awayDraws"]:
                raise Exception(f"awayDraws for {team["day"]} lower than before")
            if team["draws"] > updatedTeam["draws"]:
                raise Exception(f"draws for {team["day"]} lower than before")

            # Total games
            if team["totalGamesPlayed"] > updatedTeam["totalGamesPlayed"]:
                raise Exception(f"totalGamesPlayed for {team["day"]} lower than before")

            # Aggregates
            if team["agg"] > updatedTeam["agg"]:
                raise Exception(f"agg for {team["day"]} lower than before")
            if team["opponentAgg"] > updatedTeam["opponentAgg"]:
                raise Exception(f"opponentAgg for {team["day"]} lower than before")

            # Results
            if len(team["results"]) > len(updatedTeam["results"]):
                raise Exception(f"fewer results for {team["day"]} than before")


def checkTeamNotProcessedTwice(allTeamResults):
    seenTeamStats = set()
    for team in allTeamResults:
        if team.get("totalGamesPlayed") < 2:
            # Skip checks for teams with less than 2 games to avoid false positives
            continue
        statsToCheck = (
            team.get("agg"),
            team.get("opponentAgg"),
            team.get("wins"),
            team.get("losses"),
            team.get("draws"),
        )
        if statsToCheck in seenTeamStats:
            raise Exception(f"Has the team been processed twice? {team.get("day")}")
        seenTeamStats.add(statsToCheck)
    print("No duplicate agg values found")


def checkForDuplicateResults(results, name):
    potentialDuplicatesFound = len(results) != len(set(results))
    if potentialDuplicatesFound:
        print("WARNING: check for potential duplicate results for: " + name)
        print(results)
        print("------------")


def checkTeamName(team, teamNameUsedForLeague, expectedTeamDisplayName):
    if team.lower().endswith(" (a)") and teamNameUsedForLeague.lower().endswith(" b"):
        raise Exception("B team found for A team stats")
    if team.lower().endswith(" (b)") and teamNameUsedForLeague.lower().endswith(" a"):
        raise Exception("A team found for B team stats")
    if expectedTeamDisplayName.lower() not in teamNameUsedForLeague.lower():
        raise Exception("Incorrect team name found")


def validatePlayerNotProcessedTwice(rowNumber, homePlayerRow, awayPlayerRow):
    if rowNumber in homePlayerRow and rowNumber in awayPlayerRow:
        raise Exception(
            f"Row appears in home row and away row. Check the opponent name. Row: {rowNumber}"
        )
