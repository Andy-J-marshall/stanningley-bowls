import { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { config } from '../config';
import { ResultsProps, Result } from '../types/interfaces';
import { returnStructuredResultsArray } from '../helpers/playerStatsHelper';

const teamName = config.teamNames.shortName.toLowerCase();
const currentYear = new Date().getFullYear();

function Results(props: ResultsProps) {
    const stats = props.stats;
    const yearToDisplay = props.yearToDisplay;

    const yearInTitle =
        currentYear !== Number(yearToDisplay) ? `${yearToDisplay}` : '';

    const { teamResults } = stats;

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    const allTeamResultsArray = teamResults?.map((team) => {
        const results: Result[] = returnStructuredResultsArray(team.results);
        return {
            name: config.allTeamsInLeaguesSince2013.find((t) =>
                t.toLowerCase().includes(team.day.toLowerCase())
            ),
            results,
        };
    });

    const resultsArray = allTeamResultsArray?.filter(
        (team) => team?.results?.length > 0
    );

    const hasResults = resultsArray && resultsArray?.length > 0;

    if (!hasResults) {
        return (
            <div id="result">
                <h1>{yearInTitle} results</h1>
                <p>No results for {yearToDisplay}</p>
            </div>
        );
    }

    return (
        <div id="result">
            <h1>{yearInTitle} results</h1>

            {/* Show results if found */}
            {resultsArray?.map((team, idx) => {
                return (
                    <div key={idx} className="teamResult">
                        <h3>{team.name?.toLowerCase()}</h3>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>home</th>
                                    <th></th>
                                    <th></th>
                                    <th>away</th>
                                </tr>
                            </thead>
                            {team.results.map((result, idx) => {
                                let homeTeam = result.home.name;
                                if (homeTeam.toLowerCase().includes(teamName)) {
                                    if (homeTeam.endsWith(' A')) {
                                        homeTeam = `${teamName.toUpperCase()} A`;
                                    }
                                    if (homeTeam.endsWith(' B')) {
                                        homeTeam = `${teamName.toUpperCase()} B`;
                                    }
                                }

                                let awayTeam = result.away.name;
                                if (awayTeam.toLowerCase().includes(teamName)) {
                                    if (awayTeam.endsWith(' A')) {
                                        awayTeam = `${teamName.toUpperCase()} A`;
                                    }
                                    if (awayTeam.endsWith(' B')) {
                                        awayTeam = `${teamName.toUpperCase()} B`;
                                    }
                                }

                                return (
                                    <tbody key={idx}>
                                        <tr>
                                            <td>{homeTeam}</td>
                                            <td className="result-column">
                                                {result.home.score}
                                            </td>
                                            <td>{result.away.score}</td>
                                            <td>{awayTeam}</td>
                                        </tr>
                                    </tbody>
                                );
                            })}
                        </Table>
                        <br />
                        <hr />
                    </div>
                );
            })}
            <br />
            {<p className="footnote">Last Updated: {stats.lastUpdated}</p>}
        </div>
    );
}

export default Results;
