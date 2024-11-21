import os
import clubDetails
import fileUtils

teamDays = clubDetails.allDays
year = fileUtils.year

files = []
for team in teamDays:
    files.append(f"{os.getcwd()}/bowlsnetReports/{year}/{team}.txt")

for file in files:
    if os.path.exists(file):
        os.remove(file)
