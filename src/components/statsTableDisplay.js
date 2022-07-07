import React from 'react';
import { Table } from 'react-bootstrap';
import { capitalizeText, arrayToList } from '../helpers/utils';

function StatsTableDisplay(props) {
    const totalGames = props.totalGames;
    const totalWins = props.totalWins;
    const homeWins = props.homeWins || 0;
    const awayWins = props.awayWins || 0;
    const cupWins = props.cupWins || 0;
    const totalLosses = props.totalLosses;
    const homeLosses = props.homeLosses || 0;
    const awayLosses = props.awayLosses || 0;
    const cupLosses = props.cupLosses || 0;
    const totalDraws = props.totalDraws;
    const homeDraws = props.homeDraws || 0;
    const awayDraws = props.awayDraws || 0;
    const stanningleyAgg = props.stanningleyAgg;
    const opponentAgg = props.opponentAgg;
    const stanningleyTeamScore = props.stanningleyTeamScore;
    const opponentTeamScore = props.opponentTeamScore;
    const leaguePoints = props.leaguePoints;
    const leaguePosition = props.leaguePosition;
    const teamsBeaten = props.teamsBeaten
        ? arrayToList(props.teamsBeaten)
        : props.teamsBeaten;
    const teamsLostTo = props.teamsLostTo
        ? arrayToList(props.teamsLostTo)
        : props.teamsLostTo;
    const teamsDrawn = props.teamsDrawn
        ? arrayToList(props.teamsDrawn)
        : props.teamsDrawn;
    const results = props.results ? arrayToList(props.results) : props.results;

    return (
        <div className="center table" style={{ width: '97%' }}>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>STATISTIC</th>
                        <th>VALUE</th>
                    </tr>
                </thead>
                <tbody>
                    {totalGames > 0 && (
                        <tr>
                            <td>Games</td>
                            <td>{totalGames}</td>
                        </tr>
                    )}
                    {leaguePosition >= 0 && (
                        <tr>
                            <td>Current league position</td>
                            <td>{leaguePosition}</td>
                        </tr>
                    )}
                    {leaguePoints >= 0 && (
                        <tr>
                            <td>Current league points</td>
                            <td>{leaguePoints}</td>
                        </tr>
                    )}
                    {totalWins > 0 && (
                        <tr>
                            <td>Wins</td>
                            <td>{totalWins}</td>
                        </tr>
                    )}
                    {totalWins > 0 && (
                        <tr>
                            <td>Win breakdown</td>
                            <td>
                                {homeWins} home, {awayWins} away, {cupWins} cup
                            </td>
                        </tr>
                    )}
                    {totalLosses > 0 && (
                        <tr>
                            <td>Losses</td>
                            <td>{totalLosses}</td>
                        </tr>
                    )}
                    {totalLosses > 0 && (
                        <tr>
                            <td>Loss breakdown</td>
                            <td>
                                {homeLosses} home, {awayLosses} away,{' '}
                                {cupLosses} cup
                            </td>
                        </tr>
                    )}
                    {totalDraws > 0 && (
                        <tr>
                            <td>Draws</td>
                            <td>{totalDraws}</td>
                        </tr>
                    )}
                    {totalDraws > 0 && (
                        <tr>
                            <td>Draw breakdown</td>
                            <td>
                                {homeDraws} home, {awayDraws} away
                            </td>
                        </tr>
                    )}
                    {stanningleyAgg > 0 && (
                        <tr>
                            <td>Stanningley aggregate</td>
                            <td>{stanningleyAgg}</td>
                        </tr>
                    )}
                    {opponentAgg > 0 && (
                        <tr>
                            <td>Opponents aggregate</td>
                            <td>{opponentAgg}</td>
                        </tr>
                    )}
                    {stanningleyTeamScore > 0 && (
                        <tr>
                            <td>Stanningley points</td>
                            <td>{stanningleyTeamScore}</td>
                        </tr>
                    )}
                    {opponentTeamScore > 0 && (
                        <tr>
                            <td>Opponents points</td>
                            <td>{opponentTeamScore}</td>
                        </tr>
                    )}
                    {totalWins > 0 && teamsBeaten && (
                        <tr>
                            <td>Opponents beaten</td>
                            <td>{<ul>{teamsBeaten}</ul>}</td>
                        </tr>
                    )}
                    {totalLosses > 0 && teamsLostTo && (
                        <tr>
                            <td>Opponents lost to</td>
                            <td>{<ul>{teamsLostTo}</ul>}</td>
                        </tr>
                    )}
                    {totalDraws > 0 && teamsDrawn && (
                        <tr>
                            <td>Opponents drawn with</td>
                            <td>{<ul>{teamsDrawn}</ul>}</td>
                        </tr>
                    )}
                    {results && results.length > 0 && (
                        <tr>
                            <td>Results</td>
                            <td>{<ul>{results}</ul>}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
}

export default StatsTableDisplay;
