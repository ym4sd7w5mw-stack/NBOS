# NBOS Open Sensor Architecture

NBOS nebude viazaný na jednu značku senzorov.

## Princíp

Každý senzor je len zdroj dát.

NBOS podporuje:

- Ecowitt
- Home Assistant
- MQTT
- ESP32
- LoRaWAN
- Hunter Hydrawise
- kamery
- meteostanice
- manuálne merania
- import CSV

## Základná dátová cesta

Sensor → Gateway → Home Assistant / MQTT → NBOS → AI Steward

## Odporúčaný štart

### Meteo
Ecowitt stanica ako hlavný meteo zdroj.

### Pôda
6–12 pôdnych senzorov podľa zón.

### Voda
- prietokomer pri čerpadle
- tlakový senzor
- hladinomer
- stav čerpadla
- elektromer čerpadla

### Závlaha
Hunter Hydrawise + flow meter + ventily.

## NBOS cieľ

NBOS má vedieť odpovedať:

- kde je sucho,
- koľko vody sa minulo,
- či čerpadlo pracuje normálne,
- či niekde uniká voda,
- ktoré zóny treba zaliať,
- či závlahu skrátiť podľa dažďa.