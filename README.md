[Info]: <> (
	All the information that are likely to need to be updated have a comment above them like this one
)
# Climate-Guardian
This project was made for the non-profit organization memoires-informatiques\
Memoires-informatiques has a lot of old computers and other electronic devices that need to be stored in a controlled environment\
The goal of this project is to monitor the temperature and humidity of the different rooms of the organization and to display the data on a web interface

# Setup
From now on, the computer that runs the docker will be called "server" and
the computer used by the user will be called "computer"

## Network
The server and the esp need to be connected to the same network, it is recommended to give both of them a static ip address\
The computer can be connected from any network as long as the network has open ports, otherwise you'll have to be on the same network as the server

![hardware](/.assets/hardware-diagram.png)\
![software](/.assets/software-diagram.png)

## Requirements
For this project to work you need to have the following installed on the server:
- Linux (Tested on [Ubuntu Server 22.04](https://ubuntu.com/download/server))
- [Docker Engine](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Curl](https://curl.se/download.html)
- [jq](https://stedolan.github.io/jq/download/)
```bash
sudo apt update
sudo apt install docker.io docker-compose git curl jq
```

## Installation
First thing you need to do is to clone the repository from GitHub on the server
```bash
git clone https://github.com/museebolo/climat-guardian.git
```

---
[Info]: <> (
	This is the list of all the files that end with .example
)
Once the repository is cloned you can remove the `.example` at the end of the following files:
- .env.example
- esp32/config/secrets.yaml.example
- Interface/src/contexts/SampleContext.example.tsx
```bash
cp .env.example .env
cp esp32/config/secrets.yaml.example esp32/config/secrets.yaml
cp Interface/src/contexts/SampleContext.example.tsx Interface/src/contexts/SampleContext.tsx
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
Finally, you can fill the Wi-Fi credentials in `esp32/config/secrets.yaml` and change the `127.0.0.1` in `Interface/src/contexts/SampleContext.tsx` to the ip address of the server

## Start the project
Once everything is configured on the server, you can start the project by running the docker compose on the server
```bash
docker compose -f docker-compose.prod.yml up -d --remove-orphans --build
```
Once the docker is running you can access the web interface by going to the ip address of the server in the web browser of the computer\
the default user is `admin` and has `admin` as password

![web interface](/.assets/dashboard.png)

## ESP 32 Installation
This project uses [esp home](https://github.com/esphome/esphome) to manage the esp32, you can configure the esp32 by following the instructions below
- Connect yourself to the esp home interface by going to `127.0.0.1/esp` in the web browser of the computer (replace `127.0.0.1` with the ip address of the server)
- Plug the esp32 to the server
- Press the `+ ADD DEVICE` button inside esp home
- Name your device
- Select `ESP32` (on the top of the list)
- You can skip the installation as you'll have to reinstall it later anyway
- Go to the card of the device and press `EDIT`
- Copy everything from the line 31 of the `esp32/esp32.yaml` and paste it at the end of your esp32's configuration file
- Replace the XXX... at the end of the code with the token of your esp32\
you can generate this token by running the following command on the server (replace `255.255.255.255` with the ip address of the esp32)
```bash
export TOKEN=$(curl 'http://127.0.0.1/php/login.php?username=admin&password=admin' | jq '.token' -r)
curl -H "Authorization: Bearer $TOKEN" "http://127.0.0.1/php/esp.php?ip=255.255.255.255" | jq '.token' -r
```
- Press `INSTALL` and select `Plug into the computer running ESPHome Dashboard` (the 3rd option)
- Select the device with ``/dev/ttyUSB0`` as path
- Wait for the installation to finish
- Press `STOP` to exit the logs
- Unplug the esp32 and plug it to any other power source
- If you need to update the configuration of the esp32, you can now do it wireless from the esp home interface

