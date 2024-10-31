import { Accordion, Card, Row } from 'react-bootstrap';
import { capitalizeText } from '../helpers/utils';
import { PlayerStatsComponentsProps } from '../types/interfaces';

function PlayerStatsOverview(props: PlayerStatsComponentsProps) {
    const stats = props.stats;

    const { totalLosses, totalWins, gamesPlayed, average, biggestWin } = stats;

    return (
        <div id="player-stats-overview">
            <Accordion.Item eventKey="0">
                <Accordion.Header id="stats-overview">
                    OVERVIEW
                </Accordion.Header>
                <Accordion.Body>
                    <Row
                        style={{ padding: 0, margin: '0 0.5rem' }}
                        xs={2}
                        md={3}
                        className="g-4 align-items-start"
                    >
                        <Card bg="light">
                            <Card.Body>
                                <Card.Title>GAMES</Card.Title>
                                <Card.Text id="totalGamesPlayed">
                                    {gamesPlayed}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card bg="light">
                            <Card.Body>
                                <Card.Title>WINS</Card.Title>
                                <Card.Text id="totalWins">
                                    {totalWins}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card bg="light">
                            <Card.Body>
                                <Card.Title>LOSSES</Card.Title>
                                <Card.Text id="totalLosses">
                                    {totalLosses}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        {average >= -26 && average <= 26 && (
                            <Card bg="light">
                                <Card.Body>
                                    <Card.Title>AVERAGE</Card.Title>
                                    <Card.Text id="totalAverage">
                                        {average.toFixed(2)}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        )}
                        <Card bg="light">
                            <Card.Body>
                                <Card.Title>WIN %</Card.Title>
                                <Card.Text id="totalLosses">
                                    {((totalWins / gamesPlayed) * 100).toFixed(
                                        0
                                    )}
                                    %
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        {biggestWin && totalWins > 0 && (
                            <Card bg="light">
                                <Card.Body>
                                    <Card.Title>BEST WIN</Card.Title>
                                    <Card.Text id="biggestWin">
                                        {capitalizeText([biggestWin])}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        )}
                    </Row>
                </Accordion.Body>
            </Accordion.Item>
        </div>
    );
}

export default PlayerStatsOverview;
