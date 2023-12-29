import { Table } from 'react-bootstrap';
import config from '../config';

function StatsTableDisplay(props) {
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
    const leaguePosition = props.leaguePosition;

    const homeGames = homeDraws + homeWins + homeLosses;
    const awayGames = awayDraws + awayWins + awayLosses;
    const cupGames = cupWins + cupLosses;

    return (
        <div className="center table" style={{ width: '98%' }}>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>STATISTIC</th>
                        <th>VALUE</th>
                    </tr>
                </thead>
                <tbody>
                    {totalGames > 0 ? (
                        <tr>
                            <td>Games</td>
                            <td>{totalGames}</td>
                        </tr>
                    ) : null}
                    {leaguePosition >= 0 ? (
                        <tr>
                            <td>League position</td>
                            <td>{leaguePosition}</td>
                        </tr>
                    ) : null}
                    {totalWins >= 0 ? (
                        <tr>
                            <td>Wins</td>
                            <td>{totalWins}</td>
                        </tr>
                    ) : null}
                    {totalLosses >= 0 ? (
                        <tr>
                            <td>Losses</td>
                            <td>{totalLosses}</td>
                        </tr>
                    ) : null}
                    {totalDraws > 0 ? (
                        <tr>
                            <td>Draws</td>
                            <td>{totalDraws}</td>
                        </tr>
                    ) : null}
                    {homeGames > 0 ? (
                        <tr>
                            <td>Home win percentage</td>
                            <td>
                                {((homeWins / homeGames) * 100).toFixed(2)} %
                            </td>
                        </tr>
                    ) : null}
                    {awayGames > 0 ? (
                        <tr>
                            <td>Away win percentage</td>
                            <td>
                                {((awayWins / awayGames) * 100).toFixed(2)} %
                            </td>
                        </tr>
                    ) : null}
                    {cupGames > 0 ? (
                        <tr>
                            <td>Cup win percentage</td>
                            <td>{((cupWins / cupGames) * 100).toFixed(2)} %</td>
                        </tr>
                    ) : null}
                    {agg > 0 ? (
                        <tr>
                            <td>{config.teamNames.short} aggregate</td>
                            <td>{agg}</td>
                        </tr>
                    ) : null}
                    {opponentAgg > 0 ? (
                        <tr>
                            <td>Opponent aggregate</td>
                            <td>{opponentAgg}</td>
                        </tr>
                    ) : null}
                </tbody>
            </Table>
        </div>
    );
}

export default StatsTableDisplay;
