import os
import utils

htmlFiles = utils.findHtmlFiles()

for file in htmlFiles:
    if os.path.exists(file):
        os.remove(file)
