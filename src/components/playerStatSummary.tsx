import { CSSProperties, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { capitalizeText } from '../helpers/utils';
import {
    PlayerStatsTeamSummary,
    PlayerStatSummaryProps,
} from '../types/interfaces';
import { isPlayerStatsSummaryType } from '../helpers/statsHelper';

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

    let style: CSSProperties;
    let href: string;

    const filteredPlayerStats = playerStats.filter(
        (player) => player.games > 0
    );

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

    function orderPlayersBy(orderByStatPropertyName: string) {
        // orderByStatPropertyName must exactly match a property name in the PlayerStatsSummary interface
        let propertyName = orderByStatPropertyName;

        if (showSinglesOnlyBool) {
            propertyName = 'singles' + orderByStatPropertyName;
        }
        if (showPairsOnlyBool) {
            propertyName = 'pairs' + orderByStatPropertyName;
        }
        if (showHomeOnlyBool) {
            propertyName = 'home' + orderByStatPropertyName;
        }
        if (showAwayOnlyBool) {
            propertyName = 'away' + orderByStatPropertyName;
        }
        if (showCupOnlyBool) {
            propertyName = 'cup' + orderByStatPropertyName;
        }

        if (showSinglesOnlyBool && showHomeOnlyBool) {
            propertyName = 'singlesHome' + orderByStatPropertyName;
        }
        if (showSinglesOnlyBool && showAwayOnlyBool) {
            propertyName = 'singlesAway' + orderByStatPropertyName;
        }
        if (showSinglesOnlyBool && showCupOnlyBool) {
            propertyName = 'singlesCup' + orderByStatPropertyName;
        }

        if (showPairsOnlyBool && showHomeOnlyBool) {
            propertyName = 'pairsHome' + orderByStatPropertyName;
        }
        if (showPairsOnlyBool && showAwayOnlyBool) {
            propertyName = 'pairsAway' + orderByStatPropertyName;
        }
        if (showPairsOnlyBool && showCupOnlyBool) {
            propertyName = 'pairsCup' + orderByStatPropertyName;
        }

        const propertyLowerFirstChar =
            propertyName.charAt(0).toLowerCase() + propertyName.slice(1);

        return orderBy(propertyLowerFirstChar);
    }

    function orderBy(orderByStatPropertyName: string) {
        const order = [...filteredPlayerStats].sort((p1: any, p2: any) =>
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

    function returnPlayersOrderedByName() {
        const playerOrder = [...filteredPlayerStats].sort();
        return playerOrder;
    }

    function orderByGames() {
        setOrderByGamesBool(true);
        setOrderByPlayerBool(false);
        setOrderByWinsBool(false);
        setOrderByWinPercBool(false);
        setOrderByAverageBool(false);
    }

    function returnPlayersOrderedByGames() {
        return orderPlayersBy('Games');
    }

    function orderByWins() {
        setOrderByWinsBool(true);
        setOrderByPlayerBool(false);
        setOrderByGamesBool(false);
        setOrderByWinPercBool(false);
        setOrderByAverageBool(false);
    }

    function returnPlayersOrderedByWins() {
        return orderPlayersBy('Wins');
    }

    function orderByWinPerc() {
        setOrderByWinPercBool(true);
        setOrderByPlayerBool(false);
        setOrderByGamesBool(false);
        setOrderByWinsBool(false);
        setOrderByAverageBool(false);
    }

    function returnPlayersOrderedByWinPerc() {
        return orderPlayersBy('WinPerc');
    }

    function orderByAverage() {
        setOrderByAverageBool(true);
        setOrderByPlayerBool(false);
        setOrderByGamesBool(false);
        setOrderByWinsBool(false);
        setOrderByWinPercBool(false);
    }

    function returnPlayersOrderedByAverage() {
        return orderPlayersBy('Average');
    }

    function findStatsToUse() {
        let stats = returnPlayersOrderedByName();

        if (orderByPlayerBool) {
            stats = returnPlayersOrderedByName();
        }
        if (orderByGamesBool) {
            stats = returnPlayersOrderedByGames();
        }
        if (orderByWinsBool) {
            stats = returnPlayersOrderedByWins();
        }
        if (orderByWinPercBool) {
            stats = returnPlayersOrderedByWinPerc();
        }
        if (orderByAverageBool) {
            stats = returnPlayersOrderedByAverage();
        }

        const statsToUse = stats?.map((player) => {
            let games = player.games;
            let average = player.average;
            let wins = player.wins;

            if (isPlayerStatsSummaryType(player)) {
                if (showSinglesOnlyBool) {
                    games = player.singlesGames;
                    average = player.singlesAverage;
                    wins = player.singlesWins;
                }
                if (showPairsOnlyBool) {
                    games = player.pairsGames;
                    average = player.pairsAverage;
                    wins = player.pairsWins;
                }

                if (showHomeOnlyBool) {
                    games = player.homeGames;
                    average = player.homeAverage;
                    wins = player.homeWins;
                }
                if (showHomeOnlyBool && showSinglesOnlyBool) {
                    games = player.singlesHomeGames;
                    average = player.singlesHomeAverage;
                    wins = player.singlesHomeWins;
                }
                if (showHomeOnlyBool && showPairsOnlyBool) {
                    games = player.pairsHomeGames;
                    average = player.pairsHomeAverage;
                    wins = player.pairsHomeWins;
                }

                if (showAwayOnlyBool) {
                    games = player.awayGames;
                    average = player.awayAverage;
                    wins = player.awayWins;
                }
                if (showAwayOnlyBool && showSinglesOnlyBool) {
                    games = player.singlesAwayGames;
                    average = player.singlesAwayAverage;
                    wins = player.singlesAwayWins;
                }
                if (showAwayOnlyBool && showPairsOnlyBool) {
                    games = player.pairsAwayGames;
                    average = player.pairsAwayAverage;
                    wins = player.pairsAwayWins;
                }

                if (showCupOnlyBool) {
                    games = player.cupGames;
                    average = player.cupAverage;
                    wins = player.cupWins;
                }
                if (showCupOnlyBool && showSinglesOnlyBool) {
                    games = player.singlesCupGames;
                    average = player.singlesCupAverage;
                    wins = player.singlesCupWins;
                }
                if (showCupOnlyBool && showPairsOnlyBool) {
                    games = player.pairsCupGames;
                    average = player.pairsCupAverage;
                    wins = player.pairsCupWins;
                }
            }
            const winPerc = wins && (wins / games) * 100;
            const playerName = player.player;

            return { player: playerName, games, average, wins, winPerc };
        });

        return statsToUse;
    }

    function displayStats(statsToUse: PlayerStatsTeamSummary[]) {
        return statsToUse.map((p, key) => {
            return (
                <tbody key={key}>
                    {p.games && p.games > 0 ? (
                        <tr>
                            <td>
                                <a
                                    style={style}
                                    href={href}
                                    onClick={displayPlayer}
                                >
                                    {capitalizeText([p.player])}
                                </a>
                            </td>
                            <td id={`${p.player.replace(' ', '-')}-games`}>
                                {p.games}
                            </td>
                            <td id={`${p.player.replace(' ', '-')}-wins`}>
                                {p.wins}
                            </td>
                            <td id={`${p.player.replace(' ', '-')}-win-perc`}>
                                {p.wins &&
                                    ((p.wins / p.games) * 100).toFixed(0)}
                                %
                            </td>
                            <td id={`${p.player.replace(' ', '-')}-avg`}>
                                {p.average?.toFixed(2)}
                            </td>
                        </tr>
                    ) : null}
                </tbody>
            );
        });
    }

    if (filteredPlayerStats) {
        const statsToUse = findStatsToUse();
        const playerCount = statsToUse.filter((p) => p.games > 0).length;

        if (playerCount === 0) {
            return <h3>No player stats found</h3>;
        } else {
            return (
                <div id="player-stats-per-team" className="center table">
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
                        {displayStats(statsToUse)}
                    </Table>
                </div>
            );
        }
    } else {
        return <h3>No stats available</h3>;
    }
}

export default PlayerStatSummary;
