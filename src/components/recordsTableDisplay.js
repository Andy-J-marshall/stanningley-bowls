import { Table } from 'react-bootstrap';
import { capitalizeText } from '../helpers/utils';

function RecordsTableDisplay(props) {
    const day = props.day;
    const minGames = props.minGames;
    const bestWinPerc = props.bestWinPerc;
    const bestWinPercPlayer = props.bestWinPercPlayer;
    const mostWins = props.mostWins;
    const mostWinsPlayer = props.mostWinsPlayer;
    const mostGames = props.mostGames;
    const mostGamesPlayer = props.mostGamesPlayer;
    const bestAverage = props.bestAverage;
    const bestAveragePlayer = props.bestAveragePlayer;

    return (
        <div className="center" style={{ width: '97%' }}>
            {day && (
                <div>
                    <br />
                    <h4>{day.toUpperCase()}</h4>
                </div>
            )}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>RECORD</th>
                        <th>VALUE</th>
                        <th>PLAYER</th>
                    </tr>
                </thead>
                <tbody>
                    {mostGames && mostGamesPlayer && mostGames > 0 ? (
                        <tr>
                            <td>Most games</td>
                            <td id="mostGames">{mostGames}</td>
                            <td id="mostGamesPlayer">
                                {capitalizeText(mostGamesPlayer)}
                            </td>
                        </tr>
                    ) : null}
                    {mostWins && mostWinsPlayer && mostWins > 0 ? (
                        <tr>
                            <td>Most wins</td>
                            <td id="mostWins">{mostWins}</td>
                            <td id="mostWinsPlayer">
                                {capitalizeText(mostWinsPlayer)}
                            </td>
                        </tr>
                    ) : null}
                    {bestWinPerc && bestWinPercPlayer && bestWinPerc > 0 ? (
                        <tr>
                            <td>Highest win percentage</td>
                            <td id="bestWinPerc">{bestWinPerc.toFixed(0)}%</td>
                            <td id="bestWinPercPlayer">
                                {capitalizeText(bestWinPercPlayer)}
                            </td>
                        </tr>
                    ) : null}
                    {bestAveragePlayer && bestAverage > -27 ? (
                        <tr>
                            <td>Best average</td>
                            <td id="bestAverage">{bestAverage.toFixed(2)}</td>
                            <td id="bestAveragePlayer">
                                {capitalizeText(bestAveragePlayer)}
                            </td>
                        </tr>
                    ) : null}
                </tbody>
            </Table>
            <p className="footnote">* Minimum of {minGames} games</p>
        </div>
    );
}

export default RecordsTableDisplay;
