import os
import utils

files = utils.findReportFiles()

for file in files:
    if os.path.exists(file):
        os.remove(file)
