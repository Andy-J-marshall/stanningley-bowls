import { useEffect, useState } from 'react';
import { Accordion, Card, Row } from 'react-bootstrap';
import GameTypeButton from './gameTypeButtons';
import { PlayerStatsComponentsProps } from '../types/interfaces';

function PlayerStatsWinsLosses(props: PlayerStatsComponentsProps) {
    const stats = props.stats;

    const {
        awayLosses,
        homeLosses,
        pairLosses,
        cupLosses,
        totalLosses,
        pairHomeLosses,
        pairAwayLosses,
        pairCupLosses,
        homeWins,
        awayWins,
        cupWins,
        pairWins,
        totalWins,
        pairHomeWins,
        pairAwayWins,
        pairCupWins,
        gamesPlayed,
        homeGamesPlayed,
        awayGamesPlayed,
        pairHomeGamesPlayed,
        pairAwayGamesPlayed,
        pairCupGamesPlayed,
        cupGamesPlayed,
        singlesGames,
        pairsGames,
        average,
        homeAverage,
        awayAverage,
        cupAverage,
        singlesAvg,
        pairsAvg,
        singlesHomeAverage,
        singlesAwayAverage,
        singlesCupAverage,
        pairsHomeAverage,
        pairsAwayAverage,
        pairsCupAverage,
    } = stats;

    const [displayingSingles, setDisplayingSingles] = useState(false);
    const [displayingPairs, setDisplayingPairs] = useState(false);
    const [displayingAll, setDisplayingAll] = useState(true);

    const [displayTotalWins, setDisplayTotalWins] = useState(totalWins);
    const [displayHomeWins, setDisplayHomeWins] = useState(homeWins);
    const [displayAwayWins, setDisplayAwayWins] = useState(awayWins);
    const [displayCupWins, setDisplayCupWins] = useState(cupWins);

    const [displayTotalLosses, setDisplayTotalLosses] = useState(totalLosses);
    const [displayHomeLosses, setDisplayHomeLosses] = useState(homeLosses);
    const [displayAwayLosses, setDisplayAwayLosses] = useState(awayLosses);
    const [displayCupLosses, setDisplayCupLosses] = useState(cupLosses);

    const [displayGamesPlayed, setDisplayGamesPlayed] = useState(gamesPlayed);
    const [displayHomeGamesPlayed, setDisplayHomeGamesPlayed] =
        useState(homeGamesPlayed);
    const [displayAwayGamesPlayed, setDisplayAwayGamesPlayed] =
        useState(awayGamesPlayed);
    const [displayCupGamesPlayed, setDisplayCupGamesPlayed] =
        useState(cupGamesPlayed);

    const [displayAverage, setDisplayAverage] = useState(average);
    const [displayHomeAverage, setDisplayHomeAverage] = useState(homeAverage);
    const [displayAwayAverage, setDisplayAwayAverage] = useState(awayAverage);
    const [displayCupAverage, setDisplayCupAverage] = useState(cupAverage);

    useEffect(() => {
        refreshStats();
    });

    function displayAll() {
        setDisplayingAll(true);
        setDisplayingSingles(false);
        setDisplayingPairs(false);

        setDisplayTotalWins(totalWins);
        setDisplayHomeWins(homeWins);
        setDisplayAwayWins(awayWins);
        setDisplayCupWins(cupWins);

        setDisplayTotalLosses(totalLosses);
        setDisplayHomeLosses(homeLosses);
        setDisplayAwayLosses(awayLosses);
        setDisplayCupLosses(cupLosses);

        setDisplayGamesPlayed(gamesPlayed);
        setDisplayHomeGamesPlayed(homeGamesPlayed);
        setDisplayAwayGamesPlayed(awayGamesPlayed);
        setDisplayCupGamesPlayed(cupGamesPlayed);

        setDisplayAverage(average);
        setDisplayHomeAverage(homeAverage);
        setDisplayAwayAverage(awayAverage);
        setDisplayCupAverage(cupAverage);
    }

    function displaySingles() {
        setDisplayingSingles(true);
        setDisplayingPairs(false);
        setDisplayingAll(false);

        setDisplayTotalWins(totalWins - pairWins);
        setDisplayHomeWins(homeWins - pairHomeWins);
        setDisplayAwayWins(awayWins - pairAwayWins);
        setDisplayCupWins(cupWins - pairCupWins);

        setDisplayTotalLosses(totalLosses - pairLosses);
        setDisplayHomeLosses(homeLosses - pairHomeLosses);
        setDisplayAwayLosses(awayLosses - pairAwayLosses);
        setDisplayCupLosses(cupLosses - pairCupLosses);

        setDisplayGamesPlayed(gamesPlayed - pairsGames);
        setDisplayHomeGamesPlayed(homeGamesPlayed - pairHomeGamesPlayed);
        setDisplayAwayGamesPlayed(awayGamesPlayed - pairAwayGamesPlayed);
        setDisplayCupGamesPlayed(cupGamesPlayed - pairCupGamesPlayed);

        setDisplayAverage(singlesAvg);
        setDisplayHomeAverage(singlesHomeAverage);
        setDisplayAwayAverage(singlesAwayAverage);
        setDisplayCupAverage(singlesCupAverage);
    }

    function displayPairs() {
        setDisplayingPairs(true);
        setDisplayingSingles(false);
        setDisplayingAll(false);

        setDisplayTotalWins(pairWins);
        setDisplayHomeWins(pairHomeWins);
        setDisplayAwayWins(pairAwayWins);
        setDisplayCupWins(pairCupWins);

        setDisplayTotalLosses(pairLosses);
        setDisplayHomeLosses(pairHomeLosses);
        setDisplayAwayLosses(pairAwayLosses);
        setDisplayCupLosses(pairCupLosses);

        setDisplayGamesPlayed(pairsGames);
        setDisplayHomeGamesPlayed(pairHomeGamesPlayed);
        setDisplayAwayGamesPlayed(pairAwayGamesPlayed);
        setDisplayCupGamesPlayed(pairCupGamesPlayed);

        setDisplayAverage(pairsAvg);
        setDisplayHomeAverage(pairsHomeAverage);
        setDisplayAwayAverage(pairsAwayAverage);
        setDisplayCupAverage(pairsCupAverage);
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
        <div id="player-stats-wins-losses">
            <Accordion.Item eventKey="1">
                <Accordion.Header onClick={refreshStats} id="stats-wl">
                    WINS & LOSSES
                </Accordion.Header>
                <Accordion.Body>
                    {pairsGames > 0 && singlesGames > 0 && (
                        <GameTypeButton
                            displayAllCallback={displayAll}
                            displaySinglesCallback={displaySingles}
                            displayPairsCallback={displayPairs}
                        />
                    )}

                    {/* TODO create a component? */}
                    {/* TODO create a css for the cards? */}

                    {displayGamesPlayed > 0 && (
                        <div>
                            <h3>TOTAL</h3>
                            <Row
                                style={{ padding: 0, margin: '0.4rem' }}
                                xs={2}
                                md={5}
                                className="g-4 align-items-start"
                            >
                                <Card bg="light">
                                    <Card.Body>
                                        <Card.Title>GAMES</Card.Title>
                                        <Card.Text>
                                            {displayGamesPlayed}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card bg="light">
                                    <Card.Body>
                                        <Card.Title>WINS</Card.Title>
                                        <Card.Text>
                                            {displayTotalWins}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card bg="light">
                                    <Card.Body>
                                        <Card.Title>LOSSES</Card.Title>
                                        <Card.Text>
                                            {displayTotalLosses}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card bg="light">
                                    <Card.Body>
                                        <Card.Title>AVERAGE</Card.Title>
                                        <Card.Text>
                                            {displayAverage.toFixed(2)}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card bg="light">
                                    <Card.Body>
                                        <Card.Title>WIN %</Card.Title>
                                        <Card.Text>
                                            {(
                                                (displayTotalWins /
                                                    displayGamesPlayed) *
                                                100
                                            ).toFixed(0)}
                                            %
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Row>
                        </div>
                    )}

                    {displayHomeGamesPlayed > 0 && (
                        <div>
                            <hr />
                            <h3>HOME</h3>
                            <Row
                                style={{ padding: 0, margin: '0.4rem' }}
                                xs={2}
                                md={5}
                                className="g-4 align-items-start"
                            >
                                <Card bg="light">
                                    <Card.Body>
                                        <Card.Title>GAMES</Card.Title>
                                        <Card.Text>
                                            {displayHomeGamesPlayed}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card bg="light">
                                    <Card.Body>
                                        <Card.Title>WINS</Card.Title>
                                        <Card.Text>{displayHomeWins}</Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card bg="light">
                                    <Card.Body>
                                        <Card.Title>LOSSES</Card.Title>
                                        <Card.Text>
                                            {displayHomeLosses}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card bg="light">
                                    <Card.Body>
                                        <Card.Title>AVERAGE</Card.Title>
                                        <Card.Text>
                                            {displayHomeAverage.toFixed(2)}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card bg="light">
                                    <Card.Body>
                                        <Card.Title>WIN %</Card.Title>
                                        <Card.Text>
                                            {(
                                                (displayHomeWins /
                                                    displayHomeGamesPlayed) *
                                                100
                                            ).toFixed(0)}
                                            %
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Row>
                        </div>
                    )}

                    {displayAwayGamesPlayed > 0 && (
                        <div>
                            <hr />
                            <h3>AWAY</h3>
                            <Row
                                style={{ padding: 0, margin: '0.4rem' }}
                                xs={2}
                                md={5}
                                className="g-4 align-items-start"
                            >
                                <Card bg="light">
                                    <Card.Body>
                                        <Card.Title>GAMES</Card.Title>
                                        <Card.Text>
                                            {displayAwayGamesPlayed}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card bg="light">
                                    <Card.Body>
                                        <Card.Title>WINS</Card.Title>
                                        <Card.Text>{displayAwayWins}</Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card bg="light">
                                    <Card.Body>
                                        <Card.Title>LOSSES</Card.Title>
                                        <Card.Text>
                                            {displayAwayLosses}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card bg="light">
                                    <Card.Body>
                                        <Card.Title>AVERAGE</Card.Title>
                                        <Card.Text>
                                            {displayAwayAverage.toFixed(2)}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card bg="light">
                                    <Card.Body>
                                        <Card.Title>WIN %</Card.Title>
                                        <Card.Text>
                                            {(
                                                (displayAwayWins /
                                                    displayAwayGamesPlayed) *
                                                100
                                            ).toFixed(0)}
                                            %
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Row>
                        </div>
                    )}

                    {displayCupGamesPlayed > 0 && (
                        <div>
                            <hr />
                            <h3>CUP</h3>
                            <Row
                                style={{ padding: 0, margin: '0.4rem' }}
                                xs={2}
                                md={5}
                                className="g-4 align-items-start"
                            >
                                <Card bg="light">
                                    <Card.Body>
                                        <Card.Title>GAMES</Card.Title>
                                        <Card.Text>
                                            {displayCupGamesPlayed}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card bg="light">
                                    <Card.Body>
                                        <Card.Title>WINS</Card.Title>
                                        <Card.Text>{displayCupWins}</Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card bg="light">
                                    <Card.Body>
                                        <Card.Title>LOSSES</Card.Title>
                                        <Card.Text>
                                            {displayCupLosses}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card bg="light">
                                    <Card.Body>
                                        <Card.Title>AVERAGE</Card.Title>
                                        <Card.Text>
                                            {displayCupAverage.toFixed(2)}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card bg="light">
                                    <Card.Body>
                                        <Card.Title>WIN %</Card.Title>
                                        <Card.Text>
                                            {(
                                                (displayCupWins /
                                                    displayCupGamesPlayed) *
                                                100
                                            ).toFixed(0)}
                                            %
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Row>
                        </div>
                    )}
                </Accordion.Body>
            </Accordion.Item>
        </div>
    );
}

export default PlayerStatsWinsLosses;
