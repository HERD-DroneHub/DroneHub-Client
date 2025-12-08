/**
 * This file contains all the persistent system constants that exist in the system.
 * New constants are to be added in this file.
 */

// ENV - API keys for external services are retrieved throught the ENV file.
export const SERVER_URL = String(import.meta.env.VITE_SOCKET_URL);
export const MAPBOX_KEY = String(import.meta.env.VITE_MAPBOX_KEY);

// Socket Channels - All the sockets that communicates data between the server.
export const DRONE_SOCKET = "drones";
export const DRONE_WAYPOINT_MISSION = "drone-request-waypoint";
export const DRONE_GOTO_MISSION = "drone-request-goto";
export const DRONE_STOP = "drone-request-stop";
export const EVENT_SOCKET = "events";

// Video Stream
export const DRONE_VIDEO_START = "drone-video-start";
export const DRONE_VIDEO_STOP = "drone-video-stop";  
export const DRONE_VIDEO_DATA = "drone-video-data";
export const ADD_DRONE_TO_VIDEOSCREEN = "add-drone-to-videoscreen";
export const REMOVE_DRONE_TO_VIDEOSCREEN = "remove-drone-to-videoscreen";

// Colors
export const SELECTED_COLOR = '#7dbeff';

// Numerical constants
export const SECONDS_MS = 1000;

// Mission types
export const PERIMETER_SEARCH = 'Perimeter Search';
export const OPTIMAL_SEARCH = 'Optimized Search'
export const GOTO_MISSION = 'Go-To Location'

// Mission default settings
export const MIN_SPEED = 1;
export const MAX_SPEED = 15;
export const MIN_ALTITUDE = 10;
export const MAX_ALTITUDE = 100;
export const MIN_VERTICAL = 2;
export const MAX_VERTICAL = 5;
export const MIN_HORIZONTAL = 2;
export const MAX_HORIZONTAL = 5;