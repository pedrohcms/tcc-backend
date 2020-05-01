# Welcome to the database configuration documentation!

### Here you will learn in a few steps how to get your database up and running!

## Step One:

You should see a `.env.example` file in the root of the application, copy and paste it to create a new one and rename it to `.env`, if you already have this file created just ignore this step.

## Step Two:

Now we must configure the enviroment variables inside your `.env` file. Here is a list of the variables you need to take a look.

**Note**: This API is being developed with Postgres, so other databases may not work correctly.

1. `NODE_ENV`: This variable represents the enviroment where the application is running, the current suported value is `development`. If you alredy have this variable set do not need to change it;

2. `DB_USERNAME`: This is the database username, the default username for Postgres databases is `postgres`;

3. `DB_PASSWORD`: This is the database password, by default Postgres databases do not have a password;

4. `DB_NAME`: This is the database name;

5. `DB_HOST`: This is the host for you database, if you are running it on your computer the default value is `localhost`;

6. `DB_PORT`: This is the port where your database service is listening, the variable is optional, you should use it when you have multiple versions of the same database running at the same time. The default value for Postgres is 5432;

7. `DB_DIALECT`: This variable represents which database you are using. he dialect values can be: `mysql`, `mariadb`, `postgres` and `mssql`;

## Step Three:

With the enviroment variables set, our application can connect with database. Now we need to run our table migrations to create our database tables. To do this run one of the following command in our terminal:

- `npx sequelize-cli db:migrate` if you are using `npm` as a package manager;
- `yarn sequelize-cli db:migrate` if you are using `yarn` as package manager;

After these steps, your database should be set and ready to go, now start the application and **let's code**!
