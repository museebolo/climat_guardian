-- Revert climat-guardian:roles from pg

BEGIN;

        drop role web_anon;
        drop role esp32;
        drop role web_user;
        drop role web_login;

COMMIT;
