import React from 'react'
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import { Home, LiveDistance, HistoricalDistance,RequestStatus,Trip} from './pages'
import NavbarComponent from './components/NavbarComponent';
const App = () => {
  return (
    <BrowserRouter>
      <header>
        <NavbarComponent/>
      </header>
      <main>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/live" element={<LiveDistance/>}/>
        <Route path="/historic" element={<HistoricalDistance/>}/>
        <Route path='/status/:request_id?' element={<RequestStatus/>}/>
          <Route path='/trips' element={<Trip/>}/>

      </Routes>

      </main>
    </BrowserRouter>

  )
}

export default App