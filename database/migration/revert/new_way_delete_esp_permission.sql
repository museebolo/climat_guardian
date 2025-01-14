-- Revert climat-guardian:new_way_delete_esp_permission from pg

BEGIN;


-- DELETE the function if it exists
DROP FUNCTION IF EXISTS api.delete_esp_data_and_esp(id);

-- Remove permission to delete
REVOKE DELETE ON api.esp FROM web_user; -- no one can delete ESP
REVOKE DELETE ON api.data FROM web_user; -- no one can delete ESP's data


COMMIT;