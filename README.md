start docker compose.

# General architecture.

```mermaid
---
config:
  layout: dagre
  look: neo
---

graph TD
  subgraph On Site
    subgraph Bluetooth Devices
      Ruuvi1[Ruuvi Tag 1]
      Ruuvi2[Ruuvi Tag 2]
      Ruuvi3[Ruuvi Tag 3]
    end

    subgraph Raspi Zero
      WC[Weather Collector]
    end
  end

  subgraph Docker Server
    DB[InfluxDB]
    Graf[Grafana]
  end

  Browser[Browser]

  Ruuvi1 --> WC
  Ruuvi2 --> WC
  Ruuvi3 --> WC

  Browser --> Graf
  WC --> DB
  Graf --> DB

```
## Influx Data

point
-----

```
Measurement:     météo
Tags:            lieu=salon, capteur=DHT22
Fields:          temperature=23.4, humidite=45.8
Timestamp:       2025-06-13T10:15:00Z
```