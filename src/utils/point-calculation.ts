import type { Point } from "@/interfaces/point";

// Cross point shape
export const calcDronePoints = (point: Point, numDrones: number, distance: number) => {
  let points: Point[] = [];

  points.push(point);

  const top = calcPoint(point, distance, 0);
  const right = calcPoint(point, distance, 90);
  const bottom = calcPoint(point, distance, 180);
  const left = calcPoint(point, distance, 270);

  points.push(top);
  points.push(right);
  points.push(bottom);
  points.push(left);

  if(numDrones > 5){
      points = [...points, ...calcNewPoint(top, 0, numDrones - 5, distance)];
      points = [...points, ...calcNewPoint(right, 90, numDrones - 5, distance)];
      points = [...points, ...calcNewPoint(bottom, 180, numDrones - 5, distance)];
      points = [...points, ...calcNewPoint(left, 270, numDrones - 5, distance)];
  }

  return points;
}

const calcPoint = (point: Point, distance: number, angle: number) => {

  const R = 6371e3;
  const dR = distance/R;
  const a = degreesToRadians(angle);

  const lat = degreesToRadians(point.lat);
  const lng = degreesToRadians(point.lng);

  const lat2 = Math.asin(Math.sin(lat) * Math.cos(dR) + Math.cos(lat) * Math.sin(dR) * Math.cos(a));
  const lng2 = lng + Math.atan2(  Math.sin(a) * Math.sin(dR) * Math.cos(lat),
                                  Math.cos(dR)-Math.sin(lat)*Math.sin(lat2));

  return {
      lat: radiansToDegrees(lat2),
      lng: radiansToDegrees(lng2)
  };
}

const calcNewPoint = (point: Point, angle: number, numOfDrones: number, distance: number): Point[] => {
  let points: Point[] = [];

  // If there are still drones that need a position
  if(numOfDrones > 0){
      const newPoint = calcPoint(point, distance, angle);
      points.push(newPoint);
      points = [...points, ...calcNewPoint(newPoint, angle, numOfDrones - 4, distance)]   
  }

  return points;
}

const degreesToRadians = (degrees: number) => {
  return degrees * (Math.PI/180);
}

const radiansToDegrees = (radians: number) => {
  return radians * (180/Math.PI);
}