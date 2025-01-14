-- Deploy climat-guardian:delete_esp_permission to pg

BEGIN;

    GRANT DELETE ON api.esp TO web_user; -- any user can delete ESP
    GRANT DELETE ON api.data TO web_user; -- any user can delete ESP's data

COMMIT;
