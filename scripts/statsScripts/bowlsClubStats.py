import re
import argparse

from teamStatsHelper import (
    findHomeAndAwayTeamGameRows,
    isCupGame,
    returnTeamScoreRowDownNumber,
    returnBaseRowDownNumber,
    returnAggRowDownNumber,
    returnAdjustedRowNumberFor6PlayerTeams,
)
from sanityChecks import (
    checksTeamStats,
    checkPlayerStats,
    checkTeamName,
    validatePlayerNotProcessedTwice,
)
from fileUtils import findEndRowOfFile, returnTodayDate, saveFile, year
from statsHelper import (
    findCupGameRows,
    removeSuffixFromTeamName,
    returnTeamNameToStoreData,
    returnTeamNameForLeague,
)
from playerStatsHelper import (
    returnListOfPlayerStats,
    returnHomeAndAwayPlayerRowsForTeam,
    calculatePlayerStats,
)

# Set up argument parser
parser = argparse.ArgumentParser()
parser.add_argument(
    "--club",
    choices=["littlemoor", "stanningley"],
    required=True,
    help="Specify the club details to use.",
)
args = parser.parse_args()

# Import the appropriate club details module based on the argument
if args.club == "littlemoor":
    import littlemoorDetails as clubDetails
elif args.club == "stanningley":
    import clubDetails

playerStats = returnListOfPlayerStats(clubDetails.teamDays, True, clubDetails.players)
teamsProcessed = []
allTeamResults = []

print("UPDATING STATS:", clubDetails.teamNames[0].upper())

for team in clubDetails.teamDays:
    print("Updating Stats: " + team)

    league = removeSuffixFromTeamName(team)
    # this is to store first team data under the old name, to help with backward compatibility
    teamNameToStoreData = returnTeamNameToStoreData(team)

    if team in teamsProcessed:
        raise Exception("team is being processed twice: " + team)
    teamsProcessed.append(team)

    with open(f"bowlsnetReports/{year}/{league}.txt", "r") as file:
        allRowsInFile = file.readlines()

        # Find the number of rows in the file
        endRow = findEndRowOfFile(league, allRowsInFile)

        # Find team name used by team in this league
        teamNameUsedForLeague, teamNameToUse = returnTeamNameForLeague(
            allRowsInFile, team, clubDetails.displayTeamName, clubDetails.teamNames
        )

        checkTeamName(team, teamNameUsedForLeague, clubDetails.displayTeamName)

        # Find the cup games in the stats
        cupGameRows = findCupGameRows(allRowsInFile, endRow)

        #### TEAM STATS ####
        # Find team's home and away games
        homeRows, awayRows = findHomeAndAwayTeamGameRows(
            allRowsInFile, teamNameUsedForLeague, clubDetails.displayTeamName
        )

        # Find team results and scores
        awayWins = 0
        awayLosses = 0
        homeWins = 0
        homeLosses = 0
        homeDraws = 0
        awayDraws = 0
        cupWins = 0
        cupLosses = 0
        teamAgg = 0
        opponentAgg = 0
        results = []

        for rowNumber, line in enumerate(allRowsInFile, start=0):
            row = allRowsInFile[rowNumber]

            # Check if cup game
            cupRow = allRowsInFile[rowNumber - 1]
            cupGameBool = isCupGame(cupRow)

            # Find the number of rows down for the team scores
            totalNumberOfRowsAdjustmentInt = returnTeamScoreRowDownNumber(
                cupGameBool, allRowsInFile, rowNumber, league
            )

            # Prevents attempting to process a line that doesn't exist
            if rowNumber + totalNumberOfRowsAdjustmentInt >= endRow:
                break

            # Save the scores
            text = allRowsInFile[rowNumber + totalNumberOfRowsAdjustmentInt]
            if text and type(text) is str:
                matchScore = re.findall(r"\d+", text)
            if len(matchScore) == 2:
                homeScore = int(matchScore[0].strip())
                awayScore = int(matchScore[1].strip())

            # Save the aggregates
            if cupGameBool:
                homeAgg = homeScore
                awayAgg = awayScore
            else:
                baseRowDownAdjustment = returnBaseRowDownNumber(False, True)
                adjustmentForLeagueInt = returnAggRowDownNumber(
                    team,
                    clubDetails.teamsWithWithDifferentNumberOfPlayersToLeagueNorm,
                )
                adjustFor6PlayerTeamsInt = returnAdjustedRowNumberFor6PlayerTeams(
                    league, 0
                )
                adjustment = (
                    baseRowDownAdjustment
                    + adjustmentForLeagueInt
                    - adjustFor6PlayerTeamsInt
                )
                if rowNumber + adjustment >= endRow:
                    continue
                text = allRowsInFile[rowNumber + adjustment]
                if text and type(text) is str:
                    matchAgg = re.findall(r"\d+", text)
                if len(matchAgg) == 2:
                    homeAgg = int(matchAgg[0].strip())
                    awayAgg = int(matchAgg[1].strip())

            # Home games
            rowText = allRowsInFile[rowNumber]
            if rowNumber in homeRows:
                opponent = rowText.split(teamNameUsedForLeague)[1]
                opponent = opponent.replace("&amp;", "&").strip()
                result = f"{teamNameToUse} {homeScore} - {awayScore} {opponent}"
                results.append(result)
                if homeScore > awayScore:
                    if cupGameBool:
                        cupWins = cupWins + 1
                    else:
                        homeWins = homeWins + 1
                elif homeScore < awayScore:
                    if cupGameBool:
                        cupLosses = cupLosses + 1
                    else:
                        homeLosses = homeLosses + 1
                elif awayScore == homeScore:
                    homeDraws = homeDraws + 1
                teamAgg = teamAgg + homeAgg
                opponentAgg = opponentAgg + awayAgg

            # Away games
            if rowNumber in awayRows:
                opponent = rowText.split(teamNameUsedForLeague)[0]
                opponent = opponent.replace("&amp;", "&").strip()
                result = f"{opponent} {homeScore} - {awayScore} {teamNameToUse}"
                results.append(result)
                if awayScore > homeScore:
                    if cupGameBool:
                        cupWins = cupWins + 1
                    else:
                        awayWins = awayWins + 1
                elif awayScore < homeScore:
                    if cupGameBool:
                        cupLosses = cupLosses + 1
                    else:
                        awayLosses = awayLosses + 1
                elif awayScore == homeScore:
                    awayDraws = awayDraws + 1
                opponentAgg = opponentAgg + homeAgg
                teamAgg = teamAgg + awayAgg

        # Store team result data
        teamResults = {
            "day": teamNameToStoreData,
            "awayWins": awayWins,
            "homeWins": homeWins,
            "wins": awayWins + homeWins + cupWins,
            "awayLosses": awayLosses,
            "homeLosses": homeLosses,
            "homeDraws": homeDraws,
            "awayDraws": awayDraws,
            "draws": homeDraws + awayDraws,
            "cupWins": cupWins,
            "cupLosses": cupLosses,
            "losses": homeLosses + awayLosses + cupLosses,
            "totalGamesPlayed": awayWins
            + homeWins
            + cupWins
            + awayLosses
            + homeLosses
            + cupLosses
            + awayDraws
            + homeDraws,
            "agg": teamAgg,
            "opponentAgg": opponentAgg,
            "results": results,
        }
        allTeamResults.append(teamResults)

        #### PLAYER STATS ####

        # Find rows in spreadsheet for players' games
        homePlayerRows, awayPlayerRows, combinedRows = (
            returnHomeAndAwayPlayerRowsForTeam(
                allRowsInFile,
                teamNameUsedForLeague,
                league,
                clubDetails.players,
                clubDetails.duplicatePlayerNames,
                clubDetails.traitorPlayers,
            )
        )

        # Find each players' results
        for rowNumber in sorted(combinedRows):
            # reset variable values
            homeGame = None
            awayGame = None
            cupGameBool = False
            cupHome = False
            cupAway = False

            # Find columns
            if rowNumber in cupGameRows:
                cupGameBool = True
                if rowNumber in homePlayerRows:
                    cupHome = True
                if rowNumber in awayPlayerRows:
                    cupAway = True

            if rowNumber in homePlayerRows:
                if not cupGameBool:
                    homeGame = True

            if rowNumber in awayPlayerRows:
                if not cupGameBool:
                    awayGame = True

            # Find result details
            calculatePlayerStats(
                playerStats,
                allRowsInFile,
                rowNumber,
                team,
                homeGame,
                awayGame,
                cupHome,
                cupAway,
                cupGameBool,
                True,
            )

            validatePlayerNotProcessedTwice(rowNumber, homePlayerRows, awayPlayerRows)

    file.close()

# Create JSON file
dataToExport = {
    "playerResults": playerStats,
    "teamResults": allTeamResults,
    "lastUpdated": returnTodayDate(),
    "statsYear": year,
}

filename = f"src/data/{clubDetails.displayTeamName.lower()}Stats{year}.json"

# Sanity checks on the data
checksTeamStats(allTeamResults, filename, clubDetails.teamDays)
checkPlayerStats(playerStats, filename, True, clubDetails.players, clubDetails.teamDays)

# Save the file
saveFile(filename, dataToExport)
