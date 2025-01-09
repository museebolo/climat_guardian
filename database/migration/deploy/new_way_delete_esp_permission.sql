-- Deploy climat-guardian:new_way_delete_esp_permission to pg

-- Function to DELETE on data and esp tables
CREATE OR REMPLACE FUNCTION api.delete_esp({ id }: { id: string }) RETURN VOID AS $$

BEGIN;


-- Remove permission to DELETE on data and esp tables
REVOKE DELETE ON api.data TO web_user;
REVOKE DELETE ON api.esp TO web_user;


-- Add permission to DELETE on data and esp tables
GRANT DELETE ON api.data TO web_user;
GRANT DELETE ON api.esp TO web_user;


-- DELETE on data and esp tables
DELETE FROM api.data WHERE id = ${id}
DELETE FROM api.esp WHERE id = ${id}


END;

$$ LANGUAGE plpgsql;