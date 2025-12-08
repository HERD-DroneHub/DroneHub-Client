// Data format of a drone to display on the map
export interface Drone {
  id: string,
  name: string,
  position: Position,
  yaw: number,
  battery: number;
  color: string;
}

interface Position {
  lat: number,
  lng: number,
  alt: number
}