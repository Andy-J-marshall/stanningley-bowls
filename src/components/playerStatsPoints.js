import { useState } from 'react';
import { Accordion } from 'react-bootstrap';
import GameTypeButton from './gameTypeButtons';
import config from '../config';

function PlayerStatsPoints(props) {
    const stats = props.stats;

    const {
        totalPoints,
        totalPointsAgainst,
        totalHomePoints,
        totalHomePointsAgainst,
        totalAwayPoints,
        totalAwayPointsAgainst,
        pairsAveragePoints,
        pairsAveragePointsAgainst,
        pairsHomeAveragePoints,
        pairsHomeAveragePointsAgainst,
        pairsAwayAveragePoints,
        pairsAwayAveragePointsAgainst,
        totalPairsPoints,
        totalPairsPointsAgainst,
        totalPairsHomePoints,
        totalPairsHomePointsAgainst,
        totalPairsAwayPoints,
        totalPairsAwayPointsAgainst,
        singlesAveragePoints,
        singlesAveragePointsAgainst,
        singlesHomeAveragePoints,
        singlesHomeAveragePointsAgainst,
        singlesAwayAveragePoints,
        singlesAwayAveragePointsAgainst,
        totalSinglesPoints,
        totalSinglesPointsAgainst,
        totalSinglesHomePoints,
        totalSinglesHomePointsAgainst,
        totalSinglesAwayPoints,
        totalSinglesAwayPointsAgainst,
        gamesPlayed,
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
        averagePoints,
        averagePointsAgainst,
        homeAveragePoints,
        homeAveragePointsAgainst,
        awayAveragePoints,
        awayAveragePointsAgainst,
    } = stats;

    const [displayTotalPoints, setDisplayTotalPoints] = useState(totalPoints);
    const [displayTotalPointsAgainst, setDisplayTotalPointsAgainst] = useState(totalPointsAgainst);
    const [displayAveragePoints, setDisplayAveragePoints] = useState(averagePoints);
    const [displayAveragePointsAgainst, setDisplayAveragePointsAgainst] = useState(averagePointsAgainst);

    const [displayTotalHomePoints, setDisplayTotalHomePoints] = useState(totalHomePoints);
    const [displayTotalHomePointsAgainst, setDisplayTotalHomePointsAgainst] = useState(totalHomePointsAgainst);
    const [displayHomeAveragePoints, setDisplayHomeAveragePoints] = useState(homeAveragePoints);
    const [displayHomeAveragePointsAgainst, setDisplayHomeAveragePointsAgainst] = useState(homeAveragePointsAgainst);

    const [displayTotalAwayPoints, setDisplayTotalAwayPoints] = useState(totalAwayPoints);
    const [displayTotalAwayPointsAgainst, setDisplayTotalAwayPointsAgainst] = useState(totalAwayPointsAgainst);
    const [displayAwayAveragePoints, setDisplayAwayAveragePoints] = useState(awayAveragePoints);
    const [displayAwayAveragePointsAgainst, setDisplayAwayAveragePointsAgainst] = useState(awayAveragePointsAgainst);
    
    const [displayGamesPlayed, setDisplayGamesPlayed] = useState(gamesPlayed);
    const [displayHomeGamesPlayed, setDisplayHomeGamesPlayed] = useState(homeGamesPlayed);
    const [displayAwayGamesPlayed, setDisplayAwayGamesPlayed] = useState(awayGamesPlayed);
    const [displayCupGamesPlayed, setDisplayCupGamesPlayed] = useState(cupGamesPlayed);


    function displayAll() {
        setDisplayTotalPoints(totalPoints);
        setDisplayTotalPointsAgainst(totalPointsAgainst);
        setDisplayAveragePoints(averagePoints);
        setDisplayAveragePointsAgainst(averagePointsAgainst);
    
        setDisplayTotalHomePoints(totalHomePoints);
        setDisplayTotalHomePointsAgainst(totalHomePointsAgainst);
        setDisplayHomeAveragePoints(homeAveragePoints);
        setDisplayHomeAveragePointsAgainst(homeAveragePointsAgainst);
    
        setDisplayTotalAwayPoints(totalAwayPoints);
        setDisplayTotalAwayPointsAgainst(totalAwayPointsAgainst);
        setDisplayAwayAveragePoints(awayAveragePoints);
        setDisplayAwayAveragePointsAgainst(awayAveragePointsAgainst);

        setDisplayGamesPlayed(gamesPlayed);
        setDisplayHomeGamesPlayed(homeGamesPlayed);
        setDisplayAwayGamesPlayed(awayGamesPlayed);
        setDisplayCupGamesPlayed(cupGamesPlayed);
    }

    function displaySingles() {
        setDisplayTotalPoints(totalSinglesPoints);
        setDisplayTotalPointsAgainst(totalSinglesPointsAgainst);
        setDisplayAveragePoints(singlesAveragePoints);
        setDisplayAveragePointsAgainst(singlesAveragePointsAgainst);
    
        setDisplayTotalHomePoints(totalSinglesHomePoints);
        setDisplayTotalHomePointsAgainst(totalSinglesHomePointsAgainst);
        setDisplayHomeAveragePoints(singlesHomeAveragePoints);
        setDisplayHomeAveragePointsAgainst(singlesHomeAveragePointsAgainst);
    
        setDisplayTotalAwayPoints(totalSinglesAwayPoints);
        setDisplayTotalAwayPointsAgainst(totalSinglesAwayPointsAgainst);
        setDisplayAwayAveragePoints(singlesAwayAveragePoints);
        setDisplayAwayAveragePointsAgainst(singlesAwayAveragePointsAgainst);

        setDisplayGamesPlayed(singlesGames);
        setDisplayHomeGamesPlayed(singlesHomeGamesPlayed);
        setDisplayAwayGamesPlayed(singlesAwayGamesPlayed);
        setDisplayCupGamesPlayed(singlesCupGamesPlayed);
    }

    function displayPairs() {
        setDisplayTotalPoints(totalPairsPoints);
        setDisplayTotalPointsAgainst(totalPairsPointsAgainst);
        setDisplayAveragePoints(pairsAveragePoints);
        setDisplayAveragePointsAgainst(pairsAveragePointsAgainst);
    
        setDisplayTotalHomePoints(totalPairsHomePoints);
        setDisplayTotalHomePointsAgainst(totalPairsHomePointsAgainst);
        setDisplayHomeAveragePoints(pairsHomeAveragePoints);
        setDisplayHomeAveragePointsAgainst(pairsHomeAveragePointsAgainst);
    
        setDisplayTotalAwayPoints(totalPairsAwayPoints);
        setDisplayTotalAwayPointsAgainst(totalPairsAwayPointsAgainst);
        setDisplayAwayAveragePoints(pairsAwayAveragePoints);
        setDisplayAwayAveragePointsAgainst(pairsAwayAveragePointsAgainst);

        setDisplayGamesPlayed(pairsGames);
        setDisplayHomeGamesPlayed(pairHomeGamesPlayed);
        setDisplayAwayGamesPlayed(pairAwayGamesPlayed);
        setDisplayCupGamesPlayed(pairCupGamesPlayed);
    }

    return (
        <div id="player-stats-points">
            <Accordion.Item eventKey="2">
                <Accordion.Header id="stats-points">POINTS</Accordion.Header>
                <Accordion.Body>
                    <div>
                        {pairsGames > 0 && singlesGames > 0 && (
                            <GameTypeButton
                                displayAllCallback={displayAll}
                                displaySinglesCallback={displaySingles}
                                displayPairsCallback={displayPairs}
                            />
                        )}
                        <h3>COMBINED</h3>
                        <p>
                            Points scored: {displayTotalPoints} /{' '}
                            {(displayGamesPlayed - displayCupGamesPlayed) * 5}
                        </p>
                        <p>
                            Points conceded: {displayTotalPointsAgainst} /{' '}
                            {(displayGamesPlayed - displayCupGamesPlayed) * 5}
                        </p>
                        <p>
                            Average points scored: {displayAveragePoints.toFixed(2)} /
                            5
                        </p>
                        <p>
                            Average points conceded:{' '}
                            {displayAveragePointsAgainst.toFixed(2)} / 5
                        </p>
                        {displayHomeGamesPlayed > 0 && (
                            <div>
                                <h3>HOME</h3>
                                <div>
                                    <p>
                                        Points scored: {displayTotalHomePoints} /{' '}
                                        {displayHomeGamesPlayed * 5}
                                    </p>
                                    <p>
                                        Points conceded:{' '}
                                        {displayTotalHomePointsAgainst} /{' '}
                                        {displayHomeGamesPlayed * 5}
                                    </p>
                                    <p>
                                        Average points scored:{' '}
                                        {displayHomeAveragePoints.toFixed(2)} / 5
                                    </p>
                                    <p>
                                        Average points conceded:{' '}
                                        {displayHomeAveragePointsAgainst.toFixed(2)} /
                                        5
                                    </p>
                                </div>
                            </div>
                        )}
                        {displayAwayGamesPlayed > 0 && (
                            <div>
                                <h3>AWAY</h3>
                                <div>
                                    <p>
                                        Points scored: {displayTotalAwayPoints} /{' '}
                                        {displayAwayGamesPlayed * 5}
                                    </p>
                                    <p>
                                        Points conceded:{' '}
                                        {displayTotalAwayPointsAgainst} /{' '}
                                        {displayAwayGamesPlayed * 5}
                                    </p>
                                    <p>
                                        Average points scored:{' '}
                                        {displayAwayAveragePoints.toFixed(2)} / 5
                                    </p>
                                    <p>
                                        Average points conceded:{' '}
                                        {displayAwayAveragePointsAgainst.toFixed(2)} /
                                        5
                                    </p>
                                </div>
                            </div>
                        )}
                        <br />
                        <p className="footnote">* {config.leagueRules}</p>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </div>
    );
}

export default PlayerStatsPoints;
