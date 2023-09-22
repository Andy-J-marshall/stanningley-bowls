import { useState } from 'react';
import { Accordion } from 'react-bootstrap';
import GameTypeButton from './gameTypeButtons';

function PlayerStatsAverages(props) {
    const stats = props.stats;
    const showStatSummary = props.showStatSummary;

    const {
        pairsGames,
        singlesGames,
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
        mondayGames,
        mondayAvg,
        tuesdayVetsGames,
        tuesdayVetsAvg,
        tuesdayEveningGames,
        tuesdayEveningAvg,
        wednesdayGames,
        wednesdayAvg,
        thursdayGames,
        thursdayAvg,
        saturdayGames,
        saturdayAvg,
    } = stats;

    const [displayAverage, setDisplayAverage] = useState(average);
    const [displayHomeAverage, setDisplayHomeAverage] = useState(homeAverage);
    const [displayAwayAverage, setDisplayAwayAverage] = useState(awayAverage);
    const [displayCupAverage, setDisplayCupAverage] = useState(cupAverage);

    function displayAll() {
        setDisplayAverage(average);
        setDisplayHomeAverage(homeAverage);
        setDisplayAwayAverage(awayAverage);
        setDisplayCupAverage(cupAverage);
    }

    function displaySingles() {
        setDisplayAverage(singlesAvg);
        setDisplayHomeAverage(singlesHomeAverage);
        setDisplayAwayAverage(singlesAwayAverage);
        setDisplayCupAverage(singlesCupAverage);
    }

    function displayPairs() {
        setDisplayAverage(pairsAvg);
        setDisplayHomeAverage(pairsHomeAverage);
        setDisplayAwayAverage(pairsAwayAverage);
        setDisplayCupAverage(pairsCupAverage);
    }

    return (
        <div id="player-stats-averages">
            <Accordion.Item eventKey="2">
                <Accordion.Header id="stats-average">AVERAGES</Accordion.Header>
                <Accordion.Body>
                    {pairsGames > 0 && singlesGames > 0 && (
                        <GameTypeButton
                            displayAllCallback={displayAll}
                            displaySinglesCallback={displaySingles}
                            displayPairsCallback={displayPairs}
                        />
                    )}
                    {average >= -21 && average < 22 && (
                        <div>
                            <h3>AVERAGES</h3>
                            <p>Overall: {displayAverage.toFixed(2)}</p>

                            {displayHomeAverage > -22 &&
                                displayHomeAverage < 22 && (
                                    <p>Home: {displayHomeAverage.toFixed(2)}</p>
                                )}

                            {displayAwayAverage > -22 &&
                                displayAwayAverage < 22 && (
                                    <p>Away: {displayAwayAverage.toFixed(2)}</p>
                                )}
                            {displayCupAverage > -22 &&
                                displayCupAverage < 22 && (
                                    <p>Cup: {displayCupAverage.toFixed(2)}</p>
                                )}

                            {/* TODO what to do with this?  */}
                            {!showStatSummary && (
                                <div>
                                    <h3>TEAMS</h3>
                                    {mondayGames > 0 && (
                                        <p>Monday = {mondayAvg.toFixed(2)}</p>
                                    )}
                                    {tuesdayVetsGames > 0 && (
                                        <p>
                                            Tuesday (Vets) ={' '}
                                            {tuesdayVetsAvg.toFixed(2)}
                                        </p>
                                    )}
                                    {tuesdayEveningGames > 0 && (
                                        <p>
                                            Tuesday (Evening) ={' '}
                                            {tuesdayEveningAvg.toFixed(2)}
                                        </p>
                                    )}
                                    {wednesdayGames > 0 && (
                                        <p>
                                            Wednesday ={' '}
                                            {wednesdayAvg.toFixed(2)}
                                        </p>
                                    )}
                                    {thursdayGames > 0 && (
                                        <p>
                                            Thursday (Vets) ={' '}
                                            {thursdayAvg.toFixed(2)}
                                        </p>
                                    )}
                                    {saturdayGames > 0 && (
                                        <p>
                                            Saturday = {saturdayAvg.toFixed(2)}
                                        </p>
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

export default PlayerStatsAverages;
