-- Revert climat-guardian:2024-07-10 from pg

BEGIN;

    revoke select on table api.esp from esp32;

COMMIT;
