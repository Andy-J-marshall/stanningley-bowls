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
} from '../helpers/recordsHelper';

function Records(props: RecordsProps) {
    const stats = props.stats;

    const currentYear = new Date().getFullYear();
    const yearInTitle =
        currentYear !== Number(stats.statsYear) ? `${stats.statsYear}` : '';

    const { initialTeamRecords, teamsFound } = findLeaguesAvailableInData(
        stats.playerResults
    );

    const { highestTotalGames, teamRecords } = findMinNumberOfGames(
        stats.playerResults,
        teamsFound,
        initialTeamRecords
    );

    const {
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
        teamRecords,
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
            let teamName = '';
            let displayname = returnTabName(teamData.teamNames[0]);
            let teamRecord = null;

            // TODO possibly refactor this to a helper function?
            // Find A team stats
            for (const team of teamData.teamNames) {
                const tn = team.toLowerCase();
                const tr = teamRecords[tn];
                if (tr) {
                    if (tr.bestTeamAverage > -21) {
                        teamRecord = tr;
                        teamName = tn;
                        break;
                    }
                }

                // Check for a team with an (a) suffix if no team found
                const trWithASuffix = teamRecords[tn + ' (a)'];
                if (trWithASuffix && trWithASuffix.bestTeamAverage > -21) {
                    teamRecord = trWithASuffix;
                    teamName = tn;
                    break;
                }
            }

            // Find B team stats if they exist
            let bTeamRecord = null;
            if (teamData.bTeamForLeagueBool) {
                bTeamRecord =
                    teamRecords[teamName.replace(' (a)', '') + ' (b)'];
            }

            if (teamRecord || bTeamRecord) {
                if (
                    (teamRecord &&
                        teamRecord.bestTeamAveragePlayer.length > 0) ||
                    (bTeamRecord &&
                        bTeamRecord.bestTeamAveragePlayer.length > 0)
                ) {
                    return (
                        <Wrapper
                            displayname={displayname}
                            children={
                                <div>
                                    {teamRecord &&
                                        teamRecord.bestTeamAverage > -21 && (
                                            <RecordsTableDisplay
                                                day={teamName.replace(
                                                    ' (a)',
                                                    ''
                                                )}
                                                minGames={
                                                    teamRecord.minTeamGames
                                                }
                                                mostWins={
                                                    teamRecord.mostTeamWins
                                                }
                                                mostWinsPlayer={
                                                    teamRecord.mostTeamWinsPlayer
                                                }
                                                bestWinPerc={
                                                    teamRecord.bestTeamWinPerc
                                                }
                                                bestWinPercPlayer={
                                                    teamRecord.bestTeamWinPercPlayer
                                                }
                                                bestAverage={
                                                    teamRecord.bestTeamAverage
                                                }
                                                bestAveragePlayer={
                                                    teamRecord.bestTeamAveragePlayer
                                                }
                                            />
                                        )}
                                    {bTeamRecord && <hr />}
                                    {bTeamRecord &&
                                        bTeamRecord.bestTeamAverage > -21 && (
                                            <RecordsTableDisplay
                                                day={
                                                    teamName.replace(
                                                        ' (a)',
                                                        ''
                                                    ) + ' (b)'
                                                }
                                                minGames={
                                                    bTeamRecord.minTeamGames
                                                }
                                                mostWins={
                                                    bTeamRecord.mostTeamWins
                                                }
                                                mostWinsPlayer={
                                                    bTeamRecord.mostTeamWinsPlayer
                                                }
                                                bestWinPerc={
                                                    bTeamRecord.bestTeamWinPerc
                                                }
                                                bestWinPercPlayer={
                                                    bTeamRecord.bestTeamWinPercPlayer
                                                }
                                                bestAverage={
                                                    bTeamRecord.bestTeamAverage
                                                }
                                                bestAveragePlayer={
                                                    bTeamRecord.bestTeamAveragePlayer
                                                }
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

    if (mostGames > 0) {
        return (
            <div id="records">
                <h1>{yearInTitle} RECORDS</h1>
                <TeamTabs
                    allCombinedComponent={combinedRecordsComponent()}
                    teamComponents={returnAllComponentsForTeams()}
                />
            </div>
        );
    } else {
        return (
            <div>
                <h1>{yearInTitle} RECORDS</h1>
                <p>
                    No {config.teamNames.shortName} team stats available for the
                    selected year
                </p>
            </div>
        );
    }
}

export default Records;
