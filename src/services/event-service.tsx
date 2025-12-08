import { useContext, useEffect } from "react";
import { SocketContext } from "./socket";
import { EVENT_SOCKET } from "../utils/constants";
import type { DroneEvent } from "../interfaces/drone-event";
import useEventStore from "../hooks/event-store";

/**
 * EventService listens to the Event socket channel,
 * and whenever an event has been received, 
 * the event is added locally.
 */

const EventService = () => {
  const socket = useContext(SocketContext);

  useEffect(() => {

    // Listens to the event socket channel
    socket.on(EVENT_SOCKET, (...args) => {

      // Converts the event data to a readable format.
      const eventData = JSON.parse(args[0]) as DroneEvent;

      // Saves the event data locally.
      useEventStore.setState((prev) => ({
        events: new Map(prev.events).set(eventData.eventID, eventData)
      }))
    })
  })
  
  return (<></>);
}

export default EventService;