import os

mondayFilename = os.getcwd() + '/files/htmlFiles/Monday.html'
tuesdayFilename = os.getcwd() + '/files/htmlFiles/Tuesday.html'
thursdayFilename = os.getcwd() + '/files/htmlFiles/Thursday.html'
saturdayFilename = os.getcwd() + '/files/htmlFiles/Saturday.html'

if os.path.exists(mondayFilename):
    os.remove(mondayFilename)
if os.path.exists(tuesdayFilename):
    os.remove(tuesdayFilename)
if os.path.exists(thursdayFilename):
    os.remove(thursdayFilename)
if os.path.exists(saturdayFilename):
    os.remove(saturdayFilename)
