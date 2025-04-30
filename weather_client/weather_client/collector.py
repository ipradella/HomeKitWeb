import os
import time
from openweather.weather import getWeather
from requests.exceptions import HTTPError
from influxdb_client import InfluxDBClient, Point
from influxdb_client.client.write_api import SYNCHRONOUS

INFLUX_URL = os.getenv("INFLUX_URL")
INFLUX_TOKEN = os.getenv("INFLUX_TOKEN")
INFLUX_ORG = os.getenv("INFLUX_ORG")
INFLUX_BUCKET = os.getenv("INFLUX_BUCKET")

client = InfluxDBClient(url=INFLUX_URL, token=INFLUX_TOKEN, org=INFLUX_ORG)
write_api = client.write_api(write_options=SYNCHRONOUS)

getWeather


def fetch_and_store():
  try:
    getWeather()

    point = (
        Point("weather")
        .tag("sensor_id", "weatherapi")
        .tag("location", "outside")
        .field("temp", 38)
    )
    write_api.write(bucket=INFLUX_BUCKET, org=INFLUX_ORG, record=point)

  except HTTPError as e:
    print(f"❌ Error : {e}")


if __name__ == "__main__":
  while True:
    fetch_and_store()
    time.sleep(60)
