#!/usr/bin/env bash
set -e
python -m compileall backend/app
python tests/runtime_smoke_test.py
echo "NBOS quick check OK"
