import { CSSProperties, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { capitalizeText } from '../helpers/utils';
import {
    PlayerStatsTeamSummary,
    PlayerStatSummaryProps,
} from '../types/interfaces';
import { orderBy } from '../helpers/statsHelper';
import { returnPlayerSummaryDisplayStats } from '../helpers/playerStatsSummaryHelper';

function PlayerStatSummary(props: PlayerStatSummaryProps) {
    const playerStats = props.playerStats;
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

        return orderBy(propertyLowerFirstChar, filteredPlayerStats);
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

        const statsToUse = returnPlayerSummaryDisplayStats(
            stats,
            showSinglesOnlyBool,
            showPairsOnlyBool,
            showHomeOnlyBool,
            showAwayOnlyBool,
            showCupOnlyBool
        );

        return statsToUse;
    }

    function displayStats(statsToUse: PlayerStatsTeamSummary[]) {
        return statsToUse.map((p, key) => {
            const idPrefix = p.player.replace(' ', '-');
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
                            <td id={`${idPrefix}-games`}>{p.games}</td>
                            <td id={`${idPrefix}-wins`}>{p.wins}</td>
                            <td id={`${idPrefix}-win-perc`}>
                                {p.wins && p.winPerc}%
                            </td>
                            <td id={`${idPrefix}-avg`}>
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
                <Table id="player-stats-per-team" striped bordered hover>
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
                                    player
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
                                    games
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
                                    wins
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
                                    win %
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
                                    average
                                </Button>
                            </th>
                        </tr>
                    </thead>
                    {displayStats(statsToUse)}
                </Table>
            );
        }
    } else {
        return <h3>No stats available</h3>;
    }
}

export default PlayerStatSummary;
