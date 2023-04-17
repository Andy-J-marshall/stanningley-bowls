import StatsTableDisplay from './statsTableDisplay';
import PlayerStatSummary from './playerStatSummary';
import config from '../config';

function IndividualTeamStats(props) {
    const day = props.day;
    const stats = props.stats;
    const playerStats = props.playerStats;
    const url = props.url;

    if (stats) {
        const {
            awayWins,
            homeWins,
            cupWins,
            cupLosses,
            awayLosses,
            homeLosses,
            homeDraws,
            awayDraws,
            agg,
            totalPoints,
            opponentAgg,
            opponentTotalPoints,
            leaguePosition,
        } = stats;

        const allPlayerStats = Object.keys(playerStats)
            .sort()
            .map((player) => {
                const stats = playerStats[player][day.toLowerCase()];
                const { games, wins, aggDiff } = stats;
                const playerDayStats = {
                    player,
                    games,
                    wins,
                    average: aggDiff / games,
                };
                return playerDayStats;
            });

        const totalDraws = awayDraws + homeDraws;
        const totalWins = awayWins + homeWins + cupWins;
        const totalLosses = awayLosses + homeLosses + cupLosses;
        const totalGames = totalDraws + totalWins + totalLosses;

        if (totalGames > 0) {
            return (
                <div id={day + '-team-results'}>
                    <StatsTableDisplay
                        totalGames={totalGames}
                        totalWins={totalWins}
                        totalLosses={totalLosses}
                        totalDraws={totalDraws}
                        agg={agg}
                        opponentAgg={opponentAgg}
                        teamPoints={totalPoints}
                        opponentTeamPoints={opponentTotalPoints}
                        homeWins={homeWins}
                        awayWins={awayWins}
                        cupWins={cupWins}
                        homeLosses={homeLosses}
                        awayLosses={awayLosses}
                        cupLosses={cupLosses}
                        homeDraws={homeDraws}
                        awayDraws={awayDraws}
                        leaguePosition={leaguePosition}
                    />
                    <br />
                    <h1>PLAYERS</h1>
                    <PlayerStatSummary playerStats={allPlayerStats} />
                    <br />
                    <p>
                        The full league stats can be found on{' '}
                        <a
                            style={{ textDecoration: 'none' }}
                            target="_blank"
                            href={url}
                        >
                            Bowlsnet
                        </a>
                        .
                    </p>
                </div>
            );
        } else {
            return <p>No games played</p>;
        }
    } else {
        return (
            <p>
                {config.teamNames.short} did not play in this league for the
                selected year
            </p>
        );
    }
}

export default IndividualTeamStats;
