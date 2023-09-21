import { useState } from 'react';
import { ToggleButton, Accordion, Button, ButtonGroup } from 'react-bootstrap';
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
            singlesGames,
            pairsGames,
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

        const [allChecked, setAllChecked] = useState(true);
        const [singlesChecked, setSinglesChecked] = useState(false);
        const [pairsChecked, setPairsChecked] = useState(false);

        const [displayTotalWins, setDisplayTotalWins] = useState(totalWins);
        const [displayHomeWins, setDisplayHomeWins] = useState(homeWins);
        const [displayAwayWins, setDisplayAwayWins] = useState(awayWins);
        const [displayCupWins, setDisplayCupWins] = useState(cupWins);

        const [displayTotalLosses, setDisplayTotalLosses] =
            useState(totalLosses);
        const [displayHomeLosses, setDisplayHomeLosses] = useState(homeLosses);
        const [displayAwayLosses, setDisplayAwayLosses] = useState(awayLosses);
        const [displayCupLosses, setDisplayCupLosses] = useState(cupLosses);

        const [displayGamesPlayed, setDisplayGamesPlayed] =
            useState(gamesPlayed);
        const [displayHomeGamesPlayed, setDisplayHomeGamesPlayed] =
            useState(homeGamesPlayed);
        const [displayAwayGamesPlayed, setDisplayAwayGamesPlayed] =
            useState(awayGamesPlayed);
        const [displayCupGamesPlayed, setDisplayCupGamesPlayed] =
            useState(cupGamesPlayed);

        function displayAll() {
            setSinglesChecked(false);
            setPairsChecked(false);
            setAllChecked(true);

            setDisplayTotalWins(totalWins);
            setDisplayHomeWins(homeWins);
            setDisplayAwayWins(awayWins);
            setDisplayCupWins(cupWins);

            setDisplayTotalLosses(totalLosses);
            setDisplayHomeLosses(homeLosses);
            setDisplayAwayLosses(awayLosses);
            setDisplayCupLosses(cupLosses);

            setDisplayGamesPlayed(gamesPlayed);
            setDisplayHomeGamesPlayed(homeGamesPlayed);
            setDisplayAwayGamesPlayed(awayGamesPlayed);
            setDisplayCupGamesPlayed(cupGamesPlayed);
        }

        function displayOnlySingles() {
            setSinglesChecked(true);
            setPairsChecked(false);
            setAllChecked(false);

            setDisplayTotalWins(totalWins - pairWins);
            setDisplayHomeWins(homeWins - pairHomeWins);
            setDisplayAwayWins(awayWins - pairAwayWins);
            setDisplayCupWins(cupWins - pairCupWins);

            setDisplayTotalLosses(totalLosses - pairLosses);
            setDisplayHomeLosses(homeLosses - pairHomeLosses);
            setDisplayAwayLosses(awayLosses - pairAwayLosses);
            setDisplayCupLosses(cupLosses - pairCupLosses);

            setDisplayGamesPlayed(gamesPlayed - pairsGames);
            setDisplayHomeGamesPlayed(homeGamesPlayed - pairHomeGamesPlayed);
            setDisplayAwayGamesPlayed(awayGamesPlayed - pairAwayGamesPlayed);
            setDisplayCupGamesPlayed(cupGamesPlayed - pairCupGamesPlayed);
        }

        function displayOnlyPairs() {
            setSinglesChecked(false);
            setPairsChecked(true);
            setAllChecked(false);

            setDisplayTotalWins(pairWins);
            setDisplayHomeWins(pairHomeWins);
            setDisplayAwayWins(pairAwayWins);
            setDisplayCupWins(pairCupWins);

            setDisplayTotalLosses(pairLosses);
            setDisplayHomeLosses(pairHomeLosses);
            setDisplayAwayLosses(pairAwayLosses);
            setDisplayCupLosses(pairCupLosses);

            setDisplayGamesPlayed(pairsGames);
            setDisplayHomeGamesPlayed(pairHomeGamesPlayed);
            setDisplayAwayGamesPlayed(pairAwayGamesPlayed);
            setDisplayCupGamesPlayed(pairCupGamesPlayed);
        }

        return (
            <div id="player-stats-wins-losses">
                <Accordion.Item eventKey="2">
                    <Accordion.Header id="stats-wl">
                        WINS & LOSSES
                    </Accordion.Header>
                    <Accordion.Body>
                        {/* TODO move this? to component? */}
                        {pairsGames > 0 && singlesGames > 0 && (
                            <ButtonGroup
                                id="game-type-select"
                                size="lg"
                                className="mb-2"
                            >
                                <ToggleButton
                                    id="all-button"
                                    onClick={displayAll}
                                    type="checkbox"
                                    variant="light"
                                    checked={allChecked}
                                >
                                    All
                                </ToggleButton>
                                <ToggleButton
                                    id="singles-button"
                                    onClick={displayOnlySingles}
                                    type="checkbox"
                                    variant="light"
                                    checked={singlesChecked}
                                >
                                    Singles
                                </ToggleButton>
                                <ToggleButton
                                    id="pairs-button"
                                    onClick={displayOnlyPairs}
                                    type="checkbox"
                                    variant="light"
                                    checked={pairsChecked}
                                >
                                    Pairs
                                </ToggleButton>
                            </ButtonGroup>
                        )}

                        {displayGamesPlayed > 0 && (
                            <div>
                                <h3>TOTAL</h3>
                                <p>Wins: {displayTotalWins}</p>
                                <p>Losses: {displayTotalLosses}</p>
                                <p>
                                    Win percentage:{' '}
                                    {(
                                        (displayTotalWins /
                                            displayGamesPlayed) *
                                        100
                                    ).toFixed(0)}
                                    %
                                </p>
                            </div>
                        )}
                        {displayHomeGamesPlayed > 0 && (
                            <div>
                                <h3>HOME</h3>
                                <p>Wins: {displayHomeWins}</p>
                                <p>Losses: {displayHomeLosses}</p>
                                <p>
                                    Win percentage:{' '}
                                    {(
                                        (displayHomeWins /
                                            displayHomeGamesPlayed) *
                                        100
                                    ).toFixed(0)}
                                    %
                                </p>
                            </div>
                        )}
                        {displayAwayGamesPlayed > 0 && (
                            <div>
                                <h3>AWAY</h3>
                                <p>Wins: {displayAwayWins}</p>
                                <p>Losses: {displayAwayLosses}</p>
                                <p>
                                    Win percentage:{' '}
                                    {(
                                        (displayAwayWins /
                                            displayAwayGamesPlayed) *
                                        100
                                    ).toFixed(0)}
                                    %
                                </p>
                            </div>
                        )}

                        {displayCupGamesPlayed > 0 && (
                            <div>
                                <h3>CUP</h3>
                                <p>Wins: {displayCupWins}</p>
                                <p>Losses: {displayCupLosses}</p>
                                <p>
                                    Win percentage:{' '}
                                    {(
                                        (displayCupWins /
                                            displayCupGamesPlayed) *
                                        100
                                    ).toFixed(0)}
                                    %
                                </p>
                            </div>
                        )}
                        {/* TODO make it obvious visually that it's all game types */}
                        {!showStatSummary && (
                            <div>
                                <h3>TEAMS</h3>
                                <div>
                                    {mondayGames > 0 && (
                                        <div>
                                            <h5>MONDAY</h5>
                                            <p>Wins: {mondayWins}</p>
                                            <p>Losses: {mondayLosses}</p>
                                            <p>
                                                Win percentage:{' '}
                                                {(
                                                    (mondayWins / mondayGames) *
                                                    100
                                                ).toFixed(0)}
                                                %
                                            </p>
                                        </div>
                                    )}
                                    {tuesdayVetsGames > 0 && (
                                        <div>
                                            <h5>TUESDAY VETS</h5>
                                            <p>Wins: {tuesdayVetsWins}</p>
                                            <p>Losses: {tuesdayVetsLosses}</p>
                                            <p>
                                                Win percentage:{' '}
                                                {(
                                                    (tuesdayVetsWins /
                                                        tuesdayVetsGames) *
                                                    100
                                                ).toFixed(0)}
                                                %
                                            </p>
                                        </div>
                                    )}
                                    {tuesdayEveningGames > 0 && (
                                        <div>
                                            <h5>TUESDAY EVENING</h5>
                                            <p>Wins: {tuesdayEveningWins}</p>
                                            <p>
                                                Losses: {tuesdayEveningLosses}
                                            </p>
                                            <p>
                                                Win percentage:{' '}
                                                {(
                                                    (tuesdayEveningWins /
                                                        tuesdayEveningGames) *
                                                    100
                                                ).toFixed(0)}
                                                %
                                            </p>
                                        </div>
                                    )}
                                    {wednesdayGames > 0 && (
                                        <div>
                                            <h5>WEDNESDAY</h5>
                                            <p>Wins: {wednesdayWins}</p>
                                            <p>Losses: {wednesdayLosses}</p>
                                            <p>
                                                Win percentage:{' '}
                                                {(
                                                    (wednesdayWins /
                                                        wednesdayGames) *
                                                    100
                                                ).toFixed(0)}
                                                %
                                            </p>
                                        </div>
                                    )}
                                    {thursdayGames > 0 && (
                                        <div>
                                            <h5>THURSDAY VETS</h5>
                                            <p>Wins: {thursdayWins}</p>
                                            <p>Losses: {thursdayLosses}</p>
                                            <p>
                                                Win percentage:{' '}
                                                {(
                                                    (thursdayWins /
                                                        thursdayGames) *
                                                    100
                                                ).toFixed(0)}
                                                %
                                            </p>
                                        </div>
                                    )}
                                    {saturdayGames > 0 && (
                                        <div>
                                            <h5>SATURDAY</h5>
                                            <p>Wins: {saturdayWins}</p>
                                            <p>Losses: {saturdayLosses}</p>
                                            <p>
                                                Win percentage:{' '}
                                                {(
                                                    (saturdayWins /
                                                        saturdayGames) *
                                                    100
                                                ).toFixed(0)}
                                                %
                                            </p>
                                        </div>
                                    )}
                                </div>
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
