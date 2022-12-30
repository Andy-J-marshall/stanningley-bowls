import { combineTeamStats } from '../helpers/statsHelper';
import StatsTableDisplay from './statsTableDisplay';

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
        combinedTotalPoints,
        combinedOpponentAgg,
        combinedOpponentTotalPoints,
        combinedBeaten,
        combinedBeatenBy,
        combinedDrawnWith,
        totalDraws,
        totalWins,
        totalLosses,
        totalGames,
    } = combinedStats;

    if (totalGames > 0) {
        return (
            <div id="combined-team-results">
                <div id="combined-team-win-losses">
                    <StatsTableDisplay
                        totalGames={totalGames}
                        totalWins={totalWins}
                        totalLosses={totalLosses}
                        totalDraws={totalDraws}
                        agg={combinedAgg}
                        opponentAgg={combinedOpponentAgg}
                        teamPoints={combinedTotalPoints}
                        opponentTeamPoints={combinedOpponentTotalPoints}
                        teamsBeaten={combinedBeaten}
                        teamsLostTo={combinedBeatenBy}
                        teamsDrawn={combinedDrawnWith}
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
            </div>
        );
    } else {
        return <p>No games played</p>;
    }
}

export default CombinedTeamStats;
