import { useState } from 'react';
import { Accordion, Row, Col, Card, CardGroup } from 'react-bootstrap';
import { capitalizeText } from '../helpers/utils';
import GameTypeButton from './gameTypeButtons';

function PlayerStatsWinsLosses(props) {
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
        pairsPartnersCount,
        pairsPartnersCountWins,
        pairsPartnersCountLosses,
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

    const [displayPairsPartners, setDisplayPairsPartners] = useState(false);

    function displayAll() {
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

        setDisplayPairsPartners(false);
    }

    function displaySingles() {
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

        setDisplayPairsPartners(false);
    }

    function displayPairs() {
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

        setDisplayPairsPartners(true);
    }

    return (
        <div id="player-stats-wins-losses">
            <Accordion.Item eventKey="1">
                <Accordion.Header id="stats-wl">WINS & LOSSES</Accordion.Header>
                <Accordion.Body>
                    {pairsGames > 0 && singlesGames > 0 && (
                        <GameTypeButton
                            displayAllCallback={displayAll}
                            displaySinglesCallback={displaySingles}
                            displayPairsCallback={displayPairs}
                        />
                    )}

                    <CardGroup>
                        <div className='center'>
                            <Row
                                xs={1}
                                sm={2}
                                md={3}
                                lg={4}
                                xl={4}
                                xxl={4}
                                className="g-4 tabs"
                            >
                                {displayGamesPlayed > 0 && (
                                    <Col>
                                        <Card>
                                            <Card.Header>TOTAL</Card.Header>
                                            <Card.Body>
                                                <Card.Text>
                                                    Games: {displayGamesPlayed}
                                                    <br />
                                                    Wins: {displayTotalWins}
                                                    <br />
                                                    Losses: {displayTotalLosses}
                                                    <br />
                                                    Average:{' '}
                                                    {displayAverage.toFixed(2)}
                                                    <br />
                                                    Win percentage:{' '}
                                                    {(
                                                        (displayTotalWins /
                                                            displayGamesPlayed) *
                                                        100
                                                    ).toFixed(0)}
                                                    %
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )}
                                {displayHomeGamesPlayed > 0 && (
                                    <Col>
                                        <Card>
                                            <Card.Header>HOME</Card.Header>
                                            <Card.Body>
                                                <Card.Text>
                                                    Games:{' '}
                                                    {displayHomeGamesPlayed}
                                                    <br />
                                                    Wins: {displayHomeWins}
                                                    <br />
                                                    Losses: {displayHomeLosses}
                                                    <br />
                                                    Average:{' '}
                                                    {displayHomeAverage.toFixed(
                                                        2
                                                    )}
                                                    <br />
                                                    Win percentage:{' '}
                                                    {(
                                                        (displayHomeWins /
                                                            displayHomeGamesPlayed) *
                                                        100
                                                    ).toFixed(0)}
                                                    %
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )}
                                {displayAwayGamesPlayed > 0 && (
                                    <Col>
                                        <Card>
                                            <Card.Header>AWAY</Card.Header>
                                            <Card.Body>
                                                <Card.Text>
                                                    Games:{' '}
                                                    {displayAwayGamesPlayed}
                                                    <br />
                                                    Wins: {displayAwayWins}
                                                    <br />
                                                    Losses: {displayAwayLosses}
                                                    <br />
                                                    Average:{' '}
                                                    {displayAwayAverage.toFixed(
                                                        2
                                                    )}
                                                    <br />
                                                    Win percentage:{' '}
                                                    {(
                                                        (displayAwayWins /
                                                            displayAwayGamesPlayed) *
                                                        100
                                                    ).toFixed(0)}
                                                    %
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )}
                                {displayCupGamesPlayed > 0 && (
                                    <Col>
                                        <Card>
                                            <Card.Header>CUP</Card.Header>
                                            <Card.Body>
                                                <Card.Text>
                                                    Games:{' '}
                                                    {displayCupGamesPlayed}
                                                    <br />
                                                    Wins: {displayCupWins}
                                                    <br />
                                                    Losses: {displayCupLosses}
                                                    <br />
                                                    Average:{' '}
                                                    {displayCupAverage.toFixed(
                                                        2
                                                    )}
                                                    <br />
                                                    Win percentage:{' '}
                                                    {(
                                                        (displayCupWins /
                                                            displayCupGamesPlayed) *
                                                        100
                                                    ).toFixed(0)}
                                                    %
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )}
                            </Row>
                        </div>
                    </CardGroup>
                    {displayPairsPartners && pairsGames > 0 && (
                        <div>
                            {Object.keys(pairsPartnersCount).length > 0 && (
                                <div>
                                    <h3>PAIRS PARTNERS</h3>
                                    {Object.keys(pairsPartnersCount).map(
                                        (partner, key) => {
                                            return (
                                                <p key={key}>
                                                    {
                                                        pairsPartnersCount[
                                                            partner
                                                        ].timesPaired
                                                    }{' '}
                                                    played with{' '}
                                                    {capitalizeText([partner])}
                                                </p>
                                            );
                                        }
                                    )}
                                    {Object.keys(pairsPartnersCountWins).map(
                                        (partner, key) => {
                                            return (
                                                <p key={key}>
                                                    {
                                                        pairsPartnersCountWins[
                                                            partner
                                                        ].timesPaired
                                                    }{' '}
                                                    won with{' '}
                                                    {capitalizeText([partner])}
                                                </p>
                                            );
                                        }
                                    )}
                                    {Object.keys(pairsPartnersCountLosses).map(
                                        (partner, key) => {
                                            return (
                                                <p key={key}>
                                                    {
                                                        pairsPartnersCountLosses[
                                                            partner
                                                        ].timesPaired
                                                    }{' '}
                                                    lost with{' '}
                                                    {capitalizeText([partner])}
                                                </p>
                                            );
                                        }
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </Accordion.Body>
            </Accordion.Item>
        </div>
    );
}

export default PlayerStatsWinsLosses;
