-- Revert climat-guardian:postgrest from pg

BEGIN;

        drop schema api;
        drop role authenticator;

COMMIT;
