import requests
import time

from config import *

complete_url = api_openweather_base_url + \
    "&lat="+ str(ANGLEUR["coord"]["lat"]) + \
    "&lon=" + str(ANGLEUR["coord"]["lon"]) +\
    "&units=metric" +"&appid=" + api_openweather_key 

def printResult(current_temperature, current_pressure, current_humidity, weather_description):
    print("Temperature (in degrees unit) = " + str(current_temperature))
    print("Atmospheric pressure (in hPa unit) = " + str(current_pressure))
    print("Humidity (in percentage) = " + str(current_humidity))
    print("Description = " + str(weather_description))
    print("=========================================")

def getWeather(printResult, complete_url):
    response = requests.get(complete_url).json()


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
        
while(True):
    getWeather(printResult, complete_url)
    time.sleep(60)