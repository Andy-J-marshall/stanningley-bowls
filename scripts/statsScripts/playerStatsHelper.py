import re
import teamDetails
import statsHelper

def returnListOfPlayerStats(days, includeTeamData, players):
    players.sort()
    playerStats = {}
    for player in players:
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
            'results': [],
        }

        if includeTeamData == True:
            for team in days:
                # this is to store first team data under the old name, to help with backward compatibility
                teamNameToStoreData = statsHelper.returnTeamNameToStoreData(team).lower()
                playerObj[teamNameToStoreData] = {
                    'games': 0,
                    'wins': 0,
                    'aggDiff': 0,
                }
        playerStats[player] = playerObj
    return playerStats

def calculatePlayerStats(playerStats, allRowsInFile, rowNumber, team, homeGame, awayGame, cupHome, cupAway, cupGameBool, includeTeamStatsBool):    
    text = allRowsInFile[rowNumber]
    findPossiblePlayerNames = re.findall(r"([A-za-z'\-()]+(?: [A-Za-z'\-()]+)+)", text)
    if homeGame or cupHome:
        opponentsName = findPossiblePlayerNames[1]
    
    if awayGame or cupAway:
        opponentsName = findPossiblePlayerNames[0]
        
    if 'walkover' not in opponentsName.lower() and 'no player' not in opponentsName.lower():
        if homeGame or cupHome:
            playerName = findPossiblePlayerNames[0]
            
            matchAggregate = re.findall(r'\d+', text)
            if matchAggregate:
                aggregate = int(matchAggregate[0].strip())
                opponentAggregate = int(matchAggregate[1].strip())

        if awayGame or cupAway:
            playerName = findPossiblePlayerNames[1]
            
            matchAggregate = re.findall(r'\d+', text)
            if matchAggregate:
                aggregate = int(matchAggregate[1].strip())
                opponentAggregate = int(matchAggregate[0].strip())

        # Checks whether it's a pairs game
        pairsGame = statsHelper.isPairsGame(allRowsInFile, rowNumber, text)
        if pairsGame:
            pairsDetails = statsHelper.handlePairsGame(text, allRowsInFile, rowNumber, homeGame, awayGame, cupHome, cupAway)
            if pairsDetails['aggregate'] > 0:
                aggregate = pairsDetails['aggregate']
            if pairsDetails['opponentAggregate'] > 0:
                opponentAggregate = pairsDetails['opponentAggregate']
            if pairsDetails['pairsPartner'] != '':
                pairsPartner = pairsDetails['pairsPartner']
            if pairsDetails['secondOpponent'] != '':
                secondOpponent = pairsDetails['secondOpponent']
            pairsPartner = teamDetails.deduplicateNames(pairsPartner)
            secondOpponent = teamDetails.deduplicateNames(secondOpponent)

        # Format player names
        playerName = teamDetails.deduplicateNames(playerName)
        opponentsName = teamDetails.deduplicateNames(opponentsName)
            
        # Store player stats
        playerNameForResult = playerName
        if pairsGame:
            playerNameForResult = playerName + ' & ' + pairsPartner
            opponentsName = opponentsName + ' & ' + secondOpponent
            playerStats[playerName]['availablePairsAgg'] += statsHelper.returnTotalAggAvailablePerGame(team)
            playerStats[playerName]['totalPairsAgg'] += aggregate
            playerStats[playerName]['totalPairsAggAgainst'] += opponentAggregate

        playerStats[playerName]['totalGamesPlayed'] += 1

        playersResult = playerNameForResult + ' ' + \
            str(aggregate) + ' - ' + \
            str(opponentAggregate) + ' ' + opponentsName
        playerStats[playerName]['results'].append(
            playersResult)

        # Wins
        if aggregate > opponentAggregate:
            if pairsGame:
                playerStats[playerName]['pairWins'] += 1
            if homeGame:
                playerStats[playerName]['homeWins'] += 1
                if pairsGame:
                    playerStats[playerName]['pairHomeWins'] += 1
            if awayGame:
                playerStats[playerName]['awayWins'] += 1
                if pairsGame:
                    playerStats[playerName]['pairAwayWins'] += 1
            if cupGameBool:
                playerStats[playerName]['cupWins'] += 1
                if pairsGame:
                    playerStats[playerName]['pairCupWins'] += 1
        # Losses
        else:
            if pairsGame:
                playerStats[playerName]['pairLosses'] += 1
            if homeGame:
                playerStats[playerName]['homeLosses'] += 1
                if pairsGame:
                    playerStats[playerName]['pairHomeLosses'] += 1
            if awayGame:
                playerStats[playerName]['awayLosses'] += 1
                if pairsGame:
                    playerStats[playerName]['pairAwayLosses'] += 1
            if cupGameBool:
                playerStats[playerName]['cupLosses'] += 1
                if pairsGame:
                    playerStats[playerName]['pairCupLosses'] += 1

        # Averages
        playerStats[playerName]['availableAgg'] += statsHelper.returnTotalAggAvailablePerGame(team)
        playerStats[playerName]['totalAgg'] += aggregate
        playerStats[playerName]['totalAggAgainst'] += opponentAggregate
        if homeGame:
            playerStats[playerName]['availableHomeAgg'] += statsHelper.returnTotalAggAvailablePerGame(team)
            playerStats[playerName]['totalHomeAgg'] += aggregate
            playerStats[playerName]['totalHomeAggAgainst'] += opponentAggregate
            if pairsGame:
                playerStats[playerName]['availablePairsHomeAgg'] += statsHelper.returnTotalAggAvailablePerGame(team)
                playerStats[playerName]['totalPairsHomeAgg'] += aggregate
                playerStats[playerName]['totalPairsHomeAggAgainst'] += opponentAggregate
        if awayGame:
            playerStats[playerName]['availableAwayAgg'] += statsHelper.returnTotalAggAvailablePerGame(team)
            playerStats[playerName]['totalAwayAgg'] += aggregate
            playerStats[playerName]['totalAwayAggAgainst'] += opponentAggregate
            if pairsGame:
                playerStats[playerName]['availablePairsAwayAgg'] += statsHelper.returnTotalAggAvailablePerGame(team)
                playerStats[playerName]['totalPairsAwayAgg'] += aggregate
                playerStats[playerName]['totalPairsAwayAggAgainst'] += opponentAggregate
        playerStats[playerName]['dayPlayed'].append(team)
        
        if includeTeamStatsBool:
            teamNameToStoreData = statsHelper.returnTeamNameToStoreData(team).lower()
            playerStats[playerName][teamNameToStoreData]['games'] += 1
            playerStats[playerName][teamNameToStoreData]['aggDiff'] += aggregate - opponentAggregate
            if aggregate > opponentAggregate:
                playerStats[playerName][teamNameToStoreData]['wins'] += 1

    return playerStats
