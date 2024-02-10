
"""

This used to modify the error coming from RequestValidationError to more readable one dcssdsfsdfsdfsdfsdf   

"""
def get_excpetion_data(error_json):
    return [
        (loc[1], item["msg"]) if "msg" in item else (loc[1], None)
        for item in error_json
        if "loc" in item
        for loc in [item["loc"]]
    ]