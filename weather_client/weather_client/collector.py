import os
import time
import requests
from influxdb_client import InfluxDBClient, Point
from influxdb_client.client.write_api import SYNCHRONOUS

INFLUX_URL = os.getenv("INFLUX_URL")
INFLUX_TOKEN = os.getenv("INFLUX_TOKEN")
INFLUX_ORG = os.getenv("INFLUX_ORG")
INFLUX_BUCKET = os.getenv("INFLUX_BUCKET")

client = InfluxDBClient(url=INFLUX_URL, token=INFLUX_TOKEN, org=INFLUX_ORG)
write_api = client.write_api(write_options=SYNCHRONOUS)

API_URL = "https://api.coindesk.com/v1/bpi/currentprice.json"  # exemple public


def fetch_and_store():
  try:
    r = requests.get(API_URL, timeout=5)
    r.raise_for_status()
    data = r.json()

    usd_price = float(data["bpi"]["USD"]["rate_float"])

    point = Point("bitcoin_price").field("usd", usd_price)
    write_api.write(bucket=INFLUX_BUCKET, org=INFLUX_ORG, record=point)
    print(f"✅ Écrit : BTC/USD = {usd_price}")
  except Exception as e:
    print(f"❌ Erreur : {e}")


if __name__ == "__main__":
  while True:
    fetch_and_store()
    time.sleep(60)
