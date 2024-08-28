# Database

> TODO:
> explain database choice
> explain how to setup the database
> explain the migration managment tool choice
> how to use the migration tool
> migration creation example

## Database choice

We have decided to use [PostgreSQL](https://www.postgresql.org/) as the primary data source for the application.
The choice of Postges is primariliy motivated by :
- Many advanced and useful data types of which we want to take advantage.
- Many time series extensions, this allows future enhancement.
- A strong reputation and community.
- Allows the use of [PostgREST](https://docs.postgrest.org/en/v12/).
- Fine tunable database engine to fit small to big needs.

## Database structure

> TODO : Add database diagram

## Migrations management

As the project is structured with diffrent microservices, we have decided to use a generic migration tool.
This allows to manage migrations without depending on one of the component of the app (like a backend framework).

[Squitch](https://sqitch.org/) is the chosen migration tool, il allows to use directly SQL to manage
changes, supports multiple database engines, flexible migration ordering with dependencies.

### How to migrate the database from zero

If you start with an empty database, and you want to create all the database structure :

> NOTE : The docker compose setup provided apply migrations automatically.

```shell
cd database/migrations # Where the migration script is located
# Launch the migration
sqitch deploy db:pg:climat-guardian
```

> The sqitch configuration (like database login information) is located in the `sqitch.conf` file.
> The `squitch.plan` file contains the plan of execution for the different migrations.
> Please note that the database **must exist** before running the migrations `createdb climate-guardian`.

### Migrations structure

Each sqitch migrations are separated in 3 files :
