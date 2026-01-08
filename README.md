## Welcome to DroneHub
DroneHub was created as part of the HERD project funded by Digital Research Centre Denmark (DIREC). DroneHub allows anyone to connect multiple drones to a single interface and designed for research purposes.

The application allows drones that are open for programming (such as some of the DJI drones) to be controlled through a collective interface. You can add your own path algorithms to the application and configure missions to fit your needs. 

Please ensure that when using DroneHub that you still are able to control the drone with a dedicated controller, and please follow the drone regulations of your country if you plan to use it outdoors.

## Setup
To run this project, you need to have Node.js installed on your device. We also recommend you to use Google Chrome, as this is the platform we have mostly tested on, however, most browsers are supported.

After cloning this repository, please run the command:

``npm install``

This command installs all the packages needed to run the application.

Next, in the root folder, create a .env file with the following entries:

``
VITE_SOCKET_URL= // Your server URL
VITE_MAPBOX_KEY= // Your MapBox API key
``

"VITE_SOCKET_URL" is the URL to the main server where every device is connected to. It can be a server URL or an IP address with a port.

"VITE_MAPBOX_KEY" is the your API key for MapBox. You can create one by going into MapBox website and create a developer account: https://www.mapbox.com/developers.

If you want to add any new variable in the .env file, please remember that it needs to be in capital letters and start with the prefix "VITE".

## Run the application

When you want to start the application, please use the command:

``npm run dev``

If the map loads, the application is running correctly. You can now start to connect drones to the same server as you wrote in the .env file and they should appear on the map.

## Questions

If you have any questions about the repository or need help to setting the project up, please feel free to contact us.