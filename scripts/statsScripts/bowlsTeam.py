import os
from datetime import date
import re
import teamDetails
import teamStatsHelper
import sanityChecks
import utils
import statsHelper
import playerStatsHelper

playerStats = playerStatsHelper.returnListOfPlayerStats(teamDetails.teamDays, True, teamDetails.players)
teamsProcessed = []
allTeamResults = []

print('UPDATING STATS:', teamDetails.teamNames[0].upper())

for team in teamDetails.teamDays:
    print('Updating Stats: ' + team)
    
    league = statsHelper.removeSuffixFromTeamName(team)
     # this is to store first team data under the old name, to help with backward compatibility
    teamNameToStoreData = statsHelper.returnTeamNameToStoreData(team)

    if team in teamsProcessed:
        raise Exception('team is being processed twice: ' + team)
    teamsProcessed.append(team)
    
    with open('bowlsnetReports/' + utils.year + '/' + league + '.txt', 'r') as file:
        allRowsInFile = file.readlines()

        # Find the number of rows in the file
        endRow = utils.findEndRowOfFile(league, allRowsInFile)
        
        # Find team name used by team in this league
        teamNameUsedForLeague, teamNameToUse = statsHelper.returnTeamNameForLeague(allRowsInFile, team)
    
        sanityChecks.checkTeamName(team, teamNameUsedForLeague, teamDetails.displayTeamName)        

        # Find the cup games in the stats
        cupGameRows = statsHelper.findCupGameRows(allRowsInFile)

        #### TEAM STATS ####
        # Find team's home and away games
        homeRows, awayRows = teamStatsHelper.findHomeAndAwayTeamGameRows(allRowsInFile, teamNameUsedForLeague)

        # Find team results and scores
        awayWins = 0
        awayLosses = 0
        homeWins = 0
        homeLosses = 0
        homeDraws = 0
        awayDraws = 0
        cupWins = 0
        cupLosses = 0
        wins = 0
        draws = 0
        losses = 0
        teamAgg = 0
        opponentAgg = 0
        results = []
        totalGamesPlayed = 0

        for rowNumber, line in enumerate(allRowsInFile, start=0):
            row = allRowsInFile[rowNumber]

            # Check if cup game
            cupRow = allRowsInFile[rowNumber - 1]
            cupGameBool = teamStatsHelper.isCupGame(cupRow)
            
            # Find the number of rows down for the team scores                       
            totalNumberOfRowsAdjustmentInt = teamStatsHelper.returnTeamScoreRowDownNumber(cupGameBool, allRowsInFile, rowNumber, league)
            
            # Prevents attempting to process a line that doesn't exist
            if rowNumber + totalNumberOfRowsAdjustmentInt >= endRow:
                break
            
            # Save the scores
            text = allRowsInFile[rowNumber + totalNumberOfRowsAdjustmentInt]
            if text and type(text) is str:
                matchScore = re.findall(r'\d+', text)
            if len(matchScore) == 2:
                homeScore = int(matchScore[0].strip())
                awayScore = int(matchScore[1].strip())
                
            # Save the aggregates
            if cupGameBool:
                homeAgg = homeScore
                awayAgg = awayScore
            else:
                baseRowDownAdjustment = teamStatsHelper.returnBaseRowDownNumber(False, True)
                adjustmentForLeagueInt = teamStatsHelper.returnAggRowDownNumber(league)
                adjustFor6PlayerTeamsInt = teamStatsHelper.returnAdjustedRowNumberFor6PlayerTeams(league, 0)
                text = allRowsInFile[rowNumber + baseRowDownAdjustment + adjustmentForLeagueInt - adjustFor6PlayerTeamsInt]
                if text and type(text) is str:
                    matchAgg = re.findall(r'\d+', text)
                if len(matchAgg) == 2:
                    homeAgg = int(matchAgg[0].strip())
                    awayAgg = int(matchAgg[1].strip())

            # Home games
            rowText = allRowsInFile[rowNumber]
            if rowNumber in homeRows:
                opponent = rowText.split(teamNameUsedForLeague)[1]
                opponent = opponent.replace('&amp;', '&').strip()
                result = teamNameToUse + ' ' + \
                    str(homeScore) + ' - ' + str(awayScore) + \
                    ' ' + opponent
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
                opponent = opponent.replace('&amp;', '&').strip()
                result = opponent + ' ' + \
                    str(homeScore) + ' - ' + str(awayScore) + \
                    ' ' + teamNameToUse
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
            'day': teamNameToStoreData,
            'awayWins': awayWins,
            'homeWins': homeWins,
            'wins': awayWins + homeWins + cupWins,
            'awayLosses': awayLosses,
            'homeLosses': homeLosses,
            'homeDraws': homeDraws,
            'awayDraws': awayDraws,
            'draws': homeDraws + awayDraws,
            'cupWins': cupWins,
            'cupLosses': cupLosses,
            'losses': homeLosses + awayLosses + cupLosses,
            'totalGamesPlayed': awayWins + homeWins + cupWins + awayLosses + homeLosses + cupLosses + awayDraws + homeDraws,
            'agg': teamAgg,
            'opponentAgg': opponentAgg,
            'results': results
        }
        allTeamResults.append(teamResults)
        
        #### PLAYER STATS ####
        
        # Find rows in spreadsheet for players' games
        homePlayerRow, awayPlayerRow, combinedRows = playerStatsHelper.returnHomeAndAwayPlayerRowsForTeam(allRowsInFile, teamNameUsedForLeague, league)
        
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
                if rowNumber in homePlayerRow:
                    cupHome = True
                if rowNumber in awayPlayerRow:
                    cupAway = True

            if rowNumber in homePlayerRow:
                if not cupGameBool:
                    homeGame = True

            if rowNumber in awayPlayerRow:
                if not cupGameBool:
                    awayGame = True

            # Find result details
            playerStatsHelper.calculatePlayerStats(playerStats, allRowsInFile, rowNumber, team, homeGame, awayGame, cupHome, cupAway, cupGameBool, True)

            sanityChecks.validatePlayerNotProcessedTwice(rowNumber, homePlayerRow, awayPlayerRow)
    file.close()

# Create JSON file
dataToExport = {
    'playerResults': playerStats,
    'teamResults': allTeamResults,
    'lastUpdated': date.today().strftime("%d/%m/%Y"),
    'statsYear': utils.year,
}

filename = 'src/data/bowlsStats' + utils.year + '.json'
previousFileSize = 0
if os.path.exists(filename):
    previousFileSize = sanityChecks.getFileSize(filename)
    os.remove(filename)    

utils.saveFile(filename, dataToExport)

# Sanity checks on the data
sanityChecks.checksTeamStats(allTeamResults)
sanityChecks.checkPlayerStats(playerStats, teamDetails.players)
newFileSize = sanityChecks.getFileSize(filename)
sanityChecks.checkFileSizeHasGrown(previousFileSize, newFileSize)
