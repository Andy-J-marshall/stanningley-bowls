export interface TeamStatsProps {
    stats: FullStatsFile;
    statsSelectCallback: (year: string) => void;
    yearToDisplay: string;
}

export interface ResultsProps {
    stats: FullStatsFile;
    yearToDisplay: string;
}

export interface RecordsProps {
    stats: FullStatsFile;
    statsSelectCallback: (year: string) => void;
    yearToDisplay: string;
}

export interface CombinedTeamStatsProps {
    stats: TeamResultsStatsFile[];
}

export interface GameTypeButtonProps {
    displayAllCallback: () => void;
    displaySinglesCallback: () => void;
    displayPairsCallback: () => void;
}

export interface IndividualPlayerStatsProps {
    playersStats?: AggregatedPlayerStats | null;
    name: string;
    showStatSummary: boolean;
}

export interface IndividualTeamStatsProps {
    day: string;
    displayname?: string;
    stats: TeamResultsStatsFile;
    bTeam: boolean;
}

export interface StatsTileProps {
    title: string;
    bodyText: string | number;
    id?: string;
}

export interface PlayerStatsOptionsProps {
    allTeamStatsCallback: (toggle: boolean) => void;
    allYearStatsCallback: (toggle: boolean) => void;
    teamSpecificCallback: (teamName: string) => void;
    onlySinglesCallback: (toggle: boolean) => void;
    onlyPairsCallback: (toggle: boolean) => void;
    onlyHomeCallback: (toggle: boolean) => void;
    onlyAwayCallback: (toggle: boolean) => void;
    onlyCupCallback: (toggle: boolean) => void;
    searchedPlayerName: string;
    teamNames: string[];
}

export interface PlayerStatsProps {
    stats: FullStatsFile;
    combinedStats: FullStatsFile;
    statsForEveryYearArray: FullStatsFile[];
    combinedStatsForEveryYearArray: FullStatsFile[];
}

export interface PlayerStatOverviewTilesProps {
    games: number;
    average: number;
    wins: number;
    losses: number;
    biggestWin?: string;
    idPrefix?: string;
}

export interface PlayerStatAggregatesTilesProps {
    aggFor: string;
    aggAgainst: string;
    idPrefix?: string;
}

export interface YearSelectDropdownProps {
    statsCallback: (year: string) => void;
    yearToDisplay: string;
}

export interface TeamTabsProps {
    allCombinedComponent: React.ReactNode;
    teamComponents: React.ReactElement<{ displayname: string }>[];
}

export interface StatsTableDisplayProps {
    totalGames: number;
    totalWins: number;
    homeWins?: number;
    awayWins?: number;
    cupWins?: number;
    totalLosses: number;
    homeLosses?: number;
    awayLosses?: number;
    cupLosses?: number;
    totalDraws: number;
    homeDraws?: number;
    awayDraws?: number;
    agg: number;
    opponentAgg: number;
}

export interface SearchProps {
    searchList: string[];
    value: string[];
    searchedName: string;
    handleChangeCallback: (selected: string[]) => void;
    closeButtonCallback: () => void;
}

export interface PlayerStatsComponentsProps {
    stats: AggregatedPlayerStats;
}

export interface RecordsTableDisplayProps {
    teamName?: string;
    mostGames?: number;
    mostGamesPlayer?: string[];
    minGames: number;
    bestWinPerc: number;
    bestWinPercPlayer: string[];
    mostWins: number;
    mostWinsPlayer: string[];
    bestAverage: number;
    bestAveragePlayer: string[];
}

export interface IndividualRecordsProps {
    stats: RecordStats;
    teamName: string;
    bTeam: boolean;
}

export interface CombinedRecordsProps {
    stats: RecordStats;
}

export interface PlayerStatsTeamSummary {
    player: string;
    games: number;
    wins: number;
    winPerc: number;
    average: number;
    aggDiff: number;
}

export interface PlayerStatsSummary {
    player: string;

    games: number;
    wins: number;
    winPerc: number;
    average: number;
    agg: number;
    aggAgainst: number;

    singlesGames: number;
    singlesWins: number;
    singlesWinPerc: number;
    singlesAverage: number;
    singlesAgg: number;
    singlesAggAgainst: number;

    pairsGames: number;
    pairsWins: number;
    pairsWinPerc: number;
    pairsAverage: number;
    pairsAgg: number;
    pairsAggAgainst: number;

    homeGames: number;
    homeWins: number;
    homeWinPerc: number;
    homeAverage: number;
    homeAgg: number;
    homeAggAgainst: number;

    singlesHomeGames: number;
    singlesHomeWins: number;
    singlesHomeWinPerc: number;
    singlesHomeAverage: number;
    singlesHomeAgg: number;
    singlesHomeAggAgainst: number;

    pairsHomeGames: number;
    pairsHomeWins: number;
    pairsHomeWinPerc: number;
    pairsHomeAverage: number;
    pairsHomeAgg: number;
    pairsHomeAggAgainst: number;

    awayGames: number;
    awayWins: number;
    awayWinPerc: number;
    awayAverage: number;
    awayAgg: number;
    awayAggAgainst: number;

    singlesAwayGames: number;
    singlesAwayWins: number;
    singlesAwayWinPerc: number;
    singlesAwayAverage: number;
    singlesAwayAgg: number;
    singlesAwayAggAgainst: number;

    pairsAwayGames: number;
    pairsAwayWins: number;
    pairsAwayWinPerc: number;
    pairsAwayAverage: number;
    pairsAwayAgg: number;
    pairsAwayAggAgainst: number;

    cupGames: number;
    cupWins: number;
    cupWinPerc: number;
    cupAverage: number;
    cupAgg: number;
    cupAggAgainst: number;

    singlesCupGames: number;
    singlesCupWins: number;
    singlesCupWinPerc: number;
    singlesCupAverage: number;
    singlesCupAgg: number;
    singlesCupAggAgainst: number;

    pairsCupGames: number;
    pairsCupWins: number;
    pairsCupWinPerc: number;
    pairsCupAverage: number;
    pairsCupAgg: number;
    pairsCupAggAgainst: number;
}

export interface PlayerStatSummaryProps {
    playerStats: PlayerStatsSummary[] | PlayerStatsTeamSummary[];
    callback?: (playerName: string) => void;
    showSinglesOnly?: boolean;
    showPairsOnly?: boolean;
    showHomeOnly?: boolean;
    showAwayOnly?: boolean;
    showCupOnly?: boolean;
}

export interface WrapperProps {
    displayname: string;
    children: React.ReactNode;
}

export type NewsItemProps = {
    title: string;
    openingLine: string;
    mainText?: string;
    imgSrc: string;
};

export interface orderByButtonProps {
    name: string;
    orderByCallback: () => void;
}

export interface PlayerStatsTeamsProps {
    stats: {
        allTeamStats: {
            teamName: string;
            teamGames: number;
            teamWins: number;
            teamLosses: number;
            teamAvg: number;
            teamWinPerc: number;
        }[];
    };
}

export interface ConfigTeamData {
    teamNames: string[];
    bTeamForLeagueBool: boolean;
}

export interface FullStatsFile {
    playerResults: PlayerResultsStatsFile;
    teamResults?: TeamResultsStatsFile[];
    statsYear: string;
    lastUpdated: string;
}

export interface PlayerResultsStatsFile {
    [key: string]: {
        totalAgg: number;
        totalAggAgainst: number;
        availableAgg: number;
        availablePairsAgg: number;
        availableHomeAgg: number;
        availableAwayAgg: number;
        availablePairsHomeAgg: number;
        availablePairsAwayAgg: number;
        totalPairsAgg: number;
        totalPairsAggAgainst: number;
        totalHomeAgg: number;
        totalHomeAggAgainst: number;
        totalPairsHomeAgg: number;
        totalPairsHomeAggAgainst: number;
        totalAwayAgg: number;
        totalAwayAggAgainst: number;
        totalPairsAwayAgg: number;
        totalPairsAwayAggAgainst: number;
        homeWins: number;
        awayWins: number;
        cupWins: number;
        pairWins: number;
        pairHomeWins: number;
        pairAwayWins: number;
        pairCupWins: number;
        totalGamesPlayed: number;
        results: string[];
        [key: string]: any;
    };
}

export interface TeamResultsStatsFile {
    day: string;
    awayWins: number;
    homeWins: number;
    wins: number;
    awayLosses: number;
    homeLosses: number;
    homeDraws: number;
    awayDraws: number;
    draws: number;
    cupWins: number;
    cupLosses: number;
    losses: number;
    totalGamesPlayed: number;
    agg: number;
    opponentAgg: number;
    results: string[];
}

export interface Result {
    home: {
        name: string;
        score: string;
    };
    away: {
        name: string;
        score: string;
    };
}

export interface TeamRecords {
    [key: string]: RecordStats;
}

export interface RecordStats {
    mostGames: number;
    mostGamesPlayer?: string[];
    minGames: number;
    mostWins: number;
    mostWinsPlayer: string[];
    bestWinPerc: number;
    bestWinPercPlayer: string[];
    bestAverage: number;
    bestAveragePlayer: string[];
}

export interface AggregatedPlayerStats {
    totalAgg: number;
    totalAggAgainst: number;
    totalPairsAgg: number;
    totalPairsAggAgainst: number;
    totalHomeAgg: number;
    totalHomeAggAgainst: number;
    totalAwayAgg: number;
    totalAwayAggAgainst: number;
    singlesAgg: number;
    singlesAggAgainst: number;
    totalPairsHomeAgg: number;
    totalPairsHomeAggAgainst: number;
    totalPairsAwayAgg: number;
    totalPairsAwayAggAgainst: number;
    totalPairsCupAgg: number;
    totalPairsCupAggAgainst: number;
    totalSinglesHomeAgg: number;
    totalSinglesHomeAggAgainst: number;
    totalSinglesAwayAgg: number;
    totalSinglesAwayAggAgainst: number;
    totalSinglesCupAgg: number;
    totalSinglesCupAggAgainst: number;
    cupAgg: number;
    cupAggAgainst: number;
    awayLosses: number;
    homeLosses: number;
    pairLosses: number;
    cupLosses: number;
    totalLosses: number;
    pairHomeLosses: number;
    pairAwayLosses: number;
    pairCupLosses: number;
    homeWins: number;
    awayWins: number;
    cupWins: number;
    pairWins: number;
    totalWins: number;
    pairHomeWins: number;
    pairAwayWins: number;
    pairCupWins: number;
    gamesPlayed: number;
    homeGamesPlayed: number;
    awayGamesPlayed: number;
    singlesHomeGamesPlayed: number;
    singlesAwayGamesPlayed: number;
    singlesCupGamesPlayed: number;
    pairHomeGamesPlayed: number;
    pairAwayGamesPlayed: number;
    pairCupGamesPlayed: number;
    cupGamesPlayed: number;
    pairsGames: number;
    singlesGames: number;
    average: number;
    homeAverage: number;
    awayAverage: number;
    cupAverage: number;
    singlesAvg: number;
    pairsAvg: number;
    singlesHomeAverage: number;
    singlesAwayAverage: number;
    singlesCupAverage: number;
    pairsHomeAverage: number;
    pairsAwayAverage: number;
    pairsCupAverage: number;
    allTeamStats: any;
    biggestWin: string;
    results: string[];
    availableAgg: number;
    availablePairsAgg: number;
    availableHomeAgg: number;
    availableAwayAgg: number;
    availableCupAgg: number;
    availablePairsHomeAgg: number;
    availablePairsAwayAgg: number;
    availablePairsCupAgg: number;
}
