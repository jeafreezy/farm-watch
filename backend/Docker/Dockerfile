FROM python:3.8.13-slim-buster

WORKDIR /app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on 

#source: https://stackoverflow.com/questions/53835198/integrating-python-poetry-with-docker

#Upgrade pip, install poetry, export poetry to requirements.txt and install the requirement files
# RUN pip3 install --no-cache-dir --upgrade pip
# RUN pip3 install poetry
# COPY poetry.lock pyproject.toml ./
# RUN poetry export --without-hashes --format=requirements.txt > requirements.txt



#install geospatial libraries -> GDAL, PROJ and GEOS

#GDAL -> For geospatial data read & write
RUN apt-get update && apt-get install --yes libgdal-dev

RUN apt-get install -y software-properties-common
RUN apt-get update


# install Fiona

RUN pip3 install Fiona

# GEOS -> For geometry manipulation
# Source: Official geos doc -> https://libgeos.org/usage/install/#ubuntu
# RUN add-apt-repository ppa:ubuntugis/ppa
# RUN apt-get install -y libgeos-dev

#PROJ -> For projection
# Source: https://proj.org/install.html

RUN apt-get install -y proj-bin


RUN pip3 install -r requirements.txt

#copy other project files including .env
# Create a user group 'xyzgroup'
# RUN addgroup -S farmwatch

# # Create a user 'appuser' under 'xyzgroup'
# RUN adduser -S -D -h /usr/app/src dev farmwatch

# # Chown all the files to the devr.
# RUN chown -R dev:farmwatch /usr/app

# # Switch to 'dev'
# USER dev

COPY .. . 

EXPOSE 8000
ENTRYPOINT [ "sh","entrypoint.sh" ]
