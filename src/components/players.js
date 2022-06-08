import React from 'react';
import { ListGroup } from 'react-bootstrap';

function Players(props) {
    const index = props.index;
    const player = props.player;
    const playersStats = props.playersStats;
    const name = props.name;

    function returnPlayerData(player) {
        const playerData = playersStats[player];
        // TODO fill in this info next
        const { totalAgg, totalAggAgainst, totalScore, totalScoreAgainst, awayLosses, homeLosses, homeWins, awayWins, beatenBy, beatenOpponents, dayPlayed, pairLosses, pairWins, pairsPartners, } = playerData;
        return `${name}: ${totalScore}`;
    }

    return (
        <div>
            < ListGroup.Item key={index}>{returnPlayerData(player)}</ListGroup.Item>
        </div>
    );
}

export default Players;
