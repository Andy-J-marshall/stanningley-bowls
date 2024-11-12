import { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { config } from '../config';
import { ResultsProps } from '../types/interfaces';
import { returnStructuredResultsArray } from '../helpers/playerStatsHelper';

const teamName = config.teamNames.shortName.toLowerCase();
const currentYear = new Date().getFullYear();

function Results(props: ResultsProps) {
    const stats = props.stats;
    const statsCallback = props.statsCallback;
    const yearToDisplay = props.yearToDisplay;

    const yearInTitle =
        currentYear !== Number(yearToDisplay) ? `${yearToDisplay}` : '';

    const { teamResults } = stats;

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    let resultsArray;
    if (teamResults) {
        resultsArray = teamResults.map((team) => {
            const results = returnStructuredResultsArray(team.results);
            return {
                day: config.allTeamsInLeaguesSince2013.find((t) =>
                    t.toLowerCase().includes(team.day.toLowerCase())
                ),
                results,
            };
        });
    }

    const hasResults = resultsArray?.some(
        (resultTeam) => resultTeam.results.length > 0
    );

    if (resultsArray && hasResults) {
        return (
            <div id="result">
                <h1>{yearInTitle} results</h1>

                {resultsArray.map((resultTeam, idx) => {
                    if (resultTeam.results.length > 0) {
                        return (
                            <div key={idx} className="teamResult">
                                <h3>{resultTeam.day?.toLowerCase()}</h3>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>home</th>
                                            <th></th>
                                            <th></th>
                                            <th>away</th>
                                        </tr>
                                    </thead>
                                    {resultTeam.results.map((result, idx) => {
                                        let homeTeam = result.home.name;
                                        let awayTeam = result.away.name;
                                        if (
                                            homeTeam
                                                .toLowerCase()
                                                .includes(teamName)
                                        ) {
                                            let aOrBHome = '';
                                            if (homeTeam.endsWith(' A')) {
                                                aOrBHome = ' A';
                                            }
                                            if (homeTeam.endsWith(' B')) {
                                                aOrBHome = ' B';
                                            }
                                            homeTeam = `${teamName.toUpperCase()}${aOrBHome}`;
                                        }
                                        if (
                                            awayTeam
                                                .toLowerCase()
                                                .includes(teamName)
                                        ) {
                                            let aOrBAway = '';
                                            if (awayTeam.endsWith(' A')) {
                                                aOrBAway = ' A';
                                            }
                                            if (awayTeam.endsWith(' B')) {
                                                aOrBAway = ' B';
                                            }
                                            awayTeam = `${teamName.toUpperCase()}${aOrBAway}`;
                                        }

                                        return (
                                            <tbody key={idx}>
                                                <tr>
                                                    <td
                                                        style={{
                                                            width: '38%',
                                                        }}
                                                    >
                                                        {homeTeam}
                                                    </td>
                                                    <td
                                                        style={{
                                                            borderRightStyle:
                                                                'solid',
                                                            borderRightColor:
                                                                'black',
                                                        }}
                                                    >
                                                        {result.home.score}
                                                    </td>
                                                    <td>{result.away.score}</td>
                                                    <td
                                                        style={{
                                                            width: '38%',
                                                        }}
                                                    >
                                                        {awayTeam}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        );
                                    })}
                                </Table>
                                <br />
                                <hr />
                            </div>
                        );
                    }
                })}
                <br />
                <p className="footnote">Last Updated: {stats.lastUpdated}</p>
            </div>
        );
    } else {
        return (
            <div>
                <h1>results</h1>
                <p>No results for {yearToDisplay}</p>
            </div>
        );
    }
}

export default Results;
