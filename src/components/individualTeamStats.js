import React from 'react';
import StatsTableDisplay from './statsTableDisplay';
import { Table } from 'react-bootstrap';
import { capitalizeText } from '../helpers/utils';

function IndividualTeamStats(props) {
    const day = props.day;
    const stats = props.stats;
    const playerStats = props.playerStats;

    const {
        awayWins,
        homeWins,
        cupWins,
        cupLosses,
        awayLosses,
        homeLosses,
        homeDraws,
        awayDraws,
        stanningleyAgg,
        stanningleyTotalPoints,
        opponentAgg,
        opponentTotalPoints,
        leaguePosition,
        leaguePoints,
    } = stats;

    const allPlayerStats = Object.keys(playerStats)
        .sort()
        .map((player) => {
            const stats = playerStats[player][day.toLowerCase()];
            const { games, wins, aggDiff } = stats;
            const playerDayStats = {
                player,
                games,
                wins,
                average: aggDiff / games,
            };
            return playerDayStats;
        });

    const totalDraws = awayDraws + homeDraws;
    const totalWins = awayWins + homeWins + cupWins;
    const totalLosses = awayLosses + homeLosses + cupLosses;
    const totalGames = totalDraws + totalWins + totalLosses;

    return (
        <div id={day + '-team-results'}>
            <StatsTableDisplay
                totalGames={totalGames}
                totalWins={totalWins}
                totalLosses={totalLosses}
                totalDraws={totalDraws}
                stanningleyAgg={stanningleyAgg}
                opponentAgg={opponentAgg}
                stanningleyTeamScore={stanningleyTotalPoints}
                opponentTeamScore={opponentTotalPoints}
                homeWins={homeWins}
                awayWins={awayWins}
                cupWins={cupWins}
                homeLosses={homeLosses}
                awayLosses={awayLosses}
                cupLosses={cupLosses}
                homeDraws={homeDraws}
                awayDraws={awayDraws}
                leaguePoints={leaguePoints}
                leaguePosition={leaguePosition}
            />

            <div id="player-stats-per-team">
                <h1>PLAYERS</h1>
                <div className="center table" style={{ width: '97%' }}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>PLAYER</th>
                                <th>GAMES</th>
                                <th>WINS</th>
                                <th>AVERAGE</th>
                            </tr>
                        </thead>
                        {allPlayerStats.map((player, key) => {
                            return (
                                <tbody key={key}>
                                    {player.games > 0 && (
                                        <tr>
                                            <td>
                                                {capitalizeText([
                                                    player.player,
                                                ])}
                                            </td>
                                            <td>{player.games}</td>
                                            <td>{player.wins}</td>
                                            <td>{player.average.toFixed(2)}</td>
                                        </tr>
                                    )}
                                </tbody>
                            );
                        })}
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default IndividualTeamStats;
