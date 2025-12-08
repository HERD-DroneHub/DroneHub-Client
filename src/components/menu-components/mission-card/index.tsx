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
import useConfigureMissionStore from '@/hooks/mission-config-store';
import { sendStopMissionMessage,  } from '@/utils/server-commands';
import { OPTIMAL_SEARCH, PERIMETER_SEARCH } from '@/utils/constants';

const MissionCard = (props: {mission: Mission}) => {
  
  const mission = props.mission;
  const enableConfigure = useConfigureMissionStore((s) => s.enableConfigure);
  
  const onStopClick = () => {
    const tempMission = mission;
    tempMission.active = false;

    useMissionStore.setState((prev) => ({missions: new Map(prev.missions).set(mission.id, tempMission)}))

    for(const drone of mission.drones)
      sendStopMissionMessage(drone);
  }

  const onDeployClick = () => {
    const tempMission = mission;
    tempMission.active = true;

    useMissionStore.setState((prev) => ({missions: new Map(prev.missions).set(mission.id, tempMission)}))

    if(mission.type == PERIMETER_SEARCH)
      //sendWaypointMissionCommand(mission);
      console.log("Perimeter Search");
      
    else if(mission.type == OPTIMAL_SEARCH){
      console.log("Optimal Search");
      //sendOptimizedMission(mission)
    }
  }

  const onConfigClick = () => {
    enableConfigure(mission);
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