-- Revert climat-guardian:user from pg

BEGIN;

        drop table api.users;

COMMIT;
