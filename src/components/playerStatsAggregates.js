import { useState } from 'react';
import { Accordion } from 'react-bootstrap';
import GameTypeButton from './gameTypeButtons';

function PlayerStatsAggregates(props) {
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
    } = stats;

    const [displayTotalAgg, setDisplayTotalAgg] = useState(totalAgg);
    const [displayTotalAggAgainst, setDisplayTotalAggAgainst] = useState(totalAggAgainst);

    const [displayTotalHomeAgg, setDisplayTotalHomeAgg] = useState(totalHomeAgg);
    const [displayTotalHomeAggAgainst, setDisplayTotalHomeAggAgainst] = useState(totalHomeAggAgainst);
    
    const [displayTotalAwayAgg, setDisplayTotalAwayAgg] = useState(totalAwayAgg);
    const [displayTotalAwayAggAgainst, setDisplayTotalAwayAggAgainst] = useState(totalAwayAggAgainst);

    const [displayCupAgg, setDisplayCupAgg] = useState(cupAgg);
    const [displayCupAggAgainst, setDisplayCupAggAgainst] = useState(cupAggAgainst);

    const [displayGamesPlayed, setDisplayGamesPlayed] = useState(gamesPlayed);
    const [displayHomeGamesPlayed, setDisplayHomeGamesPlayed] = useState(homeGamesPlayed);
    const [displayAwayGamesPlayed, setDisplayAwayGamesPlayed] = useState(awayGamesPlayed);
    const [displayCupGamesPlayed, setDisplayCupGamesPlayed] = useState(cupGamesPlayed);

    function displayAll() {
        setDisplayTotalAgg(totalAgg);
        setDisplayTotalAggAgainst(totalAggAgainst);
    
        setDisplayTotalHomeAgg(totalHomeAgg);
        setDisplayTotalHomeAggAgainst(totalHomeAggAgainst);
        
        setDisplayTotalAwayAgg(totalAwayAgg);
        setDisplayTotalAwayAggAgainst(totalAwayAgg);
    
        setDisplayCupAgg(cupAgg);
        setDisplayCupAggAgainst(cupAggAgainst);
    
        setDisplayGamesPlayed(gamesPlayed);
        setDisplayHomeGamesPlayed(homeGamesPlayed);
        setDisplayAwayGamesPlayed(awayGamesPlayed);
        setDisplayCupGamesPlayed(cupGamesPlayed);
    }

    function displaySingles() {
        setDisplayTotalAgg(singlesAgg);
        setDisplayTotalAggAgainst(singlesAggAgainst);
    
        setDisplayTotalHomeAgg(totalSinglesHomeAgg);
        setDisplayTotalHomeAggAgainst(totalSinglesHomeAggAgainst);
        
        setDisplayTotalAwayAgg(totalSinglesAwayAgg);
        setDisplayTotalAwayAggAgainst(totalSinglesAwayAggAgainst);
    
        setDisplayCupAgg(totalSinglesCupAgg);
        setDisplayCupAggAgainst(totalSinglesCupAggAgainst);
    
        setDisplayGamesPlayed(singlesGames);
        setDisplayHomeGamesPlayed(singlesHomeGamesPlayed);
        setDisplayAwayGamesPlayed(singlesAwayGamesPlayed);
        setDisplayCupGamesPlayed(singlesCupGamesPlayed);
    }

    function displayPairs() {
        setDisplayTotalAgg(totalPairsAgg);
        setDisplayTotalAggAgainst(totalPairsAggAgainst);
    
        setDisplayTotalHomeAgg(totalPairsHomeAgg);
        setDisplayTotalHomeAggAgainst(totalPairsHomeAggAgainst);
        
        setDisplayTotalAwayAgg(totalPairsAwayAgg);
        setDisplayTotalAwayAggAgainst(totalPairsAwayAggAgainst);
    
        setDisplayCupAgg(totalPairsCupAgg);
        setDisplayCupAggAgainst(totalPairsCupAggAgainst);
    
        setDisplayGamesPlayed(pairsGames);
        setDisplayHomeGamesPlayed(pairHomeGamesPlayed);
        setDisplayAwayGamesPlayed(pairAwayGamesPlayed);
        setDisplayCupGamesPlayed(pairCupGamesPlayed);
    }

    return (
        <div id="player-stats-aggregates">
            <Accordion.Item eventKey="3">
                <Accordion.Header id="stats-aggregate">
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
                    <h3>TOTAL</h3>
                    <p>
                        Aggregate scored: {displayTotalAgg} / {displayGamesPlayed * 21}
                    </p>
                    <p>
                        Aggregate conceded: {displayTotalAggAgainst} /{' '}
                        {displayGamesPlayed * 21}
                    </p>
                    {displayHomeGamesPlayed > 0 && (
                        <div>
                            <h3>HOME</h3>
                            <p>
                                Aggregate scored: {displayTotalHomeAgg} /{' '}
                                {displayHomeGamesPlayed * 21}
                            </p>
                            <p>
                                Aggregate conceded: {displayTotalHomeAggAgainst} /{' '}
                                {displayHomeGamesPlayed * 21}
                            </p>
                        </div>
                    )}
                    {displayAwayGamesPlayed > 0 && (
                        <div>
                            <h3>AWAY</h3>
                            <p>
                                Aggregate scored: {displayTotalAwayAgg} /{' '}
                                {displayAwayGamesPlayed * 21}
                            </p>
                            <p>
                                Aggregate conceded: {displayTotalAwayAggAgainst} /{' '}
                                {displayAwayGamesPlayed * 21}
                            </p>
                        </div>
                    )}
                    {displayCupGamesPlayed > 0 && (
                        <div>
                            <h3>CUP</h3>
                            <p>
                                Aggregate scored: {displayCupAgg} /{' '}
                                {displayCupGamesPlayed * 21}
                            </p>
                            <p>
                                Aggregate conceded: {displayCupAggAgainst} /{' '}
                                {displayCupGamesPlayed * 21}
                            </p>
                        </div>
                    )}
                </Accordion.Body>
            </Accordion.Item>
        </div>
    );
}

export default PlayerStatsAggregates;
