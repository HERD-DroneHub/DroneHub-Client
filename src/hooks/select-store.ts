import { create } from "zustand"

/**
 * This store saves which drones have been selected on the interface,
 * such that all components related to the drone becomes highlighted.
 */

interface SelectionState {
  selectedDrones: string[],
  addDrone: (drone: string) => void,
  removeDrone: (drone: string) => void
}

const useDroneSelectionStore = create<SelectionState>()((set) => ({
  selectedDrones: [],
  addDrone: (id: string) => set((state) => ({selectedDrones: [...state.selectedDrones, id]})),
  removeDrone: (id: string) => set((state) => ({selectedDrones: state.selectedDrones.filter((e) => e !== id)}))
}))

export default useDroneSelectionStore;