import { expect } from 'chai';
import {
    returnResultsArrayForTeamsWithGames,
    returnStructuredResultsArray,
} from '../resultsHelper';
import stats2021 from '../../data/bowlsStats2021.json';

describe('#ResultsHelper Tests', () => {
    describe('#returnStructuredResultsArray()', () => {
        it('Correctly structures results array', () => {
            const results = [
                'ali 21 - 10 mr alan taylor',
                "barry o'geary 1 - 21 steve smith-rowe",
            ];

            const structuredResult = returnStructuredResultsArray(results);

            const expectedResult = [
                {
                    home: {
                        name: 'ali',
                        score: '21',
                    },
                    away: {
                        name: 'mr alan taylor',
                        score: '10',
                    },
                },
                {
                    home: {
                        name: "barry o'geary",
                        score: '1',
                    },
                    away: {
                        name: 'steve smith-rowe',
                        score: '21',
                    },
                },
            ];
            expect(structuredResult).to.deep.equal(expectedResult);
        });
    });

    describe('#returnResultsArrayForTeamsWithGames()', () => {
        it('Only returns results with games', () => {
            const teamResults = stats2021.teamResults;

            const expectedResults = {
                name: 'thursday vets leeds',
                results: [
                    {
                        home: { name: 'Churwell Pk', score: '36' },
                        away: { name: 'Stanningley', score: '22' },
                    },
                    {
                        home: { name: 'Stanningley', score: '21' },
                        away: { name: 'Scatcherd Pk A', score: '38' },
                    },
                    {
                        home: { name: 'Middleton Community', score: '32' },
                        away: { name: 'Stanningley', score: '27' },
                    },
                    {
                        home: { name: "West Royd Park 'A'", score: '35' },
                        away: { name: 'Stanningley', score: '22' },
                    },
                    {
                        home: { name: "West Royd Park 'A'", score: '120' },
                        away: { name: 'Stanningley', score: '142' },
                    },
                    {
                        home: { name: 'Stanningley', score: '30' },
                        away: { name: 'Bramley Park', score: '29' },
                    },
                    {
                        home: { name: 'Pudsey Park A', score: '39' },
                        away: { name: 'Stanningley', score: '22' },
                    },
                    {
                        home: { name: 'Stanningley', score: '28' },
                        away: { name: 'Churwell Pk', score: '33' },
                    },
                    {
                        home: { name: 'Stanningley', score: '39' },
                        away: { name: 'Cross Flatts Pk', score: '25' },
                    },
                    {
                        home: { name: 'Churwell Pk', score: '145' },
                        away: { name: 'Stanningley', score: '146' },
                    },
                    {
                        home: { name: 'Scatcherd Pk A', score: '40' },
                        away: { name: 'Stanningley', score: '17' },
                    },
                    {
                        home: { name: 'Pudsey Park A', score: '149' },
                        away: { name: 'Stanningley', score: '121' },
                    },
                    {
                        home: { name: 'Stanningley', score: '32' },
                        away: { name: 'Middleton Community', score: '26' },
                    },
                ],
            };

            const results = returnResultsArrayForTeamsWithGames(teamResults);
            const thursdayResults = results?.find(
                (r) => r.name === 'thursday vets leeds'
            );

            expect(results).to.have.lengthOf(3);
            expect(thursdayResults).to.deep.equal(expectedResults);
        });

        it('Returns an empty array when no teams have games', () => {
            const teamResults = [
                {
                    day: 'Monday',
                    results: [],
                    awayWins: 0,
                    homeWins: 0,
                    wins: 0,
                    awayLosses: 0,
                    homeLosses: 0,
                    homeDraws: 0,
                    awayDraws: 0,
                    draws: 0,
                    cupWins: 0,
                    cupLosses: 0,
                    losses: 0,
                    totalGamesPlayed: 0,
                    agg: 0,
                    opponentAgg: 0,
                },
                {
                    day: 'Tuesday',
                    results: [],
                    awayWins: 0,
                    homeWins: 0,
                    wins: 0,
                    awayLosses: 0,
                    homeLosses: 0,
                    homeDraws: 0,
                    awayDraws: 0,
                    draws: 0,
                    cupWins: 0,
                    cupLosses: 0,
                    losses: 0,
                    totalGamesPlayed: 0,
                    agg: 0,
                    opponentAgg: 0,
                },
            ];

            const results = returnResultsArrayForTeamsWithGames(teamResults);
            expect(results).to.deep.equal([]);
        });
    });
});
