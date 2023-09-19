import { expect } from 'chai';
import {
  returnPlayerStats,
  calculatePairsPartnersCount,
} from '../../src/helpers/playersHelper';

describe('#Players Tests', () => {
  describe('#calculatePairsPartnersCount()', () => {
    it('Calculate pairs partners count', () => {
      const pairs = ['Andy', 'Alyssa', 'Vanessa', 'Andy', 'Vanessa', 'Vanessa'];
      const pairsObj = calculatePairsPartnersCount(pairs);
      expect(Object.keys(pairsObj)).to.have.lengthOf(3);
      expect(pairsObj.Andy.timesPaired).to.equal(2);
      expect(pairsObj.Vanessa.timesPaired).to.equal(3);
      expect(pairsObj.Alyssa.timesPaired).to.equal(1);
    });
  });

  describe('#returnPlayerStats()', () => {
    let playerStats: any;
    let stats: any;

    beforeEach(() => {
      playerStats = {
        'paul bowes': {
          totalPoints: 173,
          totalAgg: 841,
          totalPointsAgainst: 81,
          totalAggAgainst: 457,
          homeWins: 18,
          homeLosses: 3,
          awayWins: 11,
          awayLosses: 6,
          pairWins: 5,
          pairLosses: 4,
          pairsPartners: [
            'alyssa randell',
            'alyssa randell',
            'alyssa randell',
            'alyssa randell',
            'alyssa randell',
            'alyssa randell',
            'vanessa lancaster',
            'vanessa lancaster',
            'vanessa lancaster',
          ],
          beatenOpponents: [
            'maureen sheridan & pat blackburn',
            'dot taylor & glennys ash',
            'paul shackleton & ann hughes',
            'jade kerry & sharon kerry',
            'linda gaunt',
            'cedric ash',
            'peter simmons & james wright-green',
            'martin mcgowan',
            'doreen hunter',
            'jane boyd',
            'steve milton',
            'graham hodder',
            'david howard',
            'stuart poulter',
            'brian ragan',
            'peter richie',
            'malcolm cameron',
            'derek howell',
            'cedric briggs',
            'brian newton',
            'clifford pitts',
            'peter nicholson',
            'mick hall',
            'ian baker',
            'ron lavan',
            'michael geary',
            'arthur horne',
            'bill lovett',
            'dawn peters',
            'neil schofield',
            'harry gillett',
            'gordon monk',
            'andrew cole',
          ],
          beatenBy: [
            'malcolm colinson & chris walsh',
            'harvey lockwood & kevin smales',
            'michael gore',
            'gary dennison & nicola pearson',
            'harry dixon & keith skelton',
            'tony green',
            'harvey lockwood',
            'dennis walters',
            'lawrie bairstow',
          ],
          dayPlayed: [
            'Monday Combined Leeds',
            'Monday Combined Leeds',
            'Monday Combined Leeds',
            'Monday Combined Leeds',
            'Monday Combined Leeds',
            'Monday Combined Leeds',
            'Monday Combined Leeds',
            'Monday Combined Leeds',
            'Monday Combined Leeds',
            'Monday Combined Leeds',
            'Monday Combined Leeds',
            'Monday Combined Leeds',
            'Tuesday Vets Leeds',
            'Tuesday Vets Leeds',
            'Tuesday Vets Leeds',
            'Tuesday Vets Leeds',
            'Tuesday Vets Leeds',
            'Tuesday Vets Leeds',
            'Tuesday Vets Leeds',
            'Tuesday Vets Leeds',
            'Tuesday Vets Leeds',
            'Thursday Vets Leeds',
            'Thursday Vets Leeds',
            'Thursday Vets Leeds',
            'Thursday Vets Leeds',
            'Thursday Vets Leeds',
            'Thursday Vets Leeds',
            'Thursday Vets Leeds',
            'Saturday Leeds',
            'Saturday Leeds',
            'Saturday Leeds',
            'Saturday Leeds',
            'Saturday Leeds',
            'Saturday Leeds',
            'Saturday Leeds',
            'Saturday Leeds',
            'Saturday Leeds',
            'Saturday Leeds',
            'Saturday Leeds',
            'Saturday Leeds',
            'Saturday Leeds',
            'Saturday Leeds',
          ],
          totalPairsAgg: 167,
          totalPairsAggAgainst: 140,
          winningPairsPartners: [
            'alyssa randell',
            'alyssa randell',
            'alyssa randell',
            'alyssa randell',
            'vanessa lancaster',
          ],
          losingPairsPartners: [
            'alyssa randell',
            'alyssa randell',
            'vanessa lancaster',
            'vanessa lancaster',
          ],
          totalHomeAgg: 414,
          totalHomeAggAgainst: 205,
          totalAwayAgg: 343,
          totalAwayAggAgainst: 224,
          totalHomePoints: 96,
          totalHomePointsAgainst: 36,
          totalAwayPoints: 77,
          totalAwayPointsAgainst: 45,
          cupWins: 4,
          cupLosses: 0,
          results: [
            'paul bowes & alyssa randell 17 - 21 malcolm colinson & chris walsh',
            'paul bowes & alyssa randell 17 - 21 harvey lockwood & kevin smales',
            'paul bowes & alyssa randell 21 - 7 maureen sheridan & pat blackburn',
            'paul bowes & alyssa randell 21 - 13 dot taylor & glennys ash',
            'paul bowes & alyssa randell 21 - 19 paul shackleton & ann hughes',
            'paul bowes & alyssa randell 21 - 9 jade kerry & sharon kerry',
            'paul bowes 17 - 21 michael gore',
            'paul bowes 21 - 2 linda gaunt',
            'paul bowes 21 - 9 cedric ash',
            'paul bowes & vanessa lancaster 21 - 8 peter simmons & james wright-green',
            'paul bowes & vanessa lancaster 20 - 21 gary dennison & nicola pearson',
            'paul bowes & vanessa lancaster 8 - 21 harry dixon & keith skelton',
            'paul bowes 11 - 21 tony green',
            'paul bowes 21 - 6 martin mcgowan',
            'paul bowes 21 - 5 doreen hunter',
            'paul bowes 21 - 8 jane boyd',
            'paul bowes 21 - 4 steve milton',
            'paul bowes 20 - 21 harvey lockwood',
            'paul bowes 21 - 11 graham hodder',
            'paul bowes 21 - 14 david howard',
            'paul bowes 21 - 11 stuart poulter',
            'paul bowes 18 - 21 dennis walters',
            'paul bowes 21 - 4 brian ragan',
            'paul bowes 21 - 13 peter richie',
            'paul bowes 20 - 21 lawrie bairstow',
            'paul bowes 21 - 4 malcolm cameron',
            'paul bowes 21 - 11 derek howell',
            'paul bowes 21 - 8 cedric briggs',
            'paul bowes 21 - 7 brian newton',
            'paul bowes 21 - 0 clifford pitts',
            'paul bowes 21 - 6 peter nicholson',
            'paul bowes 21 - 13 mick hall',
            'paul bowes 21 - 10 ian baker',
            'paul bowes 21 - 1 ron lavan',
            'paul bowes 21 - 2 michael geary',
            'paul bowes 21 - 10 arthur horne',
            'paul bowes 21 - 5 bill lovett',
            'paul bowes 21 - 3 dawn peters',
            'paul bowes 21 - 8 neil schofield',
            'paul bowes 21 - 13 harry gillett',
            'paul bowes 21 - 14 gordon monk',
            'paul bowes 21 - 10 andrew cole',
          ],
          'monday combined leeds': { games: 12, wins: 7, aggDiff: 54 },
          'tuesday vets leeds': { games: 9, wins: 7, aggDiff: 77 },
          'thursday vets leeds': { games: 7, wins: 5, aggDiff: 61 },
          'saturday leeds': { games: 14, wins: 14, aggDiff: 192 },
        },
      };
      stats = returnPlayerStats(playerStats, 'paul bowes');
    });

    it('Opponents', () => {
      const {
        beatenByList,
        beatenOpponentsList,
      } = stats;
      expect(beatenOpponentsList).to.have.lengthOf(33);
      expect(beatenByList).to.have.lengthOf(9);
    });

    it('Games Played', () => {
      const {
        gamesPlayed,
        singlesGames,
        homeGamesPlayed,
        cupGamesPlayed,
        awayGamesPlayed,
      } = stats;
      expect(gamesPlayed).to.equal(42);
      expect(singlesGames).to.equal(33);
      expect(homeGamesPlayed).to.equal(21);
      expect(cupGamesPlayed).to.equal(4);
      expect(awayGamesPlayed).to.equal(17);
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
      expect(average.toFixed(2)).to.equal('9.14');
      expect(homeAverage.toFixed(2)).to.equal('9.95');
      expect(cupAverage.toFixed(2)).to.equal('14.00');
      expect(awayAverage.toFixed(2)).to.equal('7.00');
      expect(singlesAvg.toFixed(2)).to.equal('10.82');
      expect(pairsAvg.toFixed(2)).to.equal('3.00');
    });

    it('Average points', () => {
      const {
        averagePoints,
        averagePointsAgainst,
        homeAveragePoints,
        homeAveragePointsAgainst,
        awayAveragePoints,
        awayAveragePointsAgainst,
      } = stats;
      expect(averagePoints.toFixed(2)).to.equal('4.55');
      expect(averagePointsAgainst.toFixed(2)).to.equal('2.13');
      expect(homeAveragePoints.toFixed(2)).to.equal('4.57');
      expect(homeAveragePointsAgainst.toFixed(2)).to.equal('1.71');
      expect(awayAveragePoints.toFixed(2)).to.equal('4.53');
      expect(awayAveragePointsAgainst.toFixed(2)).to.equal('2.65');
    });

    it('Wins', () => {
      const { totalWins, homeWins, awayWins, cupWins } = stats;
      expect(totalWins).to.equal(33);
      expect(homeWins).to.equal(18);
      expect(cupWins).to.equal(4);
      expect(awayWins).to.equal(11);
    });

    it('Losses', () => {
      const { totalLosses, homeLosses, awayLosses, cupLosses } = stats;
      expect(totalLosses).to.equal(9);
      expect(homeLosses).to.equal(3);
      expect(cupLosses).to.equal(0);
      expect(awayLosses).to.equal(6);
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
      expect(totalAgg).to.equal(841);
      expect(totalHomeAgg).to.equal(414);
      expect(cupAgg).to.equal(84);
      expect(totalAwayAgg).to.equal(343);
      expect(totalAggAgainst).to.equal(457);
      expect(totalHomeAggAgainst).to.equal(205);
      expect(cupAggAgainst).to.equal(28);
      expect(totalAwayAggAgainst).to.equal(224);
      expect(singlesAgg).to.equal(674);
      expect(singlesAggAgainst).to.equal(317);
      expect(totalPairsAgg).to.equal(167);
      expect(totalPairsAggAgainst).to.equal(140);
    });

    it('Points show correctly', () => {
      const {
        totalPoints,
        totalPointsAgainst,
        totalHomePoints,
        totalHomePointsAgainst,
        totalAwayPoints,
        totalAwayPointsAgainst,
      } = stats;
      expect(totalPoints).to.equal(173);
      expect(totalHomePoints).to.equal(96);
      expect(totalAwayPoints).to.equal(77);
      expect(totalPointsAgainst).to.equal(81);
      expect(totalHomePointsAgainst).to.equal(36);
      expect(totalAwayPointsAgainst).to.equal(45);
    });

    it('Results listed correctly', () => {
      const { results, biggestWin } = stats;
      expect(results[0]).to.equal(
        'paul bowes & alyssa randell 17 - 21 malcolm colinson & chris walsh'
      );
      expect(results).to.have.lengthOf(42);
      expect(biggestWin).to.equal('21 - 0');
    });

    it('Days with no games show as 0', () => {
      const {
        tuesdayEveningWins,
        tuesdayEveningLosses,
        tuesdayEveningGames,
        tuesdayEveningAvg,
        wednesdayWins,
        wednesdayLosses,
        wednesdayGames,
        wednesdayAvg,
      } = stats;
      expect(tuesdayEveningWins).to.equal(0);
      expect(tuesdayEveningLosses).to.equal(0);
      expect(tuesdayEveningGames).to.equal(0);
      expect(tuesdayEveningAvg).to.equal(0);
      expect(wednesdayWins).to.equal(0);
      expect(wednesdayLosses).to.equal(0);
      expect(wednesdayGames).to.equal(0);
      expect(wednesdayAvg).to.equal(0);
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

      const {
        tuesdayEveningWins,
        tuesdayEveningLosses,
        tuesdayEveningGames,
        tuesdayEveningAvg,
        wednesdayWins,
        wednesdayLosses,
        wednesdayGames,
        wednesdayAvg,
      } = stats;
      expect(tuesdayEveningWins).to.equal(7);
      expect(tuesdayEveningLosses).to.equal(4);
      expect(tuesdayEveningGames).to.equal(11);
      expect(tuesdayEveningAvg).to.equal(-3);
      expect(wednesdayWins).to.equal(1);
      expect(wednesdayLosses).to.equal(0);
      expect(wednesdayGames).to.equal(1);
      expect(wednesdayAvg).to.equal(21);
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
      expect(pairLosses).to.equal(4);
      expect(pairWins).to.equal(5);
      expect(pairsGames).to.equal(9);
      expect(pairsPartnersCount['alyssa randell'].timesPaired).to.equal(6);
      expect(pairsPartnersCount['vanessa lancaster'].timesPaired).to.equal(3);
      expect(pairsPartnersCountWins['alyssa randell'].timesPaired).to.equal(4);
      expect(pairsPartnersCountWins['vanessa lancaster'].timesPaired).to.equal(
        1
      );
      expect(pairsPartnersCountLosses['alyssa randell'].timesPaired).to.equal(
        2
      );
      expect(
        pairsPartnersCountLosses['vanessa lancaster'].timesPaired
      ).to.equal(2);
    });

    it('Days Played', () => {
      const { daysPlayedCount, allTeamsPlayedFor } = stats;
      expect(daysPlayedCount[0].gamesPlayed).to.equal(12);
      expect(daysPlayedCount[1].gamesPlayed).to.equal(9);
      expect(daysPlayedCount[2].gamesPlayed).to.equal(7);
      expect(daysPlayedCount[3].gamesPlayed).to.equal(14);
      expect(allTeamsPlayedFor).to.deep.equal([
        'Monday Combined Leeds',
        'Tuesday Vets Leeds',
        'Thursday Vets Leeds',
        'Saturday Leeds',
      ]);
    });

    it('Days with games show correct values', () => {
      const {
        mondayWins,
        mondayLosses,
        mondayGames,
        mondayAvg,
        tuesdayVetsWins,
        tuesdayVetsLosses,
        tuesdayVetsGames,
        tuesdayVetsAvg,
        thursdayWins,
        thursdayLosses,
        thursdayGames,
        thursdayAvg,
        saturdayWins,
        saturdayLosses,
        saturdayGames,
        saturdayAvg,
      } = stats;
      expect(mondayWins).to.equal(7);
      expect(mondayLosses).to.equal(5);
      expect(mondayGames).to.equal(12);
      expect(mondayAvg.toFixed(2)).to.equal('4.50');

      expect(tuesdayVetsWins).to.equal(7);
      expect(tuesdayVetsLosses).to.equal(2);
      expect(tuesdayVetsGames).to.equal(9);
      expect(tuesdayVetsAvg.toFixed(2)).to.equal('8.56');

      expect(thursdayWins).to.equal(5);
      expect(thursdayLosses).to.equal(2);
      expect(thursdayGames).to.equal(7);
      expect(thursdayAvg.toFixed(2)).to.equal('8.71');

      expect(saturdayWins).to.equal(14);
      expect(saturdayLosses).to.equal(0);
      expect(saturdayGames).to.equal(14);
      expect(saturdayAvg.toFixed(2)).to.equal('13.71');
    });
  });
});
