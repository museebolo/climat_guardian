-- Deploy climat-guardian:data to pg

BEGIN;

        create table api.data (
                temperature real,
                humidity real,
                timestamp timestamp NOT NULL,
                ip character varying(14) NOT NULL
        );
        grant select on api.data to web_user;

        -- convert unix timestamp to timestamp and insert it
        create or replace function api.insert_data(
                temperature real,
                humidity real,
                ip varchar(15),
                unix_timestamp bigint
        ) 
        returns void as $$
        begin
                -- if the ip said in the token is not the same as the one in the request, then this means that the user is not who he pretends to be and we should throw an error
                if (current_setting('request.jwt.claims', true)::json->>'ip' != ip) then
                        raise exception insufficient_privilege
                        using hint = 'You are not who you pretend to be';
                end if;
                -- insert the data
                insert into api.data("temperature", "humidity", "ip", "timestamp") values (temperature, humidity, ip, to_timestamp(unix_timestamp));
        end $$ language plpgsql;
        grant insert on api.data to esp32;

        -- create a function to get the average temperature and humidity of each delta time
        create function api.avg_date(
                delta varchar
        )
        returns table(
                avg_temperature double precision, 
                avg_humidity double precision, 
                date timestamp,
                ip character varying(14),
                count bigint
        ) as $$
        begin
                return query select 
                avg(temperature) as avg_temperature, 
                avg(humidity) as avg_humidity,
                date_trunc(delta, timestamp) as date,
                data.ip,
                count(*) as count
                from api.data
                group by date, data.ip
                order by date;
        end;
        $$ language plpgsql;

COMMIT;
