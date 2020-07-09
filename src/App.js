import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Statistics from './pages/Statistics'
import Dust from './pages/Dust'
import Temperature from './pages/Temperature'
import AirHumidity from './pages/AirHumidity'
import Subscribe from './pages/Subscribe'
import Logo from './components/Nav/Logo'
// import NotFoundPage from './pages/NotFound'


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/statistics" component={Statistics} exact />
        <Route path="/subscribe" component={Subscribe} exact />
        <Route path="/temperature" component={Temperature} exact />
        <Route path="/" component={Dust} exact />
        <Route path="/air_humidity" component={AirHumidity} exact />
        <Route path="about_us" component={Logo} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
