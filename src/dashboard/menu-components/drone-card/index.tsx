/**
 * The drone card component contains all the information related to the drone,
 * and is displayed in the drone menu.
 * Two buttons are attached to the card:
 * The locate button centers the map around the drone.
 * The video button activates video streaming on the client.
 * 
 * @param props The specific drone
 * @returns Drone card
 */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Drone } from "@/interfaces/drone";
import '../drone-card/style.scss';
import { faBatteryFull, faBatteryHalf, faBatteryQuarter, faBatteryThreeQuarters, faLocationCrosshairs, faVideo } from "@fortawesome/free-solid-svg-icons";
import useSelectStore from "@/hooks/select-store";
import useMapStore from "@/hooks/map-store";
import type { ViewState } from "react-map-gl";
import { useState } from "react";
import { SELECTED_COLOR } from "@/utils/constants";
import { startVideoStream, stopVideoStream } from "@/utils/server-commands";

const DroneCard = (props: {drone: Drone}) => {

  const drone = props.drone;
  const {selectedDrones, addDrone, removeDrone} = useSelectStore()
  const isSelected = selectedDrones.includes(drone.id);
  const setViewState = useMapStore(s => s.setViewState);
  const currentViewState = useMapStore(s => s.viewState);
  
  // If videoState is true, the video is being streamed.
  const [videoState, setVideoState] = useState<boolean>(false);

  // Display the proper battery icon based on the numeric battery value
  const getBatteryIcon = () => {
    
    const batteryLvl = drone.battery;
    
    if(batteryLvl > 75) return <FontAwesomeIcon icon={faBatteryFull} className="battery-icon"/>
    else if(batteryLvl > 50) return <FontAwesomeIcon icon={faBatteryThreeQuarters} className="battery-icon"/>
    else if(batteryLvl > 25) return <FontAwesomeIcon icon={faBatteryHalf} className="battery-icon"/>
    else return <FontAwesomeIcon icon={faBatteryQuarter} className="low-battery-icon"/>
  }

  /**
   * When the card for the drone has been selected,
   * the selection is tracked throughout the system
   */
  const onClick = () => {
    if(isSelected) removeDrone(drone.id);
    else addDrone(drone.id);
  }

  // Center the map around the drone's position
  const onLocateClick = () => {
    setViewState({
      longitude: drone.position.lng,
      latitude: drone.position.lat,
      zoom: currentViewState.zoom,
    } as ViewState)
  }

  // Toggle video streaming for the drone.
  const onVideoClick = () => {
    setVideoState(!videoState);

    if(videoState){
      stopVideoStream(drone);
    }
    else{
      startVideoStream(drone);
    }
  }
  
  return(
    <>
      <div className="drone-card">
        <div className={isSelected ? "drone-selected" : "drone-unselected"} onClick={onClick}>
          <div>
            <div className="drone-id">{drone.name}</div>
            <div className="battery">
              {`${drone.battery}%`}
              {getBatteryIcon()}
            </div>
          </div>
          <br/>
          <div className="position">
            {`lat: ${drone.position.lat.toFixed(5)},
              lng: ${drone.position.lng.toFixed(5)},
              alt: ${drone.position.alt.toFixed(2)}`}
            </div>
          <br/>
          <br/>
        </div>
        <div>
          <button className="follow-button" onClick={onLocateClick}>
            <FontAwesomeIcon icon={faLocationCrosshairs} className="button-icon"/>
            Locate
          </button>
          <button className="video-button" onClick={onVideoClick} style={{background: videoState ? SELECTED_COLOR : 'white'}}>
            <FontAwesomeIcon icon={faVideo} className="button-icon"/>
            Video
          </button>
        </div>
      </div>
    </>
  );
}

export default DroneCard;