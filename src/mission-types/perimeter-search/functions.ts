import type { Mission } from "@/interfaces/mission";
import type { Point } from "@/interfaces/point";
import { sendMessage } from "@/services/socket";
import { calcDronePoints } from "@/utils/point-calculation";
import { PS_SOCKET } from "./description";

// Send a route to the drones 
export const sendPerimeterMissionCommand = (mission: Mission) => {
    
  const coordsMap = new Map<string, Point[]>();

  mission.drones.forEach(id => {
      coordsMap.set(id, []);
  })

  mission.coords.forEach(point => {
      const p = {
          lat: point[1],
          lng: point[0]
      } as unknown as Point;
          
      const points = calcDronePoints(p, mission.drones.length, mission.horizontalDistance);
      
      for(let i = 0; i < mission.drones.length; i++){
          const list = coordsMap.get(mission.drones[i]);
          if(list){
              list.push(points[i]);
              coordsMap.set(mission.drones[i], list);
              
          } else {
              coordsMap.set(mission.drones[i], []);
          }
      }
  })

  let tempAltitude = mission.altitude;

  mission.drones.forEach((id) => {
    
      const points = coordsMap.get(id);

      if(points){
          const request = {
              'targetDroneId': id,
              'coordinates': points,
              'distance': mission.horizontalDistance,
              'altitude': tempAltitude,
              'speed': mission.speed
          };
          
          tempAltitude += mission.verticalDistance;

          sendMessage(PS_SOCKET, JSON.stringify(request));
      }
  });
}