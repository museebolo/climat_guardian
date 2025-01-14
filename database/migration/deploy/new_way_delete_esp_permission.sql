-- Deploy climat-guardian:new_way_delete_esp_permission to pg

-- Function to DELETE on data and esp tables

BEGIN;

-- Remove permission to DELETE on data and esp tables
REVOKE DELETE ON api.data FROM web_user;    -- Revoke permission for the user to DELETE datas on table DATA
REVOKE DELETE ON api.esp FROM web_user;     -- Revoke permission for the user to DELETE datas on table ESP

-- Delete the function if exists
DROP FUNCTION IF EXISTS api.delete_esp_data_and_esp;

-- Create the function
CREATE FUNCTION api.delete_esp_data_and_esp(id_data INT)
    RETURNS VOID AS $$

BEGIN

    -- DELETE on data and esp tables
    DELETE FROM api.data WHERE api.data.esp_id = id_data;
    DELETE FROM api.esp WHERE api.esp.id = id_data;

END;
$$ LANGUAGE plpgsql;

GRANT DELETE ON api.data TO web_user;
GRANT DELETE ON api.esp TO web_user;

COMMIT;