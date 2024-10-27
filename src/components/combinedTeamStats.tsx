import { combineTeamStats } from '../helpers/teamStatsHelper';
import { CombinedTeamStatsProps } from '../types/interfaces';
import StatsTableDisplay from './statsTableDisplay';

function CombinedTeamStats(props: CombinedTeamStatsProps) {
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

    if (totalGames > 0) {
        return (
            <div id="combined-team-win-losses">
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
