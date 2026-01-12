import type { Mission } from "@/interfaces/mission";
import { MissionTypes } from "@/utils/mission-types";

/**
 * Every mission type should have a description, a default name, and a default mission object.
 */

export const PS_DESCRIPTION = `A Perimeter Search mission involves deploying drones to systematically search the boundaries of a specified area. This type of mission is typically used in scenarios such as border patrol, wildlife monitoring, and security surveillance.`;

export const PS_DEFAULT_NAME = "Perimeter Search Mission";

export const PS_SOCKET = "drone-request-waypoint";

export const PS_DEFAULT_MISSION: Mission = {
  id: '',
  name: PS_DEFAULT_NAME,
  type: MissionTypes.PERIMETER_SEARCH,
  coords: [],
  horizontalDistance: 2,
  verticalDistance: 2,
  altitude: 20,
  speed: 5,
  drones: [],
  active: false,
};

