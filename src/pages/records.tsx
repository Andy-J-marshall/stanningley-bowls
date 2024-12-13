import { useEffect } from 'react';
import TeamTabs from '../components/teams/teamTabs';
import TeamTabsWrapper from '../components/teams/teamTabsWrapper';
import CombinedRecords from '../components/teams/records/combinedRecords';
import IndividualRecords from '../components/teams/records/individualRecords';
import { RecordsProps } from '../types/interfaces';
import { returnTabName } from '../helpers/statsHelper';
import {
    findLeaguesAvailableInData,
    findMinNumberOfGames,
    findPlayerRecords,
    findTeamRecords,
} from '../helpers/recordsHelper';
import { config } from '../config';

function Records(props: RecordsProps) {
    const stats = props.stats;

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    const currentYear = new Date().getFullYear();
    const yearInTitle =
        currentYear !== Number(stats.statsYear)
            ? `${stats.statsYear.toLowerCase()}`
            : '';

    const { initialTeamRecords, teamsFound } = findLeaguesAvailableInData(
        stats.playerResults
    );

    const { highestTotalGames, teamRecordsWithMinGames } = findMinNumberOfGames(
        stats.playerResults,
        teamsFound,
        initialTeamRecords
    );

    const { teamRecords, combinedStats } = findPlayerRecords(
        stats.playerResults,
        teamsFound,
        teamRecordsWithMinGames,
        highestTotalGames
    );

    function returnAllComponentsForTeams() {
        return config.historicTeamInfo.map((teamData) => {
            let displayname = returnTabName(teamData.teamNames[0]);

            const { teamName, teamRecord, bTeamRecord } = findTeamRecords(
                teamData,
                teamRecords
            );

            if (teamRecord || bTeamRecord) {
                return (
                    <TeamTabsWrapper
                        displayname={displayname}
                        children={
                            <div>
                                {teamRecord && (
                                    <IndividualRecords
                                        stats={teamRecord}
                                        teamName={teamName}
                                        bTeam={false}
                                    />
                                )}
                                {bTeamRecord && (
                                    <IndividualRecords
                                        stats={bTeamRecord}
                                        teamName={teamName}
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

    if (combinedStats?.mostGames > 0) {
        return (
            <div id="records">
                <h1>{yearInTitle} records</h1>
                <TeamTabs
                    allCombinedComponent={
                        <CombinedRecords stats={combinedStats} />
                    }
                    teamComponents={returnAllComponentsForTeams()}
                />
                <br />
                <p className="footnote">Last Updated: {stats.lastUpdated}</p>
            </div>
        );
    } else {
        return (
            <div className="center" style={{ width: '95%' }}>
                <h1>records</h1>
                <p>No records available for the selected year</p>
            </div>
        );
    }
}

export default Records;
