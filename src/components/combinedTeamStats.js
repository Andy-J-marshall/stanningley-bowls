import React from 'react';
import { capitalizeText } from '../helpers/utils';
import { combineTeamStats } from '../helpers/statsHelper';

function CombinedTeamStats(props) {
    const stats = props.stats;

    const combinedStats = combineTeamStats(stats);
    const {
        combinedAwayWins,
        combinedHomeWins,
        combinedAwayLosses,
        combinedHomeLosses,
        combinedCupWins,
        combinedCupLosses,
        combinedHomeDraws,
        combinedAwayDraws,
        combinedStanningleyAgg,
        combinedStanningleyTotalPoints,
        combinedOpponentAgg,
        combinedOpponentTotalPoints,
        combinedBeaten,
        combinedBeatenBy,
        combinedDrawnWith,
        totalDraws,
        totalWins,
        totalLosses,
        totalGames,
    } = combinedStats;

    return (
        <div id='combined-team-results'>
            <div id='combined-team-win-losses'>
                <p>Total games = {totalGames}</p>
                <p>Total wins = {totalWins}</p>
                {totalWins > 0 && (
                    <p>
                        ({combinedHomeWins} home, {combinedAwayWins} away,{' '}
                        {combinedCupWins} cup)
                    </p>
                )}
                <p>Total losses = {totalLosses}</p>
                {totalLosses > 0 && (
                    <p>
                        ({combinedHomeLosses} home, {combinedAwayLosses} away,{' '}
                        {combinedCupLosses} cup)
                    </p>
                )}
                {totalDraws > 0 && <p>Total draws = {totalDraws}</p>}
                {totalDraws > 0 && (
                    <p>
                        ({combinedHomeDraws} home, {combinedAwayDraws} away)
                    </p>
                )}
            </div>
            <div id='combined-team-aggregates'>
                <p>Stanningley aggregate = {combinedStanningleyAgg}</p>
                <p>Opponents aggregate = {combinedOpponentAgg}</p>
                <p>Stanningley team score = {combinedStanningleyTotalPoints}</p>
                <p>Opponents team score = {combinedOpponentTotalPoints}</p>
            </div>
            <div id='combined-team-opponents'>
                {totalWins > 0 && (
                    <p>Teams beaten = {capitalizeText(combinedBeaten)}</p>
                )}
                {totalLosses > 0 && (
                    <p>Teams lost to = {capitalizeText(combinedBeatenBy)}</p>
                )}
                {totalDraws > 0 && (
                    <p>
                        Teams drawn with = {capitalizeText(combinedDrawnWith)}
                    </p>
                )}
            </div>
        </div>
    );
}

export default CombinedTeamStats;
