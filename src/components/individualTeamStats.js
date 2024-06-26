import StatsTableDisplay from './statsTableDisplay';
import PlayerStatSummary from './playerStatSummary';
import { checkWinPercAndAverageAreNumbers } from '../helpers/playersHelper';
import config from '../config';

function IndividualTeamStats(props) {
    const day = props.day;
    const stats = props.stats;
    const playerStats = props.playerStats;
    const url = props.url;
    const displayUrl = props.displayUrl;

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
            opponentAgg,
            leaguePosition,
        } = stats;

        const allPlayerStats = Object.keys(playerStats)
            .sort()
            .map((player) => {
                const stats = playerStats[player][day.toLowerCase()];
                const { games, wins, aggDiff } = stats;
                let playerDayStats = {
                    player,
                    games,
                    wins,
                    average: aggDiff / games,
                    winPerc: (wins / games) * 100,
                };
                playerDayStats =
                    checkWinPercAndAverageAreNumbers(playerDayStats);
                return playerDayStats;
            });

        const totalDraws = awayDraws + homeDraws;
        const totalWins = awayWins + homeWins + cupWins;
        const totalLosses = awayLosses + homeLosses + cupLosses;
        const totalGames = totalDraws + totalWins + totalLosses;

        if (totalGames > 0) {
            return (
                <div
                    id={day.toLowerCase().replaceAll(' ', '') + '-team-results'}
                >
                    <StatsTableDisplay
                        totalGames={totalGames}
                        totalWins={totalWins}
                        totalLosses={totalLosses}
                        totalDraws={totalDraws}
                        agg={agg}
                        opponentAgg={opponentAgg}
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
                    <h3>PLAYERS</h3>
                    <PlayerStatSummary playerStats={allPlayerStats} />
                    <br />
                    {displayUrl && (
                        <p className="footnote">
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
                    )}
                </div>
            );
        } else {
            return <p>No games played</p>;
        }
    } else {
        return (
            <p>
                {config.teamNames.shortName} did not play in this league for the
                selected year
            </p>
        );
    }
}

export default IndividualTeamStats;
