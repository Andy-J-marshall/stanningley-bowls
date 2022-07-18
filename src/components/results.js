import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import config from '../config';

function Results(props) {
    const stats = props.stats;

    const { teamResults } = stats;

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    const resultsArray = [];
    teamResults.map((team) => {
        const results = team.results.map((result) => {
            const resultParts = result.split('-');
            const homePart = resultParts[0];
            const homeScore = homePart.match(/[0-9]+/g)[0].trim();
            const homeTeam = homePart.split(/[0-9]+/g)[0].trim();
            const awayPart = resultParts[1].split(' (')[0];
            const date = resultParts[1].split(' (')[1];
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
                date,
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
                                    <th>DATE</th>
                                    <th>HOME</th>
                                    <th></th>
                                    <th></th>
                                    <th>AWAY</th>
                                </tr>
                            </thead>
                            {team.results.map((result, idx) => {
                                const homeTeam = result.home.homeTeam;
                                const awayTeam = result.away.awayTeam;
                                let date = result.date.split(' ');
                                date = `${date[1]} ${date[2]}`;
                                return (
                                    <tbody key={idx}>
                                        <tr>
                                            <td
                                                style={{
                                                    borderRightStyle: 'solid',
                                                    borderRightColor: 'black',
                                                }}
                                            >
                                                {date}
                                            </td>
                                            {homeTeam.toLowerCase() ===
                                            'stanningley' ? (
                                                <td
                                                    style={{
                                                        width: '38%',
                                                    }}
                                                >
                                                    <b>
                                                        {homeTeam.toUpperCase()}
                                                    </b>
                                                </td>
                                            ) : (
                                                <td style={{ width: '38%' }}>
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
                                                        width: '38%',
                                                    }}
                                                >
                                                    <b>
                                                        {awayTeam.toUpperCase()}
                                                    </b>
                                                </td>
                                            ) : (
                                                <td
                                                    style={{
                                                        width: '38%',
                                                    }}
                                                >
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
