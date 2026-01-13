import type { DroneVideoCommand } from "@/interfaces/drone-socket";
import { SocketContext } from "@/services/socket";
import { useContext, useEffect, useState } from "react";
import { DroneStreamManager } from '../WebRTCManager';
import { ADD_DRONE_TO_VIDEOSCREEN, REMOVE_DRONE_TO_VIDEOSCREEN } from "@/utils/constants";
import { StreamGrid } from "../stream-grid";

export const StreamPage = () => {
    // State definitions 
    const drones = Array<DroneVideoCommand>();
    const [streamingDrones, setDrones] = useState<Array<DroneVideoCommand>>(drones);

    const socket = useContext(SocketContext);

    const handleRemoveItem = (drone: DroneVideoCommand) => {
        const remainingDrones = streamingDrones.filter(item => item.targetDroneId !== drone.targetDroneId);
        if (remainingDrones.length === streamingDrones.length - 1) {
            setDrones(remainingDrones);
            DroneStreamManager.closeDroneStream(drone.socketId);
        } else {
            console.log("DIDN'T REMOVE DRONE: IT DOESN'T STREAM!");
        }
    };

    // useEffect() is used to execute logic AFTER we deliver our initial HTML, meaning we can now manipulate it
    // This block will render ONCE, and happens AFTER the initial HTML is rendered
    useEffect(() => {
        DroneStreamManager.setupSocketEvent(socket);
    }, [])

    // This block will be a recurrent event, every time our array of streaming drones changes
    useEffect(() => {
        // A drone was either removed or added to the streamingDrones array
        streamingDrones.forEach(drone => {
            // We need to figure out which drone(s) are not currently streaming, but should be streaming
            // at this point in time, we will have rendered the video tag elements
            if (DroneStreamManager.doesStreamForDroneExist(drone.socketId) === false) {
                const ds = DroneStreamManager.createDroneStream(drone.socketId, "video_" + drone.targetDroneId);
                ds.startDroneStream();
            }
        });

        // A drone should be added to the videoscreen
        socket.on(ADD_DRONE_TO_VIDEOSCREEN, (...args) => {
            console.log("socket on: " + ADD_DRONE_TO_VIDEOSCREEN);
            const droneInfo = JSON.parse(args[0]) as DroneVideoCommand;

            const droneExists = streamingDrones.some(drone => {
                if (drone.targetDroneId === droneInfo.targetDroneId) {
                    return true;
                }
                return false;
            });

            // If the incoming streaming drone is not in our array, insert it and force state change
            if (!droneExists) {
                setDrones(streamingDrones => [...streamingDrones, droneInfo]);
            } else {
                console.log("DIDN'T ADD DRONE: IT ALREADY EXISTS!");
            }
        });

        // A drone should be removed from the videoscreen       
        socket.on(REMOVE_DRONE_TO_VIDEOSCREEN, (...args) => {
            console.log("socket on: " + REMOVE_DRONE_TO_VIDEOSCREEN);
            const drone = JSON.parse(args[0]) as DroneVideoCommand;
            handleRemoveItem(drone);
        });

        return(() => {
            socket.off(ADD_DRONE_TO_VIDEOSCREEN);
            socket.off(REMOVE_DRONE_TO_VIDEOSCREEN);
        })
    });

    

    if (streamingDrones.length === 0) {
        return (
            <div id='no-streams-loading-div'>
                <h1><span>DRONEHUB</span><br></br>NO STREAMING DRONES</h1>
            </div>
        );
    } else {
        return (
            <>
                <StreamGrid drones={streamingDrones} num_streams={streamingDrones.length} />
            </>
        );
    }
}