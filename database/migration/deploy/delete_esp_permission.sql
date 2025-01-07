-- Deploy climat-guardian:delete_esp_permission to pg

BEGIN;

    grant delete on api.esp to web_user; -- any user can delete ESP
    grant delete on api.data to web_user; -- any user can delete ESP's data

COMMIT;
