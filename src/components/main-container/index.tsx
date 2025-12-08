/**
 * The main container contains all UI elements on the website and makes it into a single page app.
 * When new components needs to be added to the system, and don't fit the existing components,
 * add it to this component.
 * 
 * @returns Main container of the application
 */

import './style.scss';
import Altitude from "../altitude-components/altitude";
import MapView from '../map-components/map-view';
import EmergencyStop from '../emergency-stop';
import Menu from '../menu-components/menu';

const MainContainer = () => {

  return(
    <div className="main-container">
      <MapView />
      <EmergencyStop />
      <Altitude />
      <Menu />
    </div>
  )
}

export default MainContainer;