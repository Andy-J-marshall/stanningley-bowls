import React from 'react';
import { Table } from 'react-bootstrap';
import { capitalizeText } from '../helpers/utils';

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
    const teamsBeaten = props.teamsBeaten;
    const teamsLostTo = props.teamsLostTo;
    const teamsDrawn = props.teamsDrawn;

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
                            <td>Stanningley points scored</td>
                            <td>{stanningleyAgg}</td>
                        </tr>
                    )}
                    {opponentAgg > 0 && (
                        <tr>
                            <td>Opponents points scored</td>
                            <td>{opponentAgg}</td>
                        </tr>
                    )}
                    {stanningleyTeamScore > 0 && (
                        <tr>
                            <td>Stanningley score</td>
                            <td>{stanningleyTeamScore}</td>
                        </tr>
                    )}
                    {opponentTeamScore > 0 && (
                        <tr>
                            <td>Opponents score</td>
                            <td>{opponentTeamScore}</td>
                        </tr>
                    )}
                    {totalWins > 0 && teamsBeaten && (
                        <tr>
                            <td>Opponents beaten</td>
                            <td>{capitalizeText(teamsBeaten)}</td>
                        </tr>
                    )}
                    {totalLosses > 0 && teamsLostTo && (
                        <tr>
                            <td>Opponents lost to</td>
                            <td>{capitalizeText(teamsLostTo)}</td>
                        </tr>
                    )}
                    {totalDraws > 0 && teamsDrawn && (
                        <tr>
                            <td>Opponents drawn with</td>
                            <td>{capitalizeText(teamsDrawn)}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
}

export default StatsTableDisplay;
