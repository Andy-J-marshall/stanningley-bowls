export interface TeamStatsProps {
    stats: FullStatsFile;
    statsSelectCallback: (year: string) => void;
    yearToDisplay: string;
}

export interface ResultsProps {
    stats: FullStatsFile;
    statsCallback: (year: string) => void;
    yearToDisplay: string;
}

export interface RecordsProps {
    stats: FullStatsFile;
    statsSelectCallback: (year: string) => void;
    yearToDisplay: string;
}

export interface AllTimePlayerStatsProps {
    statsArray: FullStatsFile[];
    showSinglesOnly: boolean;
    showPairsOnly: boolean;
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
    player: string;
    playersStats: PlayerResultsStatsFile;
    name: string;
    showStatSummary: boolean;
}

export interface IndividualTeamStatsProps {
    day: string;
    displayname?: string;
    stats: TeamResultsStatsFile;
    playerStats: PlayerResultsStatsFile;
}

export interface ListProps {
    stringArray: string[];
}

export interface PlayerStatsOptionsProps {
    allTeamStatsCallback: (toggle: boolean) => void;
    allYearStatsCallback: (toggle: boolean) => void;
    onlySinglesCallback: (toggle: boolean) => void;
    onlyPairsCallback: (toggle: boolean) => void;
    playerSearchedFor: string;
}

export interface PlayerStatsProps {
    stats: FullStatsFile;
    combinedStats: FullStatsFile;
    statsForEveryYearArray: FullStatsFile[];
    combinedStatsForEveryYearArray: FullStatsFile[];
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
    handleSubmitCallback: (event: React.FormEvent<HTMLFormElement>) => void;
    handleChangeCallback: (selected: string[]) => void;
    closeButtonCallback: () => void;
}

export interface RecordsTableDisplayProps {
    day?: string;
    minGames: number;
    bestWinPerc?: number;
    bestWinPercPlayer?: string[];
    mostWins?: number;
    mostWinsPlayer?: string[];
    mostGames?: number;
    mostGamesPlayer?: string[];
    bestAverage?: number;
    bestAveragePlayer?: string[];
}

export interface PlayerStatsSummary {
    player: string;
    games: number;
    wins: number;
    average: number | undefined;
    singleGames?: number;
    singlesAverage?: number;
    singlesWins?: number;
    pairsGames?: number;
    pairsAverage?: number;
    pairsWins?: number;
    singlesWinPerc?: number;
    pairsWinPerc?: number;
    winPerc?: number;
}

export interface PlayerStatSummaryProps {
    playerStats: PlayerStatsSummary[];
    callback?: (playerName: string) => void;
    showSinglesOnly?: boolean;
    showPairsOnly?: boolean;
}

export interface WrapperProps {
    displayname: string;
    children: React.ReactNode;
}

export interface PlayerStatsTeamsProps {
    stats: {
        allTeamStats: {
            teamName: string;
            teamGames: number;
            teamWins: number;
            teamLosses: number;
            teamAvg: number | null;
            teamWinPerc: number;
        }[];
    };
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
        homeLosses: number;
        awayWins: number;
        awayLosses: number;
        cupWins: number;
        cupLosses: number;
        pairWins: number;
        pairLosses: number;
        pairHomeWins: number;
        pairHomeLosses: number;
        pairAwayWins: number;
        pairAwayLosses: number;
        pairCupWins: number;
        pairCupLosses: number;
        totalGamesPlayed: number;
        dayPlayed: string[];
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

export interface AggregatedStats {
    stats: {
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
        allTeamsPlayedFor: any;
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
    };
}
