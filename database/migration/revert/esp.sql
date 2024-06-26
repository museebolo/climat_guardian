-- Revert climat-guardian:esp from pg

BEGIN;

drop table api.esp;

COMMIT;