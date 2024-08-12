import { useEffect } from 'react';
import IndividualTeamStats from './individualTeamStats';
import CombinedTeamStats from './combinedTeamStats';
import TeamTabs from './teamTabs';
import config from '../config';
import { returnTabName } from '../helpers/teamsHelper';

function TeamStats(props) {
    const stats = props.stats;

    const teamName = config.teamNames.shortName;
    const { playerResults, teamResults } = stats;

    const currentYear = new Date().getFullYear();
    const yearInTitle =
        currentYear !== Number(stats.statsYear) ? `${stats.statsYear}` : '';

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    function allComponent() {
        return <CombinedTeamStats stats={teamResults} />;
    }

    function returnTeamComponents() {
        return config.historicTeamInfo.map((teamData) => {
            let teamName = '';
            let displayname = '';
            let teamStats = null;
            displayname = returnTabName(teamData.teamNames[0]);

            // Find A team stats
            for (const team of teamData.teamNames) {
                const tn = team.toLowerCase();
                const ts = teamResults.find((teamResult) => {
                    return teamResult.day.toLowerCase() === tn;
                });

                if (ts) {
                    if (ts.totalGamesPlayed > 0) {
                        teamStats = ts;
                        teamName = tn;
                        break;
                    }
                }

                // Check for a team with an (a) suffix if no team found
                const tsWithASuffix = teamResults.find((teamResult) => {
                    return teamResult.day.toLowerCase() === tn + ' (a)';
                });
                if (tsWithASuffix && tsWithASuffix.totalGamesPlayed > 0) {
                    teamStats = tsWithASuffix;
                    teamName = tn;
                    break;
                }
            }

            // Find B team stats if they exist
            let bTeamStats = null;
            let bTeamInLeague = false;
            if (teamData.bTeamForLeagueBool) {
                bTeamStats = teamResults.find((teamResult) => {
                    return (
                        teamResult.day.toLowerCase() ===
                        teamName.replace(' (a)', '') + ' (b)'
                    );
                });
                bTeamInLeague = true;
            }

            if (teamStats || bTeamStats) {
                if (
                    teamStats.totalGamesPlayed > 0 ||
                    bTeamStats.totalGamesPlayed > 0
                ) {
                    return (
                        <div displayname={displayname}>
                            {teamStats && (
                                <IndividualTeamStats
                                    day={teamName}
                                    stats={teamStats}
                                    playerStats={playerResults}
                                />
                            )}
                            {bTeamStats && (
                                <div>
                                    <br />
                                    <hr />
                                </div>
                            )}
                            {bTeamStats && (
                                <IndividualTeamStats
                                    day={teamName.replace(' (a)', '') + ' (b)'}
                                    stats={bTeamStats}
                                    playerStats={playerResults}
                                />
                            )}
                        </div>
                    );
                } else {
                    return <p displayname={displayname}>No games played</p>;
                }
            } else {
                return (
                    <div displayname={displayname}>
                        <p>
                            {config.teamNames.shortName} did not play on this
                            day for the selected year
                        </p>
                    </div>
                );
            }
        });
    }

    if (teamResults) {
        return (
            <div id="team-stats" className="center page-component">
                <h1>{yearInTitle} TEAM STATS</h1>
                <TeamTabs
                    allCombinedComponent={allComponent()}
                    teamComponents={returnTeamComponents()}
                />
                <br />
            </div>
        );
    } else {
        return (
            <div id="team-stats-unavailable" className="center page-component">
                <h1>{yearInTitle} TEAM STATS</h1>
                <p>
                    No {teamName} team stats available, please select another
                    year.
                </p>
            </div>
        );
    }
}

export default TeamStats;
