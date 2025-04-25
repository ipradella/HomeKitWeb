import influxdb_client, os, time
from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS

token = os.environ.get("DOCKER_INFLUXDB_INIT_ADMIN_TOKEN")
org = os.environ.get("DOCKER_INFLUXDB_INIT_ORG")
bucket = os.environ.get("DOCKER_INFLUXDB_INIT_BUCKET")

url = "http://localhost:8086"
client = influxdb_client.InfluxDBClient(url=url, token=token, org=org)

write_api = client.write_api(write_options=SYNCHRONOUS)

for value in range(5):
  point = (
      Point("weather")
      .tag("sensor_id", "weatherapi")
      .tag("location", "outside")
      .field("temp", value)
  )
  write_api.write(bucket=bucket, org=org, record=point)
  time.sleep(1)  # separate points by 1 second
