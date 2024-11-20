import { Row } from 'react-bootstrap';
import StatsTile from './statsTile';
import { PlayerStatOverviewTilesProps } from '../../types/interfaces';
import { capitalizeText } from '../../helpers/utils';

function PlayerStatOverviewTiles(props: PlayerStatOverviewTilesProps) {
    const games = props.games;
    const average = props.average;
    const wins = props.wins;
    const losses = props.losses;
    const biggestWin = props.biggestWin;
    let idPrefix = props.idPrefix;

    idPrefix = idPrefix
        ?.replaceAll(' ', '')
        .replaceAll('(', '')
        .replaceAll(')', '');

    return (
        <Row
            xs={2}
            md={3}
            xl={biggestWin ? 3 : 5} // Overview page looks better with 3 tiles
            className="g-4 align-items-start"
        >
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

export default PlayerStatOverviewTiles;
