import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../emergency-stop/style.scss';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import useDroneStore from '@/hooks/drone-store';
import { sendStopMissionMessage } from '@/utils/server-commands';

/**
 * The EmergencyStop button which stop all autonomous behaviour of the drones,
 * which makes it so the drones hover at their last known position.
 * @returns The emergency stop button.
 */

const EmergencyStop = () => {

  const droneIDs = Array.from(useDroneStore((state) => state.drones).keys());

  // When clicked, a stop message is sent to each drone through the server.
  const onClick = () => {
    for(const id of droneIDs)
      sendStopMissionMessage(id);
  }

  return (
    <>
      <button className='emergency-stop' onClick={onClick}>
        <FontAwesomeIcon icon={faExclamationCircle} className='emergency-icon'/>
      </button>
    </>
  )
}

export default EmergencyStop;