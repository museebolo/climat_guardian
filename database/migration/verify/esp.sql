BEGIN;

select * from esp
INSERT INTO esp (name, ip) VALUES ('ESP1', '192.168.1.10');
SELECT ip FROM esp WHERE name = 'ESP1';


COMMIT;