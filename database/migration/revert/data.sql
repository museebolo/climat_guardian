-- Revert climat-guardian:data from pg

BEGIN;

        drop table api.data;
        drop function api.avg_date;
        drop function api.insert_data;

COMMIT;
