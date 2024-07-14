import openpyxl
from datetime import date
import utils

teamDays = utils.teamDays

year = str(date.today().year)

# Open Excel
path_xlsx = 'files/bowlsresults' + year + '.xlsx'
wb = openpyxl.load_workbook(filename=path_xlsx)

textFilesProcessed = []
for teamName in teamDays:
    # Checks A/B team data not processed twice
    teamName = teamName.replace(' (A)', '').replace(' (B)', '')
    print('copying report: ' + teamName)
    
    # Open each text file and copies context
    path_txt = 'files/bowlsnetReports/' + teamName + '.txt'
    with open(path_txt, "r") as txt_file:
        values_list = [line.strip() for line in txt_file]
    
    # Pastes data into Excel
    if teamName not in textFilesProcessed:
        ws = wb[teamName]
        for i, value in enumerate(values_list, start=1):
            ws.cell(row=i, column=1).value = value
    textFilesProcessed.append(teamName)

# Save Excel file
wb.save(path_xlsx)
