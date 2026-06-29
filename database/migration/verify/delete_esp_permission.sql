-- Verify climat-guardian:delete_esp_permission on pg

BEGIN;

    \z api.esp -- check if user can delete or not an ESP
    \z api.data -- check if user can delete or not an ESP's data

ROLLBACK;
