from pathlib import Path
import json
import utils

path = Path.cwd() / "src" / "data" / f"stanningleyStats{utils.year}.json"
data = open(path)
jsonStats = json.load(data)

playerStats = jsonStats["playerResults"]

totalSinglesGames = 0
totalPairsGames = 0
singleFigureWinsInSingles = 0
singleFigureWinsInPairs = 0
nillingsInSingles = 0
nillingsInPairs = 0

for player in playerStats.keys():

    results = playerStats[player]["results"]
    for result in results:
        opponentPart = result.split(" - ")[1]
        opponentScore = int(opponentPart.split(" ")[0])

        if "&" in result:
            totalPairsGames += 1
            if opponentScore < 10 and opponentScore >= 0:
                singleFigureWinsInPairs += 1
                if opponentScore == 0:
                    nillingsInPairs += 1
        else:
            totalSinglesGames += 1
            if opponentScore < 10 and opponentScore >= 0:
                singleFigureWinsInSingles += 1
                if opponentScore == 0:
                    nillingsInSingles += 1

# Deduplicate pairs games
totalPairsGames = int(totalPairsGames / 2)
singleFigureWinsInPairs = int(singleFigureWinsInPairs / 2)
nillingsInPairs = int(nillingsInPairs / 2)

totalGames = totalPairsGames + totalSinglesGames
singleFigureWinsTotal = singleFigureWinsInSingles + singleFigureWinsInPairs
totalNillings = nillingsInSingles + nillingsInPairs

print(utils.year + " end of season stats")
print("========================")
print("total games played: " + str(totalGames))
print("Total single figure winners: " + str(singleFigureWinsTotal))
print("Total nillings: " + str(totalNillings))
