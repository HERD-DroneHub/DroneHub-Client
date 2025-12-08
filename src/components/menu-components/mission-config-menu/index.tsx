import { useState } from "react";
import type { Mission, MissionDraw } from "@/interfaces/mission";
import { GOTO_MISSION, MAX_ALTITUDE, MAX_HORIZONTAL, MAX_SPEED, MAX_VERTICAL, MIN_ALTITUDE, MIN_HORIZONTAL, MIN_SPEED, MIN_VERTICAL, OPTIMAL_SEARCH, PERIMETER_SEARCH } from "@/utils/constants";
import MissionInput from "../mission-input";
import MissionDroneCard from "../mission-drone-card";
import useDroneStore from "@/hooks/drone-store";
import useDroneSelectionStore from "@/hooks/select-store";
import useConfigureMissionStore from "@/hooks/mission-config-store";
import { editPolygon } from "@/utils/polygon";
import useMapDrawStore from "@/hooks/map-draw-store";
import useMissionStore from "@/hooks/mission-store";
import type { Polygon } from "@/interfaces/polygon";
import { sendStopMissionMessage } from "@/utils/server-commands";

/**
 * This component handles all configurations of a mission.
 * @param props The specific mission
 * @returns The mission configure display. 
 */

const MissionConfigMenu = (props: {mission: Mission}) => {

  const [mission, setMission] = useState(props.mission);
  
  const configState = useConfigureMissionStore((s) => s)
  const {draw, addMission, removeMission} = useMapDrawStore(); 
  const drones = Array.from(useDroneStore((s) => s.drones).values());
  const selectedDrones = useDroneSelectionStore((s) => s.selectedDrones);

  const onEditMissionArea = () => {

    if(mission.id != ''){
      removeMission(mission.id);
      editPolygon(draw, mission.id, mission.coords);
    }
    else {
      draw.changeMode('draw_polygon');
    }
  
    configState.enableEditArea(mission);
  }

  const onCancelMission = () => {
    if(mission.id != '') removeMission(mission.id);
    configState.disable();
  }

  const onApplyMission = () => {

    if(mission.id !== ''){

      const temp = mission;
      temp.drones = selectedDrones;

      if(temp.active){
        for(const drone of temp.drones)
          sendStopMissionMessage(drone);
      }

      temp.active = false;
  
      useMissionStore.setState((prev) => ({missions: new Map(prev.missions).set(mission.id, temp)}))
     
      configState.disable();
    }
  }

  const onCancelArea = () => {
    const missionDraw = draw.getAll().features[draw.getAll().features.length - 1];

    if(missionDraw.id != undefined){

      draw.delete(missionDraw.id.toString());

      if(mission.id != ''){
        addMission({
          id: mission.id,
          coords: mission.coords
        });
      }

      configState.enableConfigure(mission);
    } 
  }

  const onApplyArea = () => {
    const missionDraw = draw.getAll().features[draw.getAll().features.length - 1];
    const geometry = missionDraw.geometry as Polygon;
    
    if(missionDraw.id != undefined){
      draw.delete(missionDraw.id.toString());

      addMission({
        id: missionDraw.id.toString(),
        coords: geometry.coordinates[0]
      });

      const temp = mission;
      temp.id = missionDraw.id.toString();
      temp.coords = geometry.coordinates[0];

      configState.enableConfigure(temp);
    } 
  }

  const onTypeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {

    const type = e.target.value;

    if(type == OPTIMAL_SEARCH){
      console.log("Generating optimized path...");
    }
    else {
      const updatedMission = { ...mission, type: type, optimizedCoords: new Map<string, number[][]>()};
      setMission(updatedMission);
    }
  }

  const setName = (value: string) => {
    const updatedMission = { ...mission, name: value };
    setMission(updatedMission);
  }

  const setSpeed = (value: number) => {
    const updatedMission = { ...mission, speed: value };
    setMission(updatedMission);
  }

  const setAltitude = (value: number) => {
    const updatedMission = { ...mission, altitude: value };
    setMission(updatedMission);
  }

  const setVertical = (value: number) => {
    const updatedMission = { ...mission, verticalDistance: value };
    setMission(updatedMission);
  }

  const setHorizontal = (value: number) => {
    const updatedMission = { ...mission, horizontalDistance: value };
    setMission(updatedMission);
  }

  if(configState.editAreaSelected)
    return(
      <>
        <div className="configure-mission-container">
          <div className="button-container">
            <button className="cancel-button" onClick={onCancelArea}>Cancel</button>
            <button className="apply-button" onClick={onApplyArea}>Apply</button>
          </div>
        </div>
      </>
    )

  else
    return(
      <>
        <div className="configure-mission-container">
          <div className="mission-settings">
            <div className="setting-container">
              <input className="mission-input" defaultValue={mission.name} onChange={(e) => setName(e.target.value)}/>
              <br/>
              <MissionInput defaultValue={mission.speed} unit="Speed (m/s)" minValue={MIN_SPEED} maxValue={MAX_SPEED} setValue={setSpeed}/>
              <MissionInput defaultValue={mission.altitude} unit="Altitude (m)" minValue={MIN_ALTITUDE} maxValue={MAX_ALTITUDE} setValue={setAltitude}/>
            </div>

            <div className="setting-container">
              <div className="select-area-container">
                <button className="edit-mission-area-button" onClick={onEditMissionArea}>Edit Mission Area</button>
              </div>
              <br/>
                <MissionInput defaultValue={mission.verticalDistance} unit="Vertical Sep. (m)" minValue={MIN_VERTICAL} maxValue={MAX_VERTICAL} setValue={setVertical}/>
                <MissionInput defaultValue={mission.horizontalDistance} unit="Horizontal Sep. (m)" minValue={MIN_HORIZONTAL} maxValue={MAX_HORIZONTAL} setValue={setHorizontal}/>
            </div>
          </div>

          <div className="drone-container">
            {drones.map((d) =>
                <MissionDroneCard key={d.id} drone={d}/>
            )}
          </div>

          <div className="mission-type-container">
            <div className="mission-select-container">
              <select className="mission-select" onChange={onTypeChange} defaultValue={mission.type}>
                <option value={PERIMETER_SEARCH}>Perimeter search</option>
                <option value={GOTO_MISSION}>Go-To Location</option>
                <option value={OPTIMAL_SEARCH} disabled={mission.id == '' || selectedDrones.length == 0}>Optimized search</option>
              </select>
            </div>
          </div>

          <div className="button-container">
            <button className="cancel-button" onClick={onCancelMission}>Cancel</button>
            <button
              className="apply-button"
              onClick={onApplyMission} 
              style={{opacity: mission.name == '' || mission.name == 'Mission #' || mission.id == '' || selectedDrones.length == 0 ? 0.2 : 1}}
              disabled={mission.name == '' || mission.name == 'Mission #' || mission.id == '' || selectedDrones.length == 0 }
              >
                Apply
              </button>
          </div>
        </div>
      </>
    )
}

export default MissionConfigMenu;