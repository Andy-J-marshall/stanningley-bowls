import { useEffect } from 'react';
import PlayerRecords from './playerRecords';

function Records(props) {
    const stats = props.stats;

    const { playerResults } = stats;

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    return (
        <div id="record" className="center">
            <PlayerRecords
                playerResults={playerResults}
                clubCupWinner={stats.clubCupWinner}
            />
        </div>
    );
}

export default Records;
