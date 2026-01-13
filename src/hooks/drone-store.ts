import { create } from 'zustand';
import type { Drone } from '@/interfaces/drone';

/**
 * The drone store saves all information about the drones within a map,
 * and gets updated when new data is received through the drone socket channel.
 */

interface DroneState {
  drones: Map <string, Drone>;
}

const useDroneStore = create<DroneState>()(() => ({
  drones: new Map <string, Drone>(),
}))

export default useDroneStore;