-- Deploy climat-guardian:2024-07-10 to pg

BEGIN;

    grant select on table api.esp to esp32;

COMMIT;
