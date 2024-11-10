import { useEffect } from 'react';
import IndividualTeamStats from '../components/individualTeamStats';
import CombinedTeamStats from '../components/combinedTeamStats';
import TeamTabs from '../components/teamTabs';
import { config } from '../config';
import { returnTabName } from '../helpers/statsHelper';
import { TeamStatsProps } from '../types/interfaces';
import Wrapper from '../components/wrapper';
import { findTeamStats } from '../helpers/teamStatsHelper';

function TeamStats(props: TeamStatsProps) {
    const stats = props.stats;

    const { teamResults } = stats;
    const currentYear = new Date().getFullYear();
    const yearInTitle =
        currentYear !== Number(stats.statsYear) ? `${stats.statsYear}` : '';

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    function returnTeamComponents() {
        return config.historicTeamInfo.map((teamData) => {
            const displayname = returnTabName(teamData.teamNames[0]);
            const { teamName, teamStats, bTeamStats } = findTeamStats(
                teamData,
                teamResults
            );

            if (teamStats || bTeamStats) {
                return (
                    <Wrapper
                        displayname={displayname}
                        children={
                            <div>
                                {teamStats && (
                                    <IndividualTeamStats
                                        day={teamName}
                                        stats={teamStats}
                                        bTeam={false}
                                    />
                                )}
                                {bTeamStats && (
                                    <IndividualTeamStats
                                        day={
                                            teamName.replace(' (a)', '') +
                                            ' (b)'
                                        }
                                        stats={bTeamStats}
                                        bTeam={true}
                                    />
                                )}
                                <br />
                                <p className="footnote">
                                    Last Updated: {stats.lastUpdated}
                                </p>
                            </div>
                        }
                    ></Wrapper>
                );
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
                <h1>{yearInTitle} team stats</h1>
                <TeamTabs
                    allCombinedComponent={
                        <div>
                            <CombinedTeamStats stats={teamResults} />
                            <br />
                            <p className="footnote">
                                Last Updated: {stats.lastUpdated}
                            </p>
                        </div>
                    }
                    teamComponents={returnTeamComponents()}
                />
            </div>
        );
    } else {
        return (
            <div id="team-stats-unavailable">
                <h1>{yearInTitle} team stats</h1>
                <p>
                    No {config.teamNames.shortName} team stats available for the
                    selected year
                </p>
            </div>
        );
    }
}

export default TeamStats;
