import useMapDrawStore from "@/hooks/map-draw-store";
import type { Polygon } from "@/interfaces/polygon";
import { editPolygon } from "@/utils/polygon";
import { useEffect } from "react";

/**
 * Component for drawing and editing polygons on the map for mission areas.
 * @param props - The properties for the MapDrawPolygon component.
 * @param props.missionId - The ID of the mission being edited.
 * @param props.missionCoords - The coordinates of the mission area polygon.
 * @param props.returnTo - A function to return to the previous interface.
 * @param props.setId - A function to set the mission ID after drawing.
 * @param props.setCoords - A function to set the mission coordinates after drawing.
 * @returns A React component for drawing and editing polygons on the map.
 */
export const MapDrawPolygon = (props: {missionId: string, missionCoords: number[][], returnTo: () => void, setId: (id: string) => void, setCoords: (coords: number[][]) => void}) => {

  const {draw, addMission, removeMission} = useMapDrawStore();

  useEffect(() => {
    // Initiates polygon drawing or editing based on whether a mission ID is provided.
    if(props.missionId != ''){
      removeMission(props.missionId);
      editPolygon(draw, props.missionId, props.missionCoords);
    }
    else {
      draw.changeMode('draw_polygon');
    }
  }, [draw, props.missionCoords, props.missionId, removeMission]);

  // Handles applying the drawn polygon to the mission.
  const onApply = () => {
    const missionDraw = draw.getAll().features[draw.getAll().features.length - 1];
    const geometry = missionDraw.geometry as Polygon;
    
    // Saves the drawn polygon coordinates to the mission.
    if(missionDraw.id !== undefined){
      draw.delete(missionDraw.id.toString());

      addMission({
        id: missionDraw.id.toString(),
        coords: geometry.coordinates[0]
      });

      props.setId(missionDraw.id.toString());
      props.setCoords(geometry.coordinates[0]);
    }

    // Closes the polygon drawing interface.
    props.returnTo();
  }

  // Handles cancelling the polygon drawing/editing.
  const onCancel = () => {
    const missionDraw = draw.getAll().features[draw.getAll().features.length - 1];
    
    if(missionDraw.id !== undefined){
      draw.delete(missionDraw.id.toString());
    }
    props.returnTo();
  }

  return (
    <div className="configure-mission-container">
      <div className="button-container">
        <button className="cancel-button" onClick={onCancel}>Cancel</button>
        <button className="apply-button" onClick={onApply}>Apply</button>
      </div>
    </div>
  );
}