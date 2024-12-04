import { assert, expect } from 'chai';
import {
    findLeaguesAvailableInData,
    findMinNumberOfGames,
    findPlayerRecords,
    findTeamRecords,
} from '../recordsHelper';
import { config } from '../../config';
import stats2022 from '../../data/stanningleyStats2022.json';
import stats2024 from '../../data/stanningleyStats2024.json';
const playerResults22 = stats2022.playerResults;
const playerResults24 = stats2024.playerResults;

describe('#RecordsHelper Tests', () => {
    describe('findLeaguesAvailableInData', () => {
        it('Can return list of teams found', () => {
            const { teamsFound } = findLeaguesAvailableInData(playerResults22);
            expect(teamsFound).to.deep.equal([
                'monday combined leeds',
                'tuesday vets leeds',
                'thursday vets leeds',
                'saturday leeds',
            ]);
        });

        it('Can return correct teams records', () => {
            const { initialTeamRecords } =
                findLeaguesAvailableInData(playerResults22);

            expect(Object.keys(initialTeamRecords).length).to.equal(22);
            const teamRecord = initialTeamRecords['monday combined leeds'];

            expect(teamRecord).to.deep.equal({
                minGames: 1,
                mostGames: 0,
                mostWins: 0,
                bestAverage: -27,
                bestWinPerc: 0,
                mostWinsPlayer: [],
                bestAveragePlayer: [],
                bestWinPercPlayer: [],
            });
        });
    });

    describe('findMinNumberOfGames', () => {
        it('Returns minimum number of games to qualify for team records', () => {
            const { teamsFound, initialTeamRecords } =
                findLeaguesAvailableInData(playerResults22);
            const { highestTotalGames } = findMinNumberOfGames(
                playerResults22,
                teamsFound,
                initialTeamRecords
            );

            expect(highestTotalGames).to.equal(53);
        });

        it('Returns minimum number of games to qualify for each team in the team records', () => {
            const { teamsFound, initialTeamRecords } =
                findLeaguesAvailableInData(playerResults22);
            const { teamRecordsWithMinGames } = findMinNumberOfGames(
                playerResults22,
                teamsFound,
                initialTeamRecords
            );

            const teamRecord = teamRecordsWithMinGames['monday combined leeds'];
            const teamRecord2 = teamRecordsWithMinGames['saturday leeds'];
            const teamWithNoStatsDataForYear =
                teamRecordsWithMinGames['tuesday leeds'];

            expect(teamRecord.mostGames).to.equal(19);
            expect(teamRecord2.mostGames).to.equal(17);
            expect(teamWithNoStatsDataForYear.mostGames).to.equal(0);
        });
    });

    // TODO failing tests
    describe('findPlayerRecords', () => {
        it('Return player records', () => {
            const { teamsFound, initialTeamRecords } =
                findLeaguesAvailableInData(playerResults22);
            const { highestTotalGames, teamRecordsWithMinGames } =
                findMinNumberOfGames(
                    playerResults22,
                    teamsFound,
                    initialTeamRecords
                );
            const { teamRecords, combinedStats } = findPlayerRecords(
                playerResults22,
                teamsFound,
                teamRecordsWithMinGames,
                highestTotalGames
            );

            const teamsInTeamRecords = Object.keys(teamRecords);
            const teamsInRecordsWithGames = teamsInTeamRecords.filter(
                (t) => teamRecords[t].mostWins > 0
            );

            const {
                minGames,
                mostGamesPlayer,
                mostGames,
                mostWins,
                mostWinsPlayer,
                bestWinPerc,
                bestWinPercPlayer,
                bestAverage,
                bestAveragePlayer,
            } = combinedStats;

            expect(minGames).to.equal(15);
            expect(mostGamesPlayer).to.deep.equal(['paul bowes']);
            expect(mostGames).to.equal(53);
            expect(mostWins).to.equal(43);
            expect(mostWinsPlayer).to.deep.equal(['paul bowes']);
            expect(bestWinPerc).to.equal(100);
            expect(bestWinPercPlayer).to.deep.equal(['john armitage']);
            expect(bestAverage).to.equal(11.666666666666666);
            expect(bestAveragePlayer).to.deep.equal(['john armitage']);

            expect(teamsInTeamRecords).to.have.length(22);
            expect(teamsInRecordsWithGames).to.have.length(4);
        });
    });

    describe('findTeamRecords', () => {
        const { initialTeamRecords, teamsFound } =
            findLeaguesAvailableInData(playerResults24);

        const { teamRecordsWithMinGames, highestTotalGames } =
            findMinNumberOfGames(
                playerResults24,
                teamsFound,
                initialTeamRecords
            );

        const { teamRecords } = findPlayerRecords(
            playerResults24,
            teamsFound,
            teamRecordsWithMinGames,
            highestTotalGames
        );

        it('B team records should be null when there is no B team on that day', () => {
            const teamInfo = config.historicTeamInfo.find((t) =>
                t.teamNames.includes('tuesday leeds')
            );

            if (!teamInfo) {
                assert.fail('Team info not found in config file');
            }

            const { bTeamRecord } = findTeamRecords(
                teamInfo,
                teamRecordsWithMinGames
            );

            expect(bTeamRecord).to.be.null;
        });

        it('Team name should be correctly returned', () => {
            const teamInfo = config.historicTeamInfo.find((t) =>
                t.teamNames.includes('saturday leeds')
            );

            if (!teamInfo) {
                assert.fail('Team info not found in config file');
            }

            const { teamName } = findTeamRecords(teamInfo, teamRecords);

            expect(teamName).to.equal('saturday leeds');
        });

        it('Team records should be correct', () => {
            const teamInfo = config.historicTeamInfo.find((t) =>
                t.teamNames.includes('saturday leeds')
            );

            if (!teamInfo) {
                assert.fail('Team info not found in config file');
            }

            const { teamRecord } = findTeamRecords(
                teamInfo!,
                teamRecordsWithMinGames
            );

            expect(teamRecord).to.deep.equal({
                minGames: 11,
                mostGames: 21,
                mostWins: 18,
                bestAverage: 8.15,
                bestWinPerc: 85.71428571428571,
                mostWinsPlayer: ['andy marshall'],
                bestAveragePlayer: ['paul bowes'],
                bestWinPercPlayer: ['andy marshall'],
            });
        });

        it('B team records should be correct', () => {
            const teamInfo = config.historicTeamInfo.find((t) =>
                t.teamNames.includes('saturday leeds')
            );

            if (!teamInfo) {
                assert.fail('Team info not found in config file');
            }

            const { bTeamRecord } = findTeamRecords(
                teamInfo!,
                teamRecordsWithMinGames
            );

            expect(bTeamRecord).to.deep.equal({
                minGames: 11,
                mostGames: 17,
                mostWins: 13,
                bestAverage: 6.4,
                bestWinPerc: 81.25,
                mostWinsPlayer: ['paul leonard'],
                bestAveragePlayer: ['alison woodfine'],
                bestWinPercPlayer: ['paul leonard'],
            });
        });
    });
});
