import React from 'react';
import { ListGroup, Accordion } from 'react-bootstrap';
import PlayerResults from './playerResults';
import { capitalizeText, arrayToList } from '../helpers/utils';
import { returnPlayerStats } from '../helpers/playersHelper';
import config from '../config';

function Players(props) {
    const player = props.player;
    const playersStats = props.playersStats;
    const name = props.name;
    const showStatSummary = props.showStatSummary;
    const playedForOtherTeam = props.playedForOtherTeam;

    const {
        totalAgg,
        totalAggAgainst,
        totalPairsAgg,
        totalPairsAggAgainst,
        totalPoints,
        totalPointsAgainst,
        awayLosses,
        homeLosses,
        cupLosses,
        homeWins,
        awayWins,
        cupWins,
        pairLosses,
        pairWins,
        totalHomeAgg,
        totalHomeAggAgainst,
        totalAwayAgg,
        totalAwayAggAgainst,
        totalHomePoints,
        totalHomePointsAgainst,
        totalAwayPoints,
        totalAwayPointsAgainst,
        results,
        totalLosses,
        totalWins,
        biggestWin,
        gamesPlayed,
        homeGamesPlayed,
        awayGamesPlayed,
        average,
        homeAverage,
        awayAverage,
        cupAgg,
        cupAggAgainst,
        cupGamesPlayed,
        cupAverage,
        averagePoints,
        averagePointsAgainst,
        homeAveragePoints,
        homeAveragePointsAgainst,
        awayAveragePoints,
        awayAveragePointsAgainst,
        pairsGames,
        singlesGames,
        singlesAgg,
        singlesAggAgainst,
        singlesAvg,
        pairsAvg,
        beatenByList,
        beatenOpponentsList,
        beatenByTeamList,
        beatenTeamList,
        mondayWins,
        mondayLosses,
        mondayGames,
        mondayAvg,
        tuesdayWins,
        tuesdayLosses,
        tuesdayGames,
        tuesdayAvg,
        tuesdayEveningWins,
        tuesdayEveningLosses,
        tuesdayEveningGames,
        tuesdayEveningAvg,
        wednesdayWins,
        wednesdayLosses,
        wednesdayGames,
        wednesdayAvg,
        thursdayWins,
        thursdayLosses,
        thursdayGames,
        thursdayAvg,
        saturdayWins,
        saturdayLosses,
        saturdayGames,
        saturdayAvg,
        daysPlayedCount,
        allTeamsPlayedFor,
        pairsPartnersCount,
        pairsPartnersCountWins,
        pairsPartnersCountLosses,
    } = returnPlayerStats(playersStats, player);

    function showStatsAdvice() {
        return (
            <div id="stats-advice">
                {playedForOtherTeam && !showStatSummary && (
                    <p style={{ fontSize: '15px' }}>
                        (Select All Team Stats in the above drop down to view
                        stats whilst playing for non-Stanningley teams)
                    </p>
                )}
            </div>
        );
    }

    const gameOrGames = gamesPlayed === 1 ? 'game' : 'games';
    const winOrWins = totalWins === 1 ? 'win' : 'wins';
    const lossOrLosses = totalLosses === 1 ? 'loss' : 'losses';
    return (
        <div>
            <ListGroup.Item>
                <h2 id="playerNameTitle">{capitalizeText([name])}</h2>
                {gamesPlayed === 0 && (
                    <div>
                        {!showStatSummary && (
                            <p>No games played for {config.teamNames.short}.</p>
                        )}
                        {showStatSummary && <p>No games played.</p>}
                        {showStatsAdvice()}
                    </div>
                )}
                {gamesPlayed > 0 && (
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header id="stats-summary">
                                SUMMARY
                            </Accordion.Header>
                            <Accordion.Body>
                                <div>
                                    <h3>STATS</h3>
                                    <p id="totalGamesPlayed">
                                        Games played = {gamesPlayed}
                                    </p>
                                    <p id="totalWins">Wins = {totalWins}</p>
                                    <p id="totalLosses">
                                        Losses = {totalLosses}
                                    </p>
                                    {average > -22 && average < 22 && (
                                        <p id="totalAverage">
                                            Average = {average.toFixed(2)}
                                        </p>
                                    )}
                                    <p>
                                        {(
                                            (totalWins / gamesPlayed) *
                                            100
                                        ).toFixed(0)}
                                        % win percentage
                                    </p>
                                    {biggestWin && totalWins > 0 && (
                                        <p id="biggestWin">
                                            Biggest win ={' '}
                                            {capitalizeText([biggestWin])}
                                        </p>
                                    )}
                                    {allTeamsPlayedFor.length > 0 && (
                                        <div id="teamsPlayedFor">
                                            <h3
                                                style={{
                                                    paddingTop: '1rem',
                                                }}
                                            >
                                                TEAMS
                                            </h3>
                                            <p>
                                                {arrayToList(allTeamsPlayedFor)}
                                            </p>
                                        </div>
                                    )}
                                    {showStatsAdvice()}
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header id="stats-games">
                                GAMES PLAYED
                            </Accordion.Header>
                            <Accordion.Body>
                                <h3>TOTAL</h3>
                                <p>
                                    {gamesPlayed} total {gameOrGames} (
                                    {singlesGames} singles, {pairsGames} pairs)
                                </p>
                                <p>
                                    {homeGamesPlayed} home{' '}
                                    {homeGamesPlayed === 1 ? 'game' : 'games'}
                                </p>
                                <p>
                                    {awayGamesPlayed} away{' '}
                                    {awayGamesPlayed === 1 ? 'game' : 'games'}
                                </p>
                                <p>
                                    {cupGamesPlayed} cup{' '}
                                    {cupGamesPlayed === 1 ? 'game' : 'games'}
                                </p>
                                {!showStatSummary && (
                                    <div>
                                        <h3>TEAMS</h3>
                                        {daysPlayedCount.map((day, key) => {
                                            return (
                                                <p key={key}>
                                                    {day.gamesPlayed} on{' '}
                                                    {day.day}
                                                </p>
                                            );
                                        })}
                                    </div>
                                )}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header id="stats-wl">
                                WINS & LOSSES
                            </Accordion.Header>
                            <Accordion.Body>
                                {totalWins > 0 && (
                                    <div>
                                        <h3>WINS</h3>
                                        <p>
                                            {totalWins} total {winOrWins} (
                                            {homeWins} home, {awayWins} away,{' '}
                                            {cupWins} cup)
                                        </p>
                                        <p>
                                            {totalWins - pairWins} singles,{' '}
                                            {pairWins} pairs
                                        </p>
                                        {!showStatSummary && (
                                            <div>
                                                {mondayGames > 0 && (
                                                    <p>
                                                        {mondayWins} on Monday
                                                    </p>
                                                )}
                                                {tuesdayGames > 0 && (
                                                    <p>
                                                        {tuesdayWins} on Tuesday
                                                        afternoon
                                                    </p>
                                                )}
                                                {tuesdayEveningGames > 0 && (
                                                    <p>
                                                        {tuesdayEveningWins} on
                                                        Tuesday evening
                                                    </p>
                                                )}
                                                {wednesdayGames > 0 && (
                                                    <p>
                                                        {wednesdayWins} on
                                                        Wednesday
                                                    </p>
                                                )}
                                                {thursdayGames > 0 && (
                                                    <p>
                                                        {thursdayWins} on
                                                        Thursday
                                                    </p>
                                                )}
                                                {saturdayGames > 0 && (
                                                    <p>
                                                        {saturdayWins} on
                                                        Saturday
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                        <h3>WIN PERCENTAGES</h3>
                                        <p>
                                            Total win percentage ={' '}
                                            {(
                                                (totalWins / gamesPlayed) *
                                                100
                                            ).toFixed(0)}
                                            %
                                        </p>
                                        {homeGamesPlayed > 0 && (
                                            <p>
                                                Home win percentage ={' '}
                                                {(
                                                    (homeWins /
                                                        homeGamesPlayed) *
                                                    100
                                                ).toFixed(0)}
                                                %
                                            </p>
                                        )}
                                        {awayGamesPlayed > 0 && (
                                            <p>
                                                Away win percentage ={' '}
                                                {(
                                                    (awayWins /
                                                        awayGamesPlayed) *
                                                    100
                                                ).toFixed(0)}
                                                %
                                            </p>
                                        )}
                                        {cupGamesPlayed > 0 && (
                                            <p>
                                                Cup win percentage ={' '}
                                                {(
                                                    (cupWins / cupGamesPlayed) *
                                                    100
                                                ).toFixed(0)}
                                                %
                                            </p>
                                        )}
                                    </div>
                                )}
                                {totalLosses > 0 && (
                                    <div>
                                        <h3>LOSSES</h3>
                                        <p>
                                            {totalLosses} total {lossOrLosses} (
                                            {homeLosses} home, {awayLosses}{' '}
                                            away, {cupLosses} cup)
                                        </p>
                                        {pairLosses > 0 && (
                                            <div>
                                                <p>
                                                    {totalLosses - pairLosses}{' '}
                                                    singles, {pairLosses} pairs
                                                </p>
                                            </div>
                                        )}
                                        {!showStatSummary && (
                                            <div>
                                                {mondayGames > 0 && (
                                                    <p>
                                                        {mondayLosses} on Monday
                                                    </p>
                                                )}
                                                {tuesdayGames > 0 && (
                                                    <p>
                                                        {tuesdayLosses} on
                                                        Tuesday afternoon
                                                    </p>
                                                )}
                                                {tuesdayEveningGames > 0 && (
                                                    <p>
                                                        {tuesdayEveningLosses}{' '}
                                                        on Tuesday evening
                                                    </p>
                                                )}
                                                {wednesdayGames > 0 && (
                                                    <p>
                                                        {wednesdayLosses} on
                                                        Wednesday
                                                    </p>
                                                )}
                                                {thursdayGames > 0 && (
                                                    <p>
                                                        {thursdayLosses} on
                                                        Thursday
                                                    </p>
                                                )}
                                                {saturdayGames > 0 && (
                                                    <p>
                                                        {saturdayLosses} on
                                                        Saturday
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {pairsGames > 0 && (
                                    <div>
                                        {pairsPartnersCount.length > 0 && (
                                            <div>
                                                <h3>PAIRS PARTNERS</h3>
                                                {Object.keys(
                                                    pairsPartnersCount
                                                ).map((partner, key) => {
                                                    return (
                                                        <p key={key}>
                                                            {
                                                                pairsPartnersCount[
                                                                    partner
                                                                ].timesPaired
                                                            }{' '}
                                                            played with{' '}
                                                            {capitalizeText([
                                                                partner,
                                                            ])}
                                                        </p>
                                                    );
                                                })}
                                                {Object.keys(
                                                    pairsPartnersCountWins
                                                ).map((partner, key) => {
                                                    return (
                                                        <p key={key}>
                                                            {
                                                                pairsPartnersCountWins[
                                                                    partner
                                                                ].timesPaired
                                                            }{' '}
                                                            won with{' '}
                                                            {capitalizeText([
                                                                partner,
                                                            ])}
                                                        </p>
                                                    );
                                                })}
                                                {Object.keys(
                                                    pairsPartnersCountLosses
                                                ).map((partner, key) => {
                                                    return (
                                                        <p key={key}>
                                                            {
                                                                pairsPartnersCountLosses[
                                                                    partner
                                                                ].timesPaired
                                                            }{' '}
                                                            lost with{' '}
                                                            {capitalizeText([
                                                                partner,
                                                            ])}
                                                        </p>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header id="stats-average">
                                AVERAGES
                            </Accordion.Header>
                            <Accordion.Body>
                                {average >= -21 && average < 22 && (
                                    <div>
                                        <p>Overall = {average.toFixed(2)}</p>
                                        {homeAverage > -22 &&
                                            homeAverage < 22 && (
                                                <p>
                                                    Home ={' '}
                                                    {homeAverage.toFixed(2)}
                                                </p>
                                            )}
                                        {awayAverage > -22 &&
                                            awayAverage < 22 && (
                                                <p>
                                                    Away ={' '}
                                                    {awayAverage.toFixed(2)}
                                                </p>
                                            )}
                                        {cupAverage > -22 &&
                                            cupAverage < 22 && (
                                                <p>
                                                    Cup ={' '}
                                                    {cupAverage.toFixed(2)}
                                                </p>
                                            )}
                                        {pairsGames > 0 && (
                                            <div>
                                                {singlesAvg > -22 && (
                                                    <p>
                                                        Singles ={' '}
                                                        {singlesAvg.toFixed(2)}
                                                    </p>
                                                )}
                                                {pairsAvg > -22 && (
                                                    <p>
                                                        Pairs ={' '}
                                                        {pairsAvg.toFixed(2)}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                        {!showStatSummary && (
                                            <div>
                                                {mondayGames > 0 && (
                                                    <p>
                                                        Monday ={' '}
                                                        {mondayAvg.toFixed(2)}
                                                    </p>
                                                )}
                                                {tuesdayGames > 0 && (
                                                    <p>
                                                        Tuesday ={' '}
                                                        {tuesdayAvg.toFixed(2)}
                                                    </p>
                                                )}
                                                {tuesdayEveningGames > 0 && (
                                                    <p>
                                                        Tuesday Evening ={' '}
                                                        {tuesdayEveningAvg.toFixed(
                                                            2
                                                        )}
                                                    </p>
                                                )}
                                                {wednesdayGames > 0 && (
                                                    <p>
                                                        Wednesday ={' '}
                                                        {wednesdayAvg.toFixed(
                                                            2
                                                        )}
                                                    </p>
                                                )}
                                                {thursdayGames > 0 && (
                                                    <p>
                                                        Thursday ={' '}
                                                        {thursdayAvg.toFixed(2)}
                                                    </p>
                                                )}
                                                {saturdayGames > 0 && (
                                                    <p>
                                                        Saturday ={' '}
                                                        {saturdayAvg.toFixed(2)}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </Accordion.Body>
                        </Accordion.Item>
                        {!showStatSummary && totalPoints > 0 && (
                            <Accordion.Item eventKey="4">
                                <Accordion.Header id="stats-points">
                                    POINTS
                                </Accordion.Header>
                                <Accordion.Body>
                                    {averagePoints >= 0 && (
                                        <div>
                                            <h3>TOTAL</h3>
                                            <p>
                                                Points scored = {totalPoints} /{' '}
                                                {(gamesPlayed -
                                                    cupGamesPlayed) *
                                                    5}
                                            </p>
                                            <p>
                                                Points conceded ={' '}
                                                {totalPointsAgainst} /{' '}
                                                {(gamesPlayed -
                                                    cupGamesPlayed) *
                                                    5}
                                            </p>
                                            <p>
                                                Average points ={' '}
                                                {averagePoints.toFixed(2)} / 5
                                            </p>
                                            <p>
                                                Average points conceded ={' '}
                                                {averagePointsAgainst.toFixed(
                                                    2
                                                )}{' '}
                                                / 5
                                            </p>
                                            {homeAveragePoints >= 0 && (
                                                <div>
                                                    <h3>HOME</h3>
                                                    <p>
                                                        Home points scored ={' '}
                                                        {totalHomePoints} /{' '}
                                                        {homeGamesPlayed * 5}
                                                    </p>
                                                    <p>
                                                        Home points conceded ={' '}
                                                        {totalHomePointsAgainst}{' '}
                                                        / {homeGamesPlayed * 5}
                                                    </p>
                                                    <p>
                                                        Average home points ={' '}
                                                        {homeAveragePoints.toFixed(
                                                            2
                                                        )}{' '}
                                                        / 5
                                                    </p>
                                                    <p>
                                                        Average home points
                                                        conceded ={' '}
                                                        {homeAveragePointsAgainst.toFixed(
                                                            2
                                                        )}{' '}
                                                        / 5
                                                    </p>
                                                </div>
                                            )}
                                            {awayAveragePoints >= 0 && (
                                                <div>
                                                    <h3>AWAY</h3>
                                                    <p>
                                                        Away points scored ={' '}
                                                        {totalAwayPoints} /{' '}
                                                        {awayGamesPlayed * 5}
                                                    </p>
                                                    <p>
                                                        Away points conceded ={' '}
                                                        {totalAwayPointsAgainst}{' '}
                                                        / {awayGamesPlayed * 5}
                                                    </p>
                                                    <p>
                                                        Average away points ={' '}
                                                        {awayAveragePoints.toFixed(
                                                            2
                                                        )}{' '}
                                                        / 5
                                                    </p>
                                                    <p>
                                                        Average away points
                                                        conceded ={' '}
                                                        {awayAveragePointsAgainst.toFixed(
                                                            2
                                                        )}{' '}
                                                        / 5
                                                    </p>
                                                </div>
                                            )}
                                            <br />
                                            <p className="footnote">
                                                * {config.leagueRules}
                                            </p>
                                        </div>
                                    )}
                                </Accordion.Body>
                            </Accordion.Item>
                        )}
                        <Accordion.Item eventKey="5">
                            <Accordion.Header id="stats-aggregate">
                                AGGREGATES
                            </Accordion.Header>
                            <Accordion.Body>
                                <h3>TOTAL</h3>
                                <p>
                                    Aggregate scored = {totalAgg} /{' '}
                                    {gamesPlayed * 21}
                                </p>
                                <p>
                                    Aggregate conceded = {totalAggAgainst} /{' '}
                                    {gamesPlayed * 21}
                                </p>

                                <h3>HOME</h3>
                                <p>
                                    Home aggregate scored = {totalHomeAgg} /{' '}
                                    {homeGamesPlayed * 21}
                                </p>
                                <p>
                                    Home aggregate conceded ={' '}
                                    {totalHomeAggAgainst} /{' '}
                                    {homeGamesPlayed * 21}
                                </p>
                                <h3>AWAY</h3>
                                <p>
                                    Away aggregate scored = {totalAwayAgg} /{' '}
                                    {awayGamesPlayed * 21}
                                </p>
                                <p>
                                    Away aggregate conceded ={' '}
                                    {totalAwayAggAgainst} /{' '}
                                    {awayGamesPlayed * 21}
                                </p>
                                {cupGamesPlayed > 0 && (
                                    <div>
                                        <h3>CUP</h3>
                                        <p>
                                            Cup aggregate scored = {cupAgg} /{' '}
                                            {cupGamesPlayed * 21}
                                        </p>
                                        <p>
                                            Cup aggregate conceded ={' '}
                                            {cupAggAgainst} /{' '}
                                            {cupGamesPlayed * 21}
                                        </p>
                                    </div>
                                )}
                                {pairsGames > 0 && (
                                    <div>
                                        <h3>SINGLES</h3>
                                        <p>
                                            Singles aggregate scored ={' '}
                                            {singlesAgg} / {singlesGames * 21}
                                        </p>
                                        <p>
                                            Singles aggregate conceded ={' '}
                                            {singlesAggAgainst} /{' '}
                                            {singlesGames * 21}
                                        </p>
                                        <h3>PAIRS</h3>
                                        <p>
                                            Pairs aggregate scored ={' '}
                                            {totalPairsAgg} / {pairsGames * 21}
                                        </p>
                                        <p>
                                            Pairs aggregate conceded ={' '}
                                            {totalPairsAggAgainst} /{' '}
                                            {pairsGames * 21}
                                        </p>
                                    </div>
                                )}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="6">
                            <Accordion.Header id="stats-opponents">
                                OPPONENTS
                            </Accordion.Header>
                            <Accordion.Body>
                                {!showStatSummary && (
                                    <div>
                                        {beatenTeamList.length > 0 && (
                                            <div>
                                                <h3>TEAMS BEATEN</h3>
                                                <p>{beatenTeamList}</p>
                                            </div>
                                        )}
                                        {beatenByTeamList.length > 0 && (
                                            <div>
                                                <h3>TEAMS LOST TO</h3>
                                                <p>{beatenByTeamList}</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                                {beatenOpponentsList.length > 0 && (
                                    <div>
                                        <h3>PLAYERS BEATEN</h3>
                                        <p>{beatenOpponentsList}</p>
                                    </div>
                                )}
                                {beatenByList.length > 0 && (
                                    <div>
                                        <h3>PLAYERS LOST TO</h3>
                                        <p>{beatenByList}</p>
                                    </div>
                                )}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="7">
                            <Accordion.Header id="stats-results">
                                RESULTS
                            </Accordion.Header>
                            <Accordion.Body>
                                {results.length > 0 && (
                                    <PlayerResults results={results} />
                                )}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                )}
            </ListGroup.Item>
            <br />
        </div>
    );
}

export default Players;
