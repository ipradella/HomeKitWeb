FROM python:3.11-slim

WORKDIR /app

COPY weather_client/openweather/ /app/

RUN pip install --no-cache-dir requests influxdb-client

CMD ["python", "collector.py"]
