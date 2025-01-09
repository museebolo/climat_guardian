-- Revert climat-guardian:new_way_delete_esp_permission from pg

-- Function to DELETE on data and esp tables
CREATE OR REMPLACE FUNCTION api.delete_esp({ id }: { id: string }) RETURN VOID AS $$

BEGIN;


-- Remove permission to DELETE on data and esp tables
REVOKE DELETE ON api.data TO web_user;
REVOKE DELETE ON api.esp TO web_user;


END;

$$ LANGUAGE plpgsql;
