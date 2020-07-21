import React, { useEffect } from 'react'
import L from 'leaflet'
import { connect } from 'react-redux'
import "./map.css"


let map
const center = [42.87, 74.594]
const zoom = 12

function Map(props) {
  const prepareData = () => {
    if (data !== 0) {
      // make copy of deeply nested array
      const dataForProcessing = JSON.parse(JSON.stringify(data))
      let refinedData = []
      let filtered = []
      switch (props.type) {
        case 'dust':
          refinedData = dataForProcessing.filter(
            (elem) => elem.sensordatavalues[0].value_type !== 'temperature' && elem.sensordatavalues[0].value_type !== 'humidity',
          )
          refinedData.forEach((elem) => {
            filtered = elem.sensordatavalues.filter(
              (elem) => elem.value_type === 'P2',
            )
            elem.sensordatavalues = filtered[0]
          })
          break
        case 'temperature':
          refinedData = dataForProcessing.filter(
            (elem) => elem.sensordatavalues[0].value_type !== 'P0' && elem.sensordatavalues[0].value_type !== 'P1' && elem.sensordatavalues[0].value_type !== 'P2',
          )
          refinedData.forEach((elem) => {
            filtered = elem.sensordatavalues.filter(
              (elem) => elem.value_type === 'temperature',
            )
            elem.sensordatavalues = filtered[0]
          })
          break
        case 'humidity':
          refinedData = dataForProcessing.filter(
            (elem) => elem.sensordatavalues[0].value_type !== 'P0' && elem.sensordatavalues[0].value_type !== 'P1' && elem.sensordatavalues[0].value_type !== 'P2',
          )
          refinedData.forEach((elem) => {
            filtered = elem.sensordatavalues.filter(
              (elem) => elem.value_type === 'humidity',
            )
            elem.sensordatavalues = filtered[0]
          })
          break
      }
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
      const dataToDisplay = preDataToDisplay.filter((
        obj,
        index,
        self,
      ) => (
        index
                    === self.findIndex((t) => t.id === obj.id)
      ))
      dataToDisplay.forEach((elem) => {
        const numberIcon = L.divIcon({
          className: 'number-icon',
          iconSize: [35, 35],
          popupAnchor: [3, -40],
          html: elem.value,
        })
        L.marker([parseFloat(elem.latitude), parseFloat(elem.longitude)], {
          icon: numberIcon,
        }).addTo(map)
      })
      map.setView(center, zoom)
    }
  }
  let { data } = props
  useEffect(() => {
    if (map !== undefined) { map.remove() }
    map = L.map('map').setView(center, zoom)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)
    prepareData()
  })

  return (
    <div className="map" id="map">
      <slot />
    </div>

  )
}


const mapStateToProps = (state) => ({
  data: state.data,
})

export default connect(mapStateToProps)(Map)
