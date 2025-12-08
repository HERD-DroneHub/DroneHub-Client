export const editPolygon = (draw: MapboxDraw, id: string, coords: number[][]) => {
  draw.add({
    id: id,
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'Polygon',
      coordinates: [coords]
    }
  })
}