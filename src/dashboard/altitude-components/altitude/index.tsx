import '../altitude/style.scss';
import type { Drone } from '@/interfaces/drone';
import useDroneStore from '@/hooks/drone-store';
import AltitudeMarker from '../altitude-marker';
import { MAX_ALTITUDE } from '@/utils/constants';

/**
 * The altitude component shows the vertical separation between the drones,
 * to gain a better overview of the drones' positioning.
 * 
 * @returns Altitude component
 */

const Altitude = () => {

  // Fetch updated data of the active drones.
  const drones: Drone[] = Array.from(useDroneStore((state) => state.drones).values());

  return (
    <>
      <div className="altitude">
        <div className='altitude-container' />

        {/** Max altitude */}
        <div className='drone-altitude' style={{bottom: `calc(100% - 25px)`}}>
          <div className='altitude-marker'/>
          <div className='drone-id-container'>{MAX_ALTITUDE} m</div>
        </div>

        {/** Altitude markers for drones */}
        {drones.map(d =>
          <AltitudeMarker key={d.id} drone={d}/>
        )}
      </div>
    </>
  )
}

export default Altitude;