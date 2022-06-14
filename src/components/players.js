import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { capitalizeText } from '../helpers/utils';

function Players(props) {
    const index = props.index;
    const player = props.player;
    const playersStats = props.playersStats;
    const name = props.name;

    const playerData = playersStats[player];
    // TODO add cupWins/losses to this
    let {
        totalAgg, totalAggAgainst, totalPairsAgg, totalPairsAggAgainst, totalScore, totalScoreAgainst,
        awayLosses, homeLosses, homeWins, awayWins, winningPairsPartners, losingPairsPartners, beatenBy,
        beatenOpponents, dayPlayed, pairLosses, pairWins, pairsPartners, totalHomeAgg, totalHomeAggAgainst,
        totalAwayAgg, totalAwayAggAgainst, totalHomeScore, totalHomeScoreAgainst, totalAwayScore, totalAwayScoreAgainst,
    } = playerData;
    const totalLosses = awayLosses + homeLosses;
    const totalWins = awayWins + homeWins;
    const gamesPlayed = totalLosses + totalWins;
    const homeGamesPlayed = homeWins + homeLosses;
    const awayGamesPlayed = awayWins + awayLosses;
    const average = (totalAgg - totalAggAgainst) / gamesPlayed;
    const homeAverage = (totalHomeAgg - totalHomeAggAgainst) / (homeGamesPlayed);
    const awayAverage = (totalAwayAgg - totalAwayAggAgainst) / (awayGamesPlayed);
    const averageScore = (totalScore) / gamesPlayed;
    const averageScoreAgainst = (totalScoreAgainst) / gamesPlayed;
    const homeAverageScore = (totalHomeScore) / homeGamesPlayed;
    const homeAverageScoreAgainst = (totalHomeScoreAgainst) / homeGamesPlayed;
    const awayAverageScore = (totalAwayScore) / awayGamesPlayed;
    const awayAverageScoreAgainst = (totalAwayScoreAgainst) / awayGamesPlayed;
    beatenBy = capitalizeText(beatenBy);
    beatenOpponents = capitalizeText(beatenOpponents);
    const pairsGames = pairLosses + pairWins;

    const daysPlayedCount = calculateDaysPlayedCount(dayPlayed);
    const pairsPartnersCount = calculatePairsPartnersCount(pairsPartners)
    const pairsPartnersCountWins = calculatePairsPartnersCount(winningPairsPartners)
    const pairsPartnersCountLosses = calculatePairsPartnersCount(losingPairsPartners)

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
    {/* TODO need to handle cup games on neutral greens? */}
    return (
        <div>
            < ListGroup.Item key={index}>
                <div>
                    <h3>{capitalizeText([name])}</h3>
                    {gamesPlayed === 0 && <p>No games played</p>}
                    {gamesPlayed > 0 && <div>
                        <h4>Games</h4>
                        <p>{gamesPlayed} games played in total</p>
                        {daysPlayedCount.map(day => {
                            const key = Math.floor(Math.random() * 100000 + index);
                            return <p key={key}>{day.gamesPlayed} games played on {day.day}</p>
                        })}
                        {pairsGames > 0 && <p>{pairsGames} pairs games played</p>}

                        <h4>Results</h4>
                        {totalWins > 0 && <p>{totalWins} wins ({homeWins} home, {awayWins} away)</p>}
                        {totalLosses > 0 && <p>{totalLosses} losses ({homeLosses} home, {awayLosses} away)</p>}
                        <p>{(totalWins / gamesPlayed * 100).toFixed(0)}% win percentage</p>

                        {pairsGames > 0 && <div>
                            <h4>Pairs</h4>
                            <p>{pairsGames} pairs games played</p>
                            <p>{pairWins} pairs wins</p>
                            <p>{pairLosses} pairs losses</p>
                            {pairsPartners.length > 0 && Object.keys(pairsPartnersCount).map(partner => {
                                const key = Math.floor(Math.random() * 100000 + index);
                                return <p key={key}>{pairsPartnersCount[partner].timesPaired} games played with {partner}</p>
                            })}
                            {pairWins > 0 && Object.keys(pairsPartnersCountWins).map(partner => {
                                const key = Math.floor(Math.random() * 100000 + index);
                                return <p key={key}>{pairsPartnersCountWins[partner].timesPaired} games won with {partner}</p>
                            })}
                            {pairLosses > 0 && Object.keys(pairsPartnersCountLosses).map(partner => {
                                const key = Math.floor(Math.random() * 100000 + index);
                                return <p key={key}>{pairsPartnersCountLosses[partner].timesPaired} games lost with {partner}</p>
                            })}
                        </div>}

                        <h4>Opponents</h4>
                        {beatenOpponents.length > 0 && <p>Beaten opponents = {beatenOpponents}</p>}
                        {beatenBy.length > 0 && <p>Defeated by = {beatenBy}</p>}

                        <h4>Averages</h4>
                        <p>Average = {average.toFixed(2)}</p>
                        <p>Home average = {homeAverage.toFixed(2)}</p>
                        <p>Away average = {awayAverage.toFixed(2)}</p>

                        <p>Average score = {averageScore.toFixed(2)} / 5</p>
                        <p>Average opponents score = {averageScoreAgainst.toFixed(2)} / 5</p>
                        <p>Average home score = {homeAverageScore.toFixed(2)} / 5</p>
                        <p>Average home opponents score = {homeAverageScoreAgainst.toFixed(2)} / 5</p>
                        <p>Average away score = {awayAverageScore.toFixed(2)} / 5</p>
                        <p>Average away opponents score = {awayAverageScoreAgainst.toFixed(2)} / 5</p>

                        <h4>Aggregates</h4>
                        <p><b>Points</b></p>
                        <p>Total aggregate scored = {totalAgg} / {gamesPlayed * 21}</p>
                        <p>Total aggregate conceded = {totalAggAgainst} / {gamesPlayed * 21}</p>
                        <p>Total home aggregate scored = {totalHomeAgg} / {homeGamesPlayed * 21}</p>
                        <p>Total home aggregate conceded = {totalHomeAggAgainst} / {homeGamesPlayed * 21}</p>
                        <p>Total away aggregate scored = {totalAwayAgg} / {awayGamesPlayed * 21}</p>
                        <p>Total away aggregate conceded = {totalAwayAggAgainst} / {awayGamesPlayed * 21}</p>
                        {pairsGames > 0 && <p>Total pairs aggregate scored = {totalPairsAgg} / {pairsGames * 21}</p>}
                        {pairsGames > 0 && <p>Total pairs aggregate conceded = {totalPairsAggAgainst} / {pairsGames * 21}</p>}

                        <p><b>Team Points</b></p>
                        <p>Total points scored = {totalScore} / {gamesPlayed * 5}</p>
                        <p>Total points conceded = {totalScoreAgainst} / {gamesPlayed * 5}</p>
                        <p>Total home points scored = {totalHomeScore} / {homeGamesPlayed * 5}</p>
                        <p>Total home points conceded = {totalHomeScoreAgainst} / {homeGamesPlayed * 5}</p>
                        <p>Total away points scored = {totalAwayScore} / {awayGamesPlayed * 5}</p>
                        <p>Total away points conceded = {totalAwayScoreAgainst} / {awayGamesPlayed * 5}</p>
                    </div>}
                </div>
            </ListGroup.Item>
        </div>
    );
}

export default Players;
