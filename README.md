# BACKEND - JULAW
- about the software

# RUN WITHOUT DOCKER

- running local database
- configure database settings in app/config/config.json
- configure database settings in app/.env 
- install the packages: npm install --save
- to run api: cd app/ npm run dev
- make sure you hava keycloak server is running




# RUN WITH DOCKER

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

- cd app / npm run sequelize-cli db:migration
- cd app / npm run sequelize-cli db:seed



# DOCs

## TO GENERATE DOCS
- npx jsdoc src --recurse -d docs

## TO RUNNINT THE DOCS
- npx http-server ./docs --port 8090

- link: https://www.npmjs.com/package/http-server



# SEQUELIZE
## Sequelize - notes
- npx sequelize-cli migration:create --name create_users_table
- npx sequelize-cli db:migrate
- npx sequelize-cli db:migrate:undo:all
- npx sequelize-cli db:drop
- npx sequelize-cli db:create
- npx sequelize-cli seed:create --name seed-users
- npx sequelize-cli db:seed:all
- npx sequelize-cli db:seed:undo
- npx sequelize-cli db:seed:undo:all



## KEY WORDS KEYCLOAK
- realm
- client
- user
- group
- role 
- 

- url : http://localhost:8089