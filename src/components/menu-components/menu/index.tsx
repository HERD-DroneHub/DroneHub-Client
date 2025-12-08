import './style.scss';
import BottomMenu from '../bottom-menu';
import DroneMenu from '../drone-menu';
import MissionMenu from '../mission-menu';

/**
 * The Menu component contains all menu related components
 * including submenus
 * @returns Menu
 */
const Menu = () => {

  return(
    <>
      <DroneMenu/>
      <MissionMenu/>
      <BottomMenu/>
    </>
  )
}

export default Menu;