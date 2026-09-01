-- Revert climat-guardian:new_way_delete_esp_permission from pg

BEGIN;


-- DELETE the function if it exists
DROP FUNCTION IF EXISTS api.delete_esp_data_and_esp(id);


COMMIT;