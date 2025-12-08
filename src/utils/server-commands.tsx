import { sendMessage } from "../services/socket";
import { DRONE_STOP } from "./constants";


// Request the drone to stop flying
export const sendStopMissionMessage = (droneID: string) => {
  const request = {
    'targetDroneId': droneID
  };

  sendMessage(DRONE_STOP, JSON.stringify(request));
}

// // Send the optimized route to the drones
// export const sendOptimizedMission = (mission: Mission) => {
  
//   let tempAltitude = mission.altitude;

//   for(const drone of mission.drones){

//     console.log(drone);
    
//     const optimizedPath = mission.optimizedCoords.get(drone);
    
//     if(optimizedPath){
//       const points = [];

//       for(const coord of optimizedPath){
//         points.push({
//           lng: coord[0],
//           lat: coord[1]
//         })
//       }

//       const request = {
//         'targetDroneId': drone,
//         'coordinates': points,
//         'distance': mission.horizontalDistance,
//         'altitude': tempAltitude,
//         'speed': mission.speed
//       };
      
//       tempAltitude += mission.verticalDistance;
      
//       sendMessage(DRONE_WAYPOINT_MISSION, JSON.stringify(request));
//     }
//   }
// }


// // Send a route to the drones 
// export const sendWaypointMissionCommand = (mission: Mission) => {
  
//   const coordsMap = new Map<string, Point[]>();

//   mission.drones.forEach(id => {
//       coordsMap.set(id, []);
//   })

//   mission.coords.forEach(point => {
//       const p = {
//           lat: point[1],
//           lng: point[0]
//       } as unknown as Point;
          
//       const points = calcDronePoints(p, mission.drones.length, mission.horizontalDistance);
      
//       for(let i = 0; i < mission.drones.length; i++){
//           const list = coordsMap.get(mission.drones[i]);
//           if(list){
//               list.push(points[i]);
//               coordsMap.set(mission.drones[i], list);
              
//           } else {
//               coordsMap.set(mission.drones[i], []);
//           }
//       }
//   })

//   let tempAltitude = mission.altitude;

//   mission.drones.forEach((id) => {
    
//       const points = coordsMap.get(id);

//       if(points){
//           const request = {
//               'targetDroneId': id,
//               'coordinates': points,
//               'distance': mission.horizontalDistance,
//               'altitude': tempAltitude,
//               'speed': mission.speed
//           };
          
//           tempAltitude += mission.verticalDistance;

//           sendMessage(DRONE_WAYPOINT_MISSION, JSON.stringify(request));
//       }
//   });
// }

// export const sendGoToMissionCommand = (mission: Mission) => {
//   const coordsMap = new Map<string, Point[]>();

//   mission.drones.forEach(id => {
//       coordsMap.set(id, []);
//   })

//   mission.coords.forEach(point => {
//       const p = {
//           lat: point[1],
//           lng: point[0]
//       } as unknown as Point;
          
//       const points = calcDronePoints(p, mission.drones.length, mission.horizontalDistance);
      
//       for(let i = 0; i < mission.drones.length; i++){
//           const list = coordsMap.get(mission.drones[i]);
//           if(list){
//               list.push(points[i]);
//               coordsMap.set(mission.drones[i], list);
              
//           } else {
//               coordsMap.set(mission.drones[i], []);
//           }
//       }
//   })

//   let tempAltitude = mission.altitude;

//   mission.drones.forEach((id) => {
    
//       const points = coordsMap.get(id);

//       if(points){
//           const request = {
//               'targetDroneId': id,
//               'coordinates': points,
//               'distance': mission.horizontalDistance,
//               'altitude': tempAltitude,
//               'speed': mission.speed
//           };
          
//           tempAltitude += mission.verticalDistance;

//           sendMessage(DRONE_GOTO_MISSION, JSON.stringify(request));
//       }
//   });
// }