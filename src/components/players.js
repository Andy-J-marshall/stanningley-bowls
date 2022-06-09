import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { capitalizeText } from '../helpers/utils';

function Players(props) {
    const index = props.index;
    const player = props.player;
    const playersStats = props.playersStats;
    const name = props.name;
    const data = returnPlayerData(player)

    // TODO refactor this
    function returnPlayerData(player) {
        const playerData = playersStats[player];
        const {
            totalAgg, totalAggAgainst, totalScore, totalScoreAgainst, awayLosses, homeLosses, homeWins, awayWins, beatenBy, beatenOpponents, dayPlayed, pairLosses, pairWins, pairsPartners,
        } = playerData;
        const returnObj = {
            totalAgg,
            totalAggAgainst,
            totalScore,
            totalScoreAgainst,
            average: (totalAgg - totalAggAgainst) / (awayWins + homeWins + homeLosses + awayLosses),
            averageScore: (totalScore) / (awayWins + homeWins + homeLosses + awayLosses),
            averageScoreAgainst: (totalScoreAgainst) / (awayWins + homeWins + homeLosses + awayLosses),
            awayLosses,
            homeLosses,
            totalLosses: awayLosses + homeLosses,
            homeWins,
            awayWins,
            totalWins: awayWins + homeWins,
            gamesPlayed: awayWins + homeWins + homeLosses + awayLosses,
            beatenBy: capitalizeText(beatenBy),
            beatenOpponents: capitalizeText(beatenOpponents),
            dayPlayed: capitalizeText(dayPlayed),
            pairsGames: pairLosses + pairWins,
            pairLosses,
            pairWins,
            pairsPartners: capitalizeText(pairsPartners),
        }
        return returnObj;
    }

    // TODO display this in a fancy way
    // TODO put in null checks
    return (
        <div>
            < ListGroup.Item
                key={index}>
                <div>
                    <h3>{capitalizeText([name])}</h3>
                    {data.gamesPlayed === 0 && <p>No games played</p>}
                    {data.gamesPlayed > 0 && <div>
                        <h5>Games</h5>
                        {/* TODO display days played in nicer way */}
                        <p>{data.gamesPlayed} games played</p>
                        {data.totalWins > 0 && <p>{data.totalWins} wins ({data.homeWins} home, {data.awayWins} away)</p>}
                        {data.totalLosses > 0 && <p>{data.totalLosses} losses ({data.homeLosses} home, {data.awayLosses} away)</p>}
                        {<p>Days played = {data.dayPlayed}</p>}

                        {data.pairsGames > 0 && <div>
                            <h5>Pairs</h5>
                            {/* TODO display pairsPartners in nicer way */}
                            <p>{data.pairsGames} pairs games played</p>
                            <p>{data.pairWins} pairs wins</p>
                            <p>{data.pairLosses} pairs losses</p>
                            {data.pairsPartners.length > 0 && <p>Pairs partners = {data.pairsPartners}</p>}
                        </div>}

                        <h5>Opponents</h5>
                        {data.beatenOpponents.length > 0 && <p>Beaten opponents = {data.beatenOpponents}</p>}
                        {data.beatenBy.length > 0 && <p>Defeated by = {data.beatenBy}</p>}

                        <h5>Averages</h5>
                        <p>Total points scored = {data.totalScore} / {data.gamesPlayed * 5}</p>
                        <p>Total points conceded = {data.totalScoreAgainst} / {data.gamesPlayed * 5}</p>
                        <p>Total aggregate scored = {data.totalAgg} / {data.gamesPlayed * 21}</p>
                        <p>Total aggregate conceded = {data.totalAggAgainst} / {data.gamesPlayed * 21}</p>
                        <p>Average = {data.average.toFixed(2)}</p>
                        <p>Combined average score = {data.averageScore.toFixed(2)} / 5</p>
                        <p>Combined average score against = {data.averageScoreAgainst.toFixed(2)} / 5</p>
                    </div>}
                </div>
            </ListGroup.Item>
        </div>
    );
}

export default Players;
