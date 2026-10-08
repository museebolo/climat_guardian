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
