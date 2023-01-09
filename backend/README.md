# Farm Watch Backend

## Functionalities

1. Data manager - Handle data upload, transformation and conversion from the FE
2. Farm analytics & insight
3. Near real time crop monitoring
4. Weather information and forecast
5. Authentication with OSM

## Stack

- Framework: [**Fast API**](https://fastapi.tiangolo.com/)

  - Best practices inspiration : https://github.com/zhanymkanov/fastapi-best-practices#1-project-structure-consistent--predictable

- Development

  - IDE - Vscode
  - Formatter - Black
  - Package manager - Poetry
  - Linting - Mypy
  - Containerization - Docker

- Dependencies
  - Pydantic

## Usage

- To start the dev server locally

      uvicorn main:app --reload

- To create migration

      alembic revision --autogenerate  -m "initial models"

- To make migrations

      alembic upgrade base
      alembic downgrade base -> reverts all changes

- To build the Docker image and start the container

      docker build -t backend:dev .

- To start the container

      docker run -d --name devcontainer -p 8000:8000 backend:dev

## Terms

- Field : A land used for agricultural purposes. These lands are represented with polygon geometries.

