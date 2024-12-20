teamNames = [
    "Stanningley",
    "Stanningley A",
    "Stanningley B",
    "Stanningley Park",
    "Stanningley Park A",
    "Stanningley Park B",
    "Stanningley Pk",
    "Stanningley Pk A",
    "Stanningley Pk B",
]
displayTeamName = "Stanningley"

# Days played (add duplicate days for second teams suffixed with (A) or (B) etc.)
teamDays = [
    "Leeds Monday Combined",
    "Leeds Tuesday Vets",
    "Leeds Tuesday",
    "Leeds Half Holiday",
    "AireWharfe Wednesday Pairs",
    "Leeds Thursday Vets",
    "Leeds Saturday (A)",
    "Leeds Saturday (B)",
]

# Some leagues have different number of players depending on the division. Make sure you match the team name exactly as it appears in teamDays
teamsWithWithDifferentNumberOfPlayersToLeagueNorm = []

# Every player (lowercase)
players = [
    "andy marshall",
    "alyssa randell",
    "paul bowes",
    "andy waller",
    "john armitage",
    "clifford brogie",
    "donald shaw",
    "alison woodfine",
    "joey broadbent",
    "vanessa lancaster",
    "jim moorin",
    "duncan mcphail",
    "craig clarkson",
    "steve gardner",
    "neil porter",
    "stewart watson",
    "david eaton",
    "tracey marshall",
    "derek wilson",
    "peter crowther",
    "laila packer",
    "paul leonard",
    "malvin miller",
    "stuart potter",
    "colin haque",
    "ken green",
    "stephen tiernan",
    "phil sutcliffe",
    "martin fulton",
    "harvey leonard",
    "richard hodgson",
    "jim swailes",
    "rob packer",
    "nicola bona",
    "linda barrand",
    "phil thornton",
    "karl chapman",
]

# Players with different spellings of name (lowercase). Also need to add to deduplicateNames function
duplicatePlayerNames = [
    "duncan mc phail",
    "stuart watson",
    "andrew marshall",
    "andrew waller",
    "cliff brogie",
    "james moorin",
    "phillip thornton",
    "philip thornton",
    "jim swales",
]


# Add players who play for other teams in leagues the team player in (lowercase)
traitorPlayers = {
    "Leeds Monday Combined": ["neil porter"],
    "Leeds Tuesday Vets": [],
    "Leeds Tuesday": ["neil porter"],
    "Leeds Half Holiday": ["clifford brogie"],
    "AireWharfe Wednesday Pairs": [],
    "Leeds Thursday Vets": ["neil porter"],
    "Leeds Saturday": ["clifford brogie", "neil porter"],
}
