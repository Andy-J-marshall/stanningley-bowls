import { Accordion } from 'react-bootstrap';
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

    return (
        <div id="player-stats-points">
            <Accordion.Item eventKey="4">
                <Accordion.Header id="stats-points">POINTS</Accordion.Header>
                <Accordion.Body>
                    <div>
                        <h3>TOTAL</h3>
                        <p>
                            Points scored = {totalPoints} /{' '}
                            {(gamesPlayed - cupGamesPlayed) * 5}
                        </p>
                        <p>
                            Points conceded = {totalPointsAgainst} /{' '}
                            {(gamesPlayed - cupGamesPlayed) * 5}
                        </p>
                        <p>
                            Average points scored = {averagePoints.toFixed(2)} /
                            5
                        </p>
                        <p>
                            Average points conceded ={' '}
                            {averagePointsAgainst.toFixed(2)} / 5
                        </p>
                        {homeGamesPlayed > 0 && (
                            <div>
                                <h3>HOME</h3>
                                <div>
                                    <p>
                                        Points scored = {totalHomePoints} /{' '}
                                        {homeGamesPlayed * 5}
                                    </p>
                                    <p>
                                        Points conceded ={' '}
                                        {totalHomePointsAgainst} /{' '}
                                        {homeGamesPlayed * 5}
                                    </p>
                                    <p>
                                        Average points scored ={' '}
                                        {homeAveragePoints.toFixed(2)} / 5
                                    </p>
                                    <p>
                                        Average points conceded ={' '}
                                        {homeAveragePointsAgainst.toFixed(2)} /
                                        5
                                    </p>
                                </div>
                            </div>
                        )}
                        {awayGamesPlayed > 0 && (
                            <div>
                                <h3>AWAY</h3>
                                <div>
                                    <p>
                                        Points scored = {totalAwayPoints} /{' '}
                                        {awayGamesPlayed * 5}
                                    </p>
                                    <p>
                                        Points conceded ={' '}
                                        {totalAwayPointsAgainst} /{' '}
                                        {awayGamesPlayed * 5}
                                    </p>
                                    <p>
                                        Average points scored ={' '}
                                        {awayAveragePoints.toFixed(2)} / 5
                                    </p>
                                    <p>
                                        Average points conceded ={' '}
                                        {awayAveragePointsAgainst.toFixed(2)} /
                                        5
                                    </p>
                                </div>
                            </div>
                        )}
                        {singlesGames > 0 && pairsGames > 0 && (
                            <div>
                                <div>
                                    <h3>SINGLES</h3>
                                    <p>
                                        Points scored = {totalSinglesPoints} /{' '}
                                        {(singlesGames -
                                            singlesCupGamesPlayed) *
                                            5}
                                    </p>
                                    <p>
                                        Points conceded ={' '}
                                        {totalSinglesPointsAgainst} /{' '}
                                        {(singlesGames -
                                            singlesCupGamesPlayed) *
                                            5}
                                    </p>
                                    <p>
                                        Average points scored ={' '}
                                        {singlesAveragePoints.toFixed(2)} / 5
                                    </p>
                                    <p>
                                        Average points conceded ={' '}
                                        {singlesAveragePointsAgainst.toFixed(2)}{' '}
                                        / 5
                                    </p>
                                    {singlesHomeGamesPlayed > 0 && (
                                        <div>
                                            <h5>HOME</h5>
                                            <p>
                                                Points scored ={' '}
                                                {totalSinglesHomePoints} /{' '}
                                                {singlesHomeGamesPlayed * 5}
                                            </p>
                                            <p>
                                                Points conceded ={' '}
                                                {totalSinglesHomePointsAgainst}{' '}
                                                / {singlesHomeGamesPlayed * 5}
                                            </p>
                                            <p>
                                                Average points scored ={' '}
                                                {singlesHomeAveragePoints.toFixed(
                                                    2
                                                )}{' '}
                                                / 5
                                            </p>
                                            <p>
                                                Average points conceded ={' '}
                                                {singlesHomeAveragePointsAgainst.toFixed(
                                                    2
                                                )}{' '}
                                                / 5
                                            </p>
                                        </div>
                                    )}
                                    {singlesAwayGamesPlayed > 0 && (
                                        <div>
                                            <h5>AWAY</h5>
                                            <p>
                                                Points scored ={' '}
                                                {totalSinglesAwayPoints} /{' '}
                                                {singlesAwayGamesPlayed * 5}
                                            </p>
                                            <p>
                                                Points conceded ={' '}
                                                {totalSinglesAwayPointsAgainst}{' '}
                                                / {singlesAwayGamesPlayed * 5}
                                            </p>
                                            <p>
                                                Average points scored ={' '}
                                                {singlesAwayAveragePoints.toFixed(
                                                    2
                                                )}{' '}
                                                / 5
                                            </p>
                                            <p>
                                                Average points conceded ={' '}
                                                {singlesAwayAveragePointsAgainst.toFixed(
                                                    2
                                                )}{' '}
                                                / 5
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h3>PAIRS</h3>
                                    <p>
                                        Points scored = {totalPairsPoints} /{' '}
                                        {(pairsGames - pairCupGamesPlayed) * 5}
                                    </p>
                                    <p>
                                        Points conceded ={' '}
                                        {totalPairsPointsAgainst} /{' '}
                                        {(pairsGames - pairCupGamesPlayed) * 5}
                                    </p>
                                    <p>
                                        Average points scored={' '}
                                        {pairsAveragePoints.toFixed(2)} / 5
                                    </p>
                                    <p>
                                        Average points conceded ={' '}
                                        {pairsAveragePointsAgainst.toFixed(2)} /
                                        5
                                    </p>
                                    {pairHomeGamesPlayed > 0 && (
                                        <div>
                                            <h5>HOME</h5>
                                            <p>
                                                Points scored ={' '}
                                                {totalPairsHomePoints} /{' '}
                                                {pairHomeGamesPlayed * 5}
                                            </p>
                                            <p>
                                                Points conceded ={' '}
                                                {totalPairsHomePointsAgainst} /{' '}
                                                {pairHomeGamesPlayed * 5}
                                            </p>
                                            <p>
                                                Average points scored ={' '}
                                                {pairsHomeAveragePoints.toFixed(
                                                    2
                                                )}{' '}
                                                / 5
                                            </p>
                                            <p>
                                                Average points conceded ={' '}
                                                {pairsHomeAveragePointsAgainst.toFixed(
                                                    2
                                                )}{' '}
                                                / 5
                                            </p>
                                        </div>
                                    )}
                                    {pairAwayGamesPlayed > 0 && (
                                        <div>
                                            <h5>AWAY</h5>
                                            <p>
                                                Points scored ={' '}
                                                {totalPairsAwayPoints} /{' '}
                                                {pairAwayGamesPlayed * 5}
                                            </p>
                                            <p>
                                                Points conceded ={' '}
                                                {totalPairsAwayPointsAgainst} /{' '}
                                                {pairAwayGamesPlayed * 5}
                                            </p>
                                            <p>
                                                Average points scored ={' '}
                                                {pairsAwayAveragePoints.toFixed(
                                                    2
                                                )}{' '}
                                                / 5
                                            </p>
                                            <p>
                                                Average points conceded ={' '}
                                                {pairsAwayAveragePointsAgainst.toFixed(
                                                    2
                                                )}{' '}
                                                / 5
                                            </p>
                                        </div>
                                    )}
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
