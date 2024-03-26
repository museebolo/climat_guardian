# climat_guardian
Système de surveillance climatique 

## Esp32
### Installation
This project uses esp home to manage the esp32 wich is run in a docker container
Inside the config folder, start by copying the `secret.example.yaml` file to `secret.yaml` and fill in credentials
Then to start the esp32, you can run the following command
```bash
cd esp32
docker-compose up
```
### Home assistant
You can access home assistant by going to `localhost:6052` in your web browser
### Add esp32 to home assistant
Tou can then add the esp32 to home assistant by pluging the esp32 to your computer that runs the docker
Then press the `+ ADD DEVICE` button inside home assistant
Then press continue and name your device, give him a clever name so you know wich device it is
Then press `next` and select `ESP32` (on the top of the list)
Once that's done you want to skip the installation you'll have to reinstall it later anyway
Go to the card of the device and press `EDIT`
Here you want to copy everything from the line 31 of the `esp32/esp32.yaml` and paste it at the end of your esp32's configuration file
Then press `INSTALL` and select `Plug into the computer running ESPHome Dashboard` (the 3rd option)
You then want to look for the device for wich the path is `/dev/ttyUSB0` and select it
Now the installation should start and you should see the logs of the installation
It can take a few minutes to compile and install the firmware, be patient
Once the installation is done, you can press `STOP` to exit the logs
You can now unplug the esp32 the computer and plug it to any other power source
If you need to change the configuration of the esp32, you can now do it wirelessly from the home assistant interface

## Web Interface
### Installation
This project uses a react web interface to display the data from the database\
First thing you need to do is to copy `Interface/src/contexts/SampleContext.example.tsx` to `Interface/src/contexts/SampleContext.tsx` and fill in the credentials\
Then you can start the web interface by running the following command

```bash
cd Interface
npm install
npm run dev
```
### Access
You can then access the web interface by going to `localhost:5174` in your web browser
![web interface](/assets/dashboard.png)
