import RecordsTableDisplay from './recordsTableDisplay';
import { CombinedRecordsProps } from '../../../types/interfaces';

function CombinedRecords(props: CombinedRecordsProps) {
    const stats = props.stats;

    const {
        minGames,
        mostGames,
        mostGamesPlayer,
        mostWins,
        mostWinsPlayer,
        bestWinPerc,
        bestWinPercPlayer,
        bestAverage,
        bestAveragePlayer,
    } = stats;

    if (mostGames && mostGames > 0) {
        return (
            <RecordsTableDisplay
                minGames={minGames}
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
