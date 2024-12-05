teamNames = [
    # TODO will need to add checks for C and D suffixes
    # TODO need all of these?
    # TODO will need to change reports to add 'A' suffix for Pudsey
    "Pudsey",
    "Pudsey A",
    "Pudsey B",
    "Pudsey C",
    "Pudsey 'A'",
    "Pudsey 'B'",
    "Pudsey 'C'",
    # TODO will need to change reports to add 'A' suffix for Pudsey BC Ltd
    "Pudsey BC Ltd",
    "Pudsey BC Ltd 'A'",
    "Pudsey BC Ltd 'B'",
    "Pudsey BC",
    "Pudsey BC A",
    "Pudsey BC B",
    "Pudsey BC 'A'",
    "Pudsey BC 'B'",
    "Pudsey BC 'C'",
    "Pudsey BC 'D'",
    "Pudsey BC - A",
    "Pudsey BC - B",
    "Pudsey BC - C",
    "Pudsey BC - D",
]
displayTeamName = "Pudsey"

# Days played (add duplicate days for second teams suffixed with (A) or (B) etc.)
teamDays = [
    "Monday AireWharfe (A)",
    "Monday AireWharfe (B)",
    "AireWharfe Vets",
    "Mirfield (A)",
    "Mirfield (B)",
    "Mirfield (C)",
    "Half Holiday Bradford (A)",
    "Half Holiday Bradford (B)",
    "Spen Valley (A)",
    "Spen Valley (B)",
    "Spen Valley (C)",
    "Spen Valley (D)",
    "Thursday Vets Bradford (A)",
    "Thursday Vets Bradford (B)",
    "Saturday Bradford (A)",
    "Saturday Bradford (B)",
    "Saturday Bradford (C)",
]

# Some leagues have different number of players depending on the division. Make sure you match the team name exactly as it appears in teamDays
teamsWithWithDifferentNumberOfPlayersToLeagueNorm = []  # update for Sat B in 2025


# Every player (lowercase)
players = [
    "alyssa randell",
    "stuart potter",
    "andy marshall",
    "stewart watson",
    "paul bowes",
    "martin fulton",
    "phil thornton",
    "john armitage",
    "jim moorin",
]

# Players with different spellings of name (lowercase). Also need to add to deduplicateNames function
duplicatePlayerNames = [
    "stuart watson",
    "andrew marshall",
    "james moorin",
    "phillip thornton",
    "philip thornton",
]

# Add players who play for other teams in leagues the team player in (lowercase)
traitorPlayers = {
    "Monday Bradford": ["john stocks"],
    "Monday AireWharfe": ["stewart watson", "lee wider", "paul jacques"],
    "Mirfield": ["stewart watson"],
    "Half Holiday Bradford": ["john stocks"],
    "Spen Valley": [
        "alex wolfenden",
        "paul wilczynski",
        "nichole farrar",
        "lewis cooper",
    ],
    "Thursday Vets Bradford": ["john stocks"],
    "Saturday Bradford": [
        "kevin siddle",
        "robbie ellis",
        "john stocks",
        "paul wilczynski",
    ],
}
