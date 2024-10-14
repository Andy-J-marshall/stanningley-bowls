import json
from datetime import date

year = str(date.today().year)

def findEndRowOfFile(league, allRowsInFile):
    endRow = 0
    for rowNumber, line in enumerate(allRowsInFile, start=0):
        endRow = rowNumber
        
    if endRow == 0:
        raise Exception(league + ': Report file is empty')
    
    return endRow

def saveFile(filename, dataToExport):
    with open(filename, 'w') as jsonFile:
        json.dump(dataToExport, jsonFile, indent=4)
        print(filename + ' created')
        print('------')
        jsonFile.close()