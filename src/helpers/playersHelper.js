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
        totalGamesPlayed
    } = stats;
    const p = playersStats[player];

    // League stats
    const monday = p['monday combined leeds'];
    const tuesdayVets = p['tuesday vets leeds'];
    const thursday = p['thursday vets leeds'];
    const saturday = p['saturday leeds'];
    const tuesdayEvening = p['tuesday leeds'];
    const wednesday = p['wednesday half holiday leeds'];

    // Wins and losses
    const totalWins = awayWins + homeWins + cupWins;
    const totalLosses = awayLosses + homeLosses + cupLosses;
    const biggestWin = findBiggestWin(results);

    // Games played
    const gamesPlayed = totalGamesPlayed;
    const homeGamesPlayed = homeWins + homeLosses;
    const awayGamesPlayed = awayWins + awayLosses;
    const cupGamesPlayed = cupWins + cupLosses;
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
    const mondayWins = monday.wins;
    const mondayLosses = monday.games - monday.wins;
    const mondayGames = monday.games;
    const mondayAvg = monday.aggDiff / mondayGames;

    const tuesdayVetsWins = tuesdayVets.wins;
    const tuesdayVetsLosses = tuesdayVets.games - tuesdayVets.wins;
    const tuesdayVetsGames = tuesdayVets.games;
    const tuesdayVetsAvg = tuesdayVets.aggDiff / tuesdayVetsGames;

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

    const thursdayWins = thursday.wins;
    const thursdayLosses = thursday.games - thursday.wins;
    const thursdayGames = thursday.games;
    const thursdayAvg = thursday.aggDiff / thursdayGames;

    const saturdayWins = saturday.wins;
    const saturdayLosses = saturday.games - saturday.wins;
    const saturdayGames = saturday.games;
    const saturdayAvg = saturday.aggDiff / saturdayGames;

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
        thursdayWins,
        thursdayLosses,
        thursdayGames,
        thursdayAvg,
        saturdayWins,
        saturdayLosses,
        saturdayGames,
        saturdayAvg,
        allTeamsPlayedFor,
        pairsPartnersCount,
        pairsPartnersCountWins,
        pairsPartnersCountLosses,
        biggestWin,
        results,
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
