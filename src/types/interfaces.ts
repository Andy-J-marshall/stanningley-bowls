export interface TeamStatsProps {
    stats: any;
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
    stats: {
        playerResults: {
            [key: string]: {
                awayWins: number;
                homeWins: number;
                cupWins: number;
                awayLosses: number;
                homeLosses: number;
                cupLosses: number;
                totalAgg: number;
                totalAggAgainst: number;
                [key: string]: any;
            };
        };
        statsYear: string;
    };
    statsSelectCallback: (year: string) => void;
    yearToDisplay: string;
}

export interface AllTimePlayerStatsProps {
    statsArray: Array<any>;
    showSinglesOnly: boolean;
    showPairsOnly: boolean;
}

export interface CombinedTeamStatsProps {
    stats: any;
}

export interface GameTypeButtonProps {
    displayAllCallback: () => void;
    displaySinglesCallback: () => void;
    displayPairsCallback: () => void;
}

export interface IndividualPlayerStatsProps {
    player: string;
    playersStats: any;
    name: string;
    showStatSummary: boolean;
}

export interface IndividualTeamStatsProps {
    day: string;
    displayname?: string;
    stats: {
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
    };
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

export interface PlayerStatSummaryProps {
    playerStats: Array<{
        player: string;
        games: number;
        wins: number;
        average: number | undefined;
        singleGames: number;
        singlesAverage?: number;
        singlesWins: number;
        pairsGames: number;
        pairsAverage?: number;
        pairsWins: number;
        singlesWinPerc?: number;
        pairsWinPerc?: number;
        winPerc?: number;
    }>;
    callback?: (playerName: string) => void;
    showSinglesOnly?: boolean;
    showPairsOnly?: boolean;
}

export interface TeamStats {
    teamName: string;
    teamGames: number;
    teamWins: number;
    teamLosses: number;
    teamAvg: number | null;
    teamWinPerc: number;
}

export interface PlayerStatsTeamsProps {
    stats: {
        allTeamStats: TeamStats[];
    };
}

export interface PlayerStatsResultsProps {
    stats: {
        results: string[];
    };
}

export interface PlayerStats {
    totalGamesPlayed: number;
    totalWins: number;
    totalLosses: number;
    totalAverage: number;
}

export interface WrapperProps {
    displayname: string;
    children: React.ReactNode;
}
