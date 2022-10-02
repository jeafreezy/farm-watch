# Farm Watch Backend

## Functionalities

1. Data manager - Handle data upload, transformation and conversion from the FE
2. Farm analytics & insight

3. Near real time crop monitoring

4. Weather information and forecast

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

       uvicorn --app-dir=./src main:app --reload
