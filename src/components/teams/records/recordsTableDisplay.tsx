import { Table } from 'react-bootstrap';
import { capitalizeText } from '../../../helpers/utils';
import { RecordsTableDisplayProps } from '../../../types/interfaces';

function RecordsTableDisplay(props: RecordsTableDisplayProps) {
    const teamName = props.teamName;
    const mostGames = props.mostGames;
    const mostGamesPlayer = props.mostGamesPlayer;
    const minGames = props.minGames;
    const bestWinPerc = props.bestWinPerc;
    const bestWinPercPlayer = props.bestWinPercPlayer;
    const mostWins = props.mostWins;
    const mostWinsPlayer = props.mostWinsPlayer;
    const bestAverage = props.bestAverage;
    const bestAveragePlayer = props.bestAveragePlayer;

    return (
        <div className="center">
            {teamName && <h4>{teamName.toLowerCase()}</h4>}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>record</th>
                        <th>value</th>
                        <th>player</th>
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
                    {bestAveragePlayer && bestAverage && bestAverage > -27 ? (
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
            <br />
        </div>
    );
}

export default RecordsTableDisplay;
