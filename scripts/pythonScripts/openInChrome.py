import webbrowser
import os

from selenium import webdriver
from selenium.webdriver.common.keys import Keys

mondayFilename = 'file://' + os.getcwd() + '/files/htmlFiles/Monday.html'
tuesdayFilename = 'file://' + os.getcwd() + '/files/htmlFiles/Tuesday.html'
thursdayFilename = 'file://' + os.getcwd() + '/files/htmlFiles/Thursday.html'
saturdayFilename = 'file://' + os.getcwd() + '/files/htmlFiles/Saturday.html'
webbrowser.open(mondayFilename)
webbrowser.open(tuesdayFilename)
webbrowser.open(thursdayFilename)
webbrowser.open(saturdayFilename)
