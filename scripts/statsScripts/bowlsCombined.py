import teamDetails
import sanityChecks
import utils
import statsHelper
import playerStatsHelper

playerStats = playerStatsHelper.returnListOfPlayerStats(teamDetails.allDays, False, teamDetails.players)
leaguesProcessed = []

print('UPDATING ALL PLAYER STATS')

for league in teamDetails.allDays:
    # To prevent duplication
    league = statsHelper.removeSuffixFromTeamName(league)
    if league in leaguesProcessed:
        continue
    leaguesProcessed.append(league)

    # Goes through each sheet in turn
    with open('bowlsnetReports/' + utils.year + '/' + league + '.txt', 'r') as file:
        print('Updating Stats: ' + league)
        allRowsInFile = file.readlines()

        # Find the number of rows in the file
        endRow = utils.findEndRowOfFile(league, allRowsInFile)

        # Find the cup games in the stats
        cupGameRows = statsHelper.findCupGameRows(allRowsInFile)

        # Find rows in spreadsheet for players' games
        homePlayerRow, awayPlayerRow = playerStatsHelper.returnHomeAndAwayPlayerRowsForAllTeams(allRowsInFile)

        # Find each players' results
        for rowNumber in range(0, endRow + 1):
            # Create list as players may be playing against one another
            playerRows = []
            playerToProcess = False
            
            if rowNumber in homePlayerRow:
                playerToProcess = True
                playerRows.append('home')

            if rowNumber in awayPlayerRow:
                playerToProcess = True
                playerRows.append('away')
            
            if playerToProcess is False:
                continue

            for homeOrAway in playerRows:
                # reset variable values
                correctPlayerFound = False
                homeGame = None
                awayGame = None
                cupGameBool = False
                cupHome = False
                cupAway = False

                # Find columns
                if rowNumber in cupGameRows:
                    cupGameBool = True
                    if homeOrAway == 'home':
                        cupHome = True
                    if homeOrAway == 'away':
                        cupAway = True

                if homeOrAway == 'home':
                    if not cupGameBool:
                        homeGame = True

                if homeOrAway == 'away':
                    if not cupGameBool:
                        awayGame = True

                # Checks player plays for expected team
                correctPlayerFound = playerStatsHelper.checkCorrectTeamForPlayer(allRowsInFile, rowNumber, homeGame, awayGame, cupHome, cupAway)

                # Find result details
                if correctPlayerFound:
                   playerStatsHelper.calculatePlayerStats(playerStats, allRowsInFile, rowNumber, league, homeGame, awayGame, cupHome, cupAway, cupGameBool, False)
    file.close()

# Create JSON file
dataToExport = {
    'playerResults': playerStats,
    'lastUpdated': utils.returnTodayDate(),
    'statsYear': utils.year
}

filename = 'src/data/allPlayerStats' + utils.year + '.json'
previousFileSize = utils.returnFileSize(filename)
utils.saveFile(filename, dataToExport)

# Sanity checks on the data
sanityChecks.checkPlayerStats(playerStats, teamDetails.players)
newFileSize = sanityChecks.getFileSize(filename)
sanityChecks.checkFileSizeHasGrown(previousFileSize, newFileSize)
