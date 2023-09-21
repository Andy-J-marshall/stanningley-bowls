import { Accordion } from 'react-bootstrap';
import { capitalizeText } from '../helpers/utils';

function PlayerStatsWinsLosses(props) {
    const stats = props.stats;
    const showStatSummary = props.showStatSummary;

    if (stats) {
        const {
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
            pairHomeGamesPlayed,
            pairAwayGamesPlayed,
            pairCupGamesPlayed,
            cupGamesPlayed,
            pairsGames,
            singlesGames,
            mondayWins,
            mondayLosses,
            mondayGames,
            tuesdayVetsWins,
            tuesdayVetsLosses,
            tuesdayVetsGames,
            tuesdayEveningWins,
            tuesdayEveningLosses,
            tuesdayEveningGames,
            wednesdayWins,
            wednesdayLosses,
            wednesdayGames,
            thursdayWins,
            thursdayLosses,
            thursdayGames,
            saturdayWins,
            saturdayLosses,
            saturdayGames,
            pairsPartnersCount,
            pairsPartnersCountWins,
            pairsPartnersCountLosses,
        } = stats;

        return (
            <div id="player-stats-wins-losses">
                <Accordion.Item eventKey="2">
                    <Accordion.Header id="stats-wl">
                        WINS & LOSSES
                    </Accordion.Header>
                    <Accordion.Body>
                        {totalWins > 0 && (
                            <div>
                                <h3>WINS</h3>
                                <p>
                                    {totalWins} total ({homeWins} home,{' '}
                                    {awayWins} away, {cupWins} cup)
                                </p>
                                {pairsGames > 0 && singlesGames > 0 && (
                                    <div>
                                        <p>
                                            {totalWins - pairWins} singles (
                                            {homeWins - pairHomeWins} home,{' '}
                                            {awayWins - pairAwayWins} away,{' '}
                                            {cupWins - pairCupWins} cup)
                                        </p>
                                        <p>
                                            {pairWins} pairs ({pairHomeWins}{' '}
                                            home, {pairAwayWins} away,{' '}
                                            {pairCupWins} cup)
                                        </p>
                                    </div>
                                )}
                                {!showStatSummary && (
                                    <div>
                                        <h5>TEAMS</h5>
                                        {mondayGames > 0 && (
                                            <p>{mondayWins} on Monday</p>
                                        )}
                                        {tuesdayVetsGames > 0 && (
                                            <p>
                                                {tuesdayVetsWins} on Tuesday
                                                (Vets)
                                            </p>
                                        )}
                                        {tuesdayEveningGames > 0 && (
                                            <p>
                                                {tuesdayEveningWins} on Tuesday
                                                (Evening)
                                            </p>
                                        )}
                                        {wednesdayGames > 0 && (
                                            <p>{wednesdayWins} on Wednesday</p>
                                        )}
                                        {thursdayGames > 0 && (
                                            <p>
                                                {thursdayWins} on Thursday
                                                (Vets)
                                            </p>
                                        )}
                                        {saturdayGames > 0 && (
                                            <p>{saturdayWins} on Saturday</p>
                                        )}
                                    </div>
                                )}
                                <h3>WIN PERCENTAGES</h3>
                                <p>
                                    Total ={' '}
                                    {((totalWins / gamesPlayed) * 100).toFixed(
                                        0
                                    )}
                                    %
                                </p>
                                {homeGamesPlayed > 0 && (
                                    <p>
                                        Home ={' '}
                                        {(
                                            (homeWins / homeGamesPlayed) *
                                            100
                                        ).toFixed(0)}
                                        %
                                    </p>
                                )}
                                {awayGamesPlayed > 0 && (
                                    <p>
                                        Away ={' '}
                                        {(
                                            (awayWins / awayGamesPlayed) *
                                            100
                                        ).toFixed(0)}
                                        %
                                    </p>
                                )}
                                {cupGamesPlayed > 0 && (
                                    <p>
                                        Cup ={' '}
                                        {(
                                            (cupWins / cupGamesPlayed) *
                                            100
                                        ).toFixed(0)}
                                        %
                                    </p>
                                )}
                                {pairsGames > 0 && singlesGames > 0 && (
                                    <div>
                                        <div>
                                            <h5>SINGLES</h5>
                                            <p>
                                                Total ={' '}
                                                {(
                                                    ((totalWins - pairWins) /
                                                        singlesGames) *
                                                    100
                                                ).toFixed(0)}
                                                %
                                            </p>
                                            {homeGamesPlayed -
                                                pairHomeGamesPlayed >
                                                0 && (
                                                <p>
                                                    Home ={' '}
                                                    {(
                                                        ((homeWins -
                                                            pairHomeWins) /
                                                            (homeGamesPlayed -
                                                                pairHomeGamesPlayed)) *
                                                        100
                                                    ).toFixed(0)}
                                                    %
                                                </p>
                                            )}
                                            {awayGamesPlayed -
                                                pairAwayGamesPlayed >
                                                0 && (
                                                <p>
                                                    Away ={' '}
                                                    {(
                                                        ((awayWins -
                                                            pairAwayWins) /
                                                            (awayGamesPlayed -
                                                                pairAwayGamesPlayed)) *
                                                        100
                                                    ).toFixed(0)}
                                                    %
                                                </p>
                                            )}
                                            {cupGamesPlayed -
                                                pairCupGamesPlayed >
                                                0 && (
                                                <p>
                                                    Cup ={' '}
                                                    {(
                                                        ((cupWins -
                                                            pairCupWins) /
                                                            (cupGamesPlayed -
                                                                pairCupGamesPlayed)) *
                                                        100
                                                    ).toFixed(0)}
                                                    %
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <h5>PAIRS</h5>
                                            <p>
                                                Total ={' '}
                                                {(
                                                    (pairWins / pairsGames) *
                                                    100
                                                ).toFixed(0)}
                                                %
                                            </p>
                                            {pairHomeGamesPlayed > 0 && (
                                                <p>
                                                    Home ={' '}
                                                    {(
                                                        (pairHomeWins /
                                                            pairHomeGamesPlayed) *
                                                        100
                                                    ).toFixed(0)}
                                                    %
                                                </p>
                                            )}
                                            {pairAwayGamesPlayed > 0 && (
                                                <p>
                                                    Away ={' '}
                                                    {(
                                                        (pairAwayWins /
                                                            pairAwayGamesPlayed) *
                                                        100
                                                    ).toFixed(0)}
                                                    %
                                                </p>
                                            )}
                                            {pairCupGamesPlayed > 0 && (
                                                <p>
                                                    Cup ={' '}
                                                    {(
                                                        (pairCupWins /
                                                            pairCupGamesPlayed) *
                                                        100
                                                    ).toFixed(0)}
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
                                    {totalLosses} total ({homeLosses} home,{' '}
                                    {awayLosses} away, {cupLosses} cup)
                                </p>
                                {pairsGames > 0 && singlesGames > 0 && (
                                    <div>
                                        <p>
                                            {totalLosses - pairLosses} singles (
                                            {homeLosses - pairHomeLosses} home,{' '}
                                            {awayLosses - pairAwayLosses} away,{' '}
                                            {cupLosses - pairCupLosses} cup)
                                        </p>
                                        <p>
                                            {pairLosses} pairs ({pairHomeLosses}{' '}
                                            home, {pairAwayLosses} away,{' '}
                                            {pairCupLosses} cup)
                                        </p>
                                    </div>
                                )}
                                {!showStatSummary && (
                                    <div>
                                        <h5>TEAMS</h5>
                                        {mondayGames > 0 && (
                                            <p>{mondayLosses} on Monday</p>
                                        )}
                                        {tuesdayVetsGames > 0 && (
                                            <p>
                                                {tuesdayVetsLosses} on Tuesday
                                                (Vets)
                                            </p>
                                        )}
                                        {tuesdayEveningGames > 0 && (
                                            <p>
                                                {tuesdayEveningLosses} on
                                                Tuesday (Evening)
                                            </p>
                                        )}
                                        {wednesdayGames > 0 && (
                                            <p>
                                                {wednesdayLosses} on Wednesday
                                            </p>
                                        )}
                                        {thursdayGames > 0 && (
                                            <p>
                                                {thursdayLosses} on Thursday
                                                (Vets)
                                            </p>
                                        )}
                                        {saturdayGames > 0 && (
                                            <p>{saturdayLosses} on Saturday</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                        {pairsGames > 0 && (
                            <div>
                                {Object.keys(pairsPartnersCount).length > 0 && (
                                    <div>
                                        <h3>PAIRS PARTNERS</h3>
                                        {Object.keys(pairsPartnersCount).map(
                                            (partner, key) => {
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
                                            }
                                        )}
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
                                                    {capitalizeText([partner])}
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
                                                    {capitalizeText([partner])}
                                                </p>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        )}
                    </Accordion.Body>
                </Accordion.Item>
            </div>
        );
    }
}

export default PlayerStatsWinsLosses;
