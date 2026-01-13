import { Layer, Source } from "react-map-gl";
import type { Drone } from "@/interfaces/drone";
import type { Feature, Geometry, GeoJsonProperties } from 'geojson';

type LineStringFeature = Feature<Geometry, GeoJsonProperties>;

const MapCoverage = (props: {drone: Drone}) => {

    const drone = props.drone;

    const finishedCoverageData: LineStringFeature = {
        type: 'Feature',
        geometry: {
        type: 'LineString',
          coordinates: []
        },
        properties: {}, // Can add custom properties here if needed
    };

    return(
        <>
            <Source id={`${drone.id}_fov_coverage`} type='geojson' data={finishedCoverageData}>
                <Layer 
                    id={`${drone.id}_fov_coverage`}
                    type='line'
                    paint={{
                        'line-color': 'grey',
                        'line-width': 30,
                        "line-opacity": .3
                    }}  
                />
            </Source>
        </>
    )
}

export default MapCoverage;