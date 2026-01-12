/**
 * The MissionCard component displays the name and type of the mission.
 * The deploy button starts the mission, and turns into a stop button.
 * The stop button stops the ongoing mission, and turns into a deploy button.
 * The configure opens up the edit mission menu.
 * 
 * @param props The specific mission.
 * @returns Mission card with the mission name and type. Also includes the deploy button and configure button.
 */

import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { Mission } from '@/interfaces/mission';
import { faGear, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import useMissionStore from '@/hooks/mission-store';
import { sendStopMissionMessage,  } from '@/utils/server-commands';
import useMissionContainerStore from '@/hooks/mission-container-store';
import { MissionTypes } from '@/utils/mission-types';

const MissionCard = (props: {mission: Mission}) => {

  const setMissionContainer = useMissionContainerStore((state) => state.setMissionContainer);
  const setMissionType = useMissionContainerStore((state) => state.setMissionType);
  const setSelectedMission = useMissionContainerStore((state) => state.setSelectedMission);
  
  const mission = props.mission;
  
  const onStopClick = () => {
    const tempMission = {...mission};
    tempMission.active = false;

    useMissionStore.setState((prev) => ({missions: new Map(prev.missions).set(mission.id, tempMission)}))

    for(const drone of mission.drones)
      sendStopMissionMessage(drone);
  }

  const onDeployClick = () => {
    const tempMission = {...mission};
    tempMission.active = true;

    useMissionStore.setState((prev) => ({missions: new Map(prev.missions).set(mission.id, tempMission)}))

    if(mission.type == MissionTypes.PERIMETER_SEARCH)
      //sendWaypointMissionCommand(mission);
      console.log("Perimeter Search");
      
    else if(mission.type == MissionTypes.OPTIMAL_SEARCH){
      console.log("Optimal Search");
      //sendOptimizedMission(mission)
    }
  }

  const onConfigClick = () => {
    setSelectedMission(mission);
    switch(mission.type) {
      case MissionTypes.PERIMETER_SEARCH:
        setMissionType(MissionTypes.PERIMETER_SEARCH);
        setMissionContainer(MissionTypes.PERIMETER_SEARCH);
        break;
      case MissionTypes.OPTIMAL_SEARCH:
        setMissionType(MissionTypes.OPTIMAL_SEARCH);
        setMissionContainer(MissionTypes.OPTIMAL_SEARCH);
        break;
      default:
        console.log('Unknown mission type:', mission.type);
        break;
    }
  }
  
  return(
    <>
      <div className='menu-card'>
        <div className='mission-info'>
          <div className='mission-id'>{mission.name}</div>
          {mission.type}
          {}
        </div>
        <div>
          <div>
            { mission.active ?
              <button className="stop-button" onClick={onStopClick}>
                <FontAwesomeIcon icon={faStop} className="button-icon"/>
                Stop
              </button>
              :
              <button className="stop-button" onClick={onDeployClick}>
                <FontAwesomeIcon icon={faPlay} className="button-icon"/>
                Deploy
              </button>                          
            }
            <button className="configure-button" onClick={onConfigClick}>
              <FontAwesomeIcon icon={faGear} className="button-icon"/>
              Configure
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default MissionCard;