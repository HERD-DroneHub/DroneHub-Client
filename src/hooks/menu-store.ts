import { create } from "zustand";
/**
 * The menu state tracks which submenu has been enabled.
 */

interface MenuState {
  droneSelected: boolean;
  missionSelected: boolean;
  enableDrone: () => void;
  enableMission: () => void;
  disable: () => void;
}

const useMenuStore = create<MenuState>()((set) => ({
  droneSelected: false,
  missionSelected: false,
  enableDrone: () => set(() => ({droneSelected: true, missionSelected: false})),
  enableMission: () => set(() => ({droneSelected: false, missionSelected: true})),
  disable: () => set(() => ({droneSelected: false, missionSelected: false})),
}))

export default useMenuStore;