import { findBiggestWin } from './statsHelper';

export function returnPlayerStats(playersStats, player) {
    const stats = playersStats[player];
    if (!stats) {
        return null;
    }

    const {
        totalAgg,
        totalAggAgainst,
        totalPairsAgg,
        totalPairsAggAgainst,
        awayLosses,
        homeLosses,
        cupLosses,
        homeWins,
        awayWins,
        cupWins,
        pairHomeWins,
        pairAwayWins,
        pairCupWins,
        pairHomeLosses,
        pairAwayLosses,
        pairCupLosses,
        winningPairsPartners,
        losingPairsPartners,
        pairLosses,
        pairWins,
        pairsPartners,
        totalHomeAgg,
        totalHomeAggAgainst,
        totalAwayAgg,
        totalAwayAggAgainst,
        results,
        dayPlayed,
        totalPairsHomeAgg,
        totalPairsHomeAggAgainst,
        totalPairsAwayAgg,
        totalPairsAwayAggAgainst,
        availableAgg,
        availablePairsAgg,
        availableHomeAgg,
        availableAwayAgg,
        availablePairsHomeAgg,
        availablePairsAwayAgg,
    } = stats;
    const p = playersStats[player];

    // League stats
    const monday = p['monday combined leeds'];
    const tuesdayVets = p['tuesday vets leeds'];
    const tuesdayEvening = p['tuesday leeds'];
    const wednesday = p['wednesday half holiday leeds'];
    const wednesdayPairs = p['wednesday pairs airewharfe'];
    const thursday = p['thursday vets leeds'];
    const saturday = p['saturday leeds'];
    const saturdayBTeam = p['saturday leeds (b)'];

    // Wins and losses
    const totalWins = awayWins + homeWins + cupWins;
    const totalLosses = awayLosses + homeLosses + cupLosses;
    const biggestWin = findBiggestWin(results);

    // Games played
    const homeGamesPlayed = homeWins + homeLosses;
    const awayGamesPlayed = awayWins + awayLosses;
    const cupGamesPlayed = cupWins + cupLosses;
    const gamesPlayed = homeGamesPlayed + awayGamesPlayed + cupGamesPlayed;
    const pairsGames = pairLosses + pairWins;
    const singlesGames = gamesPlayed - pairsGames;

    const pairHomeGamesPlayed = pairHomeWins + pairHomeLosses;
    const pairAwayGamesPlayed = pairAwayWins + pairAwayLosses;
    const pairCupGamesPlayed = pairCupWins + pairCupLosses;

    const singlesHomeGamesPlayed = homeGamesPlayed - pairHomeGamesPlayed;
    const singlesAwayGamesPlayed = awayGamesPlayed - pairAwayGamesPlayed;
    const singlesCupGamesPlayed =
        singlesGames - singlesHomeGamesPlayed - singlesAwayGamesPlayed;

    // Averages
    const average = (totalAgg - totalAggAgainst) / gamesPlayed;
    const homeAverage = (totalHomeAgg - totalHomeAggAgainst) / homeGamesPlayed;
    const awayAverage = (totalAwayAgg - totalAwayAggAgainst) / awayGamesPlayed;
    const cupAgg = totalAgg - totalAwayAgg - totalHomeAgg;
    const cupAggAgainst =
        totalAggAgainst - totalAwayAggAgainst - totalHomeAggAgainst;
    const cupAverage = (cupAgg - cupAggAgainst) / cupGamesPlayed;

    // Stats per league
    let mondayWins = 0;
    let mondayLosses = 0;
    let mondayGames = 0;
    let mondayAvg = 0;
    if (monday) {
        mondayWins = monday.wins;
        mondayLosses = monday.games - monday.wins;
        mondayGames = monday.games;
        mondayAvg = monday.aggDiff / mondayGames;
    }

    let tuesdayVetsWins = 0;
    let tuesdayVetsLosses = 0;
    let tuesdayVetsGames = 0;
    let tuesdayVetsAvg = 0;
    if (tuesdayVets) {
        tuesdayVetsWins = tuesdayVets.wins;
        tuesdayVetsLosses = tuesdayVets.games - tuesdayVets.wins;
        tuesdayVetsGames = tuesdayVets.games;
        tuesdayVetsAvg = tuesdayVets.aggDiff / tuesdayVetsGames;
    }

    let tuesdayEveningWins = 0;
    let tuesdayEveningLosses = 0;
    let tuesdayEveningGames = 0;
    let tuesdayEveningAvg = 0;
    if (tuesdayEvening) {
        tuesdayEveningWins = tuesdayEvening.wins;
        tuesdayEveningLosses = tuesdayEvening.games - tuesdayEvening.wins;
        tuesdayEveningGames = tuesdayEvening.games;
        tuesdayEveningAvg = tuesdayEvening.aggDiff / tuesdayEveningGames;
    }

    let wednesdayWins = 0;
    let wednesdayLosses = 0;
    let wednesdayGames = 0;
    let wednesdayAvg = 0;
    if (wednesday) {
        wednesdayWins = wednesday.wins;
        wednesdayLosses = wednesday.games - wednesday.wins;
        wednesdayGames = wednesday.games;
        wednesdayAvg = wednesday.aggDiff / wednesdayGames;
    }

    let wednesdayPairsWins = 0;
    let wednesdayPairsLosses = 0;
    let wednesdayPairsGames = 0;
    let wednesdayPairsAvg = 0;
    if (wednesdayPairs) {
        wednesdayPairsWins = wednesdayPairs.wins;
        wednesdayPairsLosses = wednesdayPairs.games - wednesdayPairs.wins;
        wednesdayPairsGames = wednesdayPairs.games;
        wednesdayPairsAvg = wednesdayPairs.aggDiff / wednesdayPairsGames;
    }

    let thursdayWins = 0;
    let thursdayLosses = 0;
    let thursdayGames = 0;
    let thursdayAvg = 0;
    if (thursday) {
        thursdayWins = thursday.wins;
        thursdayLosses = thursday.games - thursday.wins;
        thursdayGames = thursday.games;
        thursdayAvg = thursday.aggDiff / thursdayGames;
    }

    let saturdayWins = 0;
    let saturdayLosses = 0;
    let saturdayGames = 0;
    let saturdayAvg = 0;
    if (saturday) {
        saturdayWins = saturday.wins;
        saturdayLosses = saturday.games - saturday.wins;
        saturdayGames = saturday.games;
        saturdayAvg = saturday.aggDiff / saturdayGames;
    }

    let saturdayBWins = 0;
    let saturdayBLosses = 0;
    let saturdayBGames = 0;
    let saturdayBAvg = 0;
    if (saturdayBTeam) {
        saturdayBWins = saturdayBTeam.wins;
        saturdayBLosses = saturdayBTeam.games - saturdayBTeam.wins;
        saturdayBGames = saturdayBTeam.games;
        saturdayBAvg = saturdayBTeam.aggDiff / saturdayBGames;
    }

    let allTeamsPlayedFor = [];
    dayPlayed.forEach((day) => {
        if (!allTeamsPlayedFor.includes(day)) {
            allTeamsPlayedFor.push(day);
        }
    });

    // Pairs partners
    const pairsPartnersCount = calculatePairsPartnersCount(pairsPartners);
    const pairsPartnersCountWins =
        calculatePairsPartnersCount(winningPairsPartners);
    const pairsPartnersCountLosses =
        calculatePairsPartnersCount(losingPairsPartners);

    // Pairs & singles
    const singlesAgg = totalAgg - totalPairsAgg;
    const singlesAggAgainst = totalAggAgainst - totalPairsAggAgainst;

    const singlesAvg = (singlesAgg - singlesAggAgainst) / singlesGames;
    const pairsAvg = (totalPairsAgg - totalPairsAggAgainst) / pairsGames;

    const totalSinglesHomeAgg = totalHomeAgg - totalPairsHomeAgg;
    const totalSinglesHomeAggAgainst =
        totalHomeAggAgainst - totalPairsHomeAggAgainst;
    const totalSinglesAwayAgg = totalAwayAgg - totalPairsAwayAgg;
    const totalSinglesAwayAggAgainst =
        totalAwayAggAgainst - totalPairsAwayAggAgainst;

    const availableCupAgg = availableAgg - availableHomeAgg - availableAwayAgg;
    const availablePairsCupAgg =
        availablePairsAgg - availablePairsHomeAgg - availablePairsAwayAgg;
    const totalPairsCupAgg =
        totalPairsAgg - totalPairsHomeAgg - totalPairsAwayAgg;
    const totalPairsCupAggAgainst =
        totalPairsAggAgainst -
        totalPairsHomeAggAgainst -
        totalPairsAwayAggAgainst;
    const totalSinglesCupAgg = cupAgg - totalPairsCupAgg;
    const totalSinglesCupAggAgainst = cupAggAgainst - totalPairsCupAggAgainst;

    const pairsCupAgg = totalPairsAgg - totalPairsAwayAgg - totalPairsHomeAgg;
    const pairsCupAggAgainst =
        totalPairsAggAgainst -
        totalPairsAwayAggAgainst -
        totalPairsHomeAggAgainst;

    // Singles averages
    const singlesHomeAverage =
        (totalHomeAgg -
            totalPairsHomeAgg -
            (totalHomeAggAgainst - totalPairsHomeAggAgainst)) /
        (homeGamesPlayed - pairHomeGamesPlayed);
    const singlesAwayAverage =
        (totalAwayAgg -
            totalPairsAwayAgg -
            (totalAwayAggAgainst - totalPairsAwayAggAgainst)) /
        (awayGamesPlayed - pairAwayGamesPlayed);
    const singlesCupAverage =
        (cupAgg - pairsCupAgg - (cupAggAgainst - pairsCupAggAgainst)) /
        (cupGamesPlayed - pairCupGamesPlayed);

    // Pairs averages
    const pairsHomeAverage =
        (totalPairsHomeAgg - totalPairsHomeAggAgainst) / pairHomeGamesPlayed;
    const pairsAwayAverage =
        (totalPairsAwayAgg - totalPairsAwayAggAgainst) / pairAwayGamesPlayed;
    const pairsCupAverage =
        (pairsCupAgg - pairsCupAggAgainst) / pairCupGamesPlayed;

    return {
        totalAgg,
        totalAggAgainst,
        totalPairsAgg,
        totalPairsAggAgainst,
        totalHomeAgg,
        totalHomeAggAgainst,
        totalAwayAgg,
        totalAwayAggAgainst,
        singlesAgg,
        singlesAggAgainst,
        totalPairsHomeAgg,
        totalPairsHomeAggAgainst,
        totalPairsAwayAgg,
        totalPairsAwayAggAgainst,
        totalPairsCupAgg,
        totalPairsCupAggAgainst,
        totalSinglesHomeAgg,
        totalSinglesHomeAggAgainst,
        totalSinglesAwayAgg,
        totalSinglesAwayAggAgainst,
        totalSinglesCupAgg,
        totalSinglesCupAggAgainst,
        cupAgg,
        cupAggAgainst,
        awayLosses,
        homeLosses,
        pairLosses,
        cupLosses,
        totalLosses,
        pairHomeLosses,
        pairAwayLosses,
        pairCupLosses,
        homeWins,
        awayWins,
        cupWins,
        pairWins,
        totalWins,
        pairHomeWins,
        pairAwayWins,
        pairCupWins,
        gamesPlayed,
        homeGamesPlayed,
        awayGamesPlayed,
        singlesHomeGamesPlayed,
        singlesAwayGamesPlayed,
        singlesCupGamesPlayed,
        pairHomeGamesPlayed,
        pairAwayGamesPlayed,
        pairCupGamesPlayed,
        cupGamesPlayed,
        pairsGames,
        singlesGames,
        average,
        homeAverage,
        awayAverage,
        cupAverage,
        singlesAvg,
        pairsAvg,
        singlesHomeAverage,
        singlesAwayAverage,
        singlesCupAverage,
        pairsHomeAverage,
        pairsAwayAverage,
        pairsCupAverage,
        mondayWins,
        mondayLosses,
        mondayGames,
        mondayAvg,
        tuesdayVetsWins,
        tuesdayVetsLosses,
        tuesdayVetsGames,
        tuesdayVetsAvg,
        tuesdayEveningWins,
        tuesdayEveningLosses,
        tuesdayEveningGames,
        tuesdayEveningAvg,
        wednesdayWins,
        wednesdayLosses,
        wednesdayGames,
        wednesdayAvg,
        wednesdayPairsWins,
        wednesdayPairsLosses,
        wednesdayPairsGames,
        wednesdayPairsAvg,
        thursdayWins,
        thursdayLosses,
        thursdayGames,
        thursdayAvg,
        saturdayWins,
        saturdayLosses,
        saturdayGames,
        saturdayAvg,
        saturdayBWins,
        saturdayBLosses,
        saturdayBGames,
        saturdayBAvg,
        allTeamsPlayedFor,
        pairsPartnersCount,
        pairsPartnersCountWins,
        pairsPartnersCountLosses,
        biggestWin,
        results,
        availableAgg,
        availablePairsAgg,
        availableHomeAgg,
        availableAwayAgg,
        availableCupAgg,
        availablePairsHomeAgg,
        availablePairsAwayAgg,
        availablePairsCupAgg,
    };
}

export function calculatePairsPartnersCount(allPairsPartners) {
    const uniquePartners = allPairsPartners.filter((partner, index) => {
        return allPairsPartners.indexOf(partner) === index;
    });
    const partnersReturnObj = uniquePartners.reduce((partnerObj, player) => {
        partnerObj[player] = { timesPaired: 0 };
        return partnerObj;
    }, {});

    allPairsPartners.forEach((partner) => {
        if (uniquePartners.includes(partner)) {
            partnersReturnObj[partner].timesPaired += 1;
        }
    });
    return partnersReturnObj;
}

export function checkWinPercAndAverageAreNumbers(stats) {
    let verifiedStats = stats;

    if (isNaN(verifiedStats.winPerc)) {
        verifiedStats.winPerc = 0;
    }
    if (isNaN(verifiedStats.average)) {
        verifiedStats.average = -99;
    }
    if (isNaN(verifiedStats.singlesWinPerc)) {
        verifiedStats.singlesWinPerc = 0;
    }
    if (isNaN(verifiedStats.singlesAverage)) {
        verifiedStats.singlesAverage = -99;
    }
    if (isNaN(verifiedStats.pairsWinPerc)) {
        verifiedStats.pairsWinPerc = 0;
    }
    if (isNaN(verifiedStats.pairsAverage)) {
        verifiedStats.pairsAverage = -99;
    }

    return verifiedStats
}
