import type React from 'react'
import './App.css'
import MainContainer from './dashboard/main-container'
import DroneService from './services/drone-service'
import EventService from './services/event-service'
import { socket, SocketContext } from './services/socket'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { StreamPage } from './video/stream-page'

const DashboardPage: React.FC = () => 
  <>
    <SocketContext.Provider value={socket}>
      <DroneService/>
      <EventService/>
      <MainContainer/>
    </SocketContext.Provider>
  </>

const VideoPage: React.FC = () => 
  <>
    <SocketContext.Provider value={socket}>
      <DroneService/>
      <StreamPage />
    </SocketContext.Provider>
  </>

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/video" element={<VideoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
