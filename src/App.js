import React from 'react'
import axios from 'axios'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Statistics from './pages/Statistics'
import Dust from './pages/Dust'
import Temperature from './pages/Temperature'
import AirHumidity from './pages/AirHumidity'
import Subscribe from './pages/Subscribe'
import Logo from './components/Nav/Logo'
// import NotFoundPage from './pages/NotFound'
import { sendData } from './store/actions'


function App(props) {
  let data
  const API = 'https://krakenflask.herokuapp.com/readcurrentdata'
  axios
    .get(API)
    .then((response) => {
      data = response.data
      props.sendData(data)
    })
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


const mapDispatchToProps = (dispatch) => ({
  sendData: (data) => dispatch(sendData(data)),
})

export default connect(null, mapDispatchToProps)(App)
