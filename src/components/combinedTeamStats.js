import { combineTeamStats } from '../helpers/statsHelper';
import StatsTableDisplay from './statsTableDisplay';
import { Row, Col } from 'react-bootstrap';
import { Pie, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    Title
);

function CombinedTeamStats(props) {
    const stats = props.stats;

    const combinedStats = combineTeamStats(stats);
    const {
        combinedAwayWins,
        combinedHomeWins,
        combinedAwayLosses,
        combinedHomeLosses,
        combinedCupWins,
        combinedCupLosses,
        combinedHomeDraws,
        combinedAwayDraws,
        combinedAgg,
        combinedOpponentAgg,
        totalDraws,
        totalWins,
        totalLosses,
        totalGames,
    } = combinedStats;

    // TODO refactor
    const winData = {
        labels: ['Wins', 'Losses', 'Draws'],
        datasets: [
            {
                data: [totalWins, totalLosses, totalDraws],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(100, 122, 135, 0.2)',
                ],
                borderWidth: 2,
            },
        ],
    };
    const homeWinData = {
        labels: ['Wins', 'Losses', 'Draws'],
        datasets: [
            {
                data: [combinedHomeWins, combinedHomeLosses, combinedHomeDraws],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(100, 122, 135, 0.2)',
                ],
                borderWidth: 2,
            },
        ],
    };
    const awayWinData = {
        labels: ['Wins', 'Losses', 'Draws'],
        datasets: [
            {
                data: [combinedAwayWins, combinedAwayLosses, combinedAwayDraws],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(100, 122, 135, 0.2)',
                ],
                borderWidth: 2,
            },
        ],
    };
    const cupWinData = {
        labels: ['Wins', 'Losses'],
        datasets: [
            {
                data: [combinedCupWins, combinedCupLosses],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderWidth: 2,
            },
        ],
    };

    const aggregateData = {
        labels: ['For', 'Against'],
        datasets: [
            {
                label: 'Aggregate', // TODO this label looks weird
                data: [combinedAgg, combinedOpponentAgg],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: ['rgb(255, 99, 132)', 'rgb(255, 159, 64)'],
                borderWidth: 2,
            },
        ],
    };

    // TODO remove https://www.chartjs.org/docs/latest/charts/doughnut.html

    if (totalGames > 0) {
        return (
            // TODO these aren't centered
            <div className="center" id="combined-team-win-losses">
                <Row>
                    <h3>GAMES PLAYED</h3>
                    <p>{totalGames}</p>
                </Row>
                <h3>WINS & LOSSES</h3>
                <Row sm={1} md={2} lg={3} xl={4} className="g-4 tabs">
                    <Col>
                        <div style={{ width: '90%' }}>
                            <h4>TOTAL</h4>
                            <Pie data={winData} />
                        </div>
                    </Col>
                    <Col>
                        <div style={{ width: '90%' }}>
                            <h4>HOME</h4>
                            <Pie data={homeWinData} />
                        </div>
                    </Col>
                    <Col>
                        <div style={{ width: '90%' }}>
                            <h4>AWAY</h4>
                            <Pie data={awayWinData} />
                        </div>
                    </Col>
                    <Col>
                        <div style={{ width: '90%' }}>
                            <h4>CUP</h4>
                            <Pie data={cupWinData} />
                        </div>
                    </Col>
                </Row>
                <h3>AGGREGATES</h3>
                <Row>
                    <Col>
                        <Bar data={aggregateData} />
                    </Col>
                </Row>

                {/* TODO win percentages? */}

                <StatsTableDisplay
                    totalGames={totalGames}
                    totalWins={totalWins}
                    totalLosses={totalLosses}
                    totalDraws={totalDraws}
                    agg={combinedAgg}
                    opponentAgg={combinedOpponentAgg}
                    homeWins={combinedHomeWins}
                    awayWins={combinedAwayWins}
                    cupWins={combinedCupWins}
                    homeLosses={combinedHomeLosses}
                    awayLosses={combinedAwayLosses}
                    cupLosses={combinedCupLosses}
                    homeDraws={combinedHomeDraws}
                    awayDraws={combinedAwayDraws}
                />
            </div>
        );
    } else {
        return <p>No games played</p>;
    }
}

export default CombinedTeamStats;
