import { config } from '../config';
import { Result, TeamResultsStatsFile } from '../types/interfaces';

export function returnStructuredResultsArray(results: string[]) {
    const resultsArray = results.map((result: string) => {
        const resultParts = result.split(' - ');

        const homePart = resultParts[0];
        const homeScoreMatch = homePart.match(/[0-9]+/g);
        const homeScore = homeScoreMatch ? homeScoreMatch[0].trim() : '';
        const homePlayer = homePart.split(/[0-9]+/g)[0].trim();

        const awayPart = resultParts[1].split(' (')[0];
        const awayScoreMatch = awayPart.match(/[0-9]+/g);
        const awayScore = awayScoreMatch ? awayScoreMatch[0].trim() : '';
        const awayPlayer = awayPart.split(/[0-9]+/g)[1].trim();

        const structuredResult: Result = {
            home: {
                name: homePlayer,
                score: homeScore,
            },
            away: {
                name: awayPlayer,
                score: awayScore,
            },
        };

        return structuredResult;
    });

    return resultsArray;
}

export function returnResultsArrayForTeamsWithGames(
    teamResults: TeamResultsStatsFile[] | undefined
) {
    const allTeamResultsArray = teamResults?.map((team) => {
        const results: Result[] = returnStructuredResultsArray(team.results);
        return {
            name: config.allTeamsInLeaguesSince2013.find((t) =>
                t.toLowerCase().includes(team.day.toLowerCase())
            ),
            results,
        };
    });

    const resultsArray = allTeamResultsArray?.filter(
        (team) => team?.results?.length > 0
    );

    return resultsArray;
}
