#!/usr/bin/env bash

echo "Starting NBOS services..."

cd /workspaces/NBOS/backend
source .venv/bin/activate
nohup uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 > /tmp/nbos-backend.log 2>&1 &

cd /workspaces/NBOS/frontend
nohup npm run dev -- --host 0.0.0.0 > /tmp/nbos-frontend.log 2>&1 &

echo "NBOS backend starting on port 8000"
echo "NBOS frontend starting on port 5173"
echo "Logs:"
echo "  Backend:  /tmp/nbos-backend.log"
echo "  Frontend: /tmp/nbos-frontend.log"