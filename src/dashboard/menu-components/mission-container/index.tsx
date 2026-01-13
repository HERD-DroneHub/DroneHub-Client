import "./style.scss";
import { MissionConfig, MissionTypes, type MissionConfigType, type MissionType } from "@/utils/mission-types";
import useMissionContainerStore from "@/hooks/mission-container-store";
import { PS_DESCRIPTION } from "@/mission-types/perimeter-search/description";
import { GoToDescription } from "@/mission-types/go-to/description";
import { OptimalSearchDescription } from "@/mission-types/optimal-search/description";
import { PerimeterSearchMission } from "@/mission-types/perimeter-search";

const MissionContainer = () => {

  const missionContainer = useMissionContainerStore((state) => state.missionContainer);
  const missionType = useMissionContainerStore((state) => state.missionType);
  const selectedMission = useMissionContainerStore((state) => state.selectedMission);
  const setMissionContainer = useMissionContainerStore((state) => state.setMissionContainer);
  const setMissionType = useMissionContainerStore((state) => state.setMissionType);
  const setSelectedMission = useMissionContainerStore((state) => state.setSelectedMission);

  const onNewMission = () => {
     setMissionContainer(MissionConfig.CREATE);
  }

  const onMissionTypeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMissionType(event.target.value as MissionType);
  }

  const onTypeCancel = () => {
    setMissionContainer(MissionConfig.DEFAULT);
  }

  const onTypeNext = () => {
    setSelectedMission(null);
    setMissionContainer(missionType);
  }

  // Renders the appropriate mission configuration component based on the selected mission type.
  const MissionConfigType = () => {
    switch(missionType){
      case MissionTypes.GO_TO:
        return <div>Go To Mission Configuration</div>;
      case MissionTypes.PERIMETER_SEARCH:
        return <PerimeterSearchMission returnTo={(value) => setMissionContainer(value as MissionType | MissionConfigType)} mission={selectedMission || undefined}/>;
      case MissionTypes.OPTIMAL_SEARCH:
        return <div>Optimal Search Mission Configuration</div>;
      default:
        return <div></div>;
    }
  }

  const missionText = () => {
    switch(missionType){
      case MissionTypes.GO_TO:
        return GoToDescription;
      case MissionTypes.PERIMETER_SEARCH:
        return PS_DESCRIPTION;
      case MissionTypes.OPTIMAL_SEARCH:
        return OptimalSearchDescription;
      default:
        return "";
    }
  }

  /** If the user selects to create a new mission, show the mission type selection screen. */
  if(missionContainer == MissionConfig.CREATE)
    return(
      <>
        <div className="mission-type-container">
          <select className="mission-select" onChange={onMissionTypeSelect} value={missionType}>
              <option value={MissionTypes.GO_TO}>{MissionTypes.GO_TO}</option>
              <option value={MissionTypes.PERIMETER_SEARCH}>{MissionTypes.PERIMETER_SEARCH}</option>
              <option value={MissionTypes.OPTIMAL_SEARCH}>{MissionTypes.OPTIMAL_SEARCH}</option>
          </select>
          <div className="mission-type-description">
            <h3>Description</h3>
            <div>{missionText()}</div>
          </div>

        <div className="mission-type-button-container">
          <button onClick={onTypeCancel}>Cancel</button>
          <button onClick={onTypeNext}>Next</button>
        </div>
        </div>
      </>
    )
  /** If no mission is being configured, show the new mission button. */
  else if(missionContainer == MissionConfig.DEFAULT)
    return(
      <>
        <div className="new-mission-container">
          <button className="new-mission-button" onClick={onNewMission}>
            New mission
          </button>
        </div>
      </>
    )
  /** If a mission type is selected, render the corresponding mission configuration component. */
  else
    return(
      <>
        <div className="mission-config-container">
          {MissionConfigType()}
        </div>
      </>
    );
};

export default MissionContainer;