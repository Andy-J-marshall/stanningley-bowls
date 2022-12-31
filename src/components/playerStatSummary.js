import { Table } from 'react-bootstrap';
import { capitalizeText } from '../helpers/utils';

function PlayerStatSummary(props) {
    const playerStats = props.playerStats;

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
                                                {capitalizeText([
                                                    player.player,
                                                ])}
                                            </td>
                                            <td>{player.games}</td>
                                            <td>{player.wins}</td>
                                            <td>{((player.wins / player.games) * 100).toFixed(0)}%</td>
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
        return <p>No stats available</p>;
    }
}

export default PlayerStatSummary;
