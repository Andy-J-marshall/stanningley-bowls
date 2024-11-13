import os
import teamDetails
import utils

teamDays = teamDetails.allDays
year = utils.year

files = []
for team in teamDays:
    files.append(os.getcwd() + "/bowlsnetReports/" + year + "/" + team + ".txt")

for file in files:
    if os.path.exists(file):
        os.remove(file)
