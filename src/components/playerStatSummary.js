import { Table } from 'react-bootstrap';
import { capitalizeText } from '../helpers/utils';

function PlayerStatSummary(props) {
    const playerStats = props.playerStats;
    const displayPlayerStatsCallback = props.callback;

    function displayPlayer(event) {
        const playerName = event.target.innerHTML;
        if (displayPlayerStatsCallback) {
            displayPlayerStatsCallback(playerName);
        }
    }

    // TODO also need to add this for other places we use this e.g. all years stats and individual team stats
    if (playerStats) {
        return (
            <div id="player-stats-per-team">
                <div className="center table" style={{ width: '97%' }}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>PLAYER</th>
                                <th>GAMES</th>
                                <th>WINS</th>
                                <th>WIN %</th>
                                <th>AVERAGE</th>
                            </tr>
                        </thead>
                        {playerStats.map((player, key) => {
                            return (
                                <tbody key={key}>
                                    {player.games > 0 && (
                                        <tr>
                                            <td>
                                                <a onClick={displayPlayer}>
                                                    {capitalizeText([
                                                        player.player,
                                                    ])}
                                                </a>
                                            </td>
                                            <td>{player.games}</td>
                                            <td>{player.wins}</td>
                                            <td>
                                                {(
                                                    (player.wins /
                                                        player.games) *
                                                    100
                                                ).toFixed(0)}
                                                %
                                            </td>
                                            <td>{player.average.toFixed(2)}</td>
                                        </tr>
                                    )}
                                </tbody>
                            );
                        })}
                    </Table>
                </div>
            </div>
        );
    } else {
        return <h5>No stats available</h5>;
    }
}

export default PlayerStatSummary;
