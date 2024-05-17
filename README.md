[Info]: <> (
	All the information that are likely to need to be updated have a comment above them like this one
)
# Climat-Guardian
This project was made for the non-profit organization memoires-informatiques\
Memoires-informatiques has a lot of old computers and other electronic devices that need to be stored in a controlled environment\
The goal of this project is to monitor the temperature and humidity of the different rooms of the organization and to display the data on a web interface

## Installation
First thing you need to do is to clone the repository from the github page and install the dependencies
```bash
git clone https://github.com/museebolo/climat-guardian.git
cd climat-guardian/login
composer install
cd ../Interface
npm install
npm run build
cd ..
```

---
[Info]: <> (
	This is the list of all the files that end with .example
)
Once the repository is cloned you can remove the `.example` at the end of the following files:
- login/.env.example
- esp32/config/secrets.example.yaml
```bash
mv login/.env.example login/.env
mv esp32/config/secrets.example.yaml esp32/config/secrets.yaml
```

---
Now you want to generate a secret key for the jwt tokens used by the api
```bash
tr -dc A-Za-z0-9 </dev/urandom | head -c 32; echo
```

[Info]: <> (
	This is the list of all the files that require to know the jwt secret key
)
You then want to copy the secret key and paste it the following files:
- login/.env
- postgrest.conf

---
Finally you can fill the `esp32/config/secrets.yaml` with the credentials of the wifi\

## Data transfer
Here are 2 diagrams that show how the data is transfered from the esp32 to the web interface
### Hardware
![hardware](/.assets/hardware-diagram.png)
### Software
![software](/.assets/software-diagram.png)

## Start the project
Once everything is configured you can start the project by running the docker compose
```bash
docker compose up
```
Once the docker is running you can access the web interface by going to `memoires-info.com` in your web browser (or the ip address of the computer that runs the docker)
by default the username is `admin` and the password is `admin`

![web interface](/.assets/dashboard.png)

## ESP 32 Installation
This project uses esp home to manage the esp32, you can configure the esp32 by following the instructions below
- Connect yourself to the [esphome](https://github.com/esphome/esphome) interface by going to `esphome.memoires-info.com` in your web browser (or the ip address of the computer that runs the docker)
- Plug the esp32 to your computer
- Press the `+ ADD DEVICE` button inside esp home
- Name your device
- Select `ESP32` (on the top of the list)
- Skip the installation, you'll have to reinstall it later anyway
- Go to the card of the device and press `EDIT`
- Copy everything from the line 31 of the `esp32/esp32.yaml` and paste it at the end of your esp32's configuration file
- Press `INSTALL` and select `Plug into the computer running ESPHome Dashboard` (the 3rd option)
- Look for the device for wich the path is `/dev/ttyUSB0` and select it
- Wait for the installation to finish
- Press `STOP` to exit the logs
- Unplug the esp32 the computer and plug it to any other power source
- If you need to update the configuration of the esp32, you can now do it wirelessly from the esp home interface

## Adminer
If you want to access the database you can go to `adminer.memoires-info.com` in your web browser (or the ip address of the computer that runs the docker)\
You can login with the following credentials:
- System: PostgreSQL
- Server: db
- Username: postgres
- Password: example
- Database: memoires-info

