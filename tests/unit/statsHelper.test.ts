import { expect } from 'chai';
import {
  combineTeamStats,
  findBiggestWin,
} from '../../src/helpers/statsHelper';

describe('#StatsHelper Tests', () => {
  describe('#findBiggestWin()', () => {
    it('Biggest win found successfully', () => {
      const results = [
        'ali 15 - 21 leslie strang',
        'ali 1 - 21 shirley biancardo',
        'ali 0 - 21 roy tebbutt',
        'ali 21 - 4 alan taylor',
        'ali 18 - 10 billy ward',
        'ali 21 - 19 brian golden',
        'ali 21 - 20 brian golden',
      ];
      const biggestWin = findBiggestWin(results);
      expect(biggestWin).to.equal('21 - 4');
    });

    it('Biggest win found with double barrelled home names', () => {
      const results = [
        'ali-double-barrel 21 - 0 leslie strang',
        'ali 1 - 21 shirley double-barrel-biancardo',
      ];
      const biggestWin = findBiggestWin(results);
      expect(biggestWin).to.equal('21 - 0');
    });

    it('Biggest win found with double barrelled away names', () => {
      const results = [
        'ali 21 - 10 leslie strang',
        'ali 21 - 2 shirley double-barrel-biancardo',
      ];
      const biggestWin = findBiggestWin(results);
      expect(biggestWin).to.equal('21 - 2');
    });

    it('Biggest win found successfully when there are duplicates', () => {
      const results = [
        'ali 21 - 10 alan taylor',
        'ali 21 - 10 alan taylor',
        'ali 10 - 21 alan taylor',
        'ali 21 - 19 brian golden',
        'ali 19 - 21 brian golden',
        'ali 19 - 21 brian golden',
      ];
      const biggestWin = findBiggestWin(results);
      expect(biggestWin).to.equal('21 - 10');
    });

    it('Null returned if player has no wins', () => {
      const results = [
        "ali 20 - 21 leslie strang ('A')",
        'ali 13 - 21 shirley biancardo',
        'ali 0 - 21 roy tebbutt',
      ];
      const biggestWin = findBiggestWin(results);
      expect(biggestWin).to.be.null;
    });

    it('Null returned if player has no results', () => {
      const results: Array<string> = [];
      const biggestWin = findBiggestWin(results);
      expect(biggestWin).to.be.null;
    });
  });

  describe('#CombinedTeamStats()', () => {
    const stats = {
      teamResults: [
        {
          day: 'Monday Combined Leeds',
          awayWins: 5,
          homeWins: 7,
          awayLosses: 2,
          homeLosses: 1,
          homeDraws: 1,
          awayDraws: 2,
          cupWins: 1,
          cupLosses: 0,
          agg: 1949,
          opponentAgg: 1572,
          results: [
            'Stanningley 26 - 14 Sth Lds Cons (Mon 11th Apr (6:15))',
            'Gildersome 14 - 26 Stanningley (Mon 18th Apr (6:15))',
            'Stanningley 30 - 8 Meanwood B (Mon 25th Apr (6:15))',
            'Western Flatts 12 - 30 Stanningley (Mon 2nd May (6:30))',
            'Stanningley 28 - 17 New Wortley (Mon 9th May (6:30))',
            'Harehills 17 - 26 Stanningley (Mon 16th May (6:45))',
            'Stanningley 18 - 25 Rothwell BC (Mon 23rd May (6:45))',
            'New Farnley B 27 - 15 Stanningley (Mon 30th May (6:45))',
            'Stanningley 23 - 23 Whitkirk A (Mon 13th Jun (6:45))',
            'Crossgates BC 29 - 11 Stanningley (Mon 20th Jun (6:45))',
            'Sth Lds Cons 25 - 25 Stanningley (Mon 27th Jun (6:45))',
            'Stanningley 26 - 13 Gildersome (Mon 4th Jul (6:45))',
            'Meanwood B 18 - 22 Stanningley (Mon 11th Jul (6:45))',
            'Stanningley 30 - 8 Western Flatts (Mon 18th Jul (6:45))',
            'New Wortley 21 - 24 Stanningley (Mon 25th Jul (6:45))',
            'Stanningley 27 - 12 Harehills (Mon 1st Aug (6:45))',
            'Rothwell BC 21 - 21 Stanningley (Mon 8th Aug (6:30))',
            'Stanningley 26 - 20 New Farnley B (Mon 15th Aug (6:30))',
          ],
        },
        {
          day: 'Tuesday Vets Leeds',
          awayWins: 4,
          homeWins: 6,
          awayLosses: 1,
          homeLosses: 0,
          homeDraws: 0,
          awayDraws: 1,
          cupWins: 0,
          cupLosses: 1,
          agg: 1866,
          opponentAgg: 1233,
          results: [
            'Horsforth Woodside. 21 - 38 Stanningley (Tue 26th Apr (1:30))',
            'New Armley 13 - 40 Stanningley (Tue 10th May (1:30))',
            'Stanningley 34 - 27 Harehills Park A (Tue 17th May (1:30))',
            'Stanningley 39 - 19 West Royd Park (Tue 24th May (1:30))',
            'Western Flatts 19 - 37 Stanningley (Tue 31st May (1:30))',
            'Stanningley 33 - 23 Barwick BC (Tue 7th Jun (1:30))',
            'Stanningley 40 - 14 Holbeck Moor (Tue 14th Jun (1:30))',
            'Gildersome 15 - 37 Stanningley (Tue 21st Jun (1:30))',
            'Harehills Park A 145 - 130 Stanningley (Tue 5th Jul (1:30))',
            'Stanningley 40 - 11 Horsforth Woodside. (Tue 12th Jul (1:30))',
            'Stanningley 40 - 11 New Armley (Tue 26th Jul (1:30))',
            'Harehills Park A 34 - 24 Stanningley (Tue 9th Aug (1:30))',
          ],
        },
        {
          day: 'Thursday Vets Leeds',
          awayWins: 2,
          homeWins: 4,
          awayLosses: 3,
          homeLosses: 1,
          homeDraws: 0,
          awayDraws: 0,
          cupWins: 0,
          cupLosses: 1,
          agg: 1567,
          opponentAgg: 1347,
          results: [
            'Stanningley 24 - 36 Churwell Pk (Thu 21st Apr (1:30))',
            'Pudsey Park A 30 - 26 Stanningley (Thu 28th Apr (1:30))',
            'Stanningley 36 - 16 Middleton Community (Thu 19th May (1:30))',
            'New Armley 13 - 40 Stanningley (Thu 26th May (1:30))',
            'Stanningley 34 - 25 Scatcherd Pk A (Thu 9th Jun (1:30))',
            'Cross Flatts Pk 32 - 24 Stanningley (Thu 16th Jun (1:30))',
            'Churwell Pk 35 - 32 Stanningley (Thu 23rd Jun (1:30))',
            'Stanningley 129 - 132 Middleton Community (Thu 30th Jun (1:30))',
            'Stanningley 28 - 26 Pudsey Park A (Thu 14th Jul (1:30))',
            'Middleton Community 30 - 37 Stanningley (Thu 28th Jul (1:30))',
            'Stanningley 37 - 13 New Armley (Thu 4th Aug (1:30))',
          ],
        },
        {
          day: 'Saturday Leeds',
          awayWins: 6,
          homeWins: 7,
          awayLosses: 0,
          homeLosses: 0,
          homeDraws: 1,
          awayDraws: 0,
          cupWins: 1,
          cupLosses: 1,
          agg: 2298,
          opponentAgg: 1546,
          results: [
            'Sth Leeds Cons B 18 - 35 Stanningley (Sat 2nd Apr (2:00))',
            'Stanningley 37 - 22 Gildersome B (Sat 16th Apr (2:00))',
            'Cranmore 23 - 33 Stanningley (Sat 23rd Apr (2:00))',
            'Stanningley 36 - 20 Middleton Comm (Sat 30th Apr (2:00))',
            'Stanningley 37 - 17 New Wortley (Sat 7th May (2:00))',
            'Stanningley 35 - 19 Western Flatts (Sat 28th May (2:00))',
            'Scatcherd Park B 14 - 40 Stanningley (Sat 4th Jun (2:00))',
            'Stanningley 161 - 119 Sth Leeds Cons B (Sat 11th Jun (2:00))',
            'Stanningley 37 - 17 Middleton Park (Sat 18th Jun (2:00))',
            'Stanningley 36 - 18 Sth Leeds Cons B (Sat 25th Jun (2:00))',
            'Western Flatts 121 - 120 Stanningley (Sat 2nd Jul (2:00))',
            'Gildersome B 23 - 35 Stanningley (Sat 9th Jul (2:00))',
            'Stanningley 37 - 14 Cranmore (Sat 23rd Jul (2:00))',
            'Middleton Comm 22 - 37 Stanningley (Sat 30th Jul (2:00))',
            'New Wortley 27 - 30 Stanningley (Sat 13th Aug (2:00))',
          ],
        },
      ],
    };

    let combinedStats = combineTeamStats(stats.teamResults);

    beforeEach(() => {
      // reset stats to default before each test
      combinedStats = combineTeamStats(stats.teamResults);
    });

    it('Total wins are calculated correctly', () => {
      expect(combinedStats.totalWins).to.equal(43);
    });

    it('Win breakdown are calculated correctly', () => {
      expect(combinedStats.combinedAwayWins).to.equal(17);
      expect(combinedStats.combinedHomeWins).to.equal(24);
      expect(combinedStats.combinedCupWins).to.equal(2);
    });

    it('Total losses are calculated correctly', () => {
      expect(combinedStats.totalLosses).to.equal(11);
    });

    it('Losses breakdown are calculated correctly', () => {
      expect(combinedStats.combinedAwayLosses).to.equal(6);
      expect(combinedStats.combinedHomeLosses).to.equal(2);
      expect(combinedStats.combinedCupLosses).to.equal(3);
    });

    it('Total draws are calculated correctly', () => {
      expect(combinedStats.totalDraws).to.equal(5);
    });

    it('Draws breakdown are calculated correctly', () => {
      expect(combinedStats.combinedAwayDraws).to.equal(3);
      expect(combinedStats.combinedHomeDraws).to.equal(2);
    });

    it('Team aggregates calculated correctly', () => {
      expect(combinedStats.combinedAgg).to.equal(7680);
    });

    it('Opponent aggregates calculated correctly', () => {
      expect(combinedStats.combinedOpponentAgg).to.equal(5698);
    });
  });
});
