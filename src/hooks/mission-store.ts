import { create } from "zustand";
import type { Mission } from "@/interfaces/mission";

/**
 * The mission store saves all mission into a map.
 * The map gets updated when a user creates a new mission through the interface.
 */

interface MissionState {
  missions: Map<string, Mission>
}

const useMissionStore = create<MissionState>()(() => ({
  missions: new Map<string, Mission>()
}))

export default useMissionStore;