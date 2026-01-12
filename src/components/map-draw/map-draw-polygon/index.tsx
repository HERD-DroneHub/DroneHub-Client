import useMapDrawStore from "@/hooks/map-draw-store";
import type { Polygon } from "@/interfaces/polygon";
import { editPolygon } from "@/utils/polygon";
import { useEffect } from "react";

export const MapDrawPolygon = (props: {missionId: string, missionCoords: number[][], returnTo: () => void, setId: (id: string) => void, setCoords: (coords: number[][]) => void}) => {

  const {draw, addMission, removeMission} = useMapDrawStore();

  useEffect(() => {
    if(props.missionId != ''){
      removeMission(props.missionId);
      editPolygon(draw, props.missionId, props.missionCoords);
    }
    else {
      draw.changeMode('draw_polygon');
    }
  }, [draw, props.missionCoords, props.missionId, removeMission]);

  const onApply = () => {
    const missionDraw = draw.getAll().features[draw.getAll().features.length - 1];
    const geometry = missionDraw.geometry as Polygon;
    
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