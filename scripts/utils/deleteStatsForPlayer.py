import os
import json

# This script will delete a player from all JSON files in the src/data folder

# Define the path to the src/data folder
data_folder = "src/data"

# Set the name of the property to delete
playerNameToDelete = "phil thornton"
# Set the years to exclude
statYearsToKeep = ["2019", "2020"]

# Iterate through each file in the folder
for filename in os.listdir(data_folder):
    # Check if the filename includes any of the years to keep
    if any(year in filename for year in statYearsToKeep):
        continue
    if filename.endswith(".json"):
        file_path = os.path.join(data_folder, filename)

        # Open and load the JSON data
        with open(file_path, "r") as file:
            data = json.load(file)

        # Check if 'playerResults' exists and is a dictionary
        if "playerResults" in data and isinstance(data["playerResults"], dict):
            # Remove player stats if they exist
            if playerNameToDelete in data["playerResults"]:
                del data["playerResults"][playerNameToDelete]

        # Save the modified JSON data back to the file
        with open(file_path, "w") as file:
            json.dump(data, file, indent=4)
