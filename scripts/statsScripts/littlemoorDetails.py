teamNames = [
    "Littlemoor",
    "Littlemoor A",
    "Littlemoor B",
    "Littlemoor 'A'",
    "Littlemoor 'B'",
    "Littlemoor - A",
    "Littlemoor - B",
    "Littlemoor WMC",
    "Littlemoor BC",
    "Pudsey Littlemoor",
    "Pudsey Littlemoor A",
    "Pudsey Littlemoor B",
    "Pudsey Littlemoor 'A'",
    "Pudsey Littlemoor 'B'",
    "Pudsey Littlemoor - A",
    "Pudsey Littlemoor - B",
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
