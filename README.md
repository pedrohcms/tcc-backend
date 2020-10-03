# Welcome to the water-tech repository

## This is the repository of our final course assignment

## Integrants:

- Gustavo Alexandre Moimaz Costa

- Henler Mendes Pio Soares

- José Roberto Adolfo Júnior

- Pedro Henrique Correa Mota da Silva

# Setting up your project

## Updating dependencies

Our application will be using some dependencies, so we need make sure they are up to date, to do that run:
`npm i`
Or if your are using yarn:
`yarn install`

## Database configuration:

You should see a `.env.example` file in the root of the application, copy and paste it to create a new one and rename it to `.env`, if you already have this file created just ignore this step.

Now we must configure the enviroment variables inside your `.env` file. Here is a list of the variables you need to take a look.

The first variable we need to configure is `NODE_ENV`, variable represents the enviroment where the application is running, the current suported value is `development`. If you alredy have this variable set do not need to change it;

After that we have the `DB_CLIENT` represents which database client we are using, since we are using postgres in this project this value should be set to **postgres**.

Then we have the `DB_URL` variable, this one is connection string to the database it's shape is:
`database_client://username:password@host:port/database_name`

The database_client is the same as `DB_CLIENT` variable, the username part is the username which owns the database, the password portion is the password for that user. The host is the IP Address where the database is hosted the common value for development enviroment is `localhost` or `127.0.0.1` unless your are using a cloud hosted database then we have the port which the port where your database is running the default value for postgres is `5432`, and last but not least is the database_name which of course is the name of your database.

To test your database connection you can run:
`npx knex migrate:list`
Or if your are using yarn
`yarn knex migrate:list`

If you don't see errors that means your connection is good to go!

## Updating database tables

After you checked your connection with the database you may update your tables using the `update_database.js` script inside the `src/utils` folder, to do that you can simply run:
`node src/utils/update_database.js` passing a argument that is same on knex, so whenever you want to run or latest migrations run the following: `node src/utils/update_database.js migrate:latest`. This will ensure that your database changes based on migrations files and update the prisma files needed in the application, in case some error occur this changes will be undone so your database stay the as before running the migrations.

## Configuring API language

To configure the API return language it is necessary put the `Accept-Language` header in your requests, the current possible values are `pt-BR` and `en-US`, example:
`Accept-Language: en-US`, please note that the default value for language is `en-US`.
