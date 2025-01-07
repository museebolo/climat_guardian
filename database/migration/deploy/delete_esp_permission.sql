-- Deploy climat-guardian:delete_esp_permission to pg

BEGIN;

    grant delete on api.data to web.user; -- any user can delete ESP

COMMIT;
