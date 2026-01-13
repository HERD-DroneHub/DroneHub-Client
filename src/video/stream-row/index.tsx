import type { DroneVideoCommand } from '@/interfaces/drone-socket';
import './style.scss';
import StartStreamVideo from '@/assets/drone-video.mp4';

export const StreamRow = ({drones, num_rows}: {drones:Array<DroneVideoCommand>, num_rows:number}) => {
    return(
        <div className="stream-row">
            {drones.map((drone:DroneVideoCommand) => (    
                <StreamCol drone={drone} num_rows={num_rows} key={drone.targetDroneId} />
            ))}
        </div>
    )
}

export const StreamCol = ({drone, num_rows}: {drone:DroneVideoCommand, num_rows:number}) => {
    return(
        <div className='stream-container' style={{height: `calc(100vh / ${num_rows} - 12px)`, border: `4px solid #${drone.droneColor}`}}>
            <video style={{height: `calc(100vh / ${num_rows} - 12px)`}} playsInline muted loop autoPlay id={"video_"+drone.targetDroneId} src={StartStreamVideo}></video>
        </div>
    );
}
