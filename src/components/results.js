import { Table } from 'react-bootstrap';
import YearSelectDropdown from './yearSelectDropdown';
import config from '../config';

const teamName = config.teamNames.shortName;

function Results(props) {
    const stats = props.stats;
    const statsCallback = props.statsCallback;
    const numberOfYearsToDisplay = props.numberOfYearsToDisplay;
    const yearToDisplay = props.yearToDisplay;

    const { teamResults } = stats;

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
                {resultsArray.map((resultTeam, idx) => {
                    const teamConfig = config.teams.find((configTeam) =>
                        resultTeam.day
                            .toLowerCase()
                            .includes(configTeam.name.toLowerCase())
                    );

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
                                                <th>DATE</th>
                                                <th>HOME</th>
                                                <th></th>
                                                <th></th>
                                                <th>AWAY</th>
                                            </tr>
                                        </thead>
                                        {resultTeam.results.map(
                                            (result, idx) => {
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
                                                            {homeTeam
                                                                .toLowerCase()
                                                                .includes(
                                                                    teamName.toLowerCase()
                                                                ) ? (
                                                                <td
                                                                    style={{
                                                                        width: '38%',
                                                                    }}
                                                                >
                                                                    {teamName.toUpperCase()}
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
                                                            {awayTeam
                                                                .toLowerCase()
                                                                .includes(
                                                                    teamName.toLowerCase()
                                                                ) ? (
                                                                <td
                                                                    style={{
                                                                        width: '38%',
                                                                    }}
                                                                >
                                                                    {teamName.toUpperCase()}
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
                                            }
                                        )}
                                    </Table>
                                    <p className="footnote">
                                        The full league results can be found on{' '}
                                        <a
                                            style={{ textDecoration: 'none' }}
                                            target="_blank"
                                            href={teamConfig.link}
                                        >
                                            Bowlsnet
                                        </a>
                                        .
                                    </p>
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
                <YearSelectDropdown
                    numberOfYearsToDisplay={numberOfYearsToDisplay}
                    statsCallback={statsCallback}
                    yearToDisplay={yearToDisplay}
                />
                <h1>RESULTS</h1>
                <p>No results for {yearToDisplay}</p>
            </div>
        );
    }
}

export default Results;
