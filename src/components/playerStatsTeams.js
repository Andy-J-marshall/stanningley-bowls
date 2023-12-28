import { Accordion } from 'react-bootstrap';

function PlayerStatsTeams(props) {
    const stats = props.stats;

    const {
        mondayGames,
        mondayAvg,
        mondayWins,
        mondayLosses,
        tuesdayVetsGames,
        tuesdayVetsAvg,
        tuesdayVetsWins,
        tuesdayVetsLosses,
        tuesdayEveningGames,
        tuesdayEveningAvg,
        tuesdayEveningWins,
        tuesdayEveningLosses,
        wednesdayGames,
        wednesdayAvg,
        wednesdayWins,
        wednesdayLosses,
        thursdayGames,
        thursdayAvg,
        thursdayWins,
        thursdayLosses,
        saturdayGames,
        saturdayAvg,
        saturdayWins,
        saturdayLosses,
    } = stats;

    return (
        <div id="player-stats-teams">
            <Accordion.Item eventKey="4">
                <Accordion.Header id="stats-teams">TEAMS</Accordion.Header>
                <Accordion.Body>
                    <div>
                        {mondayGames > 0 && (
                            <div>
                                <h3>MONDAY</h3>
                                <p>Games: {mondayGames}</p>
                                <p>Wins: {mondayWins}</p>
                                <p>Losses: {mondayLosses}</p>
                                <p>Average: {mondayAvg.toFixed(2)}</p>
                                <p>
                                    Win percentage:{' '}
                                    {((mondayWins / mondayGames) * 100).toFixed(
                                        0
                                    )}
                                    %
                                </p>
                            </div>
                        )}
                        {tuesdayVetsGames > 0 && (
                            <div>
                                <h3>TUESDAY VETS</h3>
                                <p>Games: {tuesdayVetsGames}</p>
                                <p>Wins: {tuesdayVetsWins}</p>
                                <p>Losses: {tuesdayVetsLosses}</p>
                                <p>Average: {tuesdayVetsAvg.toFixed(2)}</p>
                                <p>
                                    Win percentage:{' '}
                                    {(
                                        (tuesdayVetsWins / tuesdayVetsGames) *
                                        100
                                    ).toFixed(0)}
                                    %
                                </p>
                            </div>
                        )}
                        {tuesdayEveningGames > 0 && (
                            <div>
                                <h3>TUESDAY EVENING</h3>
                                <p>Games: {tuesdayEveningGames}</p>
                                <p>Wins: {tuesdayEveningWins}</p>
                                <p>Losses: {tuesdayEveningLosses}</p>
                                <p>Average: {tuesdayEveningAvg.toFixed(2)}</p>
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
                                <h3>WEDNESDAY HALF HOLIDAY</h3>
                                <p>Games: {wednesdayGames}</p>
                                <p>Wins: {wednesdayWins}</p>
                                <p>Losses: {wednesdayLosses}</p>
                                <p>Average: {wednesdayAvg.toFixed(2)}</p>
                                <p>
                                    Win percentage:{' '}
                                    {(
                                        (wednesdayWins / wednesdayGames) *
                                        100
                                    ).toFixed(0)}
                                    %
                                </p>
                            </div>
                        )}
                        {thursdayGames > 0 && (
                            <div>
                                <h3>THURSDAY VETS</h3>
                                <p>Games: {thursdayGames}</p>
                                <p>Wins: {thursdayWins}</p>
                                <p>Losses: {thursdayLosses}</p>
                                <p>Average: {thursdayAvg.toFixed(2)}</p>
                                <p>
                                    Win percentage:{' '}
                                    {(
                                        (thursdayWins / thursdayGames) *
                                        100
                                    ).toFixed(0)}
                                    %
                                </p>
                            </div>
                        )}
                        {saturdayGames > 0 && (
                            <div>
                                <h3>SATURDAY</h3>
                                <p>Games: {saturdayGames}</p>
                                <p>Wins: {saturdayWins}</p>
                                <p>Losses: {saturdayLosses}</p>
                                <p>Average: {saturdayAvg.toFixed(2)}</p>
                                <p>
                                    Win percentage:{' '}
                                    {(
                                        (saturdayWins / saturdayGames) *
                                        100
                                    ).toFixed(0)}
                                    %
                                </p>
                            </div>
                        )}
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </div>
    );
}

export default PlayerStatsTeams;
