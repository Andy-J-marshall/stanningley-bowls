import React from 'react';
import { capitalizeText } from '../helpers/utils';

function CombinedTeamStats(props) {
    const stats = props.stats;

    let combinedAwayWins = 0;
    let combinedHomeWins = 0;
    let combinedAwayLosses = 0;
    let combinedHomeLosses = 0;
    let combinedHomeDraws = 0;
    let combinedAwayDraws = 0;
    let combinedStanningleyAgg = 0;
    let combinedStanningleyTotalPoints = 0;
    let combinedOpponentAgg = 0;
    let combinedOpponentTotalPoints = 0;
    let combinedBeaten = [];
    let combinedBeatenBy = [];
    let combinedDrawnWith = [];

    stats.forEach(stats => {
        const {
            awayWins, homeWins, awayLosses, homeLosses, homeDraws,
            awayDraws, stanningleyAgg, stanningleyTotalPoints,
            opponentAgg, opponentTotalPoints, beaten, beatenBy, drawnWith,
        } = stats;
        combinedAwayWins += awayWins;
        combinedHomeWins += homeWins;
        combinedAwayLosses += awayLosses;
        combinedHomeLosses += homeLosses;
        combinedHomeDraws += homeDraws;
        combinedAwayDraws += awayDraws;
        combinedStanningleyAgg += stanningleyAgg;
        combinedStanningleyTotalPoints += stanningleyTotalPoints;
        combinedOpponentAgg += opponentAgg;
        combinedOpponentTotalPoints += opponentTotalPoints;
        combinedBeaten.push(...beaten);
        combinedBeatenBy.push(...beatenBy);
        combinedDrawnWith.push(...drawnWith);
    });

    const totalDraws = combinedAwayDraws + combinedHomeDraws;
    const totalWins = combinedAwayWins + combinedHomeWins;
    const totalLosses = combinedAwayLosses + combinedHomeLosses;
    const totalGames = totalDraws + totalWins + totalLosses;

    return (
        <div id='CombinedTeamResults'>
            <h3>Combined Stats For All Teams</h3>
            <div id='CombinedTeamWinLosses'>
                <p>Total games = {totalGames}</p>
                <p>Total wins = {totalWins}</p>
                {totalWins > 0 && <p>({combinedHomeWins} home, {combinedAwayWins} away)</p>}
                <p>Total losses = {totalLosses}</p>
                {totalLosses > 0 && <p>({combinedHomeLosses} home, {combinedAwayLosses} away)</p>}
                {totalDraws > 0 && <p>Total draws = {totalDraws}</p>}
                {totalDraws > 0 && <p>({combinedHomeDraws} home, {combinedAwayDraws} away)</p>}
            </div>
            <div id='CombinedTeamAggregates'>
                <p>Stanningley aggregate = {combinedStanningleyAgg}</p>
                <p>Opponents aggregate = {combinedOpponentAgg}</p>
                <p>Stanningley team score = {combinedStanningleyTotalPoints}</p>
                <p>Opponents team score = {combinedOpponentTotalPoints}</p>
            </div>
            <div id='CombinedTeamOpponents'>
                {totalWins > 0 && <p>Teams beaten = {capitalizeText(combinedBeaten)}</p>}
                {totalLosses > 0 && <p>Teams lost to = {capitalizeText(combinedBeatenBy)}</p>}
                {totalDraws > 0 && <p>Teams drawn with = {capitalizeText(combinedDrawnWith)}</p>}
            </div>
        </div>
    );
}

export default CombinedTeamStats;
