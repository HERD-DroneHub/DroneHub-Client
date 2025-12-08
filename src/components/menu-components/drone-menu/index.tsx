import './style.scss';
import useDroneStore from '@/hooks/drone-store';
import useMenuStore from '@/hooks/menu-store';
import type { Drone } from '@/interfaces/drone';
import DroneCard from '../drone-card';


/**
 * DroneMenu displays the container with the drone cards if the menu has been selected,
 * else it will show nothing.
 * @returns Drone menu with all the drone cards for each drone.
 */

const DroneMenu = () => {

  const isSelected: boolean = useMenuStore((state) => state.droneSelected);
  const drones: Drone[] = Array.from(useDroneStore((state) => state.drones).values());

  /**
   * If the "Drones" button has been selected in the bottom menu,
   * display the container with all the drone cards.
   */
  if(isSelected)
    return (
      <>
        <div className="drone-menu">
          <h3>Drones</h3>
          <div className='drone-card-container'>
            {drones.map(d => <DroneCard key={d.id} drone={d} />)}
          </div>
        </div>
      </>
    );
  
  return(<></>);
}

export default DroneMenu;