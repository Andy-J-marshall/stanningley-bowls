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
        totalAgg,
        totalAggAgainst,
        totalPairsAgg,
        totalPairsAggAgainst,
        totalScore,
        totalScoreAgainst,
        awayLosses,
        homeLosses,
        cupLosses,
        homeWins,
        awayWins,
        cupWins,
        winningPairsPartners,
        losingPairsPartners,
        beatenBy,
        beatenByTeam,
        beatenOpponents,
        beatenTeam,
        pairLosses,
        pairWins,
        pairsPartners,
        totalHomeAgg,
        totalHomeAggAgainst,
        totalAwayAgg,
        totalAwayAggAgainst,
        totalHomeScore,
        totalHomeScoreAgainst,
        totalAwayScore,
        totalAwayScoreAgainst,
        monday,
        tuesday,
        thursday,
        saturday,
    } = playerData;
    const totalLosses = awayLosses + homeLosses + cupLosses;
    const totalWins = awayWins + homeWins + cupWins;
    const gamesPlayed = totalLosses + totalWins;
    const homeGamesPlayed = homeWins + homeLosses;
    const awayGamesPlayed = awayWins + awayLosses;
    const average = (totalAgg - totalAggAgainst) / gamesPlayed;
    const homeAverage = (totalHomeAgg - totalHomeAggAgainst) / homeGamesPlayed;
    const awayAverage = (totalAwayAgg - totalAwayAggAgainst) / awayGamesPlayed;
    const averageScore = totalScore / gamesPlayed;
    const averageScoreAgainst = totalScoreAgainst / gamesPlayed;
    const homeAverageScore = totalHomeScore / homeGamesPlayed;
    const homeAverageScoreAgainst = totalHomeScoreAgainst / homeGamesPlayed;
    const awayAverageScore = totalAwayScore / awayGamesPlayed;
    const awayAverageScoreAgainst = totalAwayScoreAgainst / awayGamesPlayed;
    beatenBy = capitalizeText(beatenBy);
    beatenOpponents = capitalizeText(beatenOpponents);
    beatenByTeam = capitalizeText(beatenByTeam);
    beatenTeam = capitalizeText(beatenTeam);
    const pairsGames = pairLosses + pairWins;    
    const mondayWins = monday.wins;
    const mondayGames = monday.games;
    const mondayAvg = monday.aggDiff / mondayGames;
    const tuesdayWins = tuesday.wins;
    const tuesdayGames = tuesday.games;
    const tuesdayAvg = tuesday.aggDiff / tuesdayGames;
    const thursdayWins = thursday.wins;
    const thursdayGames = thursday.games;
    const thursdayAvg = thursday.aggDiff / thursdayGames;
    const saturdayWins = saturday.wins;
    const saturdayGames = saturday.games;
    const saturdayAvg = saturday.aggDiff / saturdayGames;
    let daysPlayedCount = [
        { day: 'Monday', gamesPlayed: mondayGames },
        { day: 'Tuesday', gamesPlayed: tuesdayGames },
        { day: 'Thursday', gamesPlayed: thursdayGames },
        { day: 'Saturday', gamesPlayed: saturdayGames },
    ]
    daysPlayedCount = daysPlayedCount.filter((day) => day.gamesPlayed > 0);

    const pairsPartnersCount = calculatePairsPartnersCount(pairsPartners);
    const pairsPartnersCountWins =
        calculatePairsPartnersCount(winningPairsPartners);
    const pairsPartnersCountLosses =
        calculatePairsPartnersCount(losingPairsPartners);

    function calculatePairsPartnersCount(allPairsPartners) {
        const uniquePartners = allPairsPartners.filter((partner, index) => {
            return allPairsPartners.indexOf(partner) === index;
        });
        const partnersReturnObj = uniquePartners.reduce(
            (partnerObj, player) => {
                partnerObj[player] = { timesPaired: 0 };
                return partnerObj;
            },
            {}
        );

        allPairsPartners.forEach((partner) => {
            if (uniquePartners.includes(partner)) {
                partnersReturnObj[partner].timesPaired += 1;
            }
        });
        return partnersReturnObj;
    }

    // TODO handle plurals
    // TODO still want to use listgroups?
    // TODO pagination?
    return (
        <div>
            <ListGroup.Item key={index}>
                <div>
                    <h4>{capitalizeText([name])}</h4>
                    {gamesPlayed === 0 && <p>No games played</p>}
                    {gamesPlayed > 0 && (
                        <div>
                            <h5>Games</h5>
                            <p>{gamesPlayed} games played in total</p>
                            {daysPlayedCount.map((day) => {
                                const key = Math.floor(
                                    Math.random() * 100000 + index
                                );
                                return (
                                    <p key={key}>
                                        {day.gamesPlayed} games played on{' '}
                                        {day.day}
                                    </p>
                                );
                            })}
                            {pairsGames > 0 && (
                                <p>{pairsGames} pairs games played</p>
                            )}

                            <h5>Results</h5>
                            {totalWins > 0 && (
                                <div>
                                    <p>
                                        {totalWins} wins ({homeWins} home,{' '}
                                        {awayWins} away, {cupWins} cup)
                                    </p>
                                    {mondayGames > 0 && <p>{mondayWins} Monday wins</p>}
                                    {tuesdayGames > 0 && <p>{tuesdayWins} Tuesday wins</p>}
                                    {thursdayGames > 0 && <p>{thursdayWins} Thursday wins</p>}
                                    {saturdayGames > 0 && <p>{saturdayWins} Saturday wins</p>}
                                </div>
                            )}
                            {totalLosses > 0 && (
                                <p>
                                    {totalLosses} losses ({homeLosses} home,{' '}
                                    {awayLosses} away, {cupLosses} cup)
                                </p>
                            )}
                            <p>
                                {((totalWins / gamesPlayed) * 100).toFixed(0)}%
                                win percentage
                            </p>

                            {pairsGames > 0 && (
                                <div>
                                    <h5>Pairs</h5>
                                    <p>{pairsGames} pairs games played</p>
                                    <p>{pairWins} pairs wins</p>
                                    <p>{pairLosses} pairs losses</p>
                                    {pairsPartners.length > 0 &&
                                        Object.keys(pairsPartnersCount).map(
                                            (partner) => {
                                                const key = Math.floor(
                                                    Math.random() * 100000 +
                                                        index
                                                );
                                                return (
                                                    <p key={key}>
                                                        {
                                                            pairsPartnersCount[
                                                                partner
                                                            ].timesPaired
                                                        }{' '}
                                                        games played with{' '}
                                                        {partner}
                                                    </p>
                                                );
                                            }
                                        )}
                                    {pairWins > 0 &&
                                        Object.keys(pairsPartnersCountWins).map(
                                            (partner) => {
                                                const key = Math.floor(
                                                    Math.random() * 100000 +
                                                        index
                                                );
                                                return (
                                                    <p key={key}>
                                                        {
                                                            pairsPartnersCountWins[
                                                                partner
                                                            ].timesPaired
                                                        }{' '}
                                                        games won with {partner}
                                                    </p>
                                                );
                                            }
                                        )}
                                    {pairLosses > 0 &&
                                        Object.keys(
                                            pairsPartnersCountLosses
                                        ).map((partner) => {
                                            const key = Math.floor(
                                                Math.random() * 100000 + index
                                            );
                                            return (
                                                <p key={key}>
                                                    {
                                                        pairsPartnersCountLosses[
                                                            partner
                                                        ].timesPaired
                                                    }{' '}
                                                    games lost with {partner}
                                                </p>
                                            );
                                        })}
                                </div>
                            )}

                            <h5>Opponents</h5>
                            {beatenOpponents.length > 0 && (
                                <p>Beaten opponents = {beatenOpponents}</p>
                            )}
                            {beatenBy.length > 0 && (
                                <p>Defeated by = {beatenBy}</p>
                            )}
                            {beatenTeam.length > 0 && (
                                <p>Beaten team = {beatenTeam}</p>
                            )}
                            {beatenByTeam.length > 0 && (
                                <p>Teams lost to = {beatenByTeam}</p>
                            )}

                            <div>
                                <h5>Averages</h5>
                                {average >= -21 && (
                                    <div>
                                        <p>Average = {average.toFixed(2)}</p>
                                        {homeAverage > -22 && (
                                            <p>
                                                Home average =
                                                {homeAverage.toFixed(2)}
                                            </p>
                                        )}
                                        {awayAverage > -22 && (
                                            <p>
                                                Away average =
                                                {awayAverage.toFixed(2)}
                                            </p>
                                        )}
                                        {mondayGames > 0 && (
                                            <p>
                                                Monday average =
                                                {mondayAvg.toFixed(2)}
                                            </p>
                                        )}
                                        {tuesdayGames > 0 && (
                                            <p>
                                                Tuesday average =
                                                {tuesdayAvg.toFixed(2)}
                                            </p>
                                        )}
                                        {thursdayGames > 0 && (
                                            <p>
                                                Thursday average =
                                                {thursdayAvg.toFixed(2)}
                                            </p>
                                        )}
                                        {saturdayGames > 0 && (
                                            <p>
                                                Saturday average =
                                                {saturdayAvg.toFixed(2)}
                                            </p>
                                        )}
                                    </div>
                                )}
                                {averageScore >= 0 && (
                                    <div>
                                        <p>
                                            Average score ={' '}
                                            {averageScore.toFixed(2)} / 5
                                        </p>
                                        <p>
                                            Average opponents score ={' '}
                                            {averageScoreAgainst.toFixed(2)} / 5
                                        </p>
                                        {homeAverageScore >= 0 && (
                                            <div>
                                                <p>
                                                    Average home score ={' '}
                                                    {homeAverageScore.toFixed(
                                                        2
                                                    )}{' '}
                                                    / 5
                                                </p>
                                                <p>
                                                    Average home opponents score
                                                    ={' '}
                                                    {homeAverageScoreAgainst.toFixed(
                                                        2
                                                    )}{' '}
                                                    / 5
                                                </p>
                                            </div>
                                        )}
                                        {awayAverageScore >= 0 && (
                                            <div>
                                                <p>
                                                    Average away score ={' '}
                                                    {awayAverageScore.toFixed(
                                                        2
                                                    )}{' '}
                                                    / 5
                                                </p>
                                                <p>
                                                    Average away opponents score
                                                    ={' '}
                                                    {awayAverageScoreAgainst.toFixed(
                                                        2
                                                    )}{' '}
                                                    / 5
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                <h5>Aggregates</h5>
                                <p>
                                    <b>Points</b>
                                </p>
                                <p>
                                    Total aggregate scored = {totalAgg} /{' '}
                                    {gamesPlayed * 21}
                                </p>
                                <p>
                                    Total aggregate conceded = {totalAggAgainst}{' '}
                                    / {gamesPlayed * 21}
                                </p>
                                <p>
                                    Total home aggregate scored = {totalHomeAgg}{' '}
                                    / {homeGamesPlayed * 21}
                                </p>
                                <p>
                                    Total home aggregate conceded ={' '}
                                    {totalHomeAggAgainst} /{' '}
                                    {homeGamesPlayed * 21}
                                </p>
                                <p>
                                    Total away aggregate scored = {totalAwayAgg}{' '}
                                    / {awayGamesPlayed * 21}
                                </p>
                                <p>
                                    Total away aggregate conceded ={' '}
                                    {totalAwayAggAgainst} /{' '}
                                    {awayGamesPlayed * 21}
                                </p>
                                {pairsGames > 0 && (
                                    <p>
                                        Total pairs aggregate scored ={' '}
                                        {totalPairsAgg} / {pairsGames * 21}
                                    </p>
                                )}
                                {pairsGames > 0 && (
                                    <p>
                                        Total pairs aggregate conceded =
                                        {totalPairsAggAgainst} /
                                        {pairsGames * 21}
                                    </p>
                                )}

                                <p>
                                    <b>Team Points</b>
                                </p>
                                <p>
                                    Total points scored = {totalScore} /{' '}
                                    {gamesPlayed * 5}
                                </p>
                                <p>
                                    Total points conceded = {totalScoreAgainst}{' '}
                                    / {gamesPlayed * 5}
                                </p>
                                <p>
                                    Total home points scored = {totalHomeScore}{' '}
                                    / {homeGamesPlayed * 5}
                                </p>
                                <p>
                                    Total home points conceded ={' '}
                                    {totalHomeScoreAgainst} /{' '}
                                    {homeGamesPlayed * 5}
                                </p>
                                <p>
                                    Total away points scored = {totalAwayScore}/{' '}
                                    {awayGamesPlayed * 5}
                                </p>
                                <p>
                                    Total away points conceded ={' '}
                                    {totalAwayScoreAgainst} /{' '}
                                    {awayGamesPlayed * 5}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </ListGroup.Item>
        </div>
    );
}

export default Players;
