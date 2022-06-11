import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { capitalizeText } from '../helpers/utils';

function Players(props) {
    const index = props.index;
    const player = props.player;
    const playersStats = props.playersStats;
    const name = props.name;
    const data = returnPlayerData(player);
    const daysPlayedCount = calculateDaysPlayedCount(data.dayPlayed);
    const pairsPartnersCount = calculatePairsPartnersCount(data.pairsPartners)

    // TODO handle plurals
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
            dayPlayed: dayPlayed,
            pairsGames: pairLosses + pairWins,
            pairLosses,
            pairWins,
            pairsPartners,
        }
        return returnObj;
    }

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

    return (
        <div>
            < ListGroup.Item key={index}>
                <div>
                    <h3>{capitalizeText([name])}</h3>
                    {data.gamesPlayed === 0 && <p>No games played</p>}
                    {data.gamesPlayed > 0 && <div>
                        <h5>Games</h5>
                        <p>{data.gamesPlayed} games played in total</p>
                        {daysPlayedCount.map(day => {
                            const key = Math.floor(Math.random() * 100000 + index);
                            return <p key={key}>{day.gamesPlayed} games played on {day.day}</p>
                        })}
                        {data.pairsGames > 0 && <p>{data.pairsGames} pairs games played</p>}

                        <h5>Results</h5>
                        {data.totalWins > 0 && <p>{data.totalWins} wins ({data.homeWins} home, {data.awayWins} away)</p>}
                        {data.totalLosses > 0 && <p>{data.totalLosses} losses ({data.homeLosses} home, {data.awayLosses} away)</p>}
                        <p>{(data.totalWins / data.gamesPlayed * 100).toFixed(0)}% win percentage</p>

                        {/* TODO add more detail on pairs partners wins/losses  */}
                        {data.pairsGames > 0 && <div>
                            <h5>Pairs</h5>
                            <p>{data.pairsGames} pairs games played</p>
                            <p>{data.pairWins} pairs wins</p>
                            <p>{data.pairLosses} pairs losses</p>
                            {data.pairsPartners.length > 0 && Object.keys(pairsPartnersCount).map(partner => {
                                const key = Math.floor(Math.random() * 100000 + index);
                                return <p key={key}>{pairsPartnersCount[partner].timesPaired} games with {partner}</p>
                            })}
                        </div>}

                        <h5>Opponents</h5>
                        {data.beatenOpponents.length > 0 && <p>Beaten opponents = {data.beatenOpponents}</p>}
                        {data.beatenBy.length > 0 && <p>Defeated by = {data.beatenBy}</p>}

                        <h5>Averages</h5>
                        {/* TODO split in home and away? */}
                        <p>Total points scored = {data.totalScore} / {data.gamesPlayed * 5}</p>
                        <p>Total points conceded = {data.totalScoreAgainst} / {data.gamesPlayed * 5}</p>
                        <p>Total aggregate scored = {data.totalAgg} / {data.gamesPlayed * 21}</p>
                        <p>Total aggregate conceded = {data.totalAggAgainst} / {data.gamesPlayed * 21}</p>
                        <p>Average = {data.average.toFixed(2)}</p>
                        <p>Average score = {data.averageScore.toFixed(2)} / 5</p>
                        <p>Average opponents score = {data.averageScoreAgainst.toFixed(2)} / 5</p>
                    </div>}
                </div>
            </ListGroup.Item>
        </div>
    );
}

export default Players;
