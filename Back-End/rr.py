import requests

# Replace 'YOUR_API_KEY' with your actual API key
api_key = "u8StW8d2CddX9I27xmOVhibz7iFPuzPtxYAcVyfD"


url = f"http://developer.nrel.gov/api/nsrdb/v2/solar/himawari-tmy-download.json?api_key={api_key}"

payload = "wkt=POINT(179.99 -16.96)&names=tdy-2020,tgy-2020,tmy-2020&interval=60&email=usjaqkakskslaoqkak@gmail.com"
params = {
    "api_key": api_key,
    "wkt": "POINT(179.99 -16.96)",  # Latitude of the location
    "names": 'tdy-2020,tgy-2020,tmy-2020',  # Longitude of the location
    "interval": 60,  # Requested data attributes (global, direct, and diffuse irradiance)
    "email": "usjaqkakskslaoqkak@gmail.com",  # Year for which data is requested
}

headers = {
    "content-type": "application/x-www-form-urlencoded",
    "cache-control": "no-cache",
}

response = requests.request("POST", url, params=payload, headers=headers)

print(response.text)
