import { create } from "zustand";
import type { DroneEvent } from "@/interfaces/drone-event";

/**
 * The event store saves all the events in a map.
 * It gets updated when a new event has been received in the event socket channel.
 */

interface EventState {
  events: Map<string, DroneEvent>
}

const useEventStore = create<EventState>(() => ({
  events: new Map<string, DroneEvent>()
}))

export default useEventStore;