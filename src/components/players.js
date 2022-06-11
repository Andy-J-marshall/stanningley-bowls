import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { capitalizeText } from '../helpers/utils';

function Players(props) {
    const index = props.index;
    const player = props.player;
    const playersStats = props.playersStats;
    const name = props.name;

    const playerData = playersStats[player];
    let {
        totalAgg, totalAggAgainst, totalScore, totalScoreAgainst, awayLosses, homeLosses, homeWins, awayWins, beatenBy, beatenOpponents, dayPlayed, pairLosses, pairWins, pairsPartners,
    } = playerData;
    const average = (totalAgg - totalAggAgainst) / (awayWins + homeWins + homeLosses + awayLosses);
    const averageScore = (totalScore) / (awayWins + homeWins + homeLosses + awayLosses);
    const averageScoreAgainst = (totalScoreAgainst) / (awayWins + homeWins + homeLosses + awayLosses);
    const totalLosses = awayLosses + homeLosses;
    const totalWins = awayWins + homeWins;
    const gamesPlayed = awayWins + homeWins + homeLosses + awayLosses;
    beatenBy = capitalizeText(beatenBy);
    beatenOpponents = capitalizeText(beatenOpponents);
    const pairsGames = pairLosses + pairWins;

    const daysPlayedCount = calculateDaysPlayedCount(dayPlayed);
    const pairsPartnersCount = calculatePairsPartnersCount(pairsPartners)

    function calculatePairsPartnersCount(allPairsPartners) {
        const uniquePartners = allPairsPartners.filter((partner, index) => {
            return allPairsPartners.indexOf(partner) === index;
        });
        const partnersReturnObj = uniquePartners.reduce((partnerObj, player) => {
            partnerObj[player] = { timesPaired: 0 };
            return partnerObj;
        }, {});

        allPairsPartners.forEach(partner => {
            if (uniquePartners.includes(partner)) {
                partnersReturnObj[partner].timesPaired += 1;
            }
        })
        return partnersReturnObj;
    }

    function calculateDaysPlayedCount(daysPlayed) {
        const monday = daysPlayed.filter(day => day.toLowerCase() === 'monday').length;
        const tuesday = daysPlayed.filter(day => day.toLowerCase() === 'tuesday').length;
        const thursday = daysPlayed.filter(day => day.toLowerCase() === 'thursday').length;
        const saturday = daysPlayed.filter(day => day.toLowerCase() === 'saturday').length;

        const returnObj = [
            { day: 'Monday', gamesPlayed: monday },
            { day: 'Tuesday', gamesPlayed: tuesday },
            { day: 'Thursday', gamesPlayed: thursday },
            { day: 'Saturday', gamesPlayed: saturday }
        ];

        return returnObj.filter(day => day.gamesPlayed > 0);
    }

    // TODO handle plurals
    return (
        <div>
            < ListGroup.Item key={index}>
                <div>
                    <h3>{capitalizeText([name])}</h3>
                    {gamesPlayed === 0 && <p>No games played</p>}
                    {gamesPlayed > 0 && <div>
                        <h5>Games</h5>
                        <p>{gamesPlayed} games played in total</p>
                        {daysPlayedCount.map(day => {
                            const key = Math.floor(Math.random() * 100000 + index);
                            return <p key={key}>{day.gamesPlayed} games played on {day.day}</p>
                        })}
                        {pairsGames > 0 && <p>{pairsGames} pairs games played</p>}

                        <h5>Results</h5>
                        {totalWins > 0 && <p>{totalWins} wins ({homeWins} home, {awayWins} away)</p>}
                        {totalLosses > 0 && <p>{totalLosses} losses ({homeLosses} home, {awayLosses} away)</p>}
                        <p>{(totalWins / gamesPlayed * 100).toFixed(0)}% win percentage</p>

                        {/* TODO add more detail on pairs partners wins/losses  */}
                        {pairsGames > 0 && <div>
                            <h5>Pairs</h5>
                            <p>{pairsGames} pairs games played</p>
                            <p>{pairWins} pairs wins</p>
                            <p>{pairLosses} pairs losses</p>
                            {pairsPartners.length > 0 && Object.keys(pairsPartnersCount).map(partner => {
                                const key = Math.floor(Math.random() * 100000 + index);
                                return <p key={key}>{pairsPartnersCount[partner].timesPaired} games with {partner}</p>
                            })}
                        </div>}

                        <h5>Opponents</h5>
                        {beatenOpponents.length > 0 && <p>Beaten opponents = {beatenOpponents}</p>}
                        {beatenBy.length > 0 && <p>Defeated by = {beatenBy}</p>}

                        <h5>Averages</h5>
                        {/* TODO split in home and away? */}
                        <p>Total points scored = {totalScore} / {gamesPlayed * 5}</p>
                        <p>Total points conceded = {totalScoreAgainst} / {gamesPlayed * 5}</p>
                        <p>Total aggregate scored = {totalAgg} / {gamesPlayed * 21}</p>
                        <p>Total aggregate conceded = {totalAggAgainst} / {gamesPlayed * 21}</p>
                        <p>Average = {average.toFixed(2)}</p>
                        <p>Average score = {averageScore.toFixed(2)} / 5</p>
                        <p>Average opponents score = {averageScoreAgainst.toFixed(2)} / 5</p>
                    </div>}
                </div>
            </ListGroup.Item>
        </div>
    );
}

export default Players;
