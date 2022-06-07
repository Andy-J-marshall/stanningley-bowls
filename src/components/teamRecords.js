import React from 'react';
import { combineTeamStats } from '../helpers/statsHelper';

function TeamRecords(props) {
    const statsArray = props.stats;
    
    // let bestWinPercentage;
    
    statsArray.forEach(stats => {
        console.log(stats);
        // const {
        //     awayWins, homeWins, awayLosses, homeLosses, homeDraws,
        //     awayDraws, stanningleyAgg, stanningleyTotalPoints,
        //     opponentAgg, opponentTotalPoints, beaten, beatenBy, drawnWith,
        // } = stats;
    });


    return (
        <div id='TeamRecords'>
            <h2>Team Records</h2>
        </div>
    );
}

export default TeamRecords;
