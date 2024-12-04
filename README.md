[Info]: <> (
	All the information that are likely to need to be updated have a comment above them like this one
)
# Climate-Guardian
This project was made for the non-profit organization memoires-informatiques\
Memoires-informatiques has a lot of old computers and other electronic devices that need to be stored in a controlled environment\
The goal of this project is to monitor the temperature and humidity of the different rooms of the organization and to display the data on a web interface

## Documentation and development

If you are interested in contributing or want to make specific configuration changes,
don't hesitate to check the [documentation](./docs). You will find information
to set up the development environment, architecture considerations and some details
to correctly use the tooling.

**! Warning**, the doc’s folder is a work in progress.
For the moment, you can still find the old documentation below.

## Setup
From now on, the computer that runs the docker will be called "server" and
the computer used by the user will be called "computer"

## Network
The server and the esp need to be connected to the same network, it is recommended to give both of them a static ip address\
The computer can be connected from any network as long as the network has open ports, otherwise you'll have to be on the same network as the server

![hardware](/.assets/hardware-diagram.png)\
![software](/.assets/software-diagram.png)

## Requirements
For this project to work you need to have the following installed on the server:
- Linux (Tested on [Ubuntu Server 22.04](https://ubuntu.com/download/server) and [Fedora 40](https://fedoraproject.org/workstation/download))
- [Docker Engine](https://docs.docker.com/engine/install/ubuntu/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

## Installation
First thing you need to do is to clone the repository from GitHub on the server
```bash
git clone https://github.com/museebolo/climat_guardian.git
cd climat-guardian
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

## ESP 32 Installation
This project uses [esp home](https://github.com/esphome/esphome) to manage the esp32, you can configure the esp32 by following the instructions below
- Connect yourself to the esp home interface by going to `127.0.0.1/esp` in the web browser of the computer (replace `127.0.0.1` with the ip address of the server)
- Plug the esp32 to the server
- Press the `+ NEW DEVICE` button inside esp home
- Name your device
- Select `ESP32` (on the top of the list)
- Press `INSTALL` and select `Plug into the computer running ESPHome Dashboard` (the 3rd option)
- Select the device with ``/dev/ttyUSB0`` as path
- Wait for the installation to finish\
Be sure to memorize the ip address of the esp32 (you can find it in the logs)
$${\color{gray} \text{[15:39:12]} \color{magenta} \text{[C]\[wifi:416\]:   IP Address: 172.16.5.65}}$$
- You can now unplug the esp32 and plug it to any other power source
- Connect yourself to the dashboard from another tab in the web browser of the computer
- Press the ``ajouter un esp`` button on the left and enter the ip address of the esp32 with the name you want it to have in the interface
- Back on the esphome, press `Edit` at the bottom of the logs
- Copy everything from the line 31 of the file `esp32/esp32.yaml` on the server and paste it at the end of your esp32's configuration file
```bash
clear && cat esp32/esp32.yaml | sed -n '31,$p'
```
- Press the ``...`` on the right of the page and press ``Afficher et Copier le Token``
- Replace the XXX... at the end of the code with the token you copied
- Press `INSTALL` and select `Wirelessly` (the 1st option)
- Wait for the installation to finish
- Press `STOP` to exit the logs

