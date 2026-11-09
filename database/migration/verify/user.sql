-- Verify climat-guardian:user on pg

BEGIN;

        select * from api.users;

ROLLBACK;
