-- create shema and table
create schema if not exists api;
create table api.data (
  temperature real,
  humidity real,
  timestamp timestamp NOT NULL,
  ip character varying(14) NOT NULL
);

-- create autenticator
create role authenticator noinherit login password 'mysecretpassword';

-- create anonymous role
create role web_anon nologin;
grant usage on schema api to web_anon;
grant web_anon to authenticator;

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

-- create role for the esp 32
create role esp32 nologin;
grant usage on schema api to esp32;
grant insert on api.data to esp32;
grant esp32 to authenticator;

-- create a table to store the users
create table if not exists api.users (
	id serial primary key,
	username character varying(50) NOT NULL UNIQUE,
	password character varying(60) NOT NULL
);

-- create role for the users
create role web_user nologin;
grant usage on schema api to web_user;
grant select on api.data to web_user;
grant usage, select on sequence users_id_seq to web_user;
grant insert, update, delete on api.users to web_user;
grant web_user to authenticator;

-- create a role for the login
create role web_login nologin;
grant usage on schema api to web_login;
grant select on api.users to web_login;
grant web_login to authenticator;

-- create first user to be able to register other users
insert into api.users(username, password) values ('admin', '$2y$10$vJMf8H4u0f913VOJJDqVIeYrqnZBSzgYZ3Zyoh76MDjf6ZlmNDKPu');

-- create a view to get the average temperature and humidity of each day
create or replace function api.avg_date(
	delta varchar
)
returns table(
	avg_temperature double precision, 
	avg_humidity double precision, 
	date timestamp
) as $$
begin
	return query select 
		avg(temperature) as avg_temperature, 
		avg(humidity) as avg_humidity,
		date_trunc(delta, timestamp) as date
	from api.data
	group by date
	order by date;
end;
$$ language plpgsql;
