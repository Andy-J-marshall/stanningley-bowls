import { IndividualRecordsProps } from '../types/interfaces';
import RecordsTableDisplay from './recordsTableDisplay';

function IndividualRecords(props: IndividualRecordsProps) {
    const stats = props.stats;
    const teamName = props.teamName;
    const bTeam = props.bTeam;

    const displayName = bTeam
        ? teamName.replace(' (a)', '') + ' (b)'
        : teamName;

    if (bTeam && (!stats.bestAverage || stats.bestAverage < -26)) {
        return null;
    }

    if (stats && stats.bestAverage >= -26) {
        const {
            minGames,
            mostWins,
            mostWinsPlayer,
            bestWinPerc,
            bestWinPercPlayer,
            bestAverage,
            bestAveragePlayer,
        } = stats;

        return (
            <div>
                {bTeam && <hr />}
                <RecordsTableDisplay
                    teamName={displayName}
                    minGames={minGames}
                    mostWins={mostWins}
                    mostWinsPlayer={mostWinsPlayer}
                    bestWinPerc={bestWinPerc}
                    bestWinPercPlayer={bestWinPercPlayer}
                    bestAverage={bestAverage}
                    bestAveragePlayer={bestAveragePlayer}
                />
            </div>
        );
    } else {
        return <p>No games played</p>;
    }
}

export default IndividualRecords;
