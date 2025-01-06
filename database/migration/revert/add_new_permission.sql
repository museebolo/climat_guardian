-- Revert climat-guardian:add_new_permission from pg

BEGIN;

        revoke update on api.users to web_user; -- any user can edit users

COMMIT;
