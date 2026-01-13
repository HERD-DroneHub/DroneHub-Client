import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDrawPolygon, faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import MissionMenu from '../mission-menu';
import DroneMenu from '../drone-menu';

/**
 * The Menu component contains all menu related components
 * including submenus
 * @returns Menu
 */
const Menu = () => {

  const [selectedItem, setSelectedItem] = useState<string>('');

  // Tracks which submenu has been selected.
  const showMenu = () => {
    if(selectedItem === 'missions'){
      return(<MissionMenu/>)
    }
    else if(selectedItem === 'drones'){
      return(<DroneMenu/>)
    }
    else{
      return(<></>)
    }
  }

  const changeSelectedItem = (item: string) => {
    if(selectedItem === item){
      setSelectedItem('');
    } else {
      setSelectedItem(item);
    }
  }

  return(
    <>
      {showMenu()}
      <div className="bottom-menu">
        <button className='menu-button' onClick={() => changeSelectedItem('missions')}>
          <FontAwesomeIcon icon={faDrawPolygon} className='icon' />
          Missions
        </button>
        <button className='menu-button' onClick={() => changeSelectedItem('drones')}>
          <FontAwesomeIcon icon={faLocationArrow} className='icon' />
          Drones
        </button>
      </div>
    </>
  )
}

export default Menu;