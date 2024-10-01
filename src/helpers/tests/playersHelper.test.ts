import { expect } from 'chai';
import {
    returnPlayerStats,
    calculatePairsPartnersCount,
    checkWinPercAndAverageAreNumbers,
} from '../playersHelper';
import stats2022 from '../../data/bowlsStats2022.json';

describe('#Players Tests', () => {
    describe('#calculatePairsPartnersCount()', () => {
        it('Calculate pairs partners count', () => {
            const pairs = [
                'Andy',
                'Alyssa',
                'Vanessa',
                'Andy',
                'Vanessa',
                'Vanessa',
            ];
            const pairsObj = calculatePairsPartnersCount(pairs);
            expect(Object.keys(pairsObj)).to.have.lengthOf(3);
            expect(pairsObj.Andy.timesPaired).to.equal(2);
            expect(pairsObj.Vanessa.timesPaired).to.equal(3);
            expect(pairsObj.Alyssa.timesPaired).to.equal(1);
        });
    });

    describe('#returnPlayerStats()', () => {
        let playerStats: any = stats2022.playerResults;
        let stats: any = returnPlayerStats(playerStats, 'paul bowes');

        it('Games Played', () => {
            const {
                gamesPlayed,
                singlesGames,
                homeGamesPlayed,
                cupGamesPlayed,
                awayGamesPlayed,
            } = stats;
            expect(gamesPlayed).to.equal(53);
            expect(singlesGames).to.equal(43);
            expect(homeGamesPlayed).to.equal(25);
            expect(cupGamesPlayed).to.equal(4);
            expect(awayGamesPlayed).to.equal(24);
        });

        it('Averages', () => {
            const {
                average,
                homeAverage,
                awayAverage,
                cupAverage,
                singlesAvg,
                pairsAvg,
            } = stats;
            expect(average.toFixed(2)).to.equal('9.64');
            expect(homeAverage.toFixed(2)).to.equal('10.48');
            expect(cupAverage.toFixed(2)).to.equal('14.00');
            expect(awayAverage.toFixed(2)).to.equal('8.04');
            expect(singlesAvg.toFixed(2)).to.equal('11.56');
            expect(pairsAvg.toFixed(2)).to.equal('1.40');
        });

        it('Wins', () => {
            const { totalWins, homeWins, awayWins, cupWins } = stats;
            expect(totalWins).to.equal(43);
            expect(homeWins).to.equal(22);
            expect(cupWins).to.equal(4);
            expect(awayWins).to.equal(17);
        });

        it('Losses', () => {
            const { totalLosses, homeLosses, awayLosses, cupLosses } = stats;
            expect(totalLosses).to.equal(10);
            expect(homeLosses).to.equal(3);
            expect(cupLosses).to.equal(0);
            expect(awayLosses).to.equal(7);
        });

        it('Aggregates show correctly', () => {
            const {
                totalAgg,
                totalAggAgainst,
                cupAgg,
                cupAggAgainst,
                totalHomeAgg,
                totalHomeAggAgainst,
                totalAwayAgg,
                totalAwayAggAgainst,
                singlesAgg,
                singlesAggAgainst,
                totalPairsAgg,
                totalPairsAggAgainst,
            } = stats;
            expect(totalAgg).to.equal(1059);
            expect(totalHomeAgg).to.equal(498);
            expect(cupAgg).to.equal(84);
            expect(totalAwayAgg).to.equal(477);
            expect(totalAggAgainst).to.equal(548);
            expect(totalHomeAggAgainst).to.equal(236);
            expect(cupAggAgainst).to.equal(28);
            expect(totalAwayAggAgainst).to.equal(284);
            expect(singlesAgg).to.equal(884);
            expect(singlesAggAgainst).to.equal(387);
            expect(totalPairsAgg).to.equal(175);
            expect(totalPairsAggAgainst).to.equal(161);
        });

        it('Results listed correctly', () => {
            const { results, biggestWin } = stats;
            expect(results[0]).to.equal(
                'paul bowes & alyssa randell 17 - 21 malcolm colinson & chris walsh'
            );
            expect(results).to.have.lengthOf(53);
            expect(biggestWin).to.equal('21 - 0');
        });

        it('Days with no games show as are not returned', () => {
            const { allTeamStats } = stats;
            const tuesdayEvening = allTeamStats.find((team: any) => {
                return team.teamName === 'tuesday leeds';
            });
            const wednesday = allTeamStats.find((team: any) => {
                return team.teamName === 'wednesday half holiday leeds';
            });

            expect(tuesdayEvening).to.be.undefined;
            expect(wednesday).to.be.undefined;
        });

        it('Tuesday evening and Wednesday can calculate stats', () => {
            playerStats['paul bowes']['wednesday half holiday leeds'] = {
                games: 1,
                wins: 1,
                aggDiff: 21,
            };
            playerStats['paul bowes']['tuesday leeds'] = {
                games: 11,
                wins: 7,
                aggDiff: -33,
            };

            stats = returnPlayerStats(playerStats, 'paul bowes');

            const { allTeamStats } = stats;
            const tuesdayEvening = allTeamStats.find((team: any) => {
                return team.teamName === 'tuesday leeds';
            });
            const wednesday = allTeamStats.find((team: any) => {
                return team.teamName === 'wednesday half holiday leeds';
            });

            expect(tuesdayEvening.teamWins).to.equal(7);
            expect(tuesdayEvening.teamLosses).to.equal(4);
            expect(tuesdayEvening.teamGames).to.equal(11);
            expect(tuesdayEvening.teamAvg).to.equal(-3);
            expect(wednesday.teamWins).to.equal(1);
            expect(wednesday.teamLosses).to.equal(0);
            expect(wednesday.teamGames).to.equal(1);
            expect(wednesday.teamAvg).to.equal(21);
        });

        it('Pairs partners calculated correctly', () => {
            const {
                pairsPartnersCount,
                pairsPartnersCountWins,
                pairsPartnersCountLosses,
                pairLosses,
                pairWins,
                pairsGames,
            } = stats;
            expect(pairLosses).to.equal(5);
            expect(pairWins).to.equal(5);
            expect(pairsGames).to.equal(10);
            expect(pairsPartnersCount['alyssa randell'].timesPaired).to.equal(
                6
            );
            expect(
                pairsPartnersCount['vanessa lancaster'].timesPaired
            ).to.equal(4);
            expect(
                pairsPartnersCountWins['alyssa randell'].timesPaired
            ).to.equal(4);
            expect(
                pairsPartnersCountWins['vanessa lancaster'].timesPaired
            ).to.equal(1);
            expect(
                pairsPartnersCountLosses['alyssa randell'].timesPaired
            ).to.equal(2);
            expect(
                pairsPartnersCountLosses['vanessa lancaster'].timesPaired
            ).to.equal(3);
        });

        it('Days Played', () => {
            expect(stats.allTeamsPlayedFor).to.deep.equal([
                'Monday Combined Leeds',
                'Tuesday Vets Leeds',
                'Thursday Vets Leeds',
                'Saturday Leeds',
            ]);
        });

        it('Days with games show correct values', () => {
            const { allTeamStats } = stats;
            const monday = allTeamStats.find((team: any) => {
                return team.teamName === 'monday combined leeds';
            });
            const tuesVets = allTeamStats.find((team: any) => {
                return team.teamName === 'tuesday vets leeds';
            });
            const thursVets = allTeamStats.find((team: any) => {
                return team.teamName === 'thursday vets leeds';
            });
            const saturday = allTeamStats.find((team: any) => {
                return team.teamName === 'saturday leeds';
            });

            expect(monday.teamWins).to.equal(7);
            expect(monday.teamLosses).to.equal(6);
            expect(monday.teamGames).to.equal(13);
            expect(monday.teamAvg.toFixed(2)).to.equal('3.15');

            expect(tuesVets.teamWins).to.equal(12);
            expect(tuesVets.teamLosses).to.equal(2);
            expect(tuesVets.teamGames).to.equal(14);
            expect(tuesVets.teamAvg.toFixed(2)).to.equal('10.36');

            expect(thursVets.teamWins).to.equal(7);
            expect(thursVets.teamLosses).to.equal(2);
            expect(thursVets.teamGames).to.equal(9);
            expect(thursVets.teamAvg.toFixed(2)).to.equal('10.78');

            expect(saturday.teamWins).to.equal(17);
            expect(saturday.teamLosses).to.equal(0);
            expect(saturday.teamGames).to.equal(17);
            expect(saturday.teamAvg.toFixed(2)).to.equal('13.41');
        });
    });

    describe('calculatePairsPartnersCount', () => {
        it('should calculate pairs partners count', () => {
            const allPairsPartners = [
                'partner1',
                'partner2',
                'partner1',
                'partner3',
            ];

            const expectedResult = {
                partner1: { timesPaired: 2 },
                partner2: { timesPaired: 1 },
                partner3: { timesPaired: 1 },
            };

            const result = calculatePairsPartnersCount(allPairsPartners);
            expect(result).to.deep.equal(expectedResult);
        });
    });

    describe('checkWinPercAndAverageAreNumbers', () => {
        it('should verify win percentage and average are numbers and set defaults if not', () => {
            const stats = {
                winPerc: 'NaN',
                average: 'NaN',
                singlesWinPerc: 'NaN',
                singlesAverage: 'NaN',
                pairsWinPerc: 'NaN',
                pairsAverage: 'NaN',
            };

            const expectedResult = {
                winPerc: 0,
                average: -99,
                singlesWinPerc: 0,
                singlesAverage: -99,
                pairsWinPerc: 0,
                pairsAverage: -99,
            };

            const result = checkWinPercAndAverageAreNumbers(stats);
            expect(result).to.deep.equal(expectedResult);
        });
    });
});
