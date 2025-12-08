import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDrawPolygon, faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import '../bottom-menu/style.scss';
import useMenuStore from '@/hooks/menu-store';

/**
 * The bottom menu contains all the menu items,
 * and resides on the bottom of the screen.
 * @returns Bottom menu with all submenus
 */

const BottomMenu = () => {

  // Tracks which submenu has been selected.
  const menuStore = useMenuStore();
    
  return(
    <>
      <div className="bottom-menu">
        <button className='button' onClick={menuStore.missionSelected ? menuStore.disable : menuStore.enableMission}>
          <FontAwesomeIcon icon={faDrawPolygon} className='icon' />
          Missions
        </button>
        <button className='button' onClick={menuStore.droneSelected ? menuStore.disable : menuStore.enableDrone}>
          <FontAwesomeIcon icon={faLocationArrow} className='icon' />
          Drones
        </button>
      </div>
    </>
  );
}

export default BottomMenu;