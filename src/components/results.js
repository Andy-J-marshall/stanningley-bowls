import React from 'react';
import { Table } from 'react-bootstrap';
import config from '../config';

function Results(props) {
    const stats = props.stats;

    const { teamResults } = stats;

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
                        <h2>{team.day.toUpperCase()}</h2>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>HOME TEAM</th>
                                    <th></th>
                                    <th></th>
                                    <th>AWAY TEAM</th>
                                </tr>
                            </thead>
                            {team.results.map((result, idx) => {
                                let homeTeam = result.home.homeTeam;
                                let awayTeam = result.away.awayTeam;
                                result.away.awayTeam;
                                return (
                                    <tbody key={idx}>
                                        <tr>
                                            {homeTeam.toLowerCase() ===
                                            'stanningley' ? (
                                                <td
                                                    style={{
                                                        width: '40%',
                                                        fontFamily:
                                                            'Alegreya SC',
                                                    }}
                                                >
                                                    <b>{homeTeam}</b>
                                                </td>
                                            ) : (
                                                <td style={{ width: '40%' }}>
                                                    {homeTeam}
                                                </td>
                                            )}
                                            <td
                                                style={{
                                                    borderRightStyle: 'solid',
                                                    borderRightColor: 'black',
                                                }}
                                            >
                                                {result.home.homeScore}
                                            </td>
                                            <td>{result.away.awayScore}</td>
                                            {awayTeam.toLowerCase() ===
                                            'stanningley' ? (
                                                <td
                                                    style={{
                                                        width: '40%',
                                                        fontFamily:
                                                            'Alegreya SC',
                                                    }}
                                                >
                                                    <b>{awayTeam}</b>
                                                </td>
                                            ) : (
                                                <td style={{ width: '40%' }}>
                                                    {awayTeam}
                                                </td>
                                            )}
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
