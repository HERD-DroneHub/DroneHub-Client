import type { DroneVideoCommand } from "@/interfaces/drone-socket"
import { StreamRow } from "../stream-row";
import "./style.scss";

export const StreamGrid = ({drones, num_streams}: {drones:Array<DroneVideoCommand>, num_streams:number}) => {
    const StreamRows = Array<Array<DroneVideoCommand>>(); 

    if (num_streams == 1) {
        StreamRows.push([drones[0]]);
    } else if (num_streams == 2) {
        StreamRows.push([drones[0], drones[1]]);
    } else if (num_streams == 3) {
        StreamRows.push([drones[0], drones[1]]);
        StreamRows.push([drones[2]]);
    } else if (num_streams == 4) {
        StreamRows.push([drones[0], drones[1]]);
        StreamRows.push([drones[2], drones[3]]);
    } else if (num_streams == 5) {
        StreamRows.push([drones[0], drones[1], drones[2]]);
        StreamRows.push([drones[3], drones[4]]);
    } else if (num_streams == 6) {
        StreamRows.push([drones[0], drones[1], drones[2]]);
        StreamRows.push([drones[3], drones[4], drones[5]]);
    } else if (num_streams == 7) {
        StreamRows.push([drones[0], drones[1], drones[2]]);
        StreamRows.push([drones[3], drones[4]]);
        StreamRows.push([drones[5], drones[6]]);
    }else if (num_streams == 8) {
        StreamRows.push([drones[0], drones[1], drones[2]]);
        StreamRows.push([drones[3], drones[4], drones[5]]);
        StreamRows.push([drones[6], drones[7]]);
    } else if (num_streams == 9) {
        StreamRows.push([drones[0], drones[1], drones[2]]);
        StreamRows.push([drones[3], drones[4], drones[5]]);
        StreamRows.push([drones[6], drones[7], drones[8]]);
    } else {
        for (let i = 0; i < drones.length; i++) {
           StreamRows.push([drones[i]]);
        }
    }

    const num_rows = StreamRows.length;

    return (
        <div className="stream-grid">
            {StreamRows.map((iDrones:Array<DroneVideoCommand>, i) => (
                <StreamRow drones={iDrones} num_rows={num_rows} key={i} />
            ))}
        </div>
    )
}