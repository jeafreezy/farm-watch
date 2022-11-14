#!/bin/sh

# Start Gunicorn
echo "Starting Uvicorn"

gunicorn --config gunicorn.conf.py main:app
# uvicorn --host 0.0.0.0 --port 8000 main:app --reload
