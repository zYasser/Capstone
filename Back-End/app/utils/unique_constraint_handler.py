import re

def find_column(error_message):
    pattern = r'Key \((.*?)\)=.*?'

# Use re.findall to find all matches of the pattern in the error message
    return re.findall(pattern, error_message)
