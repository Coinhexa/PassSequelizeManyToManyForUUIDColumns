# Sequelize Many To Many Association With UUID Ids

This app was bootstrapped with [Imagine.ai](https://imagine.ai) 💛
> Imagine.ai is an app starter on steroids!
The purpose of this app is to demonstrate that npm run test succeeds when run on a sequelize model User and a sequelize model Role having a many to many relationship via RoleUser both having UUID userId and roleId on sequelize version 6.20.1 whereas the tests fail if the data type of userId and roleId was integer instead on the postgres dialect

### Run the app in terminal
1. Start a Postgres database server on your machine or in the cloud.
2. Set the following environment variables in your .env file

```
POSTGRES_HOST=<address-where-database-running>
POSTGRES_PORT=<port-where-database-running>
POSTGRES_DB=<database-name>
POSTGRES_USER=<username-for-database>
POSTGRES_PASSWORD=<password-to-database>
DB_DIALECT=postgres
```

3. Install packages and start the application server.

```
$ npm install
$ npm start
```

### Run the app inside a Docker container

Build the docker container and get it up and running.

```
$ docker-compose build
$ docker-compose up
```

### Make API calls against the server

1. Go to [http://localhost:8000/swagger](http://localhost:8000/swagger) to see Swagger documentation for API endpoints.
2. Run the APIs by clicking the "Try it now" button on the Swagger page.

### Run admin bro dashboard

Go to [http://localhost:8000/admin](http://localhost:8000/admin)

### Run tests and check code coverage

```
$ npm test
$ npm coverage
```

### Lint your code

```
$ npm lint
$ npm format
```

### Learn More

1. Learn more about:
  - the [Node architecture choices](https://imagine.ai/docs/architecture-node) used.
  - the [best practices](https://imagine.ai/docs/best-practices) followed.

2. Imagine is in beta - here are the [known issues](https://imagine.ai/docs/known_issues) that we are working to fix.
