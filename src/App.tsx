import './App.css'
import MainContainer from './components/main-container'
import DroneService from './services/drone-service'
import EventService from './services/event-service'
import { socket, SocketContext } from './services/socket'

function App() {

  return (
    <>
      <SocketContext.Provider value={socket}>
        <DroneService/>
        <EventService/>
        <MainContainer/>
      </SocketContext.Provider>
    </>
  )
}

export default App
