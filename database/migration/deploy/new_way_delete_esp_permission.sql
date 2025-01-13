-- Deploy climat-guardian:new_way_delete_esp_permission to pg

-- Function to DELETE on data and esp tables

BEGIN;


-- Remove permission to DELETE on data and esp tables
REVOKE DELETE ON api.data FROM web_user;
REVOKE DELETE ON api.esp FROM web_user;

-- Add permission to DELETE on data and esp tables
GRANT DELETE ON api.data TO web_user;
GRANT DELETE ON api.esp TO web_user;

-- Delete the function if exists
DROP FUNCTION IF EXISTS api.delete_esp_data_and_esp();

-- Create the function
CREATE FUNCTION api.delete_esp_data_and_esp()
    RETURNS VOID AS $$

BEGIN

    -- DELETE on data and esp tables
    DELETE FROM api.data WHERE esp_id = ${id};
    DELETE FROM api.esp WHERE id = ${id};

END;
$$ LANGUAGE plpgsql;


COMMIT;