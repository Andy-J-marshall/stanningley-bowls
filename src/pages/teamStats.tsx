import { useEffect } from 'react';
import IndividualTeamStats from '../components/teams/teamStats/individualTeamStats';
import CombinedTeamStats from '../components/teams/teamStats/combinedTeamStats';
import TeamTabs from '../components/teams/teamTabs';
import TeamTabsWrapper from '../components/teams/teamTabsWrapper';
import { TeamStatsProps } from '../types/interfaces';
import { returnTabName } from '../helpers/statsHelper';
import { findTeamStats } from '../helpers/teamStatsHelper';
import { config } from '../config';

function TeamStats(props: TeamStatsProps) {
    const stats = props.stats;

    const { teamResults } = stats;
    const currentYear = new Date().getFullYear();
    const yearInTitle =
        currentYear !== Number(stats.statsYear) ? `${stats.statsYear}` : '';

    const anyGamesPlayed = teamResults?.some(
        (team) => team.totalGamesPlayed > 0
    );

    // TODO fix this and records for all years

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
                    <TeamTabsWrapper
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
                            </div>
                        }
                    ></TeamTabsWrapper>
                );
            } else {
                return (
                    <TeamTabsWrapper
                        displayname={displayname}
                        children={
                            <p className="center" style={{ width: '95%' }}>
                                {config.teamNames.shortName} did not play on
                                this day for the selected year
                            </p>
                        }
                    ></TeamTabsWrapper>
                );
            }
        });
    }

    if (teamResults && anyGamesPlayed) {
        return (
            <div>
                <h1>{yearInTitle} team stats</h1>
                <TeamTabs
                    allCombinedComponent={
                        <CombinedTeamStats stats={teamResults} />
                    }
                    teamComponents={returnTeamComponents()}
                />
                <br />
                <p className="footnote">Last Updated: {stats.lastUpdated}</p>
            </div>
        );
    } else {
        return (
            <div
                className="center"
                style={{ width: '95%' }}
            >
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
