import os
import teamDetails

mondayFilename = teamDetails.mondayStatsFilename
tuesdayFilename = teamDetails.tuesdayStatsFilename
thursdayFilename = teamDetails.thursdayStatsFilename
saturdayFilename = teamDetails.saturdayStatsFilename

if os.path.exists(mondayFilename):
    os.remove(mondayFilename)
if os.path.exists(tuesdayFilename):
    os.remove(tuesdayFilename)
if os.path.exists(thursdayFilename):
    os.remove(thursdayFilename)
if os.path.exists(saturdayFilename):
    os.remove(saturdayFilename)
