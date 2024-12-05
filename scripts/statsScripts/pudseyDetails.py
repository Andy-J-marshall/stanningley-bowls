teamNames = [
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
    "Pudsey BC 'C' at Tyersal",
]
displayTeamName = "Pudsey"

# Days played (add duplicate days for second teams suffixed with (A) or (B) etc.)
teamDays = [
    # "Monday Bradford", # TODO only 2018-22
    "Monday AireWharfe (A)",
    "Monday AireWharfe (B)", # TODO no B team in 2018- 2022?
    "AireWharfe Vets",  # TODO only 2023 and beyond
    "Mirfield (A)",
    "Mirfield (B)",
    # "Mirfield (C)", # TODO only 2024 and beyond
    "Half Holiday Bradford (A)",
    "Half Holiday Bradford (B)",
    "Spen Valley (A)",
    "Spen Valley (B)",
    "Spen Valley (C)",
    "Spen Valley (D)",  # TODO only 2019 and beyond
    "Bradford Vets (A)",
    "Bradford Vets (B)",
    "Saturday Bradford (A)",
    "Saturday Bradford (B)",
    "Saturday Bradford (C)",
]

# Some leagues have different number of players depending on the division. Make sure you match the team name exactly as it appears in teamDays
teamsWithWithDifferentNumberOfPlayersToLeagueNorm = []  # update for Sat B in 2025


# Every player (lowercase)
players = [
    "richard hodgson",
    "stewart watson",  # be careful of littlemoor games in 2023-4 (and check Farsley e.g. vets and Stanningley (Bradford Half Holiday)
    "linda barrand",  # 2021-24
    # "paul bowes",  # 2013-14, 2018-19 (be careful of stanningley half hol and aw mon games)
    # "joey broadbent",  # TODO 1 game in 2019
    # "mary spears", # TODO add in (also all team stats) 2021-22
    # "geoff hodgson", TODO add in (also all team stats) Up to 2015
]

# Players with different spellings of name (lowercase). Also need to add to deduplicateNames function
duplicatePlayerNames = ["stuart watson"]

# Add players who play for other teams in leagues the team player in (lowercase)
traitorPlayers = {
    "Monday Bradford": [],  # TODO remove this
    "Monday AireWharfe": ["paul bowes", "joey broadbent"],  # TODO Paul except 2013-14
    "AireWharfe Vets": ["stewart watson"],
    "Mirfield": ["paul bowes"],  # TODO remove paul 2015-7, 2020-24
    "Half Holiday Bradford": [
        "paul bowes",
        "stewart watson",
    ],  # TODO remove stewart in 2021 only
    "Spen Valley": [
        "paul bowes",
        "stewart watson",
    ],  # TODO remove stewart 2022 and before, and paul 2015-7, 2020-24
    "Bradford Vets": [],
    "Saturday Bradford": ["stewart watson"],  # TODO remove stewart 2022 and before
}
