-- Deploy climat-guardian:2024-07-05 to pg

BEGIN;

        grant delete, select on api.users to web_user; -- any user can remove users
        alter table api.users alter column password type varchar(255);

COMMIT;
