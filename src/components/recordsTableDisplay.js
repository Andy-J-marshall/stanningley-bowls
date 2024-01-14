import { Table } from 'react-bootstrap';
import { capitalizeText } from '../helpers/utils';

function RecordsTableDisplay(props) {
    const minGames = props.minGames;
    const playerOrTeam = props.playerOrTeam;
    const bestWinPerc = props.bestWinPerc;
    const bestWinPercPlayerOrTeam = props.bestWinPercPlayerOrTeam;
    // Player records
    const mostWins = props.mostWins;
    const mostWinsPlayer = props.mostWinsPlayer;
    const mostGames = props.mostGames;
    const mostGamesPlayer = props.mostGamesPlayer;
    const bestAverage = props.bestAverage;
    const bestAveragePlayer = props.bestAveragePlayer;
    // Team records
    const bestTeamAggPerGame = props.bestTeamAggPerGame;
    const bestTeamAggPerGameTeam = props.bestTeamAggPerGameTeam;
    const lowestAggConcededPerGame = props.lowestAggConcededPerGame;
    const lowestAggConcededPerGameTeam = props.lowestAggConcededPerGameTeam;
    const bestWinMargin = props.bestWinMargin;
    const bestWinMarginTeam = props.bestWinMarginTeam;

    return (
        <div className="center" style={{ width: '97%' }}>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>RECORD</th>
                        <th>VALUE</th>
                        <th>{playerOrTeam.toUpperCase()}</th>
                    </tr>
                </thead>
                <tbody>
                    {mostGames && mostGamesPlayer && mostGames > 0 ? (
                        <tr>
                            <td>Most games</td>
                            <td id="mostGames">{mostGames}</td>
                            <td id="mostGamesPlayer">{capitalizeText(mostGamesPlayer)}</td>
                        </tr>
                    ) : null}
                    {mostWins && mostWinsPlayer && mostWins > 0 ? (
                        <tr>
                            <td>Most wins</td>
                            <td id="mostWins">{mostWins}</td>
                            <td id="mostWinsPlayer">{capitalizeText(mostWinsPlayer)}</td>
                        </tr>
                    ) : null}
                    {bestWinPerc &&
                    bestWinPercPlayerOrTeam &&
                    bestWinPerc > 0 ? (
                        <tr>
                            <td>Highest win percentage</td>
                            <td id="bestWinPerc">{bestWinPerc.toFixed(0)}%</td>
                            <td id="bestWinPercPlayerOrTeam">{capitalizeText(bestWinPercPlayerOrTeam)}</td>
                        </tr>
                    ) : null}
                    {bestAverage && bestAveragePlayer && bestAverage > -22 ? (
                        <tr>
                            <td>Best average</td>
                            <td id="bestAverage">{bestAverage.toFixed(2)}</td>
                            <td id="bestAveragePlayer">{capitalizeText(bestAveragePlayer)}</td>
                        </tr>
                    ) : null}
                    {bestTeamAggPerGameTeam &&
                    bestTeamAggPerGame &&
                    bestTeamAggPerGame > 0 ? (
                        <tr>
                            <td>Most points scored per game</td>
                            <td id='bestAgg'>{bestTeamAggPerGame.toFixed(2)}</td>
                            <td id="bestAggTeam">{capitalizeText(bestTeamAggPerGameTeam)}</td>
                        </tr>
                    ) : null}
                    {lowestAggConcededPerGame &&
                    lowestAggConcededPerGameTeam &&
                    lowestAggConcededPerGame > 0 &&
                    lowestAggConcededPerGame <= 26 ? (
                        <tr>
                            <td>Fewest points conceded per game</td>
                            <td id="bestAggConceded">{lowestAggConcededPerGame.toFixed(2)}</td>
                            <td id="bestAggConcededTeam">
                                {capitalizeText(lowestAggConcededPerGameTeam)}
                            </td>
                        </tr>
                    ) : null}
                    {bestWinMargin &&
                    bestWinMarginTeam &&
                    bestWinMargin > 0 ? (
                        <tr>
                            <td>Best points difference</td>
                            <td id="bestWinMargin">{bestWinMargin.toFixed(0)}</td>
                            <td id="bestWinMarginTeam">{capitalizeText(bestWinMarginTeam)}</td>
                        </tr>
                    ) : null}
                </tbody>
            </Table>
            <p className="footnote">* Minimum of {minGames} games</p>
        </div>
    );
}

export default RecordsTableDisplay;
