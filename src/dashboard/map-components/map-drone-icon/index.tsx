
/**
 * The visual of the drone displayed on the map.
 * 
 * @param props The specific drone.
 * @returns The drone icon with the proper color and rotation.
 */

import './style.scss';
import type { Drone } from "@/interfaces/drone";
import DroneIcon from '@/assets/drone-icon.png'
import useDroneSelectionStore from "@/hooks/select-store";
import { hexToRgb } from "@/utils/colors";
import { SELECTED_COLOR } from "@/utils/constants";

const MapDroneIcon = (props: {drone: Drone}) => {

  const drone = props.drone

  /**
   * Tracks when the drone is selected or deselected on the map,
   * or if it has been selected through another component.
   */
  const addDrone = useDroneSelectionStore(s => s.addDrone);
  const removeDrone = useDroneSelectionStore(s => s.removeDrone);
  const isSelected = useDroneSelectionStore(s => s.selectedDrones).includes(drone.id);

  const onClick = () => {
    if(isSelected) removeDrone(drone.id)
    else addDrone(drone.id);
  }

  return(
    <div
      className="drone-circle"
      onClick={onClick}
      style={{
        background: isSelected ? `rgba(${hexToRgb(SELECTED_COLOR)}, 0.5)` : `rgba(${hexToRgb(drone.color)}, 0.2)`,
        border: `3px solid ${drone.color}`
      }}
    >
      <img
          src={DroneIcon}
          alt='Drone'
          className="drone-icon"
          style={{
            transform: `rotate(${drone.yaw}deg)`
          }}
        />
    </div> 
  )
}

export default MapDroneIcon;