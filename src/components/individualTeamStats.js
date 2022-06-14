import React from 'react';
import { capitalizeText } from '../helpers/utils';

function IndividualTeamStats(props) {
    const day = props.day;
    const stats = props.stats;

    // TODO add cupWins/losses to this
    const {
        awayWins, homeWins, awayLosses, homeLosses, homeDraws,
        awayDraws, stanningleyAgg, stanningleyTotalPoints,
        opponentAgg, opponentTotalPoints, beaten, beatenBy, drawnWith,
    } = stats;
    
    const totalDraws = awayDraws + homeDraws;
    const totalWins = awayWins + homeWins;
    const totalLosses = awayLosses + homeLosses;
    const totalGames = totalDraws + totalWins + totalLosses;
    
    {/* TODO need to handle cup games on neutral greens? */}
    return (
        <div id={day + 'TeamResults'}>
            <h3>Stats for {day}</h3>
            <div id={day + 'TeamWinLosses'}>
                <p>Total games = {totalGames}</p>
                <p>Total wins = {totalWins}</p>
                {totalWins > 0 && <p>({homeWins} home, {awayWins} away)</p>}
                <p>Total losses = {totalLosses}</p>
                {totalLosses > 0 && <p>({homeLosses} home, {awayLosses} away)</p>}
                {totalDraws > 0 && <p>Total draws = {totalDraws}</p>}
                {totalDraws > 0 && <p>({homeDraws} home, {awayDraws} away)</p>}
            </div>
            <div id={day + 'TeamAggregates'}>
                <p>Stanningley aggregate = {stanningleyAgg}</p>
                <p>Opponents aggregate = {opponentAgg}</p>
                <p>Stanningley team score = {stanningleyTotalPoints}</p>
                <p>Opponents team score = {opponentTotalPoints}</p>
            </div>
            <div id={day + 'TeamOpponents'}>
                {totalWins > 0 && <p>Teams beaten = {capitalizeText(beaten)}</p>}
                {totalLosses > 0 && <p>Teams lost to = {capitalizeText(beatenBy)}</p>}
                {totalDraws > 0 && <p>Teams drawn with = {capitalizeText(drawnWith)}</p>}
            </div>
        </div>
    );
}

export default IndividualTeamStats;
