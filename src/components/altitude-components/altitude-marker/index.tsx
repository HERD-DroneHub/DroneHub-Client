import type { Drone } from "../../../interfaces/drone";
import useSelectStore from "../../../hooks/select-store";
import './style.scss';
import { MAX_ALTITUDE, SELECTED_COLOR } from "../../../utils/constants";

/**
 * Altitude marker for a drone that needs to be displayed on the altitude component.
 * 
 * @param props The specific drone that needs to be displayed
 * @returns The altitude marker
 */

const AltitudeMarker = (props: {drone: Drone}) => {

  const drone = props.drone;
  const selectStore = useSelectStore(s => s);
  const isSelected = selectStore.selectedDrones.includes(drone.id);
  
  /**
   * Get the position of the marker based on the drone's altitude
   * and the max altitude (the top of the altitude component)
  */ 
  const getPercentage = (altitude: number) => {
    return altitude / MAX_ALTITUDE * 100;
  }

  /**
   * When the altitude marker for the drone has been selected,
   * the selection is tracked throughout the system
   */
  const onClick = () => {
    if(isSelected) selectStore.removeDrone(drone.id);
    else selectStore.addDrone(drone.id);    
  }

  return(
    <>
      <div key={drone.id} className='drone-altitude' style={{bottom: `${getPercentage(drone.position.alt)}%`}}>
        <div className='altitude-marker'/>
        <div
          className='drone-id-container'
          style={{
            background: isSelected ? SELECTED_COLOR : 'white'
          }}
          onClick={onClick}
        >
          {`${drone.name} | ${drone.position.alt.toFixed(2)} m`}
          <div className="color-indicator" style={{background: drone.color}}/>
        </div>
      </div>
    </>
  )
}

export default AltitudeMarker;