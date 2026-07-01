# Test Plan Before Real Data

## Backend
- [ ] `/` vracia status running
- [ ] `/docs` sa otvorí
- [ ] `POST /runtime/load` prijme sample bundle
- [ ] `GET /runtime/entities` vráti objekty
- [ ] `GET /runtime/steward` vráti odporúčania
- [ ] `GET /runtime/tasks` vráti úlohy
- [ ] `GET /runtime/geojson` vráti FeatureCollection
- [ ] `GET /runtime/graph` vráti nodes/edges
- [ ] `GET /runtime/snapshot` vytvorí snapshot

## Frontend
- [ ] port 5173 sa otvorí
- [ ] UI sa načíta
- [ ] upload sample_bundle funguje
- [ ] upload GPS CSV funguje
- [ ] upload photo log funguje
- [ ] zobrazia sa objekty
- [ ] zobrazia sa úlohy
- [ ] Steward panel sa aktualizuje
