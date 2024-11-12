import { CombinedRecordsProps } from '../types/interfaces';
import RecordsTableDisplay from './recordsTableDisplay';

function CombinedRecords(props: CombinedRecordsProps) {
    const stats = props.stats;

    const {
        minTotalGames,
        mostGames,
        mostGamesPlayer,
        mostWins,
        mostWinsPlayer,
        bestWinPerc,
        bestWinPercPlayer,
        bestAverage,
        bestAveragePlayer,
    } = stats;

    if (mostGames > 0) {
        return (
            <RecordsTableDisplay
                minGames={minTotalGames}
                mostGames={mostGames}
                mostGamesPlayer={mostGamesPlayer}
                mostWins={mostWins}
                mostWinsPlayer={mostWinsPlayer}
                bestWinPerc={bestWinPerc}
                bestWinPercPlayer={bestWinPercPlayer}
                bestAverage={bestAverage}
                bestAveragePlayer={bestAveragePlayer}
            />
        );
    } else {
        return <p>No games played</p>;
    }
}

export default CombinedRecords;
