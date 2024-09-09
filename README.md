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

## RUN MIGRATIONS
- npm run db:migration
- npm run db:seed


## API js-DOCs
- jsdoc src --recurse -d docs


## Sequelize - notes
- npx sequelize-cli migration:create --name create_users_table
- npx sequelize-cli db:migrate

- npx sequelize-cli seed:create --name seed-users
- npx sequelize-cli db:seed:all
- npx sequelize-cli db:seed:undo
- npx sequelize-cli db:seed:undo:all

