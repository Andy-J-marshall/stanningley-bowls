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
                    {/* TODO display days played in nicer way */}
                    <p>Games played = {data.gamesPlayed} ({data.dayPlayed})</p>
                    <p>Games Won = {data.totalWins} ({data.homeWins} home, {data.awayWins} away, {data.pairWins} pairs)</p>
                    <p>Games Lost = {data.totalLosses} ({data.homeLosses} home, {data.awayLosses} away, {data.pairLosses} pairs)</p>
                    {/* TODO display pairsPartners in nicer way */}
                    <p><b>Opponents:</b> Beat = {data.beatenOpponents}. Lost to = {data.beatenBy}</p>
                    {data.pairsPartners.length > 0 && <p>Pairs partners = {data.pairsPartners}</p>}
                    <p>Total points scored = {data.totalScore} / {data.gamesPlayed * 5}</p>
                    <p>Total points conceded = {data.totalScoreAgainst} / {data.gamesPlayed * 5}</p>
                    <p>Total aggregate = {data.totalAgg} / {data.gamesPlayed * 21}</p>
                    <p>Total aggregate conceded = {data.totalAggAgainst} / {data.gamesPlayed * 21}</p>
                    <p>Combined averages = {data.average.toFixed(2)}</p>
                    <p>Combined average score = {data.averageScore.toFixed(2)} / 5</p>
                    <p>Combined average score against = {data.averageScoreAgainst.toFixed(2)} / 5</p>
                </div>
            </ListGroup.Item>
        </div>
    );
}

export default Players;
