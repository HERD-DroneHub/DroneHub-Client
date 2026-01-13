/**
 * MapEvent component is responsible of displaying an event icon on the map.
 * 
 * @param props The specific event that needs to be displayed on the map.
 * @returns The drone event.
 */

import "./style.scss";
import { Marker } from "react-map-gl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import type { DroneEvent } from "@/interfaces/drone-event";

const MapEvent = (props: {event: DroneEvent}) => {

  const event = props.event;

  /**
   * When the event has been selected on the map,
   * something can be triggered depending on the event type.
   */
  const onClick = () => {
    console.log(event.content);
  }  

  return(
    <Marker
      latitude={event.position.lat}
      longitude={event.position.lng}
    >
      <div>
        <div
          className="event-circle"
          onClick={onClick}
        >
          <FontAwesomeIcon icon={faTriangleExclamation} className="event-icon"/>
        </div>
      </div>
    </Marker>
  )
}

export default MapEvent;