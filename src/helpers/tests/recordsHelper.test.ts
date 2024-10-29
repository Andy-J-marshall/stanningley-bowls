import { expect } from 'chai';
import {
    findLeaguesAvailableInData,
    findMinNumberOfGames,
    findPlayerRecords,
} from '../recordsHelper';
import stats2022 from '../../data/bowlsStats2022.json';
const playerResults = stats2022.playerResults;

describe('#RecordsHelper Tests', () => {
    describe('findLeaguesAvailableInData', () => {
        it('Can return list of teams found', () => {
            const { teamsFound } = findLeaguesAvailableInData(playerResults);
            expect(teamsFound).to.deep.equal([
                'monday combined leeds',
                'tuesday vets leeds',
                'thursday vets leeds',
                'saturday leeds',
            ]);
        });

        it('Can correct teams records', () => {
            const { initialTeamRecords } =
                findLeaguesAvailableInData(playerResults);

            const teamRecord = initialTeamRecords['monday combined leeds'];

            expect(teamRecord).to.deep.equal({
                minTeamGames: 1,
                highestTeamGames: 0,
                mostTeamWins: 0,
                bestTeamAverage: -27,
                bestTeamWinPerc: 0,
                mostTeamWinsPlayer: [],
                bestTeamAveragePlayer: [],
                bestTeamWinPercPlayer: [],
            });
        });
    });

    describe('findMinNumberOfGames', () => {
        it('Returns minimum number of games to qualify for team records', () => {
            const { teamsFound, initialTeamRecords } =
                findLeaguesAvailableInData(playerResults);
            const { highestTotalGames } = findMinNumberOfGames(
                playerResults,
                teamsFound,
                initialTeamRecords
            );

            expect(highestTotalGames).to.equal(53);
        });

        it('Returns minimum number of games to qualify for each team in the team records', () => {
            const { teamsFound, initialTeamRecords } =
                findLeaguesAvailableInData(playerResults);
            const { teamRecords } = findMinNumberOfGames(
                playerResults,
                teamsFound,
                initialTeamRecords
            );

            const teamRecord = teamRecords['monday combined leeds'];
            const teamRecord2 = teamRecords['saturday leeds'];
            const teamWithNoStatsDataForYear = teamRecords['tuesday leeds'];

            expect(teamRecord.highestTeamGames).to.equal(19);
            expect(teamRecord2.highestTeamGames).to.equal(17);
            expect(teamWithNoStatsDataForYear.highestTeamGames).to.equal(0);
        });
    });

    describe('findPlayerRecords', () => {
        it('Return player records', () => {
            const { teamsFound, initialTeamRecords } =
                findLeaguesAvailableInData(playerResults);
            const { highestTotalGames, teamRecords } = findMinNumberOfGames(
                playerResults,
                teamsFound,
                initialTeamRecords
            );
            const {
                minTotalGames,
                mostGamesPlayer,
                mostGames,
                mostWins,
                mostWinsPlayer,
                bestWinPerc,
                bestWinPercPlayer,
                bestAverage,
                bestAveragePlayer,
            } = findPlayerRecords(
                playerResults,
                teamsFound,
                teamRecords,
                highestTotalGames
            );

            expect(minTotalGames).to.equal(15);
            expect(mostGamesPlayer).to.deep.equal(['paul bowes']);
            expect(mostGames).to.equal(53);
            expect(mostWins).to.equal(43);
            expect(mostWinsPlayer).to.deep.equal(['paul bowes']);
            expect(bestWinPerc).to.equal(100);
            expect(bestWinPercPlayer).to.deep.equal(['john armitage']);
            expect(bestAverage).to.equal(11.666666666666666);
            expect(bestAveragePlayer).to.deep.equal(['john armitage']);
        });
    });
});
