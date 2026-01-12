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


`VITE_SOCKET_URL= // Your server URL`

`VITE_MAPBOX_KEY= // Your MapBox API key`


`VITE_SOCKET_URL` is the URL to the main server where every device is connected to. It can be a server URL or an IP address with a port.

`VITE_MAPBOX_KEY` is the your API key for MapBox. You can create one by going into MapBox website and create a developer account: https://www.mapbox.com/developers.

If you want to add any new variable in the .env file, please remember that it needs to be in capital letters and start with the prefix `VITE`.

## Run the Application

When you want to start the application, please use the command:

``npm run dev``

If the map loads, the application is running correctly. You can now start to connect drones to the same server as you wrote in the .env file and they should appear on the map.

## Adding Custom Missions

At the moment, DroneHub support two mission types that can run without any external processing. These are good you primarily want to quickly fly the drones within an area.

If you want to expand on DroneHub, we have made it accessible to quickly add your own. We recommend following the structure of the existing mission types that resides in the `mission-type` folder.

First, create a folder for your mission type, and create four files: description.ts, function.ts, index.ts and style.scss.

### description.ts
In here you add most of the meta data for your mission type. This would for example be a description for what the mission does or a default name for it.

### function.ts
Here you store functions related to the mission, such as calculating the paths for drones active in the mission.

### index.ts
You need a .tsx file to insert in the `menu-container` component. This file needs to return the settings for the mission, such as the speed and altitude. If your mission needs a polygon shape or anything alike, please refer to the `perimeter-search` mission type.

### style.scss
If you want custom styling for the settings menu, you can define it in this file.

You need to update the code a few places to fully incorporate your custom mission type.

1. In `mission-types.ts` in the `utils` folder, please add your mission type to the `MissionTypes` constant. This allows your type to appear in the project.
2. In `menu-container`, please add your mission type to the switch cases and update accordingly. This will make your type available for creation.
3. In `menu-card`, please add you mission type to the switch cases and update accordingly. This will allow you to start your missions if you have created a function for it. It also allows you to update your mission with the right settings. 

## Questions

If you have any questions about the repository or need help to setting the project up, please feel free to contact us.