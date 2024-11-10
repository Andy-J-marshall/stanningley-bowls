import { useEffect } from 'react';
import TeamTabs from '../components/teamTabs';
import RecordsTableDisplay from '../components/recordsTableDisplay';
import Wrapper from '../components/wrapper';
import { config } from '../config';
import { returnTabName } from '../helpers/statsHelper';
import { RecordsProps } from '../types/interfaces';
import {
    findLeaguesAvailableInData,
    findMinNumberOfGames,
    findPlayerRecords,
    findTeamRecords,
} from '../helpers/recordsHelper';

function Records(props: RecordsProps) {
    const stats = props.stats;

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    const currentYear = new Date().getFullYear();
    const yearInTitle =
        currentYear !== Number(stats.statsYear) ? `${stats.statsYear}` : '';

    const { initialTeamRecords, teamsFound } = findLeaguesAvailableInData(
        stats.playerResults
    );

    const { highestTotalGames, teamRecordsWithMinGames } = findMinNumberOfGames(
        stats.playerResults,
        teamsFound,
        initialTeamRecords
    );

    const {
        teamRecords,
        minTotalGames,
        mostGames,
        mostGamesPlayer,
        mostWins,
        mostWinsPlayer,
        bestWinPerc,
        bestWinPercPlayer,
        bestAverage,
        bestAveragePlayer,
    } = findPlayerRecords(
        stats.playerResults,
        teamsFound,
        teamRecordsWithMinGames,
        highestTotalGames
    );

    function combinedRecordsComponent() {
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

    function returnAllComponentsForTeams() {
        return config.historicTeamInfo.map((teamData) => {
            let displayname = returnTabName(teamData.teamNames[0]);

            const { teamName, teamRecord, bTeamRecord } = findTeamRecords(
                teamData,
                teamRecords
            );

            if (teamRecord || bTeamRecord) {
                return (
                    <Wrapper
                        displayname={displayname}
                        children={
                            <div>
                                <RecordsTableDisplay
                                    day={teamName.replace(' (a)', '')}
                                    bTeam={false}
                                    minGames={teamRecord?.minTeamGames}
                                    mostWins={teamRecord?.mostTeamWins}
                                    mostWinsPlayer={
                                        teamRecord?.mostTeamWinsPlayer
                                    }
                                    bestWinPerc={teamRecord?.bestTeamWinPerc}
                                    bestWinPercPlayer={
                                        teamRecord?.bestTeamWinPercPlayer
                                    }
                                    bestAverage={teamRecord?.bestTeamAverage}
                                    bestAveragePlayer={
                                        teamRecord?.bestTeamAveragePlayer
                                    }
                                />
                                <RecordsTableDisplay
                                    day={teamName.replace(' (a)', '') + ' (b)'}
                                    bTeam={true}
                                    minGames={bTeamRecord?.minTeamGames}
                                    mostWins={bTeamRecord?.mostTeamWins}
                                    mostWinsPlayer={
                                        bTeamRecord?.mostTeamWinsPlayer
                                    }
                                    bestWinPerc={bTeamRecord?.bestTeamWinPerc}
                                    bestWinPercPlayer={
                                        bTeamRecord?.bestTeamWinPercPlayer
                                    }
                                    bestAverage={bTeamRecord?.bestTeamAverage}
                                    bestAveragePlayer={
                                        bTeamRecord?.bestTeamAveragePlayer
                                    }
                                />
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

    if (mostGames > 0) {
        return (
            <div id="records">
                <h1>{yearInTitle} records</h1>
                <TeamTabs
                    allCombinedComponent={combinedRecordsComponent()}
                    teamComponents={returnAllComponentsForTeams()}
                />
                <br />
                <p className="footnote">Last Updated: {stats.lastUpdated}</p>
            </div>
        );
    } else {
        return (
            <div>
                <h1>{yearInTitle} records</h1>
                <p>
                    No {config.teamNames.shortName} team stats available for the
                    selected year
                </p>
            </div>
        );
    }
}

export default Records;
