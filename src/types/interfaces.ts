// TODO replace some of the : any with actual types in the components

export interface TeamStatsProps {
    stats: FullStats;
    statsSelectCallback: (year: string) => void;
    yearToDisplay: string;
}

export interface ResultsProps {
    stats: FullStats;
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
    playerStats: PlayerResults;
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
    stats: FullStats;
    combinedStats: FullStats;
    statsForEveryYearArray: FullStats[];
    combinedStatsForEveryYearArray: FullStats[];
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

export interface WrapperProps {
    displayname: string;
    children: React.ReactNode;
}

// TODO this is from playerHelpers file
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
    teamResults?: any[]; // TODO change
    statsYear: string;
    lastUpdated: string;
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
