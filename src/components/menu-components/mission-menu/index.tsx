/**
 * The mission menu is displayed when the Mission button in the bottom menu has been selected.
 * It contains all the mission cards of each mission.
 * @returns MissionMenu
 */

import './style.scss';
import useMenuStore from '@/hooks/menu-store';
import useMissionStore from '@/hooks/mission-store';
import type { Mission } from '@/interfaces/mission';
import MissionContainer from '../mission-container';
import MissionCard from '../mission-card';

const MissionMenu = () => {

  const isSelected: boolean = useMenuStore((state) => state.missionSelected);
  const missions: Mission[] = Array.from(useMissionStore((state) => state.missions).values());

  if(isSelected)
    return(
      <>
        <div className='mission-menu'>
          <MissionContainer/>
          {
            missions.length > 0 ?
            <div className='mission-container'>
              {missions.map((m) => <MissionCard key={m.id} mission={m}/>)}
            </div>
            :
            <></>
          }
          
        </div>
      </>
    );
  
  return(<></>);
}

export default MissionMenu;