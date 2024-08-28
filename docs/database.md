# Database

> TODO:
> explain database choice
> explain how to setup the database
> explain the migration managment tool choice
> how to use the migration tool
> migration creation example

## Database choice

We have decided to use [PostgreSQL](https://www.postgresql.org/) as the primary data source for the application.
The choice of Postges is primarily motivated by :
- Many advanced and useful data types of which we want to take advantage.
- Many time series extensions, this allows future enhancement.
- A strong reputation and community.
- Allows the use of [PostgREST](https://docs.postgrest.org/en/v12/).
- Fine tunable database engine to fit small to big needs.

## Database structure

> TODO : Add database diagram

## Migrations management

As the project is structured with different microservices, we have decided to use a generic migration tool.
This allows us to manage migrations without depending on one of the components of the app (like a backend framework).

[Squitch](https://sqitch.org/) is the chosen migration tool, it allows to use directly SQL to manage
changes, supports multiple database engines, flexible migration ordering with dependencies.
Notably, sqitch provide "git like" tool to rebase and merge migrations from different contributors in the migration plan
preserving database integrity.

### How to migrate the database from zero

Actually, the migrations will automatically run on each container restart.
The migrations are applied from a dedicated container that executes sqitch.

> TODO: add instructions to run sqitch from CLI.

### Migrations structure

Each sqitch migrations are separated in 3 files :

- `deploy/name-of-the-migration.sql` : contains DDL statements that create or update the database.
- `revert/name-of-the-migration.sql` : contains DDL statements to roll back the migration changes if needed.
- `verify/name-of-the-migration.sql` : contains statements to verify that the migration produced the expected result.

When you create a migration, you should carefully write your code in the 3 files of your migration.
Be aware that if you migration make change to the db (for example a column type change), you need to
add specific statements to transfer the potentially already existing data to the new column.

### Creating new migration with sqitch

```shell
# Move onto the migrations folder
cd database/migration
# run sqitch add command
./sqitch add <migration-name> -n 'Short migration description (like a commit message)'
```
This will create the 3 migration files, you're now ready to write SQL.
