import os

bowlsnet_report_directory = "bowlsnetReports"

# Set the current and new file names
current_file_name = "Tuesday Leeds.txt"
new_file_name = "Leeds Tuesday.txt"

# Loop through every subdirectory of bowlsnet_report_directory
for root, dirs, files in os.walk(bowlsnet_report_directory):
    # Construct the full file paths
    current_file_path = os.path.join(root, current_file_name)
    new_file_path = os.path.join(root, new_file_name)

    # Rename the file if it exists
    if os.path.exists(current_file_path):
        os.rename(current_file_path, new_file_path)
        print(f"Renamed {current_file_name} to {new_file_name} in {root}")
    else:
        print("File not found in", root)
