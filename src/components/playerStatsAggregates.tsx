import { useEffect, useState } from 'react';
import { Accordion, Row } from 'react-bootstrap';
import StatTile from './statTile';
import GameTypeButton from './gameTypeButtons';
import { PlayerStatsComponentsProps } from '../types/interfaces';

function PlayerStatsAggregates(props: PlayerStatsComponentsProps) {
    const stats = props.stats;

    const {
        totalAgg,
        totalAggAgainst,
        totalPairsAgg,
        totalPairsAggAgainst,
        totalHomeAgg,
        totalHomeAggAgainst,
        totalAwayAgg,
        totalAwayAggAgainst,
        singlesAgg,
        singlesAggAgainst,
        totalPairsHomeAgg,
        totalPairsHomeAggAgainst,
        totalPairsAwayAgg,
        totalPairsAwayAggAgainst,
        totalPairsCupAgg,
        totalPairsCupAggAgainst,
        totalSinglesHomeAgg,
        totalSinglesHomeAggAgainst,
        totalSinglesAwayAgg,
        totalSinglesAwayAggAgainst,
        totalSinglesCupAgg,
        totalSinglesCupAggAgainst,
        cupAgg,
        cupAggAgainst,
        homeGamesPlayed,
        awayGamesPlayed,
        singlesHomeGamesPlayed,
        singlesAwayGamesPlayed,
        singlesCupGamesPlayed,
        pairHomeGamesPlayed,
        pairAwayGamesPlayed,
        pairCupGamesPlayed,
        cupGamesPlayed,
        pairsGames,
        singlesGames,
        availableAgg,
        availablePairsAgg,
        availableHomeAgg,
        availableAwayAgg,
        availableCupAgg,
        availablePairsHomeAgg,
        availablePairsAwayAgg,
        availablePairsCupAgg,
    } = stats;

    const [displayingSingles, setDisplayingSingles] = useState(false);
    const [displayingPairs, setDisplayingPairs] = useState(false);
    const [displayingAll, setDisplayingAll] = useState(true);

    const [displayAvailableAgg, setDisplayAvailableAgg] =
        useState(availableAgg);
    const [displayTotalAgg, setDisplayTotalAgg] = useState(totalAgg);
    const [displayTotalAggAgainst, setDisplayTotalAggAgainst] =
        useState(totalAggAgainst);

    const [displayAvailableHomeAgg, setDisplayAvailableHomeAgg] =
        useState(availableHomeAgg);
    const [displayTotalHomeAgg, setDisplayTotalHomeAgg] =
        useState(totalHomeAgg);
    const [displayTotalHomeAggAgainst, setDisplayTotalHomeAggAgainst] =
        useState(totalHomeAggAgainst);

    const [displayAvailableAwayAgg, setDisplayAvailableAwayAgg] =
        useState(availableAwayAgg);
    const [displayTotalAwayAgg, setDisplayTotalAwayAgg] =
        useState(totalAwayAgg);
    const [displayTotalAwayAggAgainst, setDisplayTotalAwayAggAgainst] =
        useState(totalAwayAggAgainst);

    const [displayAvailableCupAgg, setDisplayAvailableCupAgg] =
        useState(availableCupAgg);
    const [displayCupAgg, setDisplayCupAgg] = useState(cupAgg);
    const [displayCupAggAgainst, setDisplayCupAggAgainst] =
        useState(cupAggAgainst);

    const [displayHomeGamesPlayed, setDisplayHomeGamesPlayed] =
        useState(homeGamesPlayed);
    const [displayAwayGamesPlayed, setDisplayAwayGamesPlayed] =
        useState(awayGamesPlayed);
    const [displayCupGamesPlayed, setDisplayCupGamesPlayed] =
        useState(cupGamesPlayed);

    useEffect(() => {
        refreshStats();
    });

    function displayAll() {
        setDisplayingAll(true);
        setDisplayingSingles(false);
        setDisplayingPairs(false);

        setDisplayAvailableAgg(availableAgg);
        setDisplayTotalAgg(totalAgg);
        setDisplayTotalAggAgainst(totalAggAgainst);

        setDisplayAvailableHomeAgg(availableHomeAgg);
        setDisplayTotalHomeAgg(totalHomeAgg);
        setDisplayTotalHomeAggAgainst(totalHomeAggAgainst);

        setDisplayAvailableAwayAgg(availableAwayAgg);
        setDisplayTotalAwayAgg(totalAwayAgg);
        setDisplayTotalAwayAggAgainst(totalAwayAggAgainst);

        setDisplayAvailableCupAgg(availableCupAgg);
        setDisplayCupAgg(cupAgg);
        setDisplayCupAggAgainst(cupAggAgainst);

        setDisplayHomeGamesPlayed(homeGamesPlayed);
        setDisplayAwayGamesPlayed(awayGamesPlayed);
        setDisplayCupGamesPlayed(cupGamesPlayed);
    }

    function displaySingles() {
        setDisplayingSingles(true);
        setDisplayingPairs(false);
        setDisplayingAll(false);

        setDisplayAvailableAgg(availableAgg - availablePairsAgg);
        setDisplayTotalAgg(singlesAgg);
        setDisplayTotalAggAgainst(singlesAggAgainst);

        setDisplayAvailableHomeAgg(availableHomeAgg - availablePairsHomeAgg);
        setDisplayTotalHomeAgg(totalSinglesHomeAgg);
        setDisplayTotalHomeAggAgainst(totalSinglesHomeAggAgainst);

        setDisplayAvailableAwayAgg(availableAwayAgg - availablePairsAwayAgg);
        setDisplayTotalAwayAgg(totalSinglesAwayAgg);
        setDisplayTotalAwayAggAgainst(totalSinglesAwayAggAgainst);

        setDisplayAvailableCupAgg(availableCupAgg - availablePairsCupAgg);
        setDisplayCupAgg(totalSinglesCupAgg);
        setDisplayCupAggAgainst(totalSinglesCupAggAgainst);

        setDisplayHomeGamesPlayed(singlesHomeGamesPlayed);
        setDisplayAwayGamesPlayed(singlesAwayGamesPlayed);
        setDisplayCupGamesPlayed(singlesCupGamesPlayed);
    }

    function displayPairs() {
        setDisplayingPairs(true);
        setDisplayingSingles(false);
        setDisplayingAll(false);

        setDisplayAvailableAgg(availablePairsAgg);
        setDisplayTotalAgg(totalPairsAgg);
        setDisplayTotalAggAgainst(totalPairsAggAgainst);

        setDisplayAvailableHomeAgg(availablePairsHomeAgg);
        setDisplayTotalHomeAgg(totalPairsHomeAgg);
        setDisplayTotalHomeAggAgainst(totalPairsHomeAggAgainst);

        setDisplayAvailableAwayAgg(availablePairsAwayAgg);
        setDisplayTotalAwayAgg(totalPairsAwayAgg);
        setDisplayTotalAwayAggAgainst(totalPairsAwayAggAgainst);

        setDisplayAvailableCupAgg(availablePairsCupAgg);
        setDisplayCupAgg(totalPairsCupAgg);
        setDisplayCupAggAgainst(totalPairsCupAggAgainst);

        setDisplayHomeGamesPlayed(pairHomeGamesPlayed);
        setDisplayAwayGamesPlayed(pairAwayGamesPlayed);
        setDisplayCupGamesPlayed(pairCupGamesPlayed);
    }

    function refreshStats() {
        if (displayingAll) {
            displayAll();
        }
        if (displayingSingles) {
            displaySingles();
        }
        if (displayingPairs) {
            displayPairs();
        }
    }

    return (
        <div id="player-stats-aggregates">
            <Accordion.Item eventKey="3">
                <Accordion.Header onClick={refreshStats} id="stats-aggregate">
                    AGGREGATES
                </Accordion.Header>
                <Accordion.Body>
                    {pairsGames > 0 && singlesGames > 0 && (
                        <GameTypeButton
                            displayAllCallback={displayAll}
                            displaySinglesCallback={displaySingles}
                            displayPairsCallback={displayPairs}
                        />
                    )}

                    <h3 style={{ marginTop: '0.5rem' }}>TOTAL</h3>
                    <Row
                        style={{ padding: 0, margin: '0 0.4rem' }}
                        xs={2}
                        className="g-4 align-items-start"
                    >
                        <StatTile
                            title="FOR"
                            bodyText={
                                displayTotalAgg + ' / ' + displayAvailableAgg
                            }
                        />
                        <StatTile
                            title="AGAINST"
                            bodyText={
                                displayTotalAggAgainst +
                                ' / ' +
                                displayAvailableAgg
                            }
                        />
                    </Row>

                    {displayHomeGamesPlayed > 0 && (
                        <div>
                            <hr />
                            <h3>HOME</h3>
                            <Row
                                style={{ padding: 0, margin: '0 0.5rem' }}
                                xs={2}
                                className="g-4 align-items-start"
                            >
                                <StatTile
                                    title="FOR"
                                    bodyText={
                                        displayTotalHomeAgg +
                                        ' / ' +
                                        displayAvailableHomeAgg
                                    }
                                />
                                <StatTile
                                    title="AGAINST"
                                    bodyText={
                                        displayTotalHomeAggAgainst +
                                        ' / ' +
                                        displayAvailableHomeAgg
                                    }
                                />
                            </Row>
                        </div>
                    )}

                    {displayAwayGamesPlayed > 0 && (
                        <div>
                            <hr />
                            <h3>AWAY</h3>
                            <Row
                                style={{ padding: 0, margin: '0 0.5rem' }}
                                xs={2}
                                className="g-4 align-items-start"
                            >
                                <StatTile
                                    title="FOR"
                                    bodyText={
                                        displayTotalAwayAgg +
                                        ' / ' +
                                        displayAvailableAwayAgg
                                    }
                                />
                                <StatTile
                                    title="AGAINST"
                                    bodyText={
                                        displayTotalAwayAggAgainst +
                                        ' / ' +
                                        displayAvailableAwayAgg
                                    }
                                />
                            </Row>
                        </div>
                    )}

                    {displayCupGamesPlayed > 0 && (
                        <div>
                            <hr />
                            <h3>CUP</h3>
                            <Row
                                style={{ padding: 0, margin: '0 0.5rem' }}
                                xs={2}
                                className="g-4 align-items-start"
                            >
                                <StatTile
                                    title="FOR"
                                    bodyText={
                                        displayCupAgg +
                                        ' / ' +
                                        displayAvailableCupAgg
                                    }
                                />
                                <StatTile
                                    title="AGAINST"
                                    bodyText={
                                        displayCupAggAgainst +
                                        ' / ' +
                                        displayAvailableCupAgg
                                    }
                                />
                            </Row>
                        </div>
                    )}
                </Accordion.Body>
            </Accordion.Item>
        </div>
    );
}

export default PlayerStatsAggregates;
