-- Revert climat-guardian:delete_esp_permission from pg

BEGIN;

    revoke delete on api.esp to web_user; -- any user can't anymore delete ESP
    revoke delete on api.data to web_user; -- any user can't anymore delete ESP's data

COMMIT;
