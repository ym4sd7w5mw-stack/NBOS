# NBOS v1.8 – GitHub Starter

Toto je jeden kompletný štartovací balík, ktorý spája praktický projekt z v1.6 a organizačné doplnky z v1.7.

## Čo obsahuje

- FastAPI backend
- React/Vite frontend
- UI upload pre JSON field package
- UI upload pre GPS CSV
- UI upload pre photo log CSV
- AI Steward report
- Tasks
- GeoJSON export
- QGIS manifest
- PostGIS DDL preview
- Knowledge Graph
- Impact analysis
- Timeline event endpoint
- Scheduler suggestions
- Sensor/MQTT helper
- Drone manifest scaffold
- GitHub Codespaces `.devcontainer`
- GitHub Actions CI
- Issue templates
- Pull request template
- Milestones / backlog
- Test plan
- iPhone PWA plán
- sample dáta pre Novú Bošácu

## Ako začať

### Backend

```bash
bash scripts/run_backend.sh
```

API:

```text
http://localhost:8000/docs
```

### Frontend

```bash
bash scripts/run_frontend.sh
```

Frontend:

```text
http://localhost:5173
```

## Prvý test

1. Otvor frontend.
2. Nahraj:
   `examples/nova_bosaca_field_package/sample_bundle.json`
3. Skontroluj objekty, úlohy a Steward report.
4. Otestuj aj GPS/photo CSV šablóny.

## GitHub

Tento priečinok môžeš nahrať priamo do nového GitHub repozitára `NBOS`.
