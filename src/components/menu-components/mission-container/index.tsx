import "./style.scss";
import useConfigureMissionStore from "@/hooks/mission-config-store";
import useDroneSelectionStore from "@/hooks/select-store";
import type { Mission } from "@/interfaces/mission";
import {
  MIN_ALTITUDE,
  MIN_HORIZONTAL,
  MIN_SPEED,
  MIN_VERTICAL,
  PERIMETER_SEARCH,
} from "@/utils/constants";
import MissionConfigMenu from "../mission-config-menu";

const MissionContainer = () => {
  const configState = useConfigureMissionStore((s) => s);
  const selectedDrones = useDroneSelectionStore(
    (state) => state.selectedDrones
  );

  const mission = configState.mission;

  const onNewMission = () => {
    const newMission: Mission = {
      id: "",
      name: "Mission #",
      drones: selectedDrones,
      coords: [],
      speed: MIN_SPEED,
      altitude: MIN_ALTITUDE,
      verticalDistance: MIN_VERTICAL,
      horizontalDistance: MIN_HORIZONTAL,
      type: PERIMETER_SEARCH,
      active: false,
    };

    configState.enableConfigure(newMission);
  };

  if (mission)
    return (
      <>
        <MissionConfigMenu mission={mission} />
      </>
    );
  else
    return (
      <>
        <div className="new-mission-container">
          <button className="new-mission-button" onClick={onNewMission}>
            New mission
          </button>
        </div>
      </>
    );
};

export default MissionContainer;