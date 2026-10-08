## Installation
First thing you need to do is to clone the repository from GitHub on the server
```bash
git clone https://github.com/museebolo/climat_guardian.git
cd climat_guardian
```

--
[Info]: <> (
This is the list of all the files that end with .example
)
Once the repository is cloned you can remove the `.example` at the end of the following files:
- .env.example
- esp32/config/secrets.yaml.example
```bash
cp .env.example .env
cp esp32/config/secrets.yaml.example esp32/config/secrets.yaml
```

---
Now you want to generate a secret key for the jwt tokens used by the api
```bash
sed -i '/JWT_SECRET/d' .env
echo "JWT_SECRET=$(tr -dc A-Za-z0-9 </dev/urandom | head -c 32)" >> .env
```

You may also want to generate a random password for the database
```bash
sed -i '/POSTGRES_PASSWORD/d' .env
echo "POSTGRES_PASSWORD=$(tr -dc A-Za-z0-9 </dev/urandom | head -c 32)" >> .env
```

It is recommended to let the other environment variables as they are

---
Then you have to install the project's dependencies, in the nextjs-interface folder
```bash
npm i
```

And also install php, in the php folder
```bash
composer install
```

---
Finally, you **have to** fill the Wi-Fi credentials in `esp32/config/secrets.yaml`\
You also **have to** change the `127.0.0.1` in `esp32/config/secrets.yaml` by the ip address of the server

## Start the project
Once everything is configured on the server, you can start the project by running the docker compose on the server
```bash
docker compose -f docker-compose.prod.yml up -d --remove-orphans --build
```
Once the docker is running you can access the web interface by going to the ip address of the server in the web browser of the computer\
the default user is `admin` and has `admin` as password, it is recommended to create a new user and delete the default one once you are connected, you can do so under the ``Users`` tab

You can check if all the containers are working by using the following command
```bash
docker compose ps
```


![Dashboard](/.assets/dashboard.png)
![Plan](/.assets/plan.png)
![Users](/.assets/users.png)
![Esp page](/.assets/esp.png)