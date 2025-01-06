-- Revert climat-guardian:add_new_permission from pg

BEGIN;

revoke delete on api.data to web.user; -- any user can edit users

COMMIT;
