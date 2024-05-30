[Info]: <> (
	All the information that are likely to need to be updated have a comment above them like this one
)
# Climat-Guardian
This project was made for the non-profit organization memoires-informatiques\
Memoires-informatiques has a lot of old computers and other electronic devices that need to be stored in a controlled environment\
The goal of this project is to monitor the temperature and humidity of the different rooms of the organization and to display the data on a web interface

## Requirements
For this project to work you need to have the following installed on the computer running climat-guardian:
- Linux (Tested on [Ubuntu Server 22.04](https://ubuntu.com/download/server))
- [Docker Engine](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
```bash
sudo apt update
sudo apt install docker.io docker-compose git
```

## Installation
First thing you need to do is to clone the repository from github
```bash
git clone https://github.com/museebolo/climat-guardian.git
```

---
[Info]: <> (
	This is the list of all the files that end with .example
)
Once the repository is cloned you can remove the `.example` at the end of the following files:
- .env.example
- esp32/config/secrets.example.yaml
```bash
mv .env.example .env
mv esp32/config/secrets.example.yaml esp32/config/secrets.yaml
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

It is recommended to let the other variables as they are

---
Finally you can fill the wifi credentials in `esp32/config/secrets.yaml`

## Start the project
Once everything is configured you can start the project by running the docker compose
```bash
docker compose -f docker-compose.prod.yml up -d --remove-orphans --build
```
Once the docker is running you can access the web interface by going to the ip address of the computer in your web browser
the default user is `admin` and has `admin` as password

![web interface](/.assets/dashboard.png)

## Data transfer
Here are 2 diagrams that show how the data is transfered from the esp32 to the web interface
### Hardware
![hardware](/.assets/hardware-diagram.png)
### Software
![software](/.assets/software-diagram.png)

## ESP 32 Installation
This project uses [esp home](https://github.com/esphome/esphome) to manage the esp32, you can configure the esp32 by following the instructions below
- Connect yourself to the esphome interface by going to `127.0.0.1/esp` in your web browser (replace the ip address with the one of the computer that runs the docker)
- Plug the esp32 to your computer
- Press the `+ ADD DEVICE` button inside esp home
- Name your device
- Select `ESP32` (on the top of the list)
- Skip the installation, you'll have to reinstall it later anyway
- Go to the card of the device and press `EDIT`
- Copy everything from the line 31 of the `esp32/esp32.yaml` and paste it at the end of your esp32's configuration file
- Replace the XXX... at the end of the code with the token of your esp32, you can generate this token by runing the following command
```bash
curl -H "Authorization: Bearer $(curl 'http://climate-guardian.home/php/login.php?username=admin&password=admin' | jq '.token' -r)" "http://climate-guardian.home/php/esp.php?ip=255.255.255.255"
```
- Press `INSTALL` and select `Plug into the computer running ESPHome Dashboard` (the 3rd option)
- Select the device with ``/dev/ttyUSB0`` as path
- Wait for the installation to finish
- Press `STOP` to exit the logs
- Unplug the esp32 the computer and plug it to any other power source
- If you need to update the configuration of the esp32, you can now do it wirelessly from the esp home interface

