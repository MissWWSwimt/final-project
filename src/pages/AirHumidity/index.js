import React, { useEffect } from 'react'
import axios from 'axios'
import L from 'leaflet'
import { connect } from 'react-redux'
// import { func, number } from 'prop-types'
import PageWrapper from '../../components/PageWrapper'
import { display } from '../../components/functions/Display'
// import HiddenContent from '../../components/HiddenContent'

let map

function Humidity() {
  useEffect(() => {
    map = L.map('map').setView(center, zoom)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)
  })
  let data = 0
  const center = [42.87, 74.594]
  const zoom = 12

  const refineData = (data) => {
    console.log(data)
    const refinedData = data.filter(
      (elem) => elem.sensordatavalues[0].value_type !== 'P0' && elem.sensordatavalues[0].value_type !== 'P2' && elem.sensordatavalues[0].value_type !== 'P1',
    )
    refinedData.forEach((elem) => {
      const filtered = elem.sensordatavalues.filter(
        (elem) => elem.value_type === 'humidity',
      )
      elem.sensordatavalues = filtered[0]
    })

    const preDataToDisplay = refinedData.map((elem) => {
      const data = {
        id: elem.sensor.id,
        latitude: elem.location.latitude,
        longitude: elem.location.longitude,
        value: parseFloat(elem.sensordatavalues.value)
          .toFixed(2)
          .toString(),
      }
      return data
    })
    display(preDataToDisplay, L, map, center, zoom)
  }


  axios
    .get('https://krakenflask.herokuapp.com/readcurrentdata')
    .then((response) => {
      data = response.data
      refineData(data)
    })

  return (
    <PageWrapper>
      <div className="map" id="map" />
    </PageWrapper>
  )
}


export default (Humidity)
