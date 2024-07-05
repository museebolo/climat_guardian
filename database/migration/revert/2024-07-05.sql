-- Revert climat-guardian:2024-07-05 from pg

BEGIN;

        revoke delete on api.users from web_user; -- any user can remove users

COMMIT;
