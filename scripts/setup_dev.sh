#!/usr/bin/env bash
set -e

echo "Setting up NBOS development environment..."

cd /workspaces/NBOS/backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

cd /workspaces/NBOS/frontend
npm install

echo "NBOS setup complete."