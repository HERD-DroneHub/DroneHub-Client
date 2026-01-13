import { useContext, useEffect } from "react";
import { SocketContext } from "./socket"
import { DRONE_SOCKET } from "@/utils/constants.ts";
import type { Drone } from "@/interfaces/drone.ts";
import type { DroneInformation } from "@/interfaces/drone-socket.ts";
import useDroneStore from "@/hooks/drone-store";

/**
 * DroneService listens to the Drone socket channel,
 * and whenever data is sent though the channel,
 * the drone data is updated locally.
 */

const DroneService = () => {

  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on(DRONE_SOCKET, (...args) => {

      // Receive all the drone information from the socket
      const droneSocket = JSON.parse(args[0]) as DroneInformation;

      // Convert the information from the socket to the client interface
      const drone = {
        id: droneSocket.id,
        name: droneSocket.name,
        position: {
          lat: droneSocket.position.lat,
          lng: droneSocket.position.lng,
          alt: droneSocket.altitude
        },
        yaw: droneSocket.yaw,
        battery: droneSocket.battery,
        color: `#${droneSocket.droneColor}`
      } as Drone;

      // Save the updated drone data to the local data storage
      useDroneStore.setState((prev) => ({
        drones: new Map(prev.drones).set(drone.id, drone)
      }));

      
    })
  }, [socket])

  return(<></>);
}

export default DroneService;