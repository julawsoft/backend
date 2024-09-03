# BACKEND - JULAW

## PRE-REQUIREMENTS
    - docker
    - docker-compose

## INSTALL
    ```sh
        # create a .env files
        cp .env.example .env
        cp ./api/.env.example ./api/.env

        # build and up start api
        docker-compose up --build

        http://localhost:3000/api/v1/
    ```

## API js-DOCs
- jsdoc src --recurse -d docs
