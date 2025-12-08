import MapboxDraw from "@mapbox/mapbox-gl-draw"
import { create } from "zustand"
import type { MissionDraw } from "@/interfaces/mission";

/**
 * The Map draw store handles the state of the map draw functionality,
 * which is responsible for activating the ability to draw polygons on the map.
 */

interface MapDrawState {
  draw: MapboxDraw,
  missions: MissionDraw[],
  addMission: (mission: MissionDraw) => void,
  removeMission: (mission: string) => void,
  updateMission: (mission: MissionDraw) => void
}

const useMapDrawStore = create<MapDrawState>()((set) => ({
  draw: new MapboxDraw({
    displayControlsDefault: false,
    controls:{
      polygon: true,
      trash: true
    }
  }),
  missions: [],
  addMission: (mission: MissionDraw) => set((state) => ({draw: state.draw, missions: [...state.missions, mission]})),
  removeMission: (missionID: string) => set((state) => ({draw: state.draw, missions: state.missions.filter(e => e.id !== missionID)})),
  updateMission: (mission: MissionDraw) => set((state) => ({draw: state.draw, missions: state.missions.map(e => e.id == mission.id ? mission : e)}))
}))

export default useMapDrawStore;