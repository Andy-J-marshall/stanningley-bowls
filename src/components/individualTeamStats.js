import React from 'react';
import StatsTableDisplay from './statsTableDisplay';
import { capitalizeText } from '../helpers/utils'; // TODO remove this

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
        <div id={day + '-team-results'}>
            <StatsTableDisplay
                totalGames={totalGames}
                totalWins={totalWins}
                totalLosses={totalLosses}
                totalDraws={totalDraws}
                stanningleyAgg={stanningleyAgg}
                opponentAgg={opponentAgg}
                stanningleyTeamScore={stanningleyTotalPoints}
                opponentTeamScore={opponentTotalPoints}
                teamsBeaten={beaten}
                teamsLostTo={beatenBy}
                teamsDrawn={drawnWith}
                homeWins={homeWins}
                awayWins={awayWins}
                cupWins={cupWins}
                homeLosses={homeLosses}
                awayLosses={awayLosses}
                cupLosses={cupLosses}
                homeDraws={homeDraws}
                awayDraws={awayDraws}
            />

            {/* TODO display this nicely - a table? */}
            {allPlayerStats.map((player) => {
                const key = Math.floor(Math.random() * 100000 + index);
                return (
                    <div key={key}>
                        {player.games > 0 && (
                            <h4>{capitalizeText([player.player])}</h4>
                        )}
                        {player.games > 0 && (
                            <p>
                                {player.games} games played, {player.wins} games
                                won ({player.average.toFixed(2)} average)
                            </p>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default IndividualTeamStats;
