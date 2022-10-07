#!/bin/sh

# Start Gunicorn
echo "Starting Uvicorn"

uvicorn --host 0.0.0.0 --port 8000 main:app --reload
