import { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import GameTypeButton from './gameTypeButtons';
import { AggregatedStats } from '../types/interfaces';

function PlayerStatsWinsLosses(props: AggregatedStats) {
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

                    {displayGamesPlayed > 0 && (
                        <div>
                            <h3>TOTAL</h3>
                            <p>Games: {displayGamesPlayed}</p>
                            <p>Wins: {displayTotalWins}</p>
                            <p>Losses: {displayTotalLosses}</p>
                            <p>Average: {displayAverage.toFixed(2)}</p>
                            <p>
                                Win percentage:{' '}
                                {(
                                    (displayTotalWins / displayGamesPlayed) *
                                    100
                                ).toFixed(0)}
                                %
                            </p>
                        </div>
                    )}
                    {displayHomeGamesPlayed > 0 && (
                        <div>
                            <hr />
                            <h3>HOME</h3>
                            <p>Games: {displayHomeGamesPlayed}</p>
                            <p>Wins: {displayHomeWins}</p>
                            <p>Losses: {displayHomeLosses}</p>
                            <p>Average: {displayHomeAverage.toFixed(2)}</p>
                            <p>
                                Win percentage:{' '}
                                {(
                                    (displayHomeWins / displayHomeGamesPlayed) *
                                    100
                                ).toFixed(0)}
                                %
                            </p>
                        </div>
                    )}
                    {displayAwayGamesPlayed > 0 && (
                        <div>
                            <hr />
                            <h3>AWAY</h3>
                            <p>Games: {displayAwayGamesPlayed}</p>
                            <p>Wins: {displayAwayWins}</p>
                            <p>Losses: {displayAwayLosses}</p>
                            <p>Average: {displayAwayAverage.toFixed(2)}</p>
                            <p>
                                Win percentage:{' '}
                                {(
                                    (displayAwayWins / displayAwayGamesPlayed) *
                                    100
                                ).toFixed(0)}
                                %
                            </p>
                        </div>
                    )}
                    {displayCupGamesPlayed > 0 && (
                        <div>
                            <hr />
                            <h3>CUP</h3>
                            <p>Games: {displayCupGamesPlayed}</p>
                            <p>Wins: {displayCupWins}</p>
                            <p>Losses: {displayCupLosses}</p>
                            <p>Average: {displayCupAverage.toFixed(2)}</p>
                            <p>
                                Win percentage:{' '}
                                {(
                                    (displayCupWins / displayCupGamesPlayed) *
                                    100
                                ).toFixed(0)}
                                %
                            </p>
                        </div>
                    )}
                </Accordion.Body>
            </Accordion.Item>
        </div>
    );
}

export default PlayerStatsWinsLosses;
