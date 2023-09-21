import { Accordion } from 'react-bootstrap';

function PlayerStatsGamePlayed(props) {
    const stats = props.stats;
    const showStatSummary = props.showStatSummary;

    const {
        gamesPlayed,
        homeGamesPlayed,
        awayGamesPlayed,
        cupGamesPlayed,
        pairsGames,
        singlesGames,
        daysPlayedCount,
    } = stats;

    return (
        <div id="player-stats-games-played">
            <Accordion.Item eventKey="1">
                <Accordion.Header id="stats-games">
                    GAMES PLAYED
                </Accordion.Header>
                <Accordion.Body>
                    <h3>TOTAL</h3>
                    <p>
                        {gamesPlayed} total ({singlesGames} singles,{' '}
                        {pairsGames} pairs)
                    </p>
                    {homeGamesPlayed > 0 && (
                        <p>
                            {homeGamesPlayed} home{' '}
                            {homeGamesPlayed === 1 ? 'game' : 'games'}
                        </p>
                    )}
                    {awayGamesPlayed > 0 && (
                        <p>
                            {awayGamesPlayed} away{' '}
                            {awayGamesPlayed === 1 ? 'game' : 'games'}
                        </p>
                    )}
                    {cupGamesPlayed > 0 && (
                        <p>
                            {cupGamesPlayed} cup{' '}
                            {cupGamesPlayed === 1 ? 'game' : 'games'}
                        </p>
                    )}
                    {!showStatSummary && (
                        <div>
                            <h3>TEAMS</h3>
                            {daysPlayedCount.map((day, key) => {
                                return (
                                    <p key={key}>
                                        {day.gamesPlayed} for {day.day}
                                    </p>
                                );
                            })}
                        </div>
                    )}
                </Accordion.Body>
            </Accordion.Item>
        </div>
    );
}

export default PlayerStatsGamePlayed;
