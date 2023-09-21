import { Accordion } from 'react-bootstrap';

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

    return (
        <div id="player-stats-averages">
            <Accordion.Item eventKey="3">
                <Accordion.Header id="stats-average">AVERAGES</Accordion.Header>
                <Accordion.Body>
                    {average >= -21 && average < 22 && (
                        <div>
                            <h3>AVERAGES</h3>
                            <p>Overall = {average.toFixed(2)}</p>
                            {homeAverage > -22 && homeAverage < 22 && (
                                <p>Home = {homeAverage.toFixed(2)}</p>
                            )}

                            {awayAverage > -22 && awayAverage < 22 && (
                                <p>Away = {awayAverage.toFixed(2)}</p>
                            )}
                            {cupAverage > -22 && cupAverage < 22 && (
                                <p>Cup = {cupAverage.toFixed(2)}</p>
                            )}
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
                            {pairsGames > 0 && singlesGames > 0 && (
                                <div>
                                    <h3>SINGLES</h3>
                                    {singlesAvg > -22 && (
                                        <p>Total = {singlesAvg.toFixed(2)}</p>
                                    )}
                                    {singlesHomeAverage > -22 && (
                                        <p>
                                            Home ={' '}
                                            {singlesHomeAverage.toFixed(2)}
                                        </p>
                                    )}
                                    {singlesAwayAverage > -22 && (
                                        <p>
                                            Away ={' '}
                                            {singlesAwayAverage.toFixed(2)}
                                        </p>
                                    )}
                                    {singlesCupAverage > -22 && (
                                        <p>
                                            Cup = {singlesCupAverage.toFixed(2)}
                                        </p>
                                    )}
                                    <h3>PAIRS</h3>
                                    {pairsAvg > -22 && (
                                        <p>Total = {pairsAvg.toFixed(2)}</p>
                                    )}
                                    {pairsHomeAverage > -22 && (
                                        <p>
                                            Home = {pairsHomeAverage.toFixed(2)}
                                        </p>
                                    )}
                                    {pairsAwayAverage > -22 && (
                                        <p>
                                            Away = {pairsAwayAverage.toFixed(2)}
                                        </p>
                                    )}
                                    {pairsCupAverage > -22 && (
                                        <p>
                                            Cup = {pairsCupAverage.toFixed(2)}
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
