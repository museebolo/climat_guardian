-- Deploy climat-guardian:postgrest to pg

BEGIN;

        create schema api;
        create role authenticator noinherit login password 'mysecretpassword';

COMMIT;
