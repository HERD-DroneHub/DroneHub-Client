import './style.scss';
import React, { useEffect, useRef, useState } from 'react';
import MapGL, { type MapRef } from 'react-map-gl';
import { MAPBOX_KEY } from '@/utils/constants';
import useDroneStore from '@/hooks/drone-store';
import MapDrone from '../map-drone';
import MapCoverage from '../map-coverage';
import useMapStore from '@/hooks/map-store';
import useMapDrawStore from '@/hooks/map-draw-store';
import type { Drone } from '@/interfaces/drone';
import MapMission from '../map-mission';
import type { DroneEvent } from '@/interfaces/drone-event';
import useEventStore from '@/hooks/event-store';
import MapEvent from '../map-event';

/**
 * The main map component that is responsible for displaying all map related elements.
 * This includes displaying the drones current positions, the missions and where event have been triggered.
 * 
 * @returns The main map component with the updated map elements such as drones and events
 */

const MapView: React.FC = () => {

  // Local storage of elements that should be displayed on the map
  const drones: Drone[] = Array.from(useDroneStore((state) => state.drones).values());
  const events: DroneEvent[] = Array.from(useEventStore((state) => state.events).values());

  // Map related variables
  const mapRef = useRef<MapRef>(null);
  const mapStore = useMapStore(s => s);
  const mapDraw = useMapDrawStore(s => s.draw);
  const [mapLoaded, setMapLoaded] = useState(false);

  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  useEffect(() => {

    // Get the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([longitude, latitude]);
        },
        (error) => {
          console.error('Error fetching user location:', error);
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);


  /**
   * Ensure that the map has loaded, before adding functionality.
   * Without this safety measure, the app will not properly load.
   */
  const onLoad = () => {
    if(mapRef.current && !mapStore.map){
      // Save the map globally for later retrieval from other components.
      mapStore.setMap(mapRef.current);

      const map = mapRef.current.getMap();

      // Enable drawing on the map
      map.addControl(mapDraw, 'bottom-right');

      // Disable double click zoom
      map.doubleClickZoom.disable();
      
      // Set that the map has been loaded such that the page updates
      setMapLoaded(true);
    }
  }

  return (
    <MapGL
        mapboxAccessToken={MAPBOX_KEY}
        onMove={evt => mapStore.setViewState(evt.viewState)}
        mapStyle='mapbox://styles/mapbox/standard'
        cursor='grab'
        doubleClickZoom={false}
        ref={mapRef}
        onLoad={onLoad}
      >
        {mapLoaded && (
          <>
            {/** Missions */}
              <MapMission/>

            {/** Events */}
            {
              events.map((e) => 
                <div key={e.eventID}>
                  <MapEvent event={e}/>
                </div>
              )
            }

            {/** Drones */}
            {
              drones.map((d) => 
                <div key={d.id}>
                  <MapDrone drone={d}/>
                  <MapCoverage drone={d}/>
                </div>
              )
            }
          </>
        )}
        
      </MapGL>
    
  );
};

export default MapView;
