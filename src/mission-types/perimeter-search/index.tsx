import { MapDrawPolygon } from "@/components/map-draw/map-draw-polygon";
import MissionDroneCard from "@/components/menu-components/mission-drone-card";
import MissionInput from "@/components/menu-components/mission-input";
import useDroneStore from "@/hooks/drone-store";
import useMapDrawStore from "@/hooks/map-draw-store";
import useMissionStore from "@/hooks/mission-store";
import useDroneSelectionStore from "@/hooks/select-store";
import type { Mission } from "@/interfaces/mission";
import * as constants from "@/utils/constants";
import { MissionConfig } from "@/utils/mission-types";
import { sendStopMissionMessage } from "@/utils/server-commands";
import { useState } from "react";
import { PS_DEFAULT_MISSION, PS_DEFAULT_NAME } from "./description";

/** Component for configuring and managing a Perimeter Search Mission
 * @param props - The properties for the PerimeterSearchMission component.
 * @param props.returnTo - A function to return to the previous mission container state.
 * @param props.mission - An optional existing mission to edit.
 * @returns A React component for configuring a Perimeter Search Mission.
 */

export const PerimeterSearchMission = (props: {returnTo: (value: string) => void, mission?: Mission}) => {

  const [mission, setMission] = useState<Mission>(props.mission ? props.mission : PS_DEFAULT_MISSION);
  const prevMission = props.mission;
  const configState = props.mission ? 'edit' : 'new';

  const drones = Array.from(useDroneStore((s) => s.drones).values());
  const selectedDrones = useDroneSelectionStore((s) => s.selectedDrones);
  const {draw, addMission, removeMission} = useMapDrawStore(); 

  const [display, setDisplay] = useState<'settings' | 'area-select'>('settings');

  const setName = (value: string) => {
    setMission(prev => ({ ...prev, name: value }));
  }
  const setId = (value: string) => {
    setMission(prev => ({ ...prev, id: value }));
  }

  const setCoords = (value: number[][]) => {
    setMission(prev => ({ ...prev, coords: value }));
  }

  const onEditMissionArea = () => {
    setDisplay('area-select');
  };

  const setSpeed = (value: number) => {
    setMission(prev => ({ ...prev, speed: value }));
  }

  const setAltitude = (value: number) => {
    setMission(prev => ({ ...prev, altitude: value }));
  }

  const setVertical = (value: number) => {
    setMission(prev => ({ ...prev, verticalDistance: value }));
  }

  const setHorizontal = (value: number) => {
    setMission(prev => ({ ...prev, horizontalDistance: value }));
  }

  // Renders the list of connected drones for selection. If no drones are connected, shows a message.
  const droneSelection = () => {
    if(drones.length === 0){
      return(
        <>
          No Drones Connected
        </>
      );
    }
    return (
      <>
        {drones.map((d) => <MissionDroneCard key={d.id} drone={d}/>)}
      </>
    );
  }

  const onCancel = () => {
    if(configState === 'new'){
      if(mission.id != '') removeMission(mission.id);
      props.returnTo(MissionConfig.CREATE);
    }
    // If the user was editing an existing mission, revert any changes made.
    else {
      // Delete the new mission drawn.
      draw.delete(mission.id);
      removeMission(mission.id);

      // Add the previous mission back to the store and map.
      addMission({
        id: prevMission!.id,
        coords: prevMission!.coords
      });

      // Set the mission state back to the previous mission.
      setMission(prevMission!);

      // Return to the default mission container view (new btn).
      props.returnTo(MissionConfig.DEFAULT);
    }
    
  }

  // Saves the mission configuration and returns to the main mission container.
  const onSave = () => {
    // Mission ID is from the id given by the shape from MapBox Draw.
    if(mission.id != '') {
      const temp = { ...mission };
      temp.drones = selectedDrones;

      // If editing an active mission, stop it on all drones first.
      if(temp.active){
        for(const drone of temp.drones)
          sendStopMissionMessage(drone);
      }

      temp.active = false;
      
      // Update the mission in the global mission store.
      useMissionStore.setState((prev) => ({missions: new Map(prev.missions).set(mission.id, temp)}))
      
      // Return to the default mission container view (new btn).
      props.returnTo(MissionConfig.DEFAULT);
    }
  };

  // Disables the save button if required fields are not filled out.
  const disableSave = () => {
    return mission.coords.length === 0 || mission.name.trim() === PS_DEFAULT_NAME || mission.id === '';
  }

  // Renders either the mission settings or the area selection interface.
  if(display === 'settings')
    return (
      <div>
        <h2>Perimeter Search Mission</h2>
        
        <div className="setting-container">
          <input className="mission-input" defaultValue={mission.name} onChange={(e) => setName(e.target.value)}/>
          <button className="edit-mission-area-button" onClick={onEditMissionArea}>Edit Mission Area</button>
        </div>
        <br/>
        <div className="mission-settings">
          <div className="setting-container">
            <MissionInput defaultValue={mission.speed} unit="Speed (m/s)" minValue={constants.MIN_SPEED} maxValue={constants.MAX_SPEED} setValue={setSpeed}/>
            <MissionInput defaultValue={mission.altitude} unit="Altitude (m)" minValue={constants.MIN_ALTITUDE} maxValue={constants.MAX_ALTITUDE} setValue={setAltitude}/>
          </div>
          <div className="setting-container">
            <MissionInput defaultValue={mission.verticalDistance} unit="Vertical Sep. (m)" minValue={constants.MIN_VERTICAL} maxValue={constants.MAX_VERTICAL} setValue={setVertical}/>
            <MissionInput defaultValue={mission.horizontalDistance} unit="Horizontal Sep. (m)" minValue={constants.MIN_HORIZONTAL} maxValue={constants.MAX_HORIZONTAL} setValue={setHorizontal}/>
          </div>
        </div>
        <br/>
        <div className="drone-container">
            {droneSelection()}
          </div>
        <br/>
        <div>
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onSave} disabled={disableSave()}>Save</button>
        </div>
      </div>
    );
  else
    return (
      <MapDrawPolygon missionId={mission.id} missionCoords={mission.coords} returnTo={() => setDisplay('settings')} setId={setId} setCoords={setCoords} />
    )
}