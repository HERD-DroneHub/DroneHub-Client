import type { Point } from "./point";

// The raw drone information from the server
export interface DroneInformation {
    id: string;
    name: string;
    droneColor?: string;
    version: string;
    battery: number;
    position: Point;
    altitude: number;
    target: Point | null;
    yaw: number;
    liveFeed: string;
    flightMode: string;
    isReturning: boolean;
    isSelected?: boolean;
    isStreaming: boolean;
}

// Message format for directing a drone towards a specific point on the map
export interface DroneGoToLocationCommand {
    targetDroneId: string;
    location: Point;
    distance: number;
    altitude: number;
    speed: number;
}

// Message format for missions with multiple waypoints
export interface DroneWayPointMissionCommand {
    targetDroneId: string;
    coordinates: Point[];
    distance: number;
    altitude: number;
    speed: number;
}

// Message format to sending a stop command to a drone
export interface DroneStopCommand {
    targetDroneId: string;
}

// Message format to enable or disable video
export interface DroneVideoCommand {
    targetDroneId: string;
    targetDroneName: string;
    droneColor?: string;
    socketId?: string;
}
