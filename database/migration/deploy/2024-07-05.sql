-- Deploy climat-guardian:2024-07-05 to pg

BEGIN;

        grant delete on api.users to web_user; -- any user can remove users

COMMIT;
