import React from 'react';
import { Table } from 'react-bootstrap';
import config from '../config';

function Results(props) {
    const teamResults = props.teamResults;

    const resultsArray = [];
    teamResults.map((team) => {
        const results = team.results.map((result) => {
            const resultParts = result.split('-');
            const homePart = resultParts[0];
            const homeScore = homePart.match(/[0-9]+/g)[0].trim();
            const homeTeam = homePart.split(/[0-9]+/g)[0].trim();
            const awayPart = resultParts[1];
            const awayScore = awayPart.match(/[0-9]+/g)[0].trim();
            const awayTeam = awayPart.split(/[0-9]+/g)[1].trim();

            return {
                home: {
                    homeTeam,
                    homeScore,
                },
                away: {
                    awayTeam,
                    awayScore,
                },
            };
        });

        const result = {
            day: config.days[team.day.toLowerCase()],
            results: results,
        };
        resultsArray.push(result);
    });

    return (
        <div id="result" className="page-component center">
            {resultsArray.map((team, idx) => {
                return (
                    <div key={idx}>
                        <br />
                        <h2>{team.day.toUpperCase()} RESULTS</h2>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Home Team</th>
                                    <th></th>
                                    <th></th>
                                    <th>Away Team</th>
                                </tr>
                            </thead>
                            {team.results.map((result, idx) => {
                                return (
                                    <tbody key={idx}>
                                        <tr>
                                            <td>{result.home.homeTeam}</td>
                                            <td>{result.home.homeScore}</td>
                                            <td>{result.away.awayScore}</td>
                                            <td>{result.away.awayTeam}</td>
                                        </tr>
                                    </tbody>
                                );
                            })}
                        </Table>
                    </div>
                );
            })}
        </div>
    );
}

export default Results;
