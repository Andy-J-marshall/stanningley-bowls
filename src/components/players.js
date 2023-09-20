import { useEffect, useState } from 'react';
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

    const [loaded, setLoaded] = useState(false);

    const stats = returnPlayerStats(playersStats, player);

    useEffect(() => {
        if (!loaded) {
            window.scrollTo(0, 0);
        }
        setLoaded(true);
    });

    // TODO try and split this up into more components?

    if (stats) {
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
            awayLosses,
            homeLosses,
            pairLosses,
            cupLosses,
            totalLosses,
            pairHomeLosses,
            pairAwayLosses,
            pairCupLosses,
            homeWins,
            awayWins,
            cupWins,
            pairWins,
            totalWins,
            pairHomeWins,
            pairAwayWins,
            pairCupWins,
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
            average,
            homeAverage,
            awayAverage,
            cupAverage,
            singlesAvg,
            pairsAvg,
            singlesHomeAverage,
            singlesAwayAverage,
            singlesCupAverage,
            pairsHomeAverage,
            pairsAwayAverage,
            pairsCupAverage,
            averagePoints,
            averagePointsAgainst,
            homeAveragePoints,
            homeAveragePointsAgainst,
            awayAveragePoints,
            awayAveragePointsAgainst,
            mondayWins,
            mondayLosses,
            mondayGames,
            mondayAvg,
            tuesdayVetsWins,
            tuesdayVetsLosses,
            tuesdayVetsGames,
            tuesdayVetsAvg,
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
            beatenByList,
            beatenOpponentsList,
            allTeamsPlayedFor,
            pairsPartnersCount,
            pairsPartnersCountWins,
            pairsPartnersCountLosses,
            biggestWin,
            results,
        } = stats;

        return (
            <div id="detailed-player-stats">
                <ListGroup.Item>
                    <h2 id="playerNameTitle">{capitalizeText([name])}</h2>
                    {gamesPlayed === 0 && (
                        <div>
                            {!showStatSummary && (
                                <p>
                                    No games played for {config.teamNames.short}
                                </p>
                            )}
                            {showStatSummary && <p>No games played</p>}
                        </div>
                    )}
                    {gamesPlayed > 0 && (
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header id="stats-summary">
                                    OVERVIEW
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
                                                    {arrayToList(
                                                        allTeamsPlayedFor
                                                    )}
                                                </p>
                                            </div>
                                        )}
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
                                        {gamesPlayed} total ({singlesGames}{' '}
                                        singles, {pairsGames} pairs)
                                    </p>
                                    {homeGamesPlayed > 0 && (
                                        <p>
                                            {homeGamesPlayed} home{' '}
                                            {homeGamesPlayed === 1
                                                ? 'game'
                                                : 'games'}
                                        </p>
                                    )}
                                    {awayGamesPlayed > 0 && (
                                        <p>
                                            {awayGamesPlayed} away{' '}
                                            {awayGamesPlayed === 1
                                                ? 'game'
                                                : 'games'}
                                        </p>
                                    )}
                                    {cupGamesPlayed > 0 && (
                                        <p>
                                            {cupGamesPlayed} cup{' '}
                                            {cupGamesPlayed === 1
                                                ? 'game'
                                                : 'games'}
                                        </p>
                                    )}
                                    {!showStatSummary && (
                                        <div>
                                            <h3>TEAMS</h3>
                                            {daysPlayedCount.map((day, key) => {
                                                return (
                                                    <p key={key}>
                                                        {day.gamesPlayed} for{' '}
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
                                                {totalWins} total ({homeWins}{' '}
                                                home, {awayWins} away, {cupWins}{' '}
                                                cup)
                                            </p>
                                            {pairsGames > 0 &&
                                                singlesGames > 0 && (
                                                    <div>
                                                        <p>
                                                            {totalWins -
                                                                pairWins}{' '}
                                                            singles (
                                                            {homeWins -
                                                                pairHomeWins}{' '}
                                                            home,{' '}
                                                            {awayWins -
                                                                pairAwayWins}{' '}
                                                            away,{' '}
                                                            {cupWins -
                                                                pairCupWins}{' '}
                                                            cup)
                                                        </p>
                                                        <p>
                                                            {pairWins} pairs (
                                                            {pairHomeWins} home,{' '}
                                                            {pairAwayWins} away,{' '}
                                                            {pairCupWins} cup)
                                                        </p>
                                                    </div>
                                                )}
                                            {!showStatSummary && (
                                                <div>
                                                    {mondayGames > 0 && (
                                                        <p>
                                                            {mondayWins} on
                                                            Monday
                                                        </p>
                                                    )}
                                                    {tuesdayVetsGames > 0 && (
                                                        <p>
                                                            {tuesdayVetsWins} on
                                                            Tuesday (Vets)
                                                        </p>
                                                    )}
                                                    {tuesdayEveningGames >
                                                        0 && (
                                                        <p>
                                                            {tuesdayEveningWins}{' '}
                                                            on Tuesday (Evening)
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
                                                            Thursday (Vets)
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
                                                Total ={' '}
                                                {(
                                                    (totalWins / gamesPlayed) *
                                                    100
                                                ).toFixed(0)}
                                                %
                                            </p>
                                            {homeGamesPlayed > 0 && (
                                                <p>
                                                    Home ={' '}
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
                                                    Away ={' '}
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
                                                    Cup ={' '}
                                                    {(
                                                        (cupWins /
                                                            cupGamesPlayed) *
                                                        100
                                                    ).toFixed(0)}
                                                    %
                                                </p>
                                            )}
                                            {/* TODO need to handle 2022 stats (NANs) */}
                                            {pairsGames > 0 &&
                                                singlesGames > 0 && (
                                                    <div>
                                                        <div>
                                                            <h4>SINGLES</h4>
                                                            <p>
                                                                Total ={' '}
                                                                {(
                                                                    ((totalWins -
                                                                        pairWins) /
                                                                        singlesGames) *
                                                                    100
                                                                ).toFixed(0)}
                                                                %
                                                            </p>
                                                            {homeGamesPlayed -
                                                                pairHomeGamesPlayed >
                                                                0 && (
                                                                <p>
                                                                    Home
                                                                    ={' '}
                                                                    {(
                                                                        ((homeWins -
                                                                            pairHomeWins) /
                                                                            (homeGamesPlayed -
                                                                                pairHomeGamesPlayed)) *
                                                                        100
                                                                    ).toFixed(
                                                                        0
                                                                    )}
                                                                    %
                                                                </p>
                                                            )}
                                                            {awayGamesPlayed -
                                                                pairAwayGamesPlayed >
                                                                0 && (
                                                                <p>
                                                                    Away
                                                                    ={' '}
                                                                    {(
                                                                        ((awayWins -
                                                                            pairAwayWins) /
                                                                            (awayGamesPlayed -
                                                                                pairAwayGamesPlayed)) *
                                                                        100
                                                                    ).toFixed(
                                                                        0
                                                                    )}
                                                                    %
                                                                </p>
                                                            )}
                                                            {cupGamesPlayed -
                                                                pairCupGamesPlayed >
                                                                0 && (
                                                                <p>
                                                                    Cup
                                                                    ={' '}
                                                                    {(
                                                                        ((cupWins -
                                                                            pairCupWins) /
                                                                            (cupGamesPlayed -
                                                                                pairCupGamesPlayed)) *
                                                                        100
                                                                    ).toFixed(
                                                                        0
                                                                    )}
                                                                    %
                                                                </p>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <h4>PAIRS</h4>
                                                            <p>
                                                                Total ={' '}
                                                                {(
                                                                    (pairWins /
                                                                        pairsGames) *
                                                                    100
                                                                ).toFixed(0)}
                                                                %
                                                            </p>
                                                            {pairHomeGamesPlayed >
                                                                0 && (
                                                                <p>
                                                                    Home ={' '}
                                                                    {(
                                                                        (pairHomeWins /
                                                                            pairHomeGamesPlayed) *
                                                                        100
                                                                    ).toFixed(
                                                                        0
                                                                    )}
                                                                    %
                                                                </p>
                                                            )}
                                                            {pairAwayGamesPlayed >
                                                                0 && (
                                                                <p>
                                                                    Away ={' '}
                                                                    {(
                                                                        (pairAwayWins /
                                                                            pairAwayGamesPlayed) *
                                                                        100
                                                                    ).toFixed(
                                                                        0
                                                                    )}
                                                                    %
                                                                </p>
                                                            )}
                                                            {pairCupGamesPlayed >
                                                                0 && (
                                                                <p>
                                                                    Cup ={' '}
                                                                    {(
                                                                        (pairCupWins /
                                                                            pairCupGamesPlayed) *
                                                                        100
                                                                    ).toFixed(
                                                                        0
                                                                    )}
                                                                    %
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                        </div>
                                    )}
                                    {totalLosses > 0 && (
                                        <div>
                                            <h3>LOSSES</h3>
                                            <p>
                                                {totalLosses} total (home,{' '}
                                                {awayLosses} away, {cupLosses}{' '}
                                                cup)
                                            </p>
                                            {pairsGames > 0 &&
                                                singlesGames > 0 && (
                                                    <div>
                                                        <p>
                                                            {totalLosses -
                                                                pairLosses}{' '}
                                                            singles (
                                                            {homeLosses -
                                                                pairHomeLosses}{' '}
                                                            home,{' '}
                                                            {awayLosses -
                                                                pairAwayLosses}{' '}
                                                            away,{' '}
                                                            {cupLosses -
                                                                pairCupLosses}{' '}
                                                            cup)
                                                        </p>
                                                        <p>
                                                            {pairLosses} pairs (
                                                            {pairHomeLosses}{' '}
                                                            home,{' '}
                                                            {pairAwayLosses}{' '}
                                                            away,{' '}
                                                            {pairCupLosses} cup)
                                                        </p>
                                                    </div>
                                                )}
                                            {!showStatSummary && (
                                                <div>
                                                    {mondayGames > 0 && (
                                                        <p>
                                                            {mondayLosses} on
                                                            Monday
                                                        </p>
                                                    )}
                                                    {tuesdayVetsGames > 0 && (
                                                        <p>
                                                            {tuesdayVetsLosses}{' '}
                                                            on Tuesday (Vets)
                                                        </p>
                                                    )}
                                                    {tuesdayEveningGames >
                                                        0 && (
                                                        <p>
                                                            {
                                                                tuesdayEveningLosses
                                                            }{' '}
                                                            on Tuesday (Evening)
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
                                                            Thursday (Vets)
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
                                            {Object.keys(pairsPartnersCount)
                                                .length > 0 && (
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
                                                                    ]
                                                                        .timesPaired
                                                                }{' '}
                                                                played with{' '}
                                                                {capitalizeText(
                                                                    [partner]
                                                                )}
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
                                                                    ]
                                                                        .timesPaired
                                                                }{' '}
                                                                won with{' '}
                                                                {capitalizeText(
                                                                    [partner]
                                                                )}
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
                                                                    ]
                                                                        .timesPaired
                                                                }{' '}
                                                                lost with{' '}
                                                                {capitalizeText(
                                                                    [partner]
                                                                )}
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
                                            <h3>AVERAGES</h3>
                                            <p>
                                                Overall = {average.toFixed(2)}
                                            </p>
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
                                            {!showStatSummary && (
                                                <div>
                                                    <h3>TEAMS</h3>
                                                    {mondayGames > 0 && (
                                                        <p>
                                                            Monday ={' '}
                                                            {mondayAvg.toFixed(
                                                                2
                                                            )}
                                                        </p>
                                                    )}
                                                    {tuesdayVetsGames > 0 && (
                                                        <p>
                                                            Tuesday (Vets) ={' '}
                                                            {tuesdayVetsAvg.toFixed(
                                                                2
                                                            )}
                                                        </p>
                                                    )}
                                                    {tuesdayEveningGames >
                                                        0 && (
                                                        <p>
                                                            Tuesday (Evening) ={' '}
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
                                                            Thursday (Vets) ={' '}
                                                            {thursdayAvg.toFixed(
                                                                2
                                                            )}
                                                        </p>
                                                    )}
                                                    {saturdayGames > 0 && (
                                                        <p>
                                                            Saturday ={' '}
                                                            {saturdayAvg.toFixed(
                                                                2
                                                            )}
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                            {pairsGames > 0 &&
                                                singlesGames > 0 && (
                                                    <div>
                                                        <h3>SINGLES</h3>
                                                        {singlesAvg > -22 && (
                                                            <p>
                                                                Total ={' '}
                                                                {singlesAvg.toFixed(
                                                                    2
                                                                )}
                                                            </p>
                                                        )}
                                                        {singlesHomeAverage >
                                                            -22 && (
                                                            <p>
                                                                Home ={' '}
                                                                {singlesHomeAverage.toFixed(
                                                                    2
                                                                )}
                                                            </p>
                                                        )}
                                                        {singlesAwayAverage >
                                                            -22 && (
                                                            <p>
                                                                Away ={' '}
                                                                {singlesAwayAverage.toFixed(
                                                                    2
                                                                )}
                                                            </p>
                                                        )}
                                                        {singlesCupAverage >
                                                            -22 && (
                                                            <p>
                                                                Cup ={' '}
                                                                {singlesCupAverage.toFixed(
                                                                    2
                                                                )}
                                                            </p>
                                                        )}
                                                        <h3>PAIRS</h3>
                                                        {pairsAvg > -22 && (
                                                            <p>
                                                                Total ={' '}
                                                                {pairsAvg.toFixed(
                                                                    2
                                                                )}
                                                            </p>
                                                        )}
                                                        {pairsHomeAverage >
                                                            -22 && (
                                                            <p>
                                                                Home ={' '}
                                                                {pairsHomeAverage.toFixed(
                                                                    2
                                                                )}
                                                            </p>
                                                        )}
                                                        {pairsAwayAverage >
                                                            -22 && (
                                                            <p>
                                                                Away ={' '}
                                                                {pairsAwayAverage.toFixed(
                                                                    2
                                                                )}
                                                            </p>
                                                        )}
                                                        {pairsCupAverage >
                                                            -22 && (
                                                            <p>
                                                                Cup ={' '}
                                                                {pairsCupAverage.toFixed(
                                                                    2
                                                                )}
                                                            </p>
                                                        )}
                                                    </div>
                                                )}
                                        </div>
                                    )}
                                </Accordion.Body>
                            </Accordion.Item>
                            {!showStatSummary && (
                                <Accordion.Item eventKey="4">
                                    <Accordion.Header id="stats-points">
                                        POINTS
                                    </Accordion.Header>
                                    <Accordion.Body>
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

                                            {gamesPlayed > 0 &&
                                                pairsGames > 0 && (
                                                    <div>
                                                        <h4>SINGLES</h4>
                                                        <p>
                                                            Points
                                                            scored ={' '}
                                                            {totalSinglesPoints}{' '}
                                                            /{' '}
                                                            {(singlesGames -
                                                                singlesCupGamesPlayed) *
                                                                5}
                                                        </p>
                                                        <p>
                                                            Points
                                                            conceded ={' '}
                                                            {
                                                                totalSinglesPointsAgainst
                                                            }{' '}
                                                            /{' '}
                                                            {(singlesGames -
                                                                singlesCupGamesPlayed) *
                                                                5}
                                                        </p>
                                                        <p>
                                                            Average
                                                            points scored={' '}
                                                            {singlesAveragePoints.toFixed(
                                                                2
                                                            )}{' '}
                                                            / 5
                                                        </p>
                                                        <p>
                                                            Average
                                                            points conceded ={' '}
                                                            {singlesAveragePointsAgainst.toFixed(
                                                                2
                                                            )}{' '}
                                                            / 5
                                                        </p>
                                                        <h4>PAIRS</h4>
                                                        <p>
                                                            Points scored
                                                            = {totalPairsPoints}{' '}
                                                            /{' '}
                                                            {(pairsGames -
                                                                pairCupGamesPlayed) *
                                                                5}
                                                        </p>
                                                        <p>
                                                            Points
                                                            conceded ={' '}
                                                            {
                                                                totalPairsPointsAgainst
                                                            }{' '}
                                                            /{' '}
                                                            {(pairsGames -
                                                                pairCupGamesPlayed) *
                                                                5}
                                                        </p>
                                                        <p>
                                                            Average points
                                                            scored={' '}
                                                            {pairsAveragePoints.toFixed(
                                                                2
                                                            )}{' '}
                                                            / 5
                                                        </p>
                                                        <p>
                                                            Average points
                                                            conceded ={' '}
                                                            {pairsAveragePointsAgainst.toFixed(
                                                                2
                                                            )}{' '}
                                                            / 5
                                                        </p>
                                                    </div>
                                                )}

                                            {homeGamesPlayed > 0 && (
                                                <div>
                                                    <h3>HOME</h3>
                                                    <div>
                                                        <p>
                                                            Home points scored ={' '}
                                                            {totalHomePoints} /{' '}
                                                            {homeGamesPlayed *
                                                                5}
                                                        </p>
                                                        <p>
                                                            Home points conceded
                                                            ={' '}
                                                            {
                                                                totalHomePointsAgainst
                                                            }{' '}
                                                            /{' '}
                                                            {homeGamesPlayed *
                                                                5}
                                                        </p>
                                                        <p>
                                                            Average home points
                                                            ={' '}
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
                                                    {singlesGames > 0 &&
                                                        pairsGames > 0 && (
                                                            <div>
                                                                <h4>SINGLES</h4>
                                                                <p>
                                                                    Home
                                                                    points
                                                                    scored={' '}
                                                                    {
                                                                        totalSinglesHomePoints
                                                                    }{' '}
                                                                </p>
                                                                <p>
                                                                    Home
                                                                    points
                                                                    conceded ={' '}
                                                                    {
                                                                        totalSinglesHomePointsAgainst
                                                                    }{' '}
                                                                </p>
                                                                <p>
                                                                    Average home
                                                                    points
                                                                    scored ={' '}
                                                                    {singlesHomeAveragePoints.toFixed(
                                                                        2
                                                                    )}{' '}
                                                                    / 5
                                                                </p>
                                                                <p>
                                                                    Average home
                                                                    points
                                                                    conceded ={' '}
                                                                    {singlesHomeAveragePointsAgainst.toFixed(
                                                                        2
                                                                    )}{' '}
                                                                    / 5
                                                                </p>
                                                                <h4>PAIRS</h4>
                                                                <p>
                                                                    Home
                                                                    points
                                                                    scored={' '}
                                                                    {
                                                                        totalPairsHomePoints
                                                                    }{' '}
                                                                </p>
                                                                <p>
                                                                    Home
                                                                    points
                                                                    conceded ={' '}
                                                                    {
                                                                        totalPairsHomePointsAgainst
                                                                    }{' '}
                                                                </p>
                                                                <p>
                                                                    Average
                                                                    home
                                                                    points
                                                                    scored ={' '}
                                                                    {pairsHomeAveragePoints.toFixed(
                                                                        2
                                                                    )}{' '}
                                                                    / 5
                                                                </p>
                                                                <p>
                                                                    Average
                                                                    home
                                                                    points
                                                                    conceded ={' '}
                                                                    {pairsHomeAveragePointsAgainst.toFixed(
                                                                        2
                                                                    )}{' '}
                                                                    / 5
                                                                </p>
                                                            </div>
                                                        )}
                                                </div>
                                            )}
                                            {awayGamesPlayed > 0 && (
                                                <div>
                                                    <h3>AWAY</h3>
                                                    <div>
                                                        <p>
                                                            Away points scored ={' '}
                                                            {totalAwayPoints} /{' '}
                                                            {awayGamesPlayed *
                                                                5}
                                                        </p>
                                                        <p>
                                                            Away points conceded
                                                            ={' '}
                                                            {
                                                                totalAwayPointsAgainst
                                                            }{' '}
                                                            /{' '}
                                                            {awayGamesPlayed *
                                                                5}
                                                        </p>
                                                        <p>
                                                            Average away points
                                                            ={' '}
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
                                                    {singlesGames > 0 &&
                                                        pairsGames > 0 && (
                                                            <div>
                                                                <h4>SINGLES</h4>
                                                                <p>
                                                                    Away
                                                                    points
                                                                    scored={' '}
                                                                    {
                                                                        totalSinglesAwayPoints
                                                                    }{' '}
                                                                </p>
                                                                <p>
                                                                    Away
                                                                    points
                                                                    conceded ={' '}
                                                                    {
                                                                        totalSinglesAwayPointsAgainst
                                                                    }{' '}
                                                                </p>
                                                                <p>
                                                                    Average
                                                                    Away
                                                                    points
                                                                    scored ={' '}
                                                                    {singlesAwayAveragePoints.toFixed(
                                                                        2
                                                                    )}{' '}
                                                                    / 5
                                                                </p>
                                                                <p>
                                                                    Average
                                                                    Away
                                                                    points
                                                                    conceded ={' '}
                                                                    {singlesAwayAveragePointsAgainst.toFixed(
                                                                        2
                                                                    )}{' '}
                                                                    / 5
                                                                </p>
                                                                <h4>PAIRS</h4>
                                                                <p>
                                                                    Away
                                                                    points
                                                                    scored={' '}
                                                                    {
                                                                        totalPairsAwayPoints
                                                                    }{' '}
                                                                </p>
                                                                <p>
                                                                    Pairs away
                                                                    points
                                                                    conceded ={' '}
                                                                    {
                                                                        totalPairsAwayPointsAgainst
                                                                    }{' '}
                                                                </p>
                                                                <p>
                                                                    Average
                                                                    away
                                                                    points
                                                                    scored ={' '}
                                                                    {pairsAwayAveragePoints.toFixed(
                                                                        2
                                                                    )}{' '}
                                                                    / 5
                                                                </p>
                                                                <p>
                                                                    Average
                                                                    Away
                                                                    points
                                                                    conceded ={' '}
                                                                    {pairsAwayAveragePointsAgainst.toFixed(
                                                                        2
                                                                    )}{' '}
                                                                    / 5
                                                                </p>
                                                            </div>
                                                        )}
                                                </div>
                                            )}
                                            <br />
                                            <p className="footnote">
                                                * {config.leagueRules}
                                            </p>
                                        </div>
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
                                    {homeGamesPlayed > 0 && (
                                        <div>
                                            <h3>HOME</h3>
                                            <p>
                                                Home aggregate scored ={' '}
                                                {totalHomeAgg} /{' '}
                                                {homeGamesPlayed * 21}
                                            </p>
                                            <p>
                                                Home aggregate conceded ={' '}
                                                {totalHomeAggAgainst} /{' '}
                                                {homeGamesPlayed * 21}
                                            </p>
                                        </div>
                                    )}
                                    {awayGamesPlayed > 0 && (
                                        <div>
                                            <h3>AWAY</h3>
                                            <p>
                                                Away aggregate scored ={' '}
                                                {totalAwayAgg} /{' '}
                                                {awayGamesPlayed * 21}
                                            </p>
                                            <p>
                                                Away aggregate conceded ={' '}
                                                {totalAwayAggAgainst} /{' '}
                                                {awayGamesPlayed * 21}
                                            </p>
                                        </div>
                                    )}
                                    {cupGamesPlayed > 0 && (
                                        <div>
                                            <h3>CUP</h3>
                                            <p>
                                                Cup aggregate scored = {cupAgg}{' '}
                                                / {cupGamesPlayed * 21}
                                            </p>
                                            <p>
                                                Cup aggregate conceded ={' '}
                                                {cupAggAgainst} /{' '}
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
                                                        Aggregate scored
                                                        = {singlesAgg} /{' '}
                                                        {singlesGames * 21}
                                                    </p>
                                                    <p>
                                                        Aggregate
                                                        conceded ={' '}
                                                        {singlesAggAgainst} /{' '}
                                                        {singlesGames * 21}
                                                    </p>
                                                    {singlesHomeGamesPlayed >
                                                        0 && (
                                                        <div>
                                                            <p>
                                                                Home aggregate scored
                                                                ={' '}
                                                                {
                                                                    totalSinglesHomeAgg
                                                                }{' '}
                                                                /{' '}
                                                                {singlesHomeGamesPlayed *
                                                                    21}
                                                            </p>
                                                            <p>
                                                                Home aggregate conceded ={' '}
                                                                {
                                                                    totalSinglesHomeAggAgainst
                                                                }{' '}
                                                                /{' '}
                                                                {singlesHomeGamesPlayed *
                                                                    21}
                                                            </p>
                                                        </div>
                                                    )}
                                                    {singlesAwayGamesPlayed >
                                                        0 && (
                                                        <div>
                                                            <p>
                                                                Away aggregate scored
                                                                ={' '}
                                                                {
                                                                    totalSinglesAwayAgg
                                                                }{' '}
                                                                /{' '}
                                                                {singlesAwayGamesPlayed *
                                                                    21}
                                                            </p>
                                                            <p>
                                                                Away aggregate
                                                                conceded ={' '}
                                                                {
                                                                    totalSinglesAwayAggAgainst
                                                                }{' '}
                                                                /{' '}
                                                                {singlesAwayGamesPlayed *
                                                                    21}
                                                            </p>
                                                        </div>
                                                    )}
                                                    {singlesCupGamesPlayed >
                                                        0 && (
                                                        <div>
                                                            <p>
                                                                Cup aggregate scored
                                                                ={' '}
                                                                {
                                                                    totalSinglesCupAgg
                                                                }{' '}
                                                                /{' '}
                                                                {singlesCupGamesPlayed *
                                                                    21}
                                                            </p>
                                                            <p>
                                                                Cup aggregate
                                                                conceded ={' '}
                                                                {
                                                                    totalSinglesCupAggAgainst
                                                                }{' '}
                                                                /{' '}
                                                                {singlesCupGamesPlayed *
                                                                    21}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                            {pairsGames > 0 && (
                                                <div>
                                                    <h3>PAIRS</h3>
                                                    <p>
                                                        Aggregate scored ={' '}
                                                        {totalPairsAgg} /{' '}
                                                        {pairsGames * 21}
                                                    </p>
                                                    <p>
                                                        Aggregate conceded
                                                        = {totalPairsAggAgainst}{' '}
                                                        / {pairsGames * 21}
                                                    </p>
                                                    {pairHomeGamesPlayed >
                                                        0 && (
                                                        <div>
                                                            <p>
                                                                Home aggregate scored
                                                                ={' '}
                                                                {
                                                                    totalPairsHomeAgg
                                                                }{' '}
                                                                /{' '}
                                                                {pairHomeGamesPlayed *
                                                                    21}
                                                            </p>
                                                            <p>
                                                                Home aggregate
                                                                conceded ={' '}
                                                                {
                                                                    totalPairsHomeAggAgainst
                                                                }{' '}
                                                                /{' '}
                                                                {pairHomeGamesPlayed *
                                                                    21}
                                                            </p>
                                                        </div>
                                                    )}
                                                    {pairAwayGamesPlayed >
                                                        0 && (
                                                        <div>
                                                            <p>
                                                                Away aggregate scored
                                                                ={' '}
                                                                {
                                                                    totalPairsAwayAgg
                                                                }{' '}
                                                                /{' '}
                                                                {pairAwayGamesPlayed *
                                                                    21}
                                                            </p>
                                                            <p>
                                                                Away aggregate
                                                                conceded ={' '}
                                                                {
                                                                    totalPairsAwayAggAgainst
                                                                }{' '}
                                                                /{' '}
                                                                {pairAwayGamesPlayed *
                                                                    21}
                                                            </p>
                                                        </div>
                                                    )}
                                                    {pairCupGamesPlayed > 0 && (
                                                        <div>
                                                            <p>
                                                                Cup aggregate scored
                                                                ={' '}
                                                                {
                                                                    totalPairsCupAgg
                                                                }{' '}
                                                                /{' '}
                                                                {pairCupGamesPlayed *
                                                                    21}
                                                            </p>
                                                            <p>
                                                                Cup aggregate
                                                                conceded ={' '}
                                                                {
                                                                    totalPairsCupAggAgainst
                                                                }{' '}
                                                                /{' '}
                                                                {pairCupGamesPlayed *
                                                                    21}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="6">
                                <Accordion.Header id="stats-opponents">
                                    OPPONENTS
                                </Accordion.Header>
                                <Accordion.Body>
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
    } else {
        return null;
    }
}

export default Players;
