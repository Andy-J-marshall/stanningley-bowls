import React from 'react';
import { capitalizeText } from '../helpers/utils';

function IndividualTeamStats(props) {
    const day = props.day;
    const stats = props.stats;
    const playerStats = props.playerStats;
    const index = props.index;

    const {
        awayWins,
        homeWins,
        cupWins,
        cupLosses,
        awayLosses,
        homeLosses,
        homeDraws,
        awayDraws,
        stanningleyAgg,
        stanningleyTotalPoints,
        opponentAgg,
        opponentTotalPoints,
        beaten,
        beatenBy,
        drawnWith,
    } = stats;

    const allPlayerStats = Object.keys(playerStats).map((player) => {
        const stats = playerStats[player][day.toLowerCase()];
        const { games, wins, aggDiff } = stats;
        const playerDayStats = {
            player,
            games,
            wins,
            average: aggDiff / games,
        };
        return playerDayStats;
    });

    const totalDraws = awayDraws + homeDraws;
    const totalWins = awayWins + homeWins + cupWins;
    const totalLosses = awayLosses + homeLosses + cupLosses;
    const totalGames = totalDraws + totalWins + totalLosses;

    return (
        <div id={day + 'TeamResults'}>
            <h4>Stats for {day}</h4>
            <div id={day + 'TeamWinLosses'}>
                <p>Total games = {totalGames}</p>
                <p>Total wins = {totalWins}</p>
                {totalWins > 0 && (
                    <p>
                        ({homeWins} home, {awayWins} away, {cupWins} cup)
                    </p>
                )}
                <p>Total losses = {totalLosses}</p>
                {totalLosses > 0 && (
                    <p>
                        ({homeLosses} home, {awayLosses} away, {cupLosses} cup)
                    </p>
                )}
                {totalDraws > 0 && <p>Total draws = {totalDraws}</p>}
                {totalDraws > 0 && (
                    <p>
                        ({homeDraws} home, {awayDraws} away)
                    </p>
                )}
            </div>
            <div id={day + 'TeamAggregates'}>
                <p>Stanningley aggregate = {stanningleyAgg}</p>
                <p>Opponents aggregate = {opponentAgg}</p>
                <p>Stanningley team score = {stanningleyTotalPoints}</p>
                <p>Opponents team score = {opponentTotalPoints}</p>
            </div>
            <div id={day + 'TeamOpponents'}>
                {totalWins > 0 && (
                    <p>Teams beaten = {capitalizeText(beaten)}</p>
                )}
                {totalLosses > 0 && (
                    <p>Teams lost to = {capitalizeText(beatenBy)}</p>
                )}
                {totalDraws > 0 && (
                    <p>Teams drawn with = {capitalizeText(drawnWith)}</p>
                )}
            </div>
            {allPlayerStats.map((player) => {
                const key = Math.floor(Math.random() * 100000 + index);
                return (
                    <div key={key}>
                        {player.games > 0 && <h4>{capitalizeText([player.player])}</h4>}
                        {player.games > 0 && <p>
                            {player.games} games played, {player.wins} games
                            won ({player.average.toFixed(2)} average)
                        </p>}
                    </div>
                );
            })}
        </div>
    );
}

export default IndividualTeamStats;
