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

    const [orderByPlayerBool, setOrderByPlayerBool] = useState(false);
    const [orderByGamesBool, setOrderByGamesBool] = useState(false);
    const [orderByAverageBool, setOrderByAverageBool] = useState(false);
    const [orderByWinsBool, setOrderByWinsBool] = useState(false);
    const [orderByWinPercBool, setOrderByWinPercBool] = useState(false);

    function displayPlayer(event) {
        const playerName = event.target.innerHTML;
        if (displayPlayerStatsCallback) {
            displayPlayerStatsCallback(playerName);
        }
    }

    function orderByName() {
        setOrderByPlayerBool(true);
        setOrderByGamesBool(false);
        setOrderByWinsBool(false);
        setOrderByWinPercBool(false);
        setOrderByAverageBool(false);
    }

    function orderPlayersByName() {
        const playerOrder = [...playerStats].sort();
        return playerOrder;
    }

    function orderByGames() {
        setOrderByGamesBool(true);
        setOrderByPlayerBool(false);
        setOrderByWinsBool(false);
        setOrderByWinPercBool(false);
        setOrderByAverageBool(false);
    }

    function orderPlayersByGames() {
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

        return gameOrder;
    }

    function orderByWins() {
        setOrderByWinsBool(true);
        setOrderByPlayerBool(false);
        setOrderByGamesBool(false);
        setOrderByWinPercBool(false);
        setOrderByAverageBool(false);
    }

    function orderPlayersByWins() {
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

        return winOrder;
    }

    function orderByWinPerc() {
        setOrderByWinPercBool(true);
        setOrderByPlayerBool(false);
        setOrderByGamesBool(false);
        setOrderByWinsBool(false);
        setOrderByAverageBool(false);
    }

    function orderPlayersByWinPerc() {
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

        return winPercOrder;
    }

    function orderByAverage() {
        setOrderByAverageBool(true);
        setOrderByPlayerBool(false);
        setOrderByGamesBool(false);
        setOrderByWinsBool(false);
        setOrderByWinPercBool(false);
    }

    function orderPlayersByAverage() {
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

        return averageOrder;
    }

    function displayPlayers() {
        let stats;
        if (
            !orderByPlayerBool &&
            !orderByGamesBool &&
            !orderByWinsBool &&
            !orderByWinPercBool &&
            !orderByAverageBool
        ) {
            stats = orderPlayersByName();
        }
        if (orderByPlayerBool) {
            stats = orderPlayersByName();
        }
        if (orderByGamesBool) {
            stats = orderPlayersByGames();
        }
        if (orderByWinsBool) {
            stats = orderPlayersByWins();
        }
        if (orderByWinPercBool) {
            stats = orderPlayersByWinPerc();
        }
        if (orderByAverageBool) {
            stats = orderPlayersByAverage();
        }

        return stats.map((player, key) => {
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
                                    {capitalizeText([player.player])}
                                </a>
                            </td>
                            <td>{gamesPlayed}</td>
                            <td>{wins}</td>
                            <td>{((wins / gamesPlayed) * 100).toFixed(0)}%</td>
                            <td>{average.toFixed(2)}</td>
                        </tr>
                    )}
                </tbody>
            );
        });
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

    if (playerStats) {
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
                                            padding: '0',
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
                                            padding: '0',
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
                                            padding: '0',
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
                                            padding: '0',
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
                                            padding: '0',
                                        }}
                                    >
                                        AVERAGE
                                    </Button>
                                </th>
                            </tr>
                        </thead>
                        {displayPlayers()}
                    </Table>
                </div>
            </div>
        );
    } else {
        return <h5>No stats available</h5>;
    }
}

export default PlayerStatSummary;
