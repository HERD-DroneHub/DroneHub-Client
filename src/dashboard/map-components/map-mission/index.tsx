import { Layer, Marker, Source } from "react-map-gl"
import useMapDrawStore from "@/hooks/map-draw-store";

const MapMission = () => {

  const missions = Array.from(useMapDrawStore(s => s.missions).values());

  return(
    <>
      {
        missions.map((m) => 
          <>
            <Source
              key={m.id}
              id={m.id}
              type='geojson'
              data={{
                type: 'Feature',
                geometry: {
                  type: 'Polygon',
                  coordinates: [m.coords]
                }
              }}
            >
              <Layer
                id={m.id}
                type="fill"
                paint={{
                  "fill-color": '#0A84FF',
                  "fill-opacity": 0.05
                }}
              />

              <Layer
                id={`${m.id}_outline`}
                type="line"
                paint={{
                  'line-color': '#0A84FF',
                  'line-width': 2
                }}
              />
            </Source>
            <Marker
              longitude={m.coords[0][0]}
              latitude={m.coords[0][1]}
            >
            </Marker>
          </>
        )
      }
    </>
  )
}

export default MapMission;