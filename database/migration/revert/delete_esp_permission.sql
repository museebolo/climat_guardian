-- Revert climat-guardian:delete_esp_permission from pg

BEGIN;

    revoke delete on api.data to web.user -- any user can delete ESP

COMMIT;
