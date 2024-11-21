import os
import clubDetails
import fileUtils

teamDays = clubDetails.allDays
year = fileUtils.year

dirName = f"bowlsnetReports/{year}"
if not os.path.exists(dirName):
    os.makedirs(dirName)
else:
    files = []
    for team in teamDays:
        files.append(f"{os.getcwd()}/{dirName}/{team}.txt")

    for file in files:
        if os.path.exists(file):
            os.remove(file)
