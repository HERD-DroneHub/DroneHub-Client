import { create } from 'zustand';
import { MissionConfig, MissionTypes, type MissionConfigType, type MissionType } from '@/utils/mission-types';
import type { Mission } from '@/interfaces/mission';

/**
 * Mission Container Store
 * 
 * This store manages the state of the mission container, including the current mission type
 * and the selected mission. It provides methods to update these states.
 */

interface MissionContainerState {
  missionContainer: MissionType | MissionConfigType;
  missionType: MissionType;
  selectedMission: Mission | null;
  setMissionContainer: (value: MissionType | MissionConfigType) => void;
  setMissionType: (value: MissionType) => void;
  setSelectedMission: (mission: Mission | null) => void;
}

const useMissionContainerStore = create<MissionContainerState>((set) => ({
  missionContainer: MissionConfig.DEFAULT,
  missionType: MissionTypes.GO_TO,
  selectedMission: null,
  setMissionContainer: (value) => set({ missionContainer: value }),
  setMissionType: (value) => set({ missionType: value }),
  setSelectedMission: (mission) => set({ selectedMission: mission }),
}));

export default useMissionContainerStore;
