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
