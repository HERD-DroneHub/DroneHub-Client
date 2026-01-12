import { MapDrawPolygon } from "@/components/map-draw/map-draw-polygon";
import MissionDroneCard from "@/components/menu-components/mission-drone-card";
import MissionInput from "@/components/menu-components/mission-input";
import useDroneStore from "@/hooks/drone-store";
import useMapDrawStore from "@/hooks/map-draw-store";
import useMissionStore from "@/hooks/mission-store";
import useDroneSelectionStore from "@/hooks/select-store";
import type { Mission } from "@/interfaces/mission";
import * as constants from "@/utils/constants";
import { MissionConfig, MissionTypes } from "@/utils/mission-types";
import { sendStopMissionMessage } from "@/utils/server-commands";
import { useEffect, useState } from "react";
import { PerimeterSearchDefaultName } from "./description";

const DEFAULT_MISSION: Mission = {
  id: '',
  name: PerimeterSearchDefaultName,
  type: MissionTypes.PERIMETER_SEARCH,
  coords: [],
  horizontalDistance: 2,
  verticalDistance: 2,
  altitude: 20,
  speed: 5,
  drones: [],
  active: false,
};

export const PerimeterSearchMission = (props: {returnTo: (value: string) => void, mission?: Mission}) => {

  const [mission, setMission] = useState<Mission>(props.mission ? props.mission : DEFAULT_MISSION);
  const prevMission = props.mission;
  const configState = props.mission ? 'edit' : 'new';

  const drones = Array.from(useDroneStore((s) => s.drones).values());
  const selectedDrones = useDroneSelectionStore((s) => s.selectedDrones);
  const {removeMission} = useMapDrawStore(); 

  const [display, setDisplay] = useState<'settings' | 'area-select'>('settings');

  useEffect(() => {
    console.log(mission.id);
  });

  const setName = (value: string) => {
    setMission(prev => ({ ...prev, name: value }));
  }
  const setId = (value: string) => {
    setMission(prev => ({ ...prev, id: value }));
    console.log(value);
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

  const droneSelection = () => {
    if(selectedDrones.length === 0){
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
    else {
      setMission(prevMission!);
      props.returnTo(MissionConfig.DEFAULT);
    }
    
  }

  const onSave = () => { 
    if(mission.id != '') {
      const temp = { ...mission };
      temp.drones = selectedDrones;

      if(temp.active){
        for(const drone of temp.drones)
          sendStopMissionMessage(drone);
      }

      temp.active = false;
  
      useMissionStore.setState((prev) => ({missions: new Map(prev.missions).set(mission.id, temp)}))
      props.returnTo(MissionConfig.DEFAULT);
    }
  };

  const disableSave = () => {
    return mission.coords.length === 0 || mission.name.trim() === PerimeterSearchDefaultName || mission.id === '';
  }

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