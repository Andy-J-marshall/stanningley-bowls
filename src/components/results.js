import { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import YearSelectDropdown from './yearSelectDropdown';
import config from '../config';

const teamName = config.teamNames.short;

function Results(props) {
    const stats = props.stats;
    const statsCallback = props.statsCallback;
    const numberOfYearsToDisplay = props.numberOfYearsToDisplay;
    const yearToDisplay = props.yearToDisplay;

    const { teamResults } = stats;

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    let resultsFound = false;
    const resultsArray = teamResults.map((team) => {
        const results = team.results.map((result) => {
            const resultParts = result.split(' - ');
            const homePart = resultParts[0];
            const homeScore = homePart.match(/[0-9]+/g)[0].trim();
            const homeTeam = homePart.split(/[0-9]+/g)[0].trim();
            const awayPart = resultParts[1].split(' (')[0];
            let date = resultParts[1].split(' (')[1];
            date = date.slice(0, -1);
            const awayScore = awayPart.match(/[0-9]+/g)[0].trim();
            const awayTeam = awayPart.split(/[0-9]+/g)[1].trim();

            resultsFound = true;

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

        return {
            day: config.days[team.day.toLowerCase()],
            results: results,
        };
    });

    if (resultsFound) {
        return (
            <div className="center" id="result">
                <YearSelectDropdown
                    numberOfYearsToDisplay={numberOfYearsToDisplay}
                    statsCallback={statsCallback}
                    yearToDisplay={yearToDisplay}
                />
                <h1>RESULTS</h1>
                {resultsArray.map((team, idx) => {
                    return (
                        <div key={idx}>
                            {team.results.length > 0 && (
                                <div>
                                    <h3 style={{ paddingTop: '1rem' }}>
                                        {team.day.toUpperCase()}
                                    </h3>
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
                                            const homeTeam =
                                                result.home.homeTeam;
                                            const awayTeam =
                                                result.away.awayTeam;
                                            const date = result.date;

                                            return (
                                                <tbody key={idx}>
                                                    <tr>
                                                        <td
                                                            style={{
                                                                borderRightStyle:
                                                                    'solid',
                                                                borderRightColor:
                                                                    'black',
                                                            }}
                                                        >
                                                            {date}
                                                        </td>
                                                        {homeTeam.toLowerCase() ===
                                                        teamName.toLowerCase() ? (
                                                            <td
                                                                style={{
                                                                    width: '38%',
                                                                }}
                                                            >
                                                                {homeTeam.toUpperCase()}
                                                            </td>
                                                        ) : (
                                                            <td
                                                                style={{
                                                                    width: '38%',
                                                                }}
                                                            >
                                                                {homeTeam}
                                                            </td>
                                                        )}
                                                        <td
                                                            style={{
                                                                borderRightStyle:
                                                                    'solid',
                                                                borderRightColor:
                                                                    'black',
                                                            }}
                                                        >
                                                            {
                                                                result.home
                                                                    .homeScore
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                result.away
                                                                    .awayScore
                                                            }
                                                        </td>
                                                        {awayTeam.toLowerCase() ===
                                                        teamName.toLowerCase() ? (
                                                            <td
                                                                style={{
                                                                    width: '38%',
                                                                }}
                                                            >
                                                                {awayTeam.toUpperCase()}
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
                            )}
                        </div>
                    );
                })}
                <br />
                <p className="footnote">Last Updated: {stats.lastUpdated}</p>
            </div>
        );
    } else {
        return (
            <div>
                <h1>RESULTS</h1>
                <p>Results not found for {yearToDisplay}</p>
            </div>
        );
    }
}

export default Results;
