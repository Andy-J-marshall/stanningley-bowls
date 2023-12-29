import { useState } from 'react';
import { Accordion } from 'react-bootstrap';
import GameTypeButton from './gameTypeButtons';

function PlayerStatsAggregates(props) {
    const stats = props.stats;

    // TODO need to be able to handle these values being null - default to 21

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
        availableAgg,
        availablePairsAgg,
        availableHomeAgg,
        availableAwayAgg,
        availableCupAgg,
        availablePairsHomeAgg,
        availablePairsAwayAgg,
        availablePairsCupAgg,
    } = stats;

    const [displayAvailableAgg, setDisplayAvailableAgg] = useState(availableAgg);
    const [displayTotalAgg, setDisplayTotalAgg] = useState(totalAgg);
    const [displayTotalAggAgainst, setDisplayTotalAggAgainst] = useState(totalAggAgainst);

    const [displayAvailableHomeAgg, setDisplayAvailableHomeAgg] = useState(availableHomeAgg);
    const [displayTotalHomeAgg, setDisplayTotalHomeAgg] = useState(totalHomeAgg);
    const [displayTotalHomeAggAgainst, setDisplayTotalHomeAggAgainst] = useState(totalHomeAggAgainst);
    
    const [displayAvailableAwayAgg, setDisplayAvailableAwayAgg] = useState(availableAwayAgg);
    const [displayTotalAwayAgg, setDisplayTotalAwayAgg] = useState(totalAwayAgg);
    const [displayTotalAwayAggAgainst, setDisplayTotalAwayAggAgainst] = useState(totalAwayAggAgainst);

    const [displayAvailableCupAgg, setDisplayAvailableCupAgg] = useState(availableCupAgg);
    const [displayCupAgg, setDisplayCupAgg] = useState(cupAgg);
    const [displayCupAggAgainst, setDisplayCupAggAgainst] = useState(cupAggAgainst);

    const [displayHomeGamesPlayed, setDisplayHomeGamesPlayed] = useState(homeGamesPlayed);
    const [displayAwayGamesPlayed, setDisplayAwayGamesPlayed] = useState(awayGamesPlayed);
    const [displayCupGamesPlayed, setDisplayCupGamesPlayed] = useState(cupGamesPlayed);

    function displayAll() {
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
                        Aggregate scored: {displayTotalAgg} / {displayAvailableAgg}
                    </p>
                    <p>
                        Aggregate conceded: {displayTotalAggAgainst} /{' '}
                        {displayAvailableAgg}
                    </p>
                    {displayHomeGamesPlayed > 0 && (
                        <div>
                            <h3>HOME</h3>
                            <p>
                                Aggregate scored: {displayTotalHomeAgg} /{' '}
                                {displayAvailableHomeAgg}
                            </p>
                            <p>
                                Aggregate conceded: {displayTotalHomeAggAgainst} /{' '}
                                {displayAvailableHomeAgg}
                            </p>
                        </div>
                    )}
                    {displayAwayGamesPlayed > 0 && (
                        <div>
                            <h3>AWAY</h3>
                            <p>
                                Aggregate scored: {displayTotalAwayAgg} /{' '}
                                {displayAvailableAwayAgg}
                            </p>
                            <p>
                                Aggregate conceded: {displayTotalAwayAggAgainst} /{' '}
                                {displayAvailableAwayAgg}
                            </p>
                        </div>
                    )}
                    {displayCupGamesPlayed > 0 && (
                        <div>
                            <h3>CUP</h3>
                            <p>
                                Aggregate scored: {displayCupAgg} /{' '}
                                {displayAvailableCupAgg}
                            </p>
                            <p>
                                Aggregate conceded: {displayCupAggAgainst} /{' '}
                                {displayAvailableCupAgg}
                            </p>
                        </div>
                    )}
                </Accordion.Body>
            </Accordion.Item>
        </div>
    );
}

export default PlayerStatsAggregates;
