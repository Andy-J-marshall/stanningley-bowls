import playerStatsHelper

teamNames = [
    "Littlemoor",
    "Littlemoor A",
    "Littlemoor B",
    "Littlemoor 'A'",
    "Littlemoor 'B'",
    "Littlemoor - A",
    "Littlemoor - B",
    "Pudsey Littlemoor",
    "Pudsey Littlemoor A",
    "Pudsey Littlemoor B",
    "Pudsey Littlemoor 'A'",
    "Pudsey Littlemoor 'B'",
    "Pudsey Littlemoor - A",
    "Pudsey Littlemoor - B",
    "Littlemoor BC",
    "Littlemoor BC A",
    "Littlemoor BC B",
    "Littlemoor BC 'A'",
    "Littlemoor BC 'B'",
    "Littlemoor BC - A",
    "Littlemoor BC - B",
    "Littlemoor WMC",
    "Littlemoor WMC A",
    "Littlemoor WMC B",
    "Littlemoor WMC 'A'",
    "Littlemoor WMC 'B'",
    "Littlemoor WMC - A",
    "Littlemoor WMC - B",
    "Littlemoor S&SC",
    "Littlemoor S&SC A",
    "Littlemoor S&SC B",
    "Littlemoor S&SC 'A'",
    "Littlemoor S&SC 'B'",
    "Littlemoor S&SC - A",
    "Littlemoor S&SC - B",
    "Littlemoor S & SC",
    "Littlemoor S & SC A",
    "Littlemoor S & SC B",
    "Littlemoor S & SC 'A'",
    "Littlemoor S & SC 'B'",
    "Littlemoor S & SC - A",
    "Littlemoor S & SC - B",
]
displayTeamName = "Littlemoor"

# Days played (add duplicate days for second teams suffixed with (A) or (B) etc.)
teamDays = [
    "Monday Bradford",
    "Monday AireWharfe",
    "Mirfield (A)",
    "Mirfield (B)",
    "Wednesday Half Holiday Bradford (A)",
    "Wednesday Half Holiday Bradford (B)",
    "Spen Valley (A)",
    "Spen Valley (B)",
    "Thursday Vets Bradford",
    "Saturday Bradford (A)",
    "Saturday Bradford (B)",
]

# Every player (lowercase)
players = [
    "andy marshall",
    "alyssa randell",
    "paul bowes",
    "john armitage",
    "jim moorin",
    "stewart watson",
    "stuart potter",
    "martin fulton",
    "phil thornton",
]

# Players with different spellings of name (lowercase). Also need to add to deduplicateNames function
duplicatePlayerNames = [
    "stuart watson",
    "andrew marshall",
    "james moorin",
    "phillip thornton",
    "philip thornton",
]


# Add alternative names for players (lowercase)
def deduplicateNames(name):
    name = playerStatsHelper.standardiseName(name)
    if name == "andrew marshall":
        name = "andy marshall"
    if name == "stuart watson":
        name = "stewart watson"
    if name == "james moorin":
        name = "jim moorin"
    if name == "philip thornton":
        name = "phil thornton"
    if name == "phillip thornton":
        name = "phil thornton"
    return name


# Add players who play for other teams in leagues the team player in (lowercase)
traitorPlayers = {
    "Monday Bradford": ["john stocks"],
    "Monday AireWharfe": ["stewart watson", "lee wider", "paul jacques"],
    "Mirfield": ["stewart watson"],
    "Wednesday Half Holiday Bradford": ["john stocks"],
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

# Other leagues that players play in for other teams (lowercase)
otherLeagues = [
    "Tuesday AireWharfe",
    "Monday Combined Leeds",
    "Tuesday Vets Leeds",
    "Tuesday Leeds",
    "Wednesday Half Holiday Leeds",
    "Wednesday Pairs AireWharfe",
    "Thursday Vets Leeds",
    "Saturday Leeds",
]

# Other teams that players play for (lowercase)
otherTeams = [
    "stanningley",
    "pudsey",
    "farsley",
    "new wortley",
    "wibsey",
]

allDays = teamDays + otherLeagues
teamsTracking = teamNames + otherTeams
