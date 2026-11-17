-- Verify climat-guardian:data on pg

BEGIN;

        select * from api.data;
        select api.insert_data(25.0, 50.0, '123.123.123.123', 1717796704);
        select * from api.avg_date('day');

ROLLBACK;
