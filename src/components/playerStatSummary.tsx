import { CSSProperties, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { capitalizeText } from '../helpers/utils';
import { PlayerStatSummaryProps } from '../types/interfaces';

function PlayerStatSummary(props: PlayerStatSummaryProps) {
    let playerStats = props.playerStats;
    const displayPlayerStatsCallback = props.callback;
    const showSinglesOnlyBool = props.showSinglesOnly;
    const showPairsOnlyBool = props.showPairsOnly;
    const showHomeOnlyBool = props.showHomeOnly;
    const showAwayOnlyBool = props.showAwayOnly;
    const showCupOnlyBool = props.showCupOnly;

    const [orderByPlayerBool, setOrderByPlayerBool] = useState(false);
    const [orderByGamesBool, setOrderByGamesBool] = useState(false);
    const [orderByAverageBool, setOrderByAverageBool] = useState(false);
    const [orderByWinsBool, setOrderByWinsBool] = useState(false);
    const [orderByWinPercBool, setOrderByWinPercBool] = useState(false);

    playerStats = playerStats.filter((player) => player.games > 0);
    let style: CSSProperties;
    let href: string;

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
        href = '/#/stats/team';
    }

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
        // TODO remove logging
        playerStats.forEach((player) => {
            console.log(player.player);
            console.log(player[orderByStatPropertyName]);
            console.log('----------------');
        });
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
        let gameOrder = orderPlayers('games');

        // TODO remove this if statement?
        if (!showHomeOnlyBool && !showHomeOnlyBool && !showCupOnlyBool) {
            if (showSinglesOnlyBool) {
                gameOrder = orderPlayers('singlesGames');
            }
            if (showPairsOnlyBool) {
                gameOrder = orderPlayers('pairsGames');
            }
            if (showHomeOnlyBool) {
                gameOrder = orderPlayers('homeGames');
            }
            if (showAwayOnlyBool) {
                gameOrder = orderPlayers('awayGames');
            }
            if (showCupOnlyBool) {
                gameOrder = orderPlayers('cupGames');
            }
        }

        if (showSinglesOnlyBool && showHomeOnlyBool) {
            gameOrder = orderPlayers('singlesHomeGames');
        }
        if (showSinglesOnlyBool && showAwayOnlyBool) {
            gameOrder = orderPlayers('singlesAwayGames');
        }
        if (showSinglesOnlyBool && showCupOnlyBool) {
            gameOrder = orderPlayers('singlesCupGames');
        }
        if (showPairsOnlyBool && showHomeOnlyBool) {
            gameOrder = orderPlayers('pairsHomeGames');
        }
        if (showPairsOnlyBool && showAwayOnlyBool) {
            gameOrder = orderPlayers('pairsAwayGames');
        }
        if (showPairsOnlyBool && showCupOnlyBool) {
            gameOrder = orderPlayers('pairsCupGames');
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
        let winOrder = orderPlayers('wins');

        if (!showHomeOnlyBool && !showHomeOnlyBool && !showCupOnlyBool) {
            if (showSinglesOnlyBool) {
                winOrder = orderPlayers('singlesWins');
            }
            if (showPairsOnlyBool) {
                winOrder = orderPlayers('pairsWins');
            }
            if (showHomeOnlyBool) {
                winOrder = orderPlayers('homeWins');
            }
            if (showAwayOnlyBool) {
                winOrder = orderPlayers('awayWins');
            }
            if (showCupOnlyBool) {
                winOrder = orderPlayers('cupWins');
            }
        }

        if (showSinglesOnlyBool && showHomeOnlyBool) {
            winOrder = orderPlayers('singlesHomeWins');
        }
        if (showSinglesOnlyBool && showAwayOnlyBool) {
            winOrder = orderPlayers('singlesAwayWins');
        }
        if (showSinglesOnlyBool && showCupOnlyBool) {
            winOrder = orderPlayers('singlesCupWins');
        }
        if (showPairsOnlyBool && showHomeOnlyBool) {
            winOrder = orderPlayers('pairsHomeWins');
        }
        if (showPairsOnlyBool && showAwayOnlyBool) {
            winOrder = orderPlayers('pairsAwayWins');
        }
        if (showPairsOnlyBool && showCupOnlyBool) {
            winOrder = orderPlayers('pairsCupWins');
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

    // TODO singles cup order is wrong
    function orderPlayersByWinPerc() {
        let winPercOrder = orderPlayers('winPerc');

        if (!showHomeOnlyBool && !showHomeOnlyBool && !showCupOnlyBool) {
            if (showSinglesOnlyBool) {
                winPercOrder = orderPlayers('singlesWinPerc');
            }
            if (showPairsOnlyBool) {
                winPercOrder = orderPlayers('pairsWinPerc');
            }
            if (showHomeOnlyBool) {
                winPercOrder = orderPlayers('homeWinPerc');
            }
            if (showAwayOnlyBool) {
                winPercOrder = orderPlayers('awayWinPerc');
            }
            if (showCupOnlyBool) {
                winPercOrder = orderPlayers('cupWinPerc');
            }
        }

        if (showSinglesOnlyBool && showHomeOnlyBool) {
            winPercOrder = orderPlayers('singlesHomeWinPerc');
        }
        if (showSinglesOnlyBool && showAwayOnlyBool) {
            winPercOrder = orderPlayers('singlesAwayWinPerc');
        }
        if (showSinglesOnlyBool && showCupOnlyBool) {
            winPercOrder = orderPlayers('singlesCupWinPerc');
        }
        if (showPairsOnlyBool && showHomeOnlyBool) {
            winPercOrder = orderPlayers('pairsHomeWinPerc');
        }
        if (showPairsOnlyBool && showAwayOnlyBool) {
            winPercOrder = orderPlayers('pairsAwayWinPerc');
        }
        if (showPairsOnlyBool && showCupOnlyBool) {
            winPercOrder = orderPlayers('pairsCupWinPerc');
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

    // TODO order by pairs average incorrect
    // TODO singles cup order is wrong
    function orderPlayersByAverage() {
        let averageOrder = orderPlayers('average');

        if (!showHomeOnlyBool && !showHomeOnlyBool && !showCupOnlyBool) {
            if (showSinglesOnlyBool) {
                averageOrder = orderPlayers('singlesAverage');
            }
            if (showPairsOnlyBool) {
                averageOrder = orderPlayers('pairsAverage');
            }
            if (showHomeOnlyBool) {
                averageOrder = orderPlayers('homeAverage');
            }
            if (showAwayOnlyBool) {
                averageOrder = orderPlayers('awayAverage');
            }
            if (showCupOnlyBool) {
                averageOrder = orderPlayers('cupAverage');
            }
        }

        if (showSinglesOnlyBool && showHomeOnlyBool) {
            averageOrder = orderPlayers('singlesHomeAverage');
        }
        if (showSinglesOnlyBool && showAwayOnlyBool) {
            averageOrder = orderPlayers('singlesAwayAverage');
        }
        if (showSinglesOnlyBool && showCupOnlyBool) {
            averageOrder = orderPlayers('singlesCupAverage');
        }
        if (showPairsOnlyBool && showHomeOnlyBool) {
            averageOrder = orderPlayers('pairsHomeAverage');
        }
        if (showPairsOnlyBool && showAwayOnlyBool) {
            averageOrder = orderPlayers('pairsAwayAverage');
        }
        if (showPairsOnlyBool && showCupOnlyBool) {
            averageOrder = orderPlayers('pairsCupAverage');
        }

        return averageOrder;
    }

    function displayPlayers() {
        let stats = orderPlayersByName();

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

            // TODO refactor this logic?

            if (showSinglesOnlyBool) {
                gamesPlayed = player.singlesGames;
                average = player.singlesAverage;
                wins = player.singlesWins;
            }

            if (showPairsOnlyBool) {
                gamesPlayed = player.pairsGames;
                average = player.pairsAverage;
                wins = player.pairsWins;
            }

            if (showHomeOnlyBool) {
                if (!showSinglesOnlyBool && !showPairsOnlyBool) {
                    gamesPlayed = player.homeGames;
                    average = player.homeAverage;
                    wins = player.homeWins;
                }

                if (showSinglesOnlyBool) {
                    gamesPlayed = player.singlesHomeGames;
                    average = player.singlesHomeAverage;
                    wins = player.singlesHomeWins;
                }
                if (showPairsOnlyBool) {
                    gamesPlayed = player.pairsHomeGames;
                    average = player.pairsHomeAverage;
                    wins = player.pairsHomeWins;
                }
            }

            if (showAwayOnlyBool) {
                if (!showSinglesOnlyBool && !showPairsOnlyBool) {
                    gamesPlayed = player.awayGames;
                    average = player.awayAverage;
                    wins = player.awayWins;
                }

                if (showSinglesOnlyBool) {
                    gamesPlayed = player.singlesAwayGames;
                    average = player.singlesAwayAverage;
                    wins = player.singlesAwayWins;
                }
                if (showPairsOnlyBool) {
                    gamesPlayed = player.pairsAwayGames;
                    average = player.pairsAwayAverage;
                    wins = player.pairsAwayWins;
                }
            }

            if (showCupOnlyBool) {
                if (!showSinglesOnlyBool && !showPairsOnlyBool) {
                    gamesPlayed = player.cupGames;
                    average = player.cupAverage;
                    wins = player.cupWins;
                }

                if (showSinglesOnlyBool) {
                    gamesPlayed = player.singlesCupGames;
                    average = player.singlesCupAverage;
                    wins = player.singlesCupWins;
                }
                if (showPairsOnlyBool) {
                    gamesPlayed = player.pairsCupGames;
                    average = player.pairsCupAverage;
                    wins = player.pairsCupWins;
                }
            }

            return (
                <tbody key={key}>
                    {gamesPlayed && gamesPlayed > 0 ? (
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
                    ) : null}
                </tbody>
            );
        });
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
                                        id="order-by-name%-button"
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
