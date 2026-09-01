-- Deploy climat-guardian:add_new_permission to pg

BEGIN;

        grant update on api.users to web_user; -- any user can edit users

COMMIT;
