import { Marker } from "react-map-gl";
import './style.scss'
import type { Drone } from "@/interfaces/drone";
import MapDroneIcon from "../map-drone-icon";

/**
 * MapDrone component is responsible for displaying the drone at the correct position on the map.
 * @param props The specific drone
 * @returns The drone icon that needs to be displayed on the map.
 */

const MapDrone = (props: {drone: Drone}) => {
  const drone = props.drone;

  return(
    <>
      <Marker
        latitude={drone.position.lat}
        longitude={drone.position.lng}
      >
        <div className="drone-container">
          <MapDroneIcon drone={drone} />
        </div>
      </Marker>
    </>
  );
}


export default MapDrone;