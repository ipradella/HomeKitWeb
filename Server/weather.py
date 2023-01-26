import requests
import time
import os

from config import *

api_openweather_base_url = "https://api.openweathermap.org/data/2.5/weather?"
api_openweather_key = os.environ.get('OPENWEATHER_TOKEN')
api_influxdb_key_ =  os.environ.get('INFLUXDB_TOKEN')

get_weather_url = api_openweather_base_url + \
    "&lat="+ str(ANGLEUR["coord"]["lat"]) + \
    "&lon=" + str(ANGLEUR["coord"]["lon"]) +\
    "&units=metric" +"&appid=" + api_openweather_key 

# ==================================================================================================

def printResult(current_temperature, current_pressure, current_humidity, weather_description):
    print("Temperature (in degrees unit) = " + str(current_temperature))
    print("Atmospheric pressure (in hPa unit) = " + str(current_pressure))
    print("Humidity (in percentage) = " + str(current_humidity))
    print("Description = " + str(weather_description))
    print("=========================================")

# ==================================================================================================

def getWeather(printResult, get_weather_url):
    response = requests.get(get_weather_url).json()

    if response["cod"] == 200:
        main = response["main"]

        current_temperature = main["temp"]
        current_pressure = main["pressure"]
        current_humidity = main["humidity"]

        weather = response["weather"]
        weather_description = weather[0]["description"]

        printResult(current_temperature, current_pressure, current_humidity, weather_description)

    else:
        print(response["message"])

# ==================================================================================================

    def postWeather():
        print("Insert weather point on influx.")

# ==================================================================================================
    
while(True):
    getWeather(printResult, get_weather_url)
    time.sleep(WEATHER_REFRESH_DELAY)