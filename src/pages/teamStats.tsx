import { useEffect } from 'react';
import IndividualTeamStats from '../components/individualTeamStats';
import CombinedTeamStats from '../components/combinedTeamStats';
import TeamTabs from '../components/teamTabs';
import { config } from '../config';
import { returnTabName } from '../helpers/statsHelper';
import { TeamResultsStatsFile, TeamStatsProps } from '../types/interfaces';
import Wrapper from '../components/wrapper';

function TeamStats(props: TeamStatsProps) {
    const stats = props.stats;

    const teamName = config.teamNames.shortName;
    const { playerResults, teamResults } = stats;

    const currentYear = new Date().getFullYear();
    const yearInTitle =
        currentYear !== Number(stats.statsYear) ? `${stats.statsYear}` : '';

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    function returnTeamComponents() {
        return config.historicTeamInfo.map((teamData) => {
            let teamName = '';
            let displayname = '';
            let teamStats = null;
            displayname = returnTabName(teamData.teamNames[0]);

            // Find A team stats
            for (const team of teamData.teamNames) {
                const tn = team.toLowerCase();
                const ts = teamResults?.find(
                    (teamResult: TeamResultsStatsFile) => {
                        return teamResult.day.toLowerCase() === tn;
                    }
                );

                if (ts) {
                    if (ts.totalGamesPlayed > 0) {
                        teamStats = ts;
                        teamName = tn;
                        break;
                    }
                }

                // Check for a team with an (a) suffix if no team found
                const tsWithASuffix = teamResults?.find(
                    (teamResult: TeamResultsStatsFile) => {
                        return teamResult.day.toLowerCase() === tn + ' (a)';
                    }
                );
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
                bTeamStats = teamResults?.find(
                    (teamResult: TeamResultsStatsFile) => {
                        return (
                            teamResult.day.toLowerCase() ===
                            teamName.replace(' (a)', '') + ' (b)'
                        );
                    }
                );
                bTeamInLeague = true;
            }

            if (teamStats || bTeamStats) {
                if (
                    (teamStats && teamStats.totalGamesPlayed > 0) ||
                    (bTeamStats && bTeamStats.totalGamesPlayed > 0)
                ) {
                    return (
                        <Wrapper
                            displayname={displayname}
                            children={
                                <div>
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
                                            day={
                                                teamName.replace(' (a)', '') +
                                                ' (b)'
                                            }
                                            stats={bTeamStats}
                                            playerStats={playerResults}
                                        />
                                    )}
                                </div>
                            }
                        ></Wrapper>
                    );
                } else {
                    return (
                        <Wrapper
                            displayname={displayname}
                            children={<p>No games played</p>}
                        ></Wrapper>
                    );
                }
            } else {
                return (
                    <Wrapper
                        displayname={displayname}
                        children={
                            <p>
                                {config.teamNames.shortName} did not play on
                                this day for the selected year
                            </p>
                        }
                    ></Wrapper>
                );
            }
        });
    }

    if (teamResults) {
        return (
            <div id="team-stats">
                <h1>{yearInTitle} TEAM STATS</h1>
                <TeamTabs
                    allCombinedComponent={
                        <CombinedTeamStats stats={teamResults} />
                    }
                    teamComponents={returnTeamComponents()}
                />
                <br />
            </div>
        );
    } else {
        return (
            <div id="team-stats-unavailable">
                <h1>{yearInTitle} TEAM STATS</h1>
                <p>
                    No {config.teamNames.shortName} team stats available for the
                    selected year
                </p>
            </div>
        );
    }
}

export default TeamStats;
