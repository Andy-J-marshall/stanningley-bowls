import { findBiggestWin } from './statsHelper';
import { arrayToList } from './utils';
import config from '../config';

// TODO move some of these to the script e.g. totalGamesPlayed? Averages?

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
        totalPoints,
        totalPointsAgainst,
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
        beatenBy,
        beatenOpponents,
        pairLosses,
        pairWins,
        pairsPartners,
        totalHomeAgg,
        totalHomeAggAgainst,
        totalAwayAgg,
        totalAwayAggAgainst,
        totalHomePoints,
        totalHomePointsAgainst,
        totalAwayPoints,
        totalAwayPointsAgainst,
        results,
        dayPlayed,
        totalPairsHomeAgg,
        totalPairsHomeAggAgainst,
        totalPairsAwayAgg,
        totalPairsAwayAggAgainst,
        totalPairsPoints,
        totalPairsPointsAgainst,
        totalPairsHomePoints,
        totalPairsHomePointsAgainst,
        totalPairsAwayPoints,
        totalPairsAwayPointsAgainst,
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
    const gamesPlayed = totalLosses + totalWins;
    const homeGamesPlayed = homeWins + homeLosses;
    const awayGamesPlayed = awayWins + awayLosses;
    const cupGamesPlayed = cupWins + cupLosses;
    const pairsGames = pairLosses + pairWins;
    const singlesGames = gamesPlayed - pairsGames;

    // Averages
    const average = (totalAgg - totalAggAgainst) / gamesPlayed;
    const homeAverage = (totalHomeAgg - totalHomeAggAgainst) / homeGamesPlayed;
    const awayAverage = (totalAwayAgg - totalAwayAggAgainst) / awayGamesPlayed;
    const cupAgg = totalAgg - totalAwayAgg - totalHomeAgg;
    const cupAggAgainst =
        totalAggAgainst - totalAwayAggAgainst - totalHomeAggAgainst;
    const cupAverage = (cupAgg - cupAggAgainst) / cupGamesPlayed;

    // Points
    const averagePoints = totalPoints / (gamesPlayed - cupGamesPlayed);
    const averagePointsAgainst =
        totalPointsAgainst / (gamesPlayed - cupGamesPlayed);
    const homeAveragePoints = totalHomePoints / homeGamesPlayed;
    const homeAveragePointsAgainst = totalHomePointsAgainst / homeGamesPlayed;
    const awayAveragePoints = totalAwayPoints / awayGamesPlayed;
    const awayAveragePointsAgainst = totalAwayPointsAgainst / awayGamesPlayed;

    // Opponents
    const beatenByList = beatenBy ? arrayToList(beatenBy) : null;
    const beatenOpponentsList = beatenOpponents
        ? arrayToList(beatenOpponents)
        : null;

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

    // Days played
    let daysPlayedCount = [
        { day: config.days['monday combined leeds'], gamesPlayed: mondayGames },
        {
            day: config.days['tuesday vets leeds'],
            gamesPlayed: tuesdayVetsGames,
        },
        { day: config.days['tuesday leeds'], gamesPlayed: tuesdayEveningGames },
        {
            day: config.days['wednesday half holiday leeds'],
            gamesPlayed: wednesdayGames,
        },
        { day: config.days['thursday vets leeds'], gamesPlayed: thursdayGames },
        { day: config.days['saturday leeds'], gamesPlayed: saturdayGames },
    ];
    daysPlayedCount = daysPlayedCount.filter((day) => day.gamesPlayed > 0);
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

    const pairHomeGamesPlayed = pairHomeWins + pairHomeLosses;
    const pairAwayGamesPlayed = pairAwayWins + pairAwayLosses;
    const pairCupGamesPlayed = pairCupWins + pairCupLosses;

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

    // Pairs points
    const pairsAveragePoints = totalPairsPoints / pairsGames;
    const pairsAveragePointsAgainst = totalPairsPointsAgainst / pairsGames;
    const pairsHomeAveragePoints = totalPairsHomePoints / pairHomeGamesPlayed;
    const pairsHomeAveragePointsAgainst =
        totalPairsHomePointsAgainst / homeGamesPlayed;
    const pairsAwayAveragePoints = totalPairsAwayPoints / pairAwayGamesPlayed;
    const pairsAwayAveragePointsAgainst =
        totalPairsAwayPointsAgainst / awayGamesPlayed;

    // Singles points
    const singlesAveragePoints =
        (totalPoints - totalPairsPoints) / (gamesPlayed - pairsGames);
    const singlesAveragePointsAgainst =
        (totalPointsAgainst - totalPairsPointsAgainst) /
        (gamesPlayed - pairsGames);
    const singlesHomeAveragePoints =
        (totalHomePoints - totalPairsHomePoints) /
        (homeGamesPlayed - pairHomeGamesPlayed);
    const singlesHomeAveragePointsAgainst =
        (totalHomePointsAgainst - totalPairsHomePointsAgainst) /
        (homeGamesPlayed - pairHomeGamesPlayed);
    const singlesAwayAveragePoints =
        (totalAwayPoints - totalPairsAwayPoints) /
        (awayGamesPlayed - pairAwayGamesPlayed);
    const singlesAwayAveragePointsAgainst =
        (totalAwayPointsAgainst - totalPairsAwayPointsAgainst) /
        (awayGamesPlayed - pairAwayGamesPlayed);

    return {
        totalAgg,
        totalAggAgainst,
        totalPairsAgg,
        totalPairsAggAgainst,
        totalPoints,
        totalPointsAgainst,
        awayLosses,
        homeLosses,
        cupLosses,
        homeWins,
        awayWins,
        cupWins,
        pairLosses,
        pairWins,
        totalHomeAgg,
        totalHomeAggAgainst,
        totalAwayAgg,
        totalAwayAggAgainst,
        totalHomePoints,
        totalHomePointsAgainst,
        totalAwayPoints,
        totalAwayPointsAgainst,
        results,
        totalLosses,
        totalWins,
        biggestWin,
        gamesPlayed,
        homeGamesPlayed,
        awayGamesPlayed,
        average,
        homeAverage,
        awayAverage,
        cupAgg,
        cupAggAgainst,
        cupGamesPlayed,
        cupAverage,
        averagePoints,
        averagePointsAgainst,
        homeAveragePoints,
        homeAveragePointsAgainst,
        awayAveragePoints,
        awayAveragePointsAgainst,
        pairsGames,
        singlesGames,
        singlesAgg,
        singlesAggAgainst,
        singlesAvg,
        pairsAvg,
        beatenByList,
        beatenOpponentsList,
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
        daysPlayedCount,
        allTeamsPlayedFor,
        pairsPartnersCount,
        pairsPartnersCountWins,
        pairsPartnersCountLosses,
        pairHomeGamesPlayed,
        pairAwayGamesPlayed,
        pairCupGamesPlayed,
        pairHomeWins,
        pairAwayWins,
        pairCupWins,
        pairHomeLosses,
        pairAwayLosses,
        pairCupLosses,
        singlesHomeAverage,
        singlesAwayAverage,
        singlesCupAverage,
        pairsHomeAverage,
        pairsAwayAverage,
        pairsCupAverage,
        pairsAveragePoints,
        pairsAveragePointsAgainst,
        pairsHomeAveragePoints,
        pairsHomeAveragePointsAgainst,
        pairsAwayAveragePoints,
        pairsAwayAveragePointsAgainst,
        singlesAveragePoints,
        singlesAveragePointsAgainst,
        singlesHomeAveragePoints,
        singlesHomeAveragePointsAgainst,
        singlesAwayAveragePoints,
        singlesAwayAveragePointsAgainst,
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
