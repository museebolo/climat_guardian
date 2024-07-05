-- Revert climat-guardian:2024-07-05 from pg

BEGIN;

        revoke delete, select on api.users from web_user; -- any user can remove users
        alter table api.users alter column password type varchar(60);

COMMIT;
