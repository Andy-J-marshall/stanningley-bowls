import { combineTeamStats } from '../helpers/statsHelper';
import StatsTableDisplay from './statsTableDisplay';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

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

    const data = {
        labels: ['Wins', 'Losses', 'Draws'],
        datasets: [
            {
                data: [totalWins, totalLosses, totalDraws],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(100, 122, 135, 0.2)',
                ],
                borderWidth: 1,
            },
        ],
    };
    // TODO https://www.chartjs.org/docs/latest/charts/doughnut.html

    const options = {
        responsive: true,
        // maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
            },
        },
    };

    if (totalGames > 0) {
        return (
            <div id="combined-team-win-losses">
                <div className="center" style={{ width: '40%' }}>
                    <Pie data={data} options={options} />
                </div>

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
