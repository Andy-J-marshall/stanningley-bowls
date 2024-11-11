import { Row } from 'react-bootstrap';
import { PlayerStatTilesProps } from '../types/interfaces';
import StatsTile from './statsTile';
import { capitalizeText } from '../helpers/utils';

function PlayerStatTiles(props: PlayerStatTilesProps) {
    const games = props.games;
    const average = props.average;
    const wins = props.wins;
    const losses = props.losses;
    const biggestWin = props.biggestWin;
    const idPrefix = props.idPrefix;

    return (
        // TODO sort out the layout here
        <Row xs={2} md={3} xl={5} className="g-4 align-items-start">
            {games >= 0 && (
                <StatsTile
                    title="GAMES"
                    bodyText={games}
                    id={idPrefix + 'GamesPlayed'}
                />
            )}
            {average >= -26 && average <= 26 && (
                <StatsTile
                    title="AVERAGE"
                    bodyText={average.toFixed(2)}
                    id={idPrefix + 'Average'}
                />
            )}
            {wins >= 0 && (
                <StatsTile
                    title="WINS"
                    bodyText={wins}
                    id={idPrefix + 'Wins'}
                />
            )}
            {losses >= 0 && (
                <StatsTile
                    title="LOSSES"
                    bodyText={losses}
                    id={idPrefix + 'Losses'}
                />
            )}
            {wins >= 0 && games >= 0 && (
                <StatsTile
                    title="WIN %"
                    bodyText={((wins / games) * 100).toFixed(0) + '%'}
                    id={idPrefix + 'WinPerc'}
                />
            )}
            {biggestWin && wins > 0 && (
                <StatsTile
                    title="BEST WIN"
                    bodyText={capitalizeText([biggestWin])}
                    id={idPrefix + 'BiggestWin'}
                />
            )}
        </Row>
    );
}

export default PlayerStatTiles;
