import './style.scss';
import React, { useEffect, useRef, useState } from 'react';
import MapGL, { type MapRef, GeolocateControl } from 'react-map-gl';
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
import 'mapbox-gl/dist/mapbox-gl.css'; 
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

  const geolocateControlRef = useRef<any>(null);
  const geolocateTriggered = useRef(false);

  useEffect(() => {
    // Trigger geolocation when map loads (only once)
    if (mapLoaded && geolocateControlRef.current && !geolocateTriggered.current) {
      geolocateControlRef.current.trigger();
      geolocateTriggered.current = true;
    }
  }, [mapLoaded]);

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

  const handleGeolocate = (e: any) => {
    // Update map view to user's location when geolocate is triggered
    mapStore.setViewState({
      longitude: e.coords.longitude,
      latitude: e.coords.latitude,
      zoom: 17,
      bearing: 0,
      pitch: 0,
      padding: { top: 0, bottom: 0, left: 0, right: 0 },
    });
  }

  return (
    <MapGL
        mapboxAccessToken={MAPBOX_KEY}
        {...mapStore.viewState}
        onMove={evt => mapStore.setViewState(evt.viewState)}
        mapStyle='mapbox://styles/mapbox/standard'
        cursor='grab'
        doubleClickZoom={false}
        ref={mapRef}
        onLoad={onLoad}
      >
        <GeolocateControl
          ref={geolocateControlRef}
          position="top-right"
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          showUserHeading={true}
          onGeolocate={handleGeolocate}
        />
        
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
