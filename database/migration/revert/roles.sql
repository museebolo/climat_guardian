-- Revert climat-guardian:roles from pg

BEGIN;

        -- anonymous role
        revoke usage on schema api from web_anon;
        drop role web_anon;

        -- esp 32
        revoke usage on schema api from esp32;
        drop role esp32;

        -- users
        revoke usage on schema api from web_user;
        drop role web_user;

        -- login
        revoke usage on schema api from web_login;
        drop role web_login;

COMMIT;
