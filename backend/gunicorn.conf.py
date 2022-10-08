bind = "0.0.0.0:8080"
workers = 2

#Uvicorn's gunicorn worker class

worker_class = "uvicorn.workers.UvicornWorker"