/**
 * A small card which displays the drone name, location and battery life.
 * Meant for selecting the drones that are relevant for the mission.
 * 
 * @param props The specific drone.
 * @returns The mission drone card
 */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { Drone } from '@/interfaces/drone';
import './style.scss'
import { faBatteryFull, faBatteryHalf, faBatteryQuarter, faBatteryThreeQuarters } from '@fortawesome/free-solid-svg-icons';
import useSelectStore from '@/hooks/select-store';
import { SELECTED_COLOR } from '@/utils/constants';

const MissionDroneCard = (props: {drone: Drone}) => {

  const drone = props.drone;
  const {selectedDrones, addDrone, removeDrone} = useSelectStore();
  const isSelected = selectedDrones.includes(drone.id);

  const onClick = () => {
    if(isSelected) removeDrone(drone.id);
    else addDrone(drone.id);
  }

  const getBatteryIcon = () => {
    
    const batteryLvl = drone.battery;
    
    if(batteryLvl > 75) return <FontAwesomeIcon icon={faBatteryFull} className="battery-icon"/>
    else if(batteryLvl > 50) return <FontAwesomeIcon icon={faBatteryThreeQuarters} className="battery-icon"/>
    else if(batteryLvl > 25) return <FontAwesomeIcon icon={faBatteryHalf} className="battery-icon"/>
    else return <FontAwesomeIcon icon={faBatteryQuarter} className="low-battery-icon"/>
  }

  return(
    <>
      <div className='mission-drone-card' style={{border: `1px solid ${isSelected ? SELECTED_COLOR : 'black'}`, backgroundColor: isSelected ? '#cde6ff' : 'white'}} onClick={onClick}>
        <div>
          <div className="drone-id">{drone.name}</div>
          <div className="battery">
            {`${drone.battery}%`}
            {getBatteryIcon()}
          </div>
        </div>
        <br/>
        <div>
          {`lat: ${drone.position.lat.toFixed(5)},
            lng: ${drone.position.lng.toFixed(5)},
            alt: ${drone.position.alt.toFixed(2)}`}
        </div>
      </div>
    </>
  )
}

export default MissionDroneCard;