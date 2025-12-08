/**
 * Store to manage the state of editing and creating missions.
 */

import { create } from "zustand";
import type { Mission } from "../interfaces/mission";

interface ConfigureMissionState {
  newMissionSelected: boolean;
  configureMissionSelected: boolean;
  editAreaSelected: boolean;
  mission: Mission | null;
  enableNewMission: () => void;
  enableConfigure: (mission: Mission) => void;
  enableEditArea: (mission: Mission) => void;
  disable: () => void;
}

const useConfigureMissionStore = create<ConfigureMissionState>()((set) =>({
  newMissionSelected: false,
  configureMissionSelected: false,
  editAreaSelected: false,
  mission: null,
  enableNewMission: () => set({newMissionSelected: true, configureMissionSelected: false, editAreaSelected: false, mission: null}),
  enableConfigure: (mission: Mission) => set({newMissionSelected: false, configureMissionSelected: true, editAreaSelected: false, mission: mission}),
  enableEditArea: (mission: Mission) => set({newMissionSelected: false, configureMissionSelected: false, editAreaSelected: true, mission: mission}),
  disable: () => set({newMissionSelected: false, configureMissionSelected: false, editAreaSelected: false, mission: null})
}))

export default useConfigureMissionStore;