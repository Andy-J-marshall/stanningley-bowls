import { Accordion } from 'react-bootstrap';

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

    return (
        <div id="player-stats-aggregates">
            <Accordion.Item eventKey="5">
                <Accordion.Header id="stats-aggregate">
                    AGGREGATES
                </Accordion.Header>
                <Accordion.Body>
                    <h3>TOTAL</h3>
                    <p>
                        Aggregate scored = {totalAgg} / {gamesPlayed * 21}
                    </p>
                    <p>
                        Aggregate conceded = {totalAggAgainst} /{' '}
                        {gamesPlayed * 21}
                    </p>
                    {homeGamesPlayed > 0 && (
                        <div>
                            <h3>HOME</h3>
                            <p>
                                Aggregate scored = {totalHomeAgg} /{' '}
                                {homeGamesPlayed * 21}
                            </p>
                            <p>
                                Aggregate conceded = {totalHomeAggAgainst} /{' '}
                                {homeGamesPlayed * 21}
                            </p>
                        </div>
                    )}
                    {awayGamesPlayed > 0 && (
                        <div>
                            <h3>AWAY</h3>
                            <p>
                                Aggregate scored = {totalAwayAgg} /{' '}
                                {awayGamesPlayed * 21}
                            </p>
                            <p>
                                Aggregate conceded = {totalAwayAggAgainst} /{' '}
                                {awayGamesPlayed * 21}
                            </p>
                        </div>
                    )}
                    {cupGamesPlayed > 0 && (
                        <div>
                            <h3>CUP</h3>
                            <p>
                                Aggregate scored = {cupAgg} /{' '}
                                {cupGamesPlayed * 21}
                            </p>
                            <p>
                                Aggregate conceded = {cupAggAgainst} /{' '}
                                {cupGamesPlayed * 21}
                            </p>
                        </div>
                    )}
                    {pairsGames > 0 && singlesGames > 0 && (
                        <div>
                            {singlesGames > 0 && (
                                <div>
                                    <h3>SINGLES</h3>
                                    <p>
                                        Aggregate scored = {singlesAgg} /{' '}
                                        {singlesGames * 21}
                                    </p>
                                    <p>
                                        Aggregate conceded = {singlesAggAgainst}{' '}
                                        / {singlesGames * 21}
                                    </p>
                                    {singlesHomeGamesPlayed > 0 && (
                                        <div>
                                            <h5>HOME</h5>
                                            <p>
                                                Aggregate scored ={' '}
                                                {totalSinglesHomeAgg} /{' '}
                                                {singlesHomeGamesPlayed * 21}
                                            </p>
                                            <p>
                                                Aggregate conceded ={' '}
                                                {totalSinglesHomeAggAgainst} /{' '}
                                                {singlesHomeGamesPlayed * 21}
                                            </p>
                                        </div>
                                    )}
                                    {singlesAwayGamesPlayed > 0 && (
                                        <div>
                                            <h5>AWAY</h5>
                                            <p>
                                                Aggregate scored ={' '}
                                                {totalSinglesAwayAgg} /{' '}
                                                {singlesAwayGamesPlayed * 21}
                                            </p>
                                            <p>
                                                Aggregate conceded ={' '}
                                                {totalSinglesAwayAggAgainst} /{' '}
                                                {singlesAwayGamesPlayed * 21}
                                            </p>
                                        </div>
                                    )}
                                    {singlesCupGamesPlayed > 0 && (
                                        <div>
                                            <h5>CUP</h5>
                                            <p>
                                                Aggregate scored ={' '}
                                                {totalSinglesCupAgg} /{' '}
                                                {singlesCupGamesPlayed * 21}
                                            </p>
                                            <p>
                                                Aggregate conceded ={' '}
                                                {totalSinglesCupAggAgainst} /{' '}
                                                {singlesCupGamesPlayed * 21}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                            {pairsGames > 0 && (
                                <div>
                                    <h3>PAIRS</h3>
                                    <p>
                                        Aggregate scored = {totalPairsAgg} /{' '}
                                        {pairsGames * 21}
                                    </p>
                                    <p>
                                        Aggregate conceded ={' '}
                                        {totalPairsAggAgainst} /{' '}
                                        {pairsGames * 21}
                                    </p>
                                    {pairHomeGamesPlayed > 0 && (
                                        <div>
                                            <h5>HOME</h5>
                                            <p>
                                                Aggregate scored ={' '}
                                                {totalPairsHomeAgg} /{' '}
                                                {pairHomeGamesPlayed * 21}
                                            </p>
                                            <p>
                                                Aggregate conceded ={' '}
                                                {totalPairsHomeAggAgainst} /{' '}
                                                {pairHomeGamesPlayed * 21}
                                            </p>
                                        </div>
                                    )}
                                    {pairAwayGamesPlayed > 0 && (
                                        <div>
                                            <h5>AWAY</h5>
                                            <p>
                                                Aggregate scored ={' '}
                                                {totalPairsAwayAgg} /{' '}
                                                {pairAwayGamesPlayed * 21}
                                            </p>
                                            <p>
                                                Aggregate conceded ={' '}
                                                {totalPairsAwayAggAgainst} /{' '}
                                                {pairAwayGamesPlayed * 21}
                                            </p>
                                        </div>
                                    )}
                                    {pairCupGamesPlayed > 0 && (
                                        <div>
                                            <h5>CUP</h5>
                                            <p>
                                                Aggregate scored ={' '}
                                                {totalPairsCupAgg} /{' '}
                                                {pairCupGamesPlayed * 21}
                                            </p>
                                            <p>
                                                Aggregate conceded ={' '}
                                                {totalPairsCupAggAgainst} /{' '}
                                                {pairCupGamesPlayed * 21}
                                            </p>
                                        </div>
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

export default PlayerStatsAggregates;
