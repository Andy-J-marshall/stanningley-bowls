import { Table } from 'react-bootstrap';
import { capitalizeText, arrayToList } from '../helpers/utils';
import { returnPlayerStats } from '../helpers/playersHelper';

function AllTimePlayerStats(props) {
    const statsArray = props.statsArray;

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
            name: player,
            games: 0,
            wins: 0,
            agg: 0,
            aggAgainst: 0,
            average: 0,
            winPerc: 0,
            yearsPlayed: [],
            // TODO other stats?
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
                stats.yearsPlayed.push(yearStats.statsYear);
            }
        });

        stats.average = (stats.agg - stats.aggAgainst) / stats.games;
        stats.winPerc = (stats.wins / stats.games) * 100;
        statsToDisplayArray.push(stats);
    });

    return (
        <div>
            <div id="all-time-player-stats">
                <h1>PLAYERS STATS</h1>
                <div className="center table" style={{ width: '97%' }}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>PLAYER</th>
                                <th>GAMES</th>
                                <th>WINS</th>
                                <th>WIN %</th>
                                <th>AVERAGE</th>
                                <th>YEARS PLAYED</th>
                            </tr>
                        </thead>
                        {statsToDisplayArray.map((player, key) => {
                            return (
                                <tbody key={key}>
                                    {player.games > 0 && (
                                        <tr>
                                            <td>
                                                {capitalizeText([player.name])}
                                            </td>
                                            <td>{player.games}</td>
                                            <td>{player.wins}</td>
                                            <td>
                                                {player.winPerc.toFixed(0)}%
                                            </td>
                                            <td>{player.average.toFixed(2)}</td>
                                            <td>
                                                {arrayToList(
                                                    player.yearsPlayed
                                                )}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            );
                        })}
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default AllTimePlayerStats;
