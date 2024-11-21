import os
import fileUtils

year = fileUtils.year

dirName = f"bowlsnetReports/{year}"
if not os.path.exists(dirName):
    os.makedirs(dirName)
