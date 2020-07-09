import React, { useEffect } from 'react'
import axios from 'axios'
import L from 'leaflet'
import { connect } from 'react-redux'
// import { func, number } from 'prop-types'
import { changeAge } from '../../store/actions'
import PageWrapper from '../../components/PageWrapper'
// import HiddenContent from '../../components/HiddenContent'


function Dust() {
  useEffect(() => {
    const map = L.map('map').setView(center, zoom)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)

    L.marker(center)
      .addTo(map)
      .bindPopup('A pretty CSS3 popup. <br> Easily customizable.')
  })
  let data = 0
  const center = [42.87, 74.594]
  const zoom = 12

  const refineData = (data2) => {
    console.log(data2)
  }
  axios
    .get('https://krakenflask.herokuapp.com/readcurrentdata')
    .then((response) => {
      data = response.data
      refineData(data)
      console.log(data)
    })


  return (
    <PageWrapper>
      <div className="map" id="map" />
    </PageWrapper>

  )
}


const mapStateToProps = (state) => ({
  age: state.age,
})

const mapDispatchToProps = (dispatch) => ({
  change: (age) => dispatch(changeAge(age)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dust)
