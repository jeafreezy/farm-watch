bind = "0.0.0.0:8000"
workers = 2

#Uvicorn's gunicorn worker class

worker_class = "uvicorn.workers.UvicornWorker"