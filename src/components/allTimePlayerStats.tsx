import { useState, useEffect } from 'react';
import PlayerStatSummary from './playerStatSummary';
import { AllTimePlayerStatsProps } from '../types/interfaces';
import { returnStatsForPlayersInAllYears } from '../helpers/statsHelper';

function AllTimePlayerStats(props: AllTimePlayerStatsProps) {
    const statsArray = props.statsArray;
    const showSinglesOnlyBool = props.showSinglesOnly;
    const showPairsOnlyBool = props.showPairsOnly;
    const [totalPlayersUsed, setTotalPlayersUsed] = useState(0);

    const statsToDisplayArray = returnStatsForPlayersInAllYears(statsArray);

    useEffect(() => {
        const playersWithGames = statsToDisplayArray.filter(
            (player) => player.games > 0
        );
        setTotalPlayersUsed(playersWithGames.length);
    });

    return (
        <div id="all-time-player-stats" className="center">
            <h3 style={{ padding: '2rem 0 0 0' }}>STATS SINCE 2013</h3>
            <PlayerStatSummary
                playerStats={statsToDisplayArray}
                showSinglesOnly={showSinglesOnlyBool}
                showPairsOnly={showPairsOnlyBool}
            />
            <br />
            {!showSinglesOnlyBool && !showPairsOnlyBool && (
                <p id="total-player-count">Total players: {totalPlayersUsed}</p>
            )}
        </div>
    );
}

export default AllTimePlayerStats;
