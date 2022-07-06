import React from 'react';
import StatsTableDisplay from './statsTableDisplay';
import { ListGroup } from 'react-bootstrap';
import { capitalizeText } from '../helpers/utils'; // TODO remove this

function IndividualTeamStats(props) {
    const day = props.day;
    const stats = props.stats;
    const playerStats = props.playerStats;

    const {
        awayWins,
        homeWins,
        cupWins,
        cupLosses,
        awayLosses,
        homeLosses,
        homeDraws,
        awayDraws,
        stanningleyAgg,
        stanningleyTotalPoints,
        opponentAgg,
        opponentTotalPoints,
        beaten,
        beatenBy,
        drawnWith,
    } = stats;

    const allPlayerStats = Object.keys(playerStats)
        .sort()
        .map((player) => {
            const stats = playerStats[player][day.toLowerCase()];
            const { games, wins, aggDiff } = stats;
            const playerDayStats = {
                player,
                games,
                wins,
                average: aggDiff / games,
            };
            return playerDayStats;
        });

    const totalDraws = awayDraws + homeDraws;
    const totalWins = awayWins + homeWins + cupWins;
    const totalLosses = awayLosses + homeLosses + cupLosses;
    const totalGames = totalDraws + totalWins + totalLosses;

    return (
        <div id={day + '-team-results'}>
            <StatsTableDisplay
                totalGames={totalGames}
                totalWins={totalWins}
                totalLosses={totalLosses}
                totalDraws={totalDraws}
                stanningleyAgg={stanningleyAgg}
                opponentAgg={opponentAgg}
                stanningleyTeamScore={stanningleyTotalPoints}
                opponentTeamScore={opponentTotalPoints}
                teamsBeaten={beaten}
                teamsLostTo={beatenBy}
                teamsDrawn={drawnWith}
                homeWins={homeWins}
                awayWins={awayWins}
                cupWins={cupWins}
                homeLosses={homeLosses}
                awayLosses={awayLosses}
                cupLosses={cupLosses}
                homeDraws={homeDraws}
                awayDraws={awayDraws}
            />

            {/* TODO change this to use cards? */}
            <div id="player-stats-per-team">
                <h1>PLAYERS</h1>
                <ListGroup>
                    {allPlayerStats.map((player, key) => {
                        const games = player.games;
                        if (games > 1) {
                            return (
                                <ListGroup.Item key={key}>
                                    <div key={key}>
                                        <h4>
                                            {capitalizeText([player.player])}
                                        </h4>
                                        <div className="tabs">
                                            <ul>
                                                <li>Games: {player.games}</li>
                                                <li>Wins: {player.wins}</li>
                                                <li>
                                                    Average{' '}
                                                    {player.average.toFixed(2)}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </ListGroup.Item>
                            );
                        }
                    })}
                </ListGroup>

                {/* <Row sm={1} md={2} lg={3} xl={4} className="g-4 tabs">
                    {teams.map((team, idx) => (
                        <Col key={idx}>
                            <Card bg="light" style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={team.img} />
                                <Card.Body>
                                    <Card.Title>
                                        {team.name.toUpperCase()}
                                    </Card.Title>
                                    <Card.Text>
                                        {team.age}
                                        <br /> {team.desc}
                                        <br /> Start Time: {team.startTime}
                                    </Card.Text>
                                    <Button
                                        style={{ backgroundColor: '#0081a4' }}
                                        href={team.link}
                                        variant="secondary"
                                    >
                                        View on Bowlsnet
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row> */}
            </div>
        </div>
    );
}

export default IndividualTeamStats;
