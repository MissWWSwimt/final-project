import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Statistics from './pages/Statistics'
import Heat from './pages/Heat'
import Dust from './pages/Dust'
import NotFoundPage from './pages/NotFound'


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/statistics" component={Statistics} exact />
        <Route path="/heat" component={Heat} exact />
        <Route path="/" component={Dust} exact />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
