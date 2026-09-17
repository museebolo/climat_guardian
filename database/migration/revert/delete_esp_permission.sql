-- Revert climat-guardian:delete_esp_permission from pg

BEGIN;

    REVOKE DELETE ON api.esp FROM web_user; -- any user can't anymore delete ESP
    REVOKE DELETE ON api.data FROM web_user; -- any user can't anymore delete ESP's data

COMMIT;
