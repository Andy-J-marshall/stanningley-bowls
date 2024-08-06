import { Table } from 'react-bootstrap';
import YearSelectDropdown from './yearSelectDropdown';
import config from '../config';

const teamName = config.teamNames.shortName;

function Results(props) {
    const stats = props.stats;
    const statsCallback = props.statsCallback;
    const yearToDisplay = props.yearToDisplay;

    const { teamResults } = stats;

    let resultsFound = false;
    let resultsArray;

    if (teamResults) {
        resultsArray = teamResults.map((team) => {
            const results = team.results.map((result) => {
                const resultParts = result.split(' - ');
                const homePart = resultParts[0];
                const homeScore = homePart.match(/[0-9]+/g)[0].trim();
                const homeTeam = homePart.split(/[0-9]+/g)[0].trim();
                const awayPart = resultParts[1].split(' (')[0];
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
                };
            });

            return {
                day: config.allTeamsInLeaguesSince2013.find((e) =>
                    e.toLowerCase().includes(team.day.toLowerCase())
                ),
                results: results,
            };
        });
    }

    if (resultsFound) {
        return (
            <div className="center" id="result">
                <YearSelectDropdown
                    statsCallback={statsCallback}
                    yearToDisplay={yearToDisplay}
                    showOldYears={false}
                />
                <h1>RESULTS</h1>
                {resultsArray.map((resultTeam, idx) => {
                    return (
                        <div className="teamResult" key={idx}>
                            {resultTeam.results.length > 0 && (
                                <div>
                                    <h3 style={{ paddingTop: '1rem' }}>
                                        {resultTeam.day.toUpperCase()}
                                    </h3>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>HOME</th>
                                                <th></th>
                                                <th></th>
                                                <th>AWAY</th>
                                            </tr>
                                        </thead>
                                        {resultTeam.results.map(
                                            (result, idx) => {
                                                let homeTeam =
                                                    result.home.homeTeam;
                                                let awayTeam =
                                                    result.away.awayTeam;
                                                if (homeTeam.toLowerCase().includes(teamName.toLowerCase())) {
                                                    let aOrBHome = '';
                                                    if (homeTeam.endsWith(' A')) {
                                                        aOrBHome = ' A';
                                                    }
                                                    if (homeTeam.endsWith(' B')) {
                                                        aOrBHome = ' B';
                                                    }
                                                    homeTeam = teamName.toUpperCase() + aOrBHome;
                                                }
                                                if (awayTeam.toLowerCase().includes(teamName.toLowerCase())) {
                                                    let aOrBAway = '';
                                                    if (awayTeam.endsWith(' A')) {
                                                        aOrBAway = ' A';
                                                    }
                                                    if (awayTeam.endsWith(' B')) {
                                                        aOrBAway = ' B';
                                                    }
                                                    awayTeam = teamName.toUpperCase() + aOrBAway;
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
                                            }
                                        )}
                                    </Table>
                                </div>
                            )}
                            <br />
                            <hr />
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
                <YearSelectDropdown
                    statsCallback={statsCallback}
                    yearToDisplay={yearToDisplay}
                    showOldYears={false}
                />
                <h1>RESULTS</h1>
                <p>No results for {yearToDisplay}</p>
            </div>
        );
    }
}

export default Results;
