/**
 * Mission interfaces representing a drone mission.
 */

export interface Mission {
  id: string;
  name: string;
  coords: number[][];
  altitude: number;
  speed: number;
  verticalDistance: number;
  horizontalDistance: number;
  drones: string[];
  active: boolean;
  type: string;
}

export interface MissionDraw {
  id: string;
  coords: number[][];
  optimizedCoords?: Map<string, number[][]>;
}