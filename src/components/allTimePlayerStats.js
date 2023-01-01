import { useState, useEffect } from 'react';
import PlayerStatSummary from './playerStatSummary';
import { returnPlayerStats } from '../helpers/playersHelper';

function AllTimePlayerStats(props) {
    const statsArray = props.statsArray;

    const [loaded, setLoaded] = useState(false);

    const statsToDisplayArray = [];
    let playerNames = [];

    statsArray.forEach((stat) => {
        playerNames = playerNames.concat(Object.keys(stat.playerResults));
    });
    for (var i = 0; i < playerNames.length; ++i) {
        for (var j = i + 1; j < playerNames.length; ++j) {
            if (playerNames[i] === playerNames[j]) playerNames.splice(j--, 1);
        }
    }

    playerNames.sort().forEach((player) => {
        const stats = {
            player,
            games: 0,
            wins: 0,
            agg: 0,
            aggAgainst: 0,
            average: 0,
        };

        statsArray.forEach((yearStats) => {
            const playerStats = returnPlayerStats(
                yearStats.playerResults,
                player
            );
            if (playerStats) {
                stats.agg += playerStats.totalAgg;
                stats.aggAgainst += playerStats.totalAggAgainst;
                stats.wins += playerStats.totalWins;
                stats.games += playerStats.gamesPlayed;
            }
        });

        stats.average = (stats.agg - stats.aggAgainst) / stats.games;
        statsToDisplayArray.push(stats);
    });

    useEffect(() => {
        if (!loaded) {
            window.scrollTo(0, 0);
        }
        setLoaded(true);
    });

    return (
        <div>
            <div id="all-time-player-stats">
                <h3 style={{ padding: '1rem 0 0 0' }}>STATS SINCE 2022</h3>
                <PlayerStatSummary playerStats={statsToDisplayArray} />
            </div>
        </div>
    );
}

export default AllTimePlayerStats;
