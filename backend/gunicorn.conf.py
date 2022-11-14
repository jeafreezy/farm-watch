bind = "0.0.0.0:8080"
workers = 2
backlog = 2048
timeout = 30
keepalive = 2
log_file = "-"
loglevel = "info"
worker_connections = 1000
max_requests = 1000
max_requests_jitter = 50
#Uvicorn's gunicorn worker class
worker_class = "uvicorn.workers.UvicornWorker"