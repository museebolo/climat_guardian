-- Deploy climat-guardian:add_new_permission to pg

BEGIN;

grant delete on api.data to web.user -- any user can delete ESP

COMMIT;
