-- Deploy climat-guardian:user to pg

BEGIN;

        create table api.users (
                id serial primary key,
                username character varying(50) NOT NULL UNIQUE,
                password character varying(60) NOT NULL
        );

        grant usage, select on sequence api.users_id_seq to web_user;
        grant insert on api.users to web_user; -- any user can add new users
        grant select on api.users to web_login;

        -- create first user to be able to connect first time
        insert into api.users(username, password) values ('admin', '$2y$10$vJMf8H4u0f913VOJJDqVIeYrqnZBSzgYZ3Zyoh76MDjf6ZlmNDKPu');

COMMIT;
