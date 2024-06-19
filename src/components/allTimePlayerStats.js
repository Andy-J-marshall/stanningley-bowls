import { useState, useEffect } from 'react';
import PlayerStatSummary from './playerStatSummary';
import { returnPlayerStats, checkWinPercAndAverageAreNumbers } from '../helpers/playersHelper';

function AllTimePlayerStats(props) {
    const statsArray = props.statsArray;
    const showSinglesOnlyBool = props.showSinglesOnly;
    const showPairsOnlyBool = props.showPairsOnly;
    const [totalPlayersUsed, setTotalPlayersUsed] = useState(0);

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
        let stats = {
            player,
            games: 0,
            wins: 0,
            agg: 0,
            aggAgainst: 0,
            average: 0,
            winPerc: 0,
            singleGames: 0,
            singlesWins: 0,
            singlesAgg: 0,
            singlesAggAgainst: 0,
            singlesAverage: 0,
            singlesWinPerc: 0,
            pairsGames: 0,
            pairsWins: 0,
            pairsAgg: 0,
            pairsAggAgainst: 0,
            pairsAverage: 0,
            pairsWinPerc: 0,
        };

        statsArray.forEach((yearStats) => {
            const playerStats = returnPlayerStats(
                yearStats.playerResults,
                player
            );

            if (playerStats) {
                // All
                stats.agg += playerStats.totalAgg;
                stats.aggAgainst += playerStats.totalAggAgainst;
                stats.wins += playerStats.totalWins;
                stats.games += playerStats.gamesPlayed;

                // Singles
                stats.singlesAgg += playerStats.singlesAgg;
                stats.singlesAggAgainst += playerStats.singlesAggAgainst;
                stats.singlesWins +=
                    playerStats.totalWins - playerStats.pairWins;
                stats.singleGames += playerStats.singlesGames;

                // Pairs
                stats.pairsAgg += playerStats.totalPairsAgg;
                stats.pairsAggAgainst += playerStats.totalPairsAggAgainst;
                stats.pairsWins += playerStats.pairWins;
                stats.pairsGames += playerStats.pairsGames;

            }
        });
        stats.winPerc = (stats.wins / stats.games) * 100,
        stats.singlesWinPerc = (stats.singlesWins / stats.singleGames) * 100,
        stats.pairsWinPerc = (stats.pairsWins / stats.pairsGames) * 100,

        stats.average = (stats.agg - stats.aggAgainst) / stats.games;
        stats.singlesAverage =
            (stats.singlesAgg - stats.singlesAggAgainst) / stats.singleGames;
        stats.pairsAverage = (stats.pairsAgg - stats.pairsAggAgainst) / stats.pairsGames;

        stats = checkWinPercAndAverageAreNumbers(stats);

        statsToDisplayArray.push(stats);
    });

    useEffect(() => {
        const playersWithGames = statsToDisplayArray.filter(
            (player) => player.games > 0
        );
        setTotalPlayersUsed(playersWithGames.length);
    });

    return (
        <div id="all-time-player-stats" className="center">
            <h3 style={{ padding: '2rem 0 0 0' }}>STATS SINCE 2022</h3>
            <PlayerStatSummary
                playerStats={statsToDisplayArray}
                showSinglesOnly={showSinglesOnlyBool}
                showPairsOnly={showPairsOnlyBool}
            />
            <br />
            {!showSinglesOnlyBool && !showPairsOnlyBool && <p id='total-player-count'>Total players since 2022: {totalPlayersUsed}</p>}
        </div>
    );
}

export default AllTimePlayerStats;
