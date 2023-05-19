import { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { capitalizeText } from '../helpers/utils';

function PlayerStatSummary(props) {
    let playerStats = props.playerStats;
    const displayPlayerStatsCallback = props.callback;
    const showSinglesOnlyBool = props.showSinglesOnly;

    playerStats = playerStats.filter((player) => player.games > 0);

    let style;
    let href;

    const [orderedPlayerStats, setOrderedPlayerStats] = useState(playerStats);

    function displayPlayer(event) {
        const playerName = event.target.innerHTML;
        if (displayPlayerStatsCallback) {
            displayPlayerStatsCallback(playerName);
        }
    }

    function orderByName() {
        const playerOrder = [...playerStats].sort();

        setOrderedPlayerStats(playerOrder);
    }

    function orderByGames() {
        let gameOrder;

        if (showSinglesOnlyBool) {
            gameOrder = [...playerStats].sort((p1, p2) =>
                p1.singleGames < p2.singleGames
                    ? 1
                    : p1.singleGames > p2.singleGames
                    ? -1
                    : 0
            );
        } else {
            gameOrder = [...playerStats].sort((p1, p2) =>
                p1.games < p2.games ? 1 : p1.games > p2.games ? -1 : 0
            );
        }

        setOrderedPlayerStats(gameOrder);
    }

    function orderByWins() {
        let winOrder;

        if (showSinglesOnlyBool) {
            winOrder = [...playerStats].sort((p1, p2) =>
                p1.singlesWins < p2.singlesWins
                    ? 1
                    : p1.singlesWins > p2.singlesWins
                    ? -1
                    : 0
            );
        } else {
            winOrder = [...playerStats].sort((p1, p2) =>
                p1.wins < p2.wins ? 1 : p1.wins > p2.wins ? -1 : 0
            );
        }

        setOrderedPlayerStats(winOrder);
    }

    function orderByWinPerc() {
        let winPercOrder;

        if (showSinglesOnlyBool) {
            winPercOrder = [...playerStats].sort((p1, p2) =>
                (p1.singlesWins / p1.singleGames) * 100 <
                (p2.singlesWins / p2.singleGames) * 100
                    ? 1
                    : (p1.singlesWins / p1.singleGames) * 100 >
                      (p2.singlesWins / p2.singleGames) * 100
                    ? -1
                    : 0
            );
        } else {
            winPercOrder = [...playerStats].sort((p1, p2) =>
                (p1.wins / p1.games) * 100 < (p2.wins / p2.games) * 100
                    ? 1
                    : (p1.wins / p1.games) * 100 > (p2.wins / p2.games) * 100
                    ? -1
                    : 0
            );
        }

        setOrderedPlayerStats(winPercOrder);
    }

    function orderByAverage() {
        let averageOrder;

        if (showSinglesOnlyBool) {
            averageOrder = [...playerStats].sort((p1, p2) =>
                p1.singlesAverage < p2.singlesAverage
                    ? 1
                    : p1.singlesAverage > p2.singlesAverage
                    ? -1
                    : 0
            );
        } else {
            averageOrder = [...playerStats].sort((p1, p2) =>
                p1.average < p2.average ? 1 : p1.average > p2.average ? -1 : 0
            );
        }

        setOrderedPlayerStats(averageOrder);
    }

    if (displayPlayerStatsCallback) {
        style = {
            textDecoration: 'underline',
            color: '#004558',
        };
        href = '/#/stats/player';
    } else {
        style = {
            textDecoration: 'none',
            color: 'black',
        };
        href = null;
    }

    if (orderedPlayerStats) {
        return (
            <div id="player-stats-per-team">
                <div className="center table" style={{ width: '97%' }}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>
                                    <Button
                                        id="order-by-win%-button"
                                        variant="light"
                                        onClick={orderByName}
                                        style={{
                                            backgroundColor: 'white',
                                            border: 'none',
                                        }}
                                    >
                                        PLAYER
                                    </Button>
                                </th>
                                <th>
                                    <Button
                                        id="order-by-win%-button"
                                        variant="light"
                                        onClick={orderByGames}
                                        style={{
                                            backgroundColor: 'white',
                                            border: 'none',
                                        }}
                                    >
                                        GAMES
                                    </Button>
                                </th>
                                <th>
                                    <Button
                                        id="order-by-wins-button"
                                        variant="light"
                                        onClick={orderByWins}
                                        style={{
                                            backgroundColor: 'white',
                                            border: 'none',
                                        }}
                                    >
                                        WINS
                                    </Button>
                                </th>
                                <th>
                                    <Button
                                        id="order-by-win%-button"
                                        variant="light"
                                        onClick={orderByWinPerc}
                                        style={{
                                            backgroundColor: 'white',
                                            border: 'none',
                                        }}
                                    >
                                        WIN %
                                    </Button>
                                </th>
                                <th>
                                    <Button
                                        id="order-by-win%-button"
                                        variant="light"
                                        onClick={orderByAverage}
                                        style={{
                                            backgroundColor: 'white',
                                            border: 'none',
                                        }}
                                    >
                                        AVERAGE
                                    </Button>
                                </th>
                            </tr>
                        </thead>
                        {orderedPlayerStats.map((player, key) => {
                            let gamesPlayed = player.games;
                            let average = player.average;
                            let wins = player.wins;

                            if (showSinglesOnlyBool) {
                                gamesPlayed = player.singleGames;
                                average = player.singlesAverage;
                                wins = player.singlesWins;
                            }

                            return (
                                <tbody key={key}>
                                    {gamesPlayed > 0 && (
                                        <tr>
                                            <td>
                                                <a
                                                    style={style}
                                                    href={href}
                                                    onClick={displayPlayer}
                                                >
                                                    {capitalizeText([
                                                        player.player,
                                                    ])}
                                                </a>
                                            </td>
                                            <td>{gamesPlayed}</td>
                                            <td>{wins}</td>
                                            <td>
                                                {(
                                                    (wins / gamesPlayed) *
                                                    100
                                                ).toFixed(0)}
                                                %
                                            </td>
                                            <td>{average.toFixed(2)}</td>
                                        </tr>
                                    )}
                                </tbody>
                            );
                        })}
                    </Table>
                </div>
            </div>
        );
    } else {
        return <h5>No stats available</h5>;
    }
}

export default PlayerStatSummary;
