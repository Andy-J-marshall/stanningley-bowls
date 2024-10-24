import { useState, useEffect } from 'react';
import PlayerStatSummary from './playerStatSummary';
import { AllTimePlayerStatsProps } from '../types/interfaces';
import { returnStatsForPlayersInAllYears } from '../helpers/statsHelper';

// TODO rename to AllTimePlayerStatsSummary
// TODO or might be able to get rid of this component and just use PlayerStatSummary?
function AllTimePlayerStats(props: AllTimePlayerStatsProps) {
    const statsArray = props.statsArray;
    const showSinglesOnlyBool = props.showSinglesOnly;
    const showPairsOnlyBool = props.showPairsOnly;
    const [totalPlayersUsed, setTotalPlayersUsed] = useState(0);
    // const [searchedPlayerName, setSearchedPlayerName] = useState('');

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
                // callback={setSearchedPlayerName}
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
