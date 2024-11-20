import { assert, expect } from 'chai';
import {
    combineTeamStats,
    findTeamStats,
    returnPlayerStatsForTeam,
    returnTeamNamesWithGames,
} from '../teamStatsHelper';
import { PlayerResultsStatsFile } from '../../types/interfaces';
import { config } from '../../config';
import stats2022 from '../../data/stanningleyStats2022.json';
import stats2023 from '../../data/stanningleyStats2023.json';
import stats2024 from '../../data/stanningleyStats2024.json';

describe('#teamStatsHelper Tests', () => {
    describe('#CombinedTeamStats()', () => {
        const stats = stats2022;

        let combinedStats = combineTeamStats(stats.teamResults);

        it('Total wins are calculated correctly', () => {
            expect(combinedStats.totalWins).to.equal(51);
        });

        it('Win breakdown are calculated correctly', () => {
            expect(combinedStats.combinedAwayWins).to.equal(22);
            expect(combinedStats.combinedHomeWins).to.equal(28);
            expect(combinedStats.combinedCupWins).to.equal(1);
        });

        it('Total losses are calculated correctly', () => {
            expect(combinedStats.totalLosses).to.equal(14);
        });

        it('Losses breakdown are calculated correctly', () => {
            expect(combinedStats.combinedAwayLosses).to.equal(8);
            expect(combinedStats.combinedHomeLosses).to.equal(3);
            expect(combinedStats.combinedCupLosses).to.equal(3);
        });

        it('Total draws are calculated correctly', () => {
            expect(combinedStats.totalDraws).to.equal(3);
        });

        it('Draws breakdown are calculated correctly', () => {
            expect(combinedStats.combinedAwayDraws).to.equal(2);
            expect(combinedStats.combinedHomeDraws).to.equal(1);
        });

        it('Team aggregates calculated correctly', () => {
            expect(combinedStats.combinedAgg).to.equal(9340);
        });

        it('Opponent aggregates calculated correctly', () => {
            expect(combinedStats.combinedOpponentAgg).to.equal(6894);
        });
    });

    describe('#returnPlayerStatsForTeam()', () => {
        it('Correctly returns player stats for a specific day', () => {
            const playerStats: PlayerResultsStatsFile = stats2022.playerResults;

            const allPlayerStats = returnPlayerStatsForTeam(
                playerStats,
                'saturday leeds'
            );
            const player = allPlayerStats.find(
                (player) => player.player === 'andy marshall'
            );

            expect(player).to.deep.contain({
                player: 'andy marshall',
                games: 14,
                wins: 6,
                average: 1.0714285714285714,
                winPerc: 42.857142857142854,
            });
        });
    });

    describe('#returnTeamNamesWithGames()', () => {
        it('Correctly returns team names with games', () => {
            const playerStats: PlayerResultsStatsFile = stats2023.playerResults;

            const teamNames = returnTeamNamesWithGames(playerStats);
            expect(teamNames).to.deep.equal([
                'monday combined leeds',
                'saturday leeds',
                'thursday vets leeds',
                'tuesday leeds',
                'tuesday vets leeds',
                'wednesday half holiday leeds',
            ]);
        });
    });

    describe('#findTeamStats()', () => {
        it('B team stats should be null when there is no B team on that day', () => {
            for (const teamInfo of config.historicTeamInfo) {
                // There were no B teams in 2022
                const teamStats = findTeamStats(
                    teamInfo,
                    stats2022.teamResults
                );

                expect(teamStats.bTeamStats).to.be.null;
            }
        });

        it('Team name should be correctly returned', () => {
            const teamInfo = config.historicTeamInfo.find((t) =>
                t.teamNames.includes('monday combined leeds')
            );

            if (!teamInfo) {
                assert.fail('Team info not found in config file');
            }

            const teamStats = findTeamStats(teamInfo!, stats2024.teamResults);

            expect(teamStats.teamName).to.equal('monday combined leeds');
        });

        it('Team stats should be correct', () => {
            const teamStatsJson = stats2024.teamResults.find((t) =>
                t.day.toLowerCase().includes('saturday leeds')
            );

            const teamInfo = config.historicTeamInfo.find((t) =>
                t.teamNames.includes('saturday leeds')
            );

            if (!teamInfo) {
                assert.fail('Team info not found in config file');
            }

            const teamStats = findTeamStats(teamInfo!, stats2024.teamResults);

            const stats = teamStats.teamStats;

            expect(stats).to.deep.equal(teamStatsJson);
        });

        it('B team stats should be correct', () => {
            const teamStatsJson = stats2024.teamResults.find((t) =>
                t.day.toLowerCase().includes('saturday leeds (b)')
            );

            const teamInfo = config.historicTeamInfo.find((t) =>
                t.teamNames.includes('saturday leeds')
            );

            if (!teamInfo) {
                assert.fail('Team info not found in config file');
            }

            const teamStats = findTeamStats(teamInfo!, stats2024.teamResults);

            const stats = teamStats.bTeamStats;

            expect(stats).to.deep.equal(teamStatsJson);
        });
    });
});
