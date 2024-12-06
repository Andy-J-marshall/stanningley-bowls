teamNames = [
    "Pudsey",
    "Pudsey A",
    "Pudsey B",
    "Pudsey C",
    "Pudsey 'A'",
    "Pudsey 'B'",
    "Pudsey 'C'",
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
    "Bradford Vets (A)",
    "Bradford Vets (B)",
    "Saturday Bradford (A)",
    "Saturday Bradford (B)",
    "Saturday Bradford (C)",
]

# Some leagues have different number of players depending on the division. Make sure you match the team name exactly as it appears in teamDays
teamsWithWithDifferentNumberOfPlayersToLeagueNorm = []  # update for Sat C in 2025


# Every player (lowercase)
players = [
    "richard hodgson",
    "stewart watson",
    "linda barrand",
]

# Players with different spellings of name (lowercase). Also need to add to deduplicateNames function
duplicatePlayerNames = ["stuart watson"]

# Add players who play for other teams in leagues the team player in (lowercase)
traitorPlayers = {
    "Monday AireWharfe": [],
    "AireWharfe Vets": ["stewart watson"],
    "Mirfield": [],
    "Half Holiday Bradford": ["stewart watson"],
    "Spen Valley": ["stewart watson"],
    "Bradford Vets": [],
    "Saturday Bradford": ["stewart watson"],
}
