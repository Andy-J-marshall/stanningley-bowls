// TODO replace some of the : any with actual types in the components

export interface TeamStatsProps {
    stats: FullStats;
    statsSelectCallback: (year: string) => void;
    yearToDisplay: string;
}

export interface ResultsProps {
    stats: {
        teamResults: Array<{
            day: string;
            results: string[];
        }>;
        lastUpdated: string;
    };
    statsCallback: (year: string) => void;
    yearToDisplay: string;
}

export interface RecordsProps {
    stats: FullStats;
    statsSelectCallback: (year: string) => void;
    yearToDisplay: string;
}

export interface AllTimePlayerStatsProps {
    statsArray: Array<FullStats>;
    showSinglesOnly: boolean;
    showPairsOnly: boolean;
}

export interface CombinedTeamStatsProps {
    stats: TeamStats[];
}

export interface GameTypeButtonProps {
    displayAllCallback: () => void;
    displaySinglesCallback: () => void;
    displayPairsCallback: () => void;
}

export interface IndividualPlayerStatsProps {
    player: string;
    playersStats: PlayerResults;
    name: string;
    showStatSummary: boolean;
}

export interface IndividualTeamStatsProps {
    day: string;
    displayname?: string;
    stats: TeamStats;
    // TODO change this?
    playerStats: {
        [key: string]: {
            [day: string]: {
                games: number;
                wins: number;
                aggDiff: number;
            };
        };
    };
}

export interface ListProps {
    stringArray: string[];
}

// TODO can reuse this?
export interface PlayerStatsAggregatesProps {
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

export interface PlayerStatsOptionsProps {
    allTeamStatsCallback: (toggle: boolean) => void;
    allYearStatsCallback: (toggle: boolean) => void;
    onlySinglesCallback: (toggle: boolean) => void;
    onlyPairsCallback: (toggle: boolean) => void;
    playerSearchedFor: string;
}

// TODO duplicate again
export interface PlayerStatsProps {
    stats: {
        totalLosses: number;
        totalWins: number;
        gamesPlayed: number;
        average: number;
        allTeamsPlayedFor: string[];
        biggestWin: string;
    };
}

// TODO can type this
export interface DetailedPlayerStatsProps {
    combinedStats: any;
    stats: any;
    statsForEveryYearArray: any[];
    combinedStatsForEveryYearArray: any[];
}

export interface YearSelectDropdownProps {
    statsCallback: (year: string) => void;
    yearToDisplay: string;
}

export interface TeamTabsProps {
    allCombinedComponent: React.ReactNode;
    teamComponents: Array<React.ReactElement<{ displayname: string }>>;
}

// TODO this same as teamStatsProps?
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

// TODO player stats again
export interface PlayerStatsWinLossesProps {
    stats: {
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
        pairHomeGamesPlayed: number;
        pairAwayGamesPlayed: number;
        pairCupGamesPlayed: number;
        cupGamesPlayed: number;
        singlesGames: number;
        pairsGames: number;
        pairsPartnersCount: Record<string, { timesPaired: number }>;
        pairsPartnersCountWins: Record<string, { timesPaired: number }>;
        pairsPartnersCountLosses: Record<string, { timesPaired: number }>;
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
    };
}

// TODO can be combined with something else?
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
    playerStats: Array<PlayerStatsSummary>;
    callback?: (playerName: string) => void;
    showSinglesOnly?: boolean;
    showPairsOnly?: boolean;
}

export interface PlayerStatsTeamsProps {
    stats: {
        allTeamStats: PlayerTeamStats[];
    };
}

// TODO could reuse this
export interface PlayerStatsResultsProps {
    stats: {
        results: string[];
    };
}

export interface WrapperProps {
    displayname: string;
    children: React.ReactNode;
}

// TODO could use this some where else?

// TODO move non-props types to different file?

export interface PlayerTeamStats {
    // TODO check naming
    teamName: string;
    teamGames: number;
    teamWins: number;
    teamLosses: number;
    teamAvg: number | null;
    teamWinPerc: number;
}

export interface FullStats {
    playerResults: PlayerResults;

    teamResults: any[]; // TODO change
    statsYear: string;
}

export interface PlayerResults {
    [key: string]: any;
    // e.g.
    // {
    //     [key: string]: {
    //         awayWins: number;
    //         homeWins: number;
    //         cupWins: number;
    //         awayLosses: number;
    //         homeLosses: number;
    //         cupLosses: number;
    //         totalAgg: number;
    //         totalAggAgainst: number;
    //         [key: string]: any; // TODO change
    //     };
    // };
}

export interface TeamStats {
    awayWins: number;
    homeWins: number;
    cupWins: number;
    cupLosses: number;
    awayLosses: number;
    homeLosses: number;
    homeDraws: number;
    awayDraws: number;
    agg: number;
    opponentAgg: number;
}
