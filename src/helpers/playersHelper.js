import { findBiggestWin } from './statsHelper';
import { arrayToList } from './utils';
import config from '../config';

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
        winningPairsPartners,
        losingPairsPartners,
        beatenBy,
        beatenOpponents,
        beatenByTeam,
        beatenTeam,
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
    } = stats;
    const p = playersStats[player];
    const monday = p['monday combined leeds'];
    const tuesdayVets = p['tuesday vets leeds'];
    const thursday = p['thursday vets leeds'];
    const saturday = p['saturday leeds'];
    const tuesdayEvening = p['tuesday leeds'];
    const wednesday = p['wednesday half holiday leeds'];
    const totalLosses = awayLosses + homeLosses + cupLosses;
    const totalWins = awayWins + homeWins + cupWins;
    const biggestWin = findBiggestWin(results);
    const gamesPlayed = totalLosses + totalWins;
    const homeGamesPlayed = homeWins + homeLosses;
    const awayGamesPlayed = awayWins + awayLosses;
    const average = (totalAgg - totalAggAgainst) / gamesPlayed;
    const homeAverage = (totalHomeAgg - totalHomeAggAgainst) / homeGamesPlayed;
    const awayAverage = (totalAwayAgg - totalAwayAggAgainst) / awayGamesPlayed;
    const cupAgg = totalAgg - totalAwayAgg - totalHomeAgg;
    const cupAggAgainst =
        totalAggAgainst - totalAwayAggAgainst - totalHomeAggAgainst;
    const cupGamesPlayed = cupWins + cupLosses;
    const cupAverage = (cupAgg - cupAggAgainst) / cupGamesPlayed;
    const averagePoints = totalPoints / (gamesPlayed - cupGamesPlayed);
    const averagePointsAgainst =
        totalPointsAgainst / (gamesPlayed - cupGamesPlayed);
    const homeAveragePoints = totalHomePoints / homeGamesPlayed;
    const homeAveragePointsAgainst = totalHomePointsAgainst / homeGamesPlayed;
    const awayAveragePoints = totalAwayPoints / awayGamesPlayed;
    const awayAveragePointsAgainst = totalAwayPointsAgainst / awayGamesPlayed;
    const pairsGames = pairLosses + pairWins;
    const singlesGames = gamesPlayed - pairsGames;
    const singlesAgg = totalAgg - totalPairsAgg;
    const singlesAggAgainst = totalAggAgainst - totalPairsAggAgainst;
    const singlesAvg = (singlesAgg - singlesAggAgainst) / singlesGames;
    const pairsAvg = (totalPairsAgg - totalPairsAggAgainst) / pairsGames;
    const beatenByList = beatenBy ? arrayToList(beatenBy) : null;
    const beatenOpponentsList = beatenOpponents
        ? arrayToList(beatenOpponents)
        : null;
    const beatenByTeamList = beatenByTeam ? arrayToList(beatenByTeam) : null;
    const beatenTeamList = beatenTeam ? arrayToList(beatenTeam) : null;
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
    let daysPlayedCount = [
        { day: config.days['monday combined leeds'], gamesPlayed: mondayGames },
        { day: config.days['tuesday vets leeds'], gamesPlayed: tuesdayVetsGames },
        { day: config.days['tuesday leeds'], gamesPlayed: tuesdayEveningGames },
        { day: config.days['wednesday half holiday leeds'], gamesPlayed: wednesdayGames },
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

    const pairsPartnersCount = calculatePairsPartnersCount(pairsPartners);
    const pairsPartnersCountWins =
        calculatePairsPartnersCount(winningPairsPartners);
    const pairsPartnersCountLosses =
        calculatePairsPartnersCount(losingPairsPartners);

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
        beatenByTeamList,
        beatenTeamList,
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
