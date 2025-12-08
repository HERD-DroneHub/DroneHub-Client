import { create } from 'zustand';
import type { MapRef, ViewState } from 'react-map-gl';

/**
 * The map store saves the map,
 * such that it can be accessed globally.
 */

interface MapStore {
  map: MapRef | null;
  viewState: ViewState;
  setMap: (map: MapRef) => void;
  setViewState: (viewState: ViewState) => void;
}

const useMapStore = create<MapStore>((set) => ({
  map: null,
  viewState: {
    longitude: 9.990550,
    latitude: 57.012960,
    zoom: 17,
  } as ViewState,
  setMap: (map) => set({ map }),
  setViewState: (viewState) => set({ viewState }),
}));

export default useMapStore;