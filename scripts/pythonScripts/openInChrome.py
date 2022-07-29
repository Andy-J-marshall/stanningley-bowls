import webbrowser
import teamDetails

mondayFilename = 'file://' + teamDetails.mondayStatsFilename
tuesdayFilename = 'file://' + teamDetails.tuesdayStatsFilename
thursdayFilename = 'file://' + teamDetails.thursdayStatsFilename
saturdayFilename = 'file://' + teamDetails.saturdayStatsFilename

webbrowser.open(mondayFilename)
webbrowser.open(tuesdayFilename)
webbrowser.open(thursdayFilename)
webbrowser.open(saturdayFilename)
