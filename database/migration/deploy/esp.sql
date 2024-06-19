BEGIN;

create table esp
(
    name character varying(20) not null,
    ip   character varying(15) NOT NULL
);

COMMIT;
