import { CSSProperties, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { capitalizeText } from '../helpers/utils';
import { PlayerStatSummaryProps } from '../types/interfaces';

function PlayerStatSummary(props: PlayerStatSummaryProps) {
    let playerStats = props.playerStats;
    const displayPlayerStatsCallback = props.callback;
    const showSinglesOnlyBool = props.showSinglesOnly;
    const showPairsOnlyBool = props.showPairsOnly;

    playerStats = playerStats.filter((player) => player.games > 0);

    let style: CSSProperties;
    let href: string | undefined;

    const [orderByPlayerBool, setOrderByPlayerBool] = useState(false);
    const [orderByGamesBool, setOrderByGamesBool] = useState(false);
    const [orderByAverageBool, setOrderByAverageBool] = useState(false);
    const [orderByWinsBool, setOrderByWinsBool] = useState(false);
    const [orderByWinPercBool, setOrderByWinPercBool] = useState(false);

    function displayPlayer(event: React.MouseEvent<HTMLAnchorElement>) {
        const playerName = event.currentTarget.innerHTML;
        if (displayPlayerStatsCallback) {
            displayPlayerStatsCallback(playerName);
        }
    }

    function orderPlayers(orderByStatPropertyName: string) {
        const order = [...playerStats].sort((p1: any, p2: any) =>
            p1[orderByStatPropertyName] < p2[orderByStatPropertyName]
                ? 1
                : p1[orderByStatPropertyName] > p2[orderByStatPropertyName]
                ? -1
                : 0
        );
        return order;
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

        if (showSinglesOnlyBool || showPairsOnlyBool) {
            if (showSinglesOnlyBool) {
                gameOrder = orderPlayers('singleGames');
            }
            if (showPairsOnlyBool) {
                gameOrder = orderPlayers('pairsGames');
            }
        } else {
            gameOrder = orderPlayers('games');
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

        if (showSinglesOnlyBool || showPairsOnlyBool) {
            if (showSinglesOnlyBool) {
                winOrder = orderPlayers('singlesWins');
            }
            if (showPairsOnlyBool) {
                winOrder = orderPlayers('pairsWins');
            }
        } else {
            winOrder = orderPlayers('wins');
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

        if (showSinglesOnlyBool || showPairsOnlyBool) {
            if (showSinglesOnlyBool) {
                winPercOrder = orderPlayers('singlesWinPerc');
            }
            if (showPairsOnlyBool) {
                winPercOrder = orderPlayers('pairsWinPerc');
            }
        } else {
            winPercOrder = orderPlayers('winPerc');
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

        if (showSinglesOnlyBool || showPairsOnlyBool) {
            if (showSinglesOnlyBool) {
                averageOrder = orderPlayers('singlesAverage');
            }
            if (showPairsOnlyBool) {
                averageOrder = orderPlayers('pairsAverage');
            }
        } else {
            averageOrder = orderPlayers('average');
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

        return stats?.map((player, key) => {
            let gamesPlayed: number | undefined = player.games;
            let average: number | undefined = player.average;
            let wins: number | undefined = player.wins;

            if (showSinglesOnlyBool) {
                gamesPlayed = player.singleGames;
                average = player.singlesAverage;
                wins = player.singlesWins;
            }

            if (showPairsOnlyBool) {
                gamesPlayed = player.pairsGames;
                average = player.pairsAverage;
                wins = player.pairsWins;
            }

            return (
                <tbody key={key}>
                    {gamesPlayed && gamesPlayed > 0 && (
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
                            <td id={`${player.player.replace(' ', '-')}-games`}>
                                {gamesPlayed}
                            </td>
                            <td id={`${player.player.replace(' ', '-')}-wins`}>
                                {wins}
                            </td>
                            <td
                                id={`${player.player.replace(
                                    ' ',
                                    '-'
                                )}-win-perc`}
                            >
                                {wins &&
                                    ((wins / gamesPlayed) * 100).toFixed(0)}
                                %
                            </td>
                            <td id={`${player.player.replace(' ', '-')}-avg`}>
                                {average?.toFixed(2)}
                            </td>
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
        href = '';
    }

    if (playerStats) {
        return (
            <div id="player-stats-per-team">
                <div className="center table">
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
