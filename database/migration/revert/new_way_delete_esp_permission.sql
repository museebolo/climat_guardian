-- Revert climat-guardian:new_way_delete_esp_permission from pg

BEGIN;


-- Remove permission to DELETE on data and esp tables
DROP FUNCTION IF EXISTS api.delete_esp_data_and_esp(id);


grant delete on api.esp to web_user; -- any user can delete ESP
grant delete on api.data to web_user; -- any user can delete ESP's data


COMMIT;