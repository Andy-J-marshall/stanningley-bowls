import { Table } from 'react-bootstrap';
import { config } from '../config';
import { StatsTableDisplayProps } from '../types/interfaces';

function TeamStatsTable(props: StatsTableDisplayProps) {
    const totalGames = props.totalGames;
    const totalWins = props.totalWins;
    const homeWins = props.homeWins || 0;
    const awayWins = props.awayWins || 0;
    const cupWins = props.cupWins || 0;
    const totalLosses = props.totalLosses;
    const homeLosses = props.homeLosses || 0;
    const awayLosses = props.awayLosses || 0;
    const cupLosses = props.cupLosses || 0;
    const totalDraws = props.totalDraws;
    const homeDraws = props.homeDraws || 0;
    const awayDraws = props.awayDraws || 0;
    const agg = props.agg;
    const opponentAgg = props.opponentAgg;

    const homeGames = homeDraws + homeWins + homeLosses;
    const awayGames = awayDraws + awayWins + awayLosses;
    const cupGames = cupWins + cupLosses;

    return (
        <div className="center table">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>statistic</th>
                        <th>value</th>
                    </tr>
                </thead>
                <tbody>
                    {totalGames > 0 ? (
                        <tr>
                            <td>Games</td>
                            <td id="totalGamesValue">{totalGames}</td>
                        </tr>
                    ) : null}
                    {totalWins >= 0 ? (
                        <tr>
                            <td>Wins</td>
                            <td id="totalWinsValue">{totalWins}</td>
                        </tr>
                    ) : null}
                    {totalLosses >= 0 ? (
                        <tr>
                            <td>Losses</td>
                            <td id="totalLossesValue">{totalLosses}</td>
                        </tr>
                    ) : null}
                    {totalDraws > 0 ? (
                        <tr>
                            <td>Draws</td>
                            <td id="totalDrawsValue">{totalDraws}</td>
                        </tr>
                    ) : null}
                    {totalWins >= 0 ? (
                        <tr>
                            <td>Win percentage</td>
                            <td id="totalWinPercValue">
                                {((totalWins / totalGames) * 100).toFixed(0)}%
                            </td>
                        </tr>
                    ) : null}
                    {homeGames > 0 ? (
                        <tr>
                            <td>Home win percentage</td>
                            <td id="totalHomeWinPercValue">
                                {((homeWins / homeGames) * 100).toFixed(0)}%
                            </td>
                        </tr>
                    ) : null}
                    {awayGames > 0 ? (
                        <tr>
                            <td>Away win percentage</td>
                            <td id="totalAwayWinPercValue">
                                {((awayWins / awayGames) * 100).toFixed(0)}%
                            </td>
                        </tr>
                    ) : null}
                    {cupGames > 0 ? (
                        <tr>
                            <td>Cup win percentage</td>
                            <td id="totalCupWinPercValue">
                                {((cupWins / cupGames) * 100).toFixed(0)}%
                            </td>
                        </tr>
                    ) : null}
                    {agg > 0 ? (
                        <tr>
                            <td>{config.teamNames.shortName} aggregate</td>
                            <td id="totalAggValue">{agg}</td>
                        </tr>
                    ) : null}
                    {opponentAgg > 0 ? (
                        <tr>
                            <td>Opponent aggregate</td>
                            <td id="totalOpponentAggValue">{opponentAgg}</td>
                        </tr>
                    ) : null}
                </tbody>
            </Table>
        </div>
    );
}

export default TeamStatsTable;
