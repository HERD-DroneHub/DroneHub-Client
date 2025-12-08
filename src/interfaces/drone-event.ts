/**
 * Data format for a drone event that is received through the server.
 * A drone event is any event where the data is meant to displayed on the interface.
 * Example: detection event where the location of the event is displayed on the map.
 */

import type { Point } from "./point";

export interface DroneEvent {
  eventID: string,
  droneID: string,
  position: Point,
  content: string,
  type: string
}