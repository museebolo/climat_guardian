-- Deploy climat-guardian:roles to pg

BEGIN;

        -- anonymous role
        create role web_anon nologin;
        grant usage on schema api to web_anon;
        grant web_anon to authenticator;

        -- create role for the esp 32
        create role esp32 nologin;
        grant usage on schema api to esp32;
        grant esp32 to authenticator;

        -- create role for the users
        create role web_user nologin;
        grant usage on schema api to web_user;
        grant web_user to authenticator;

        -- create a role for the login
        create role web_login nologin;
        grant usage on schema api to web_login;
        grant web_login to authenticator;

COMMIT;
