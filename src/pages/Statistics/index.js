import React, { useEffect } from 'react'
import axios from 'axios'
import L from 'leaflet'
import PageWrapper from '../../components/PageWrapper'

let map
function Statistics(props) {
  const stopSignal = 0
  let data
  let dataBak
  const [records, setRecords] = React.useState([])
  const [globaldata, setGlobalData] = React.useState([])
  const [markerGroup, setMarkerGroup] = React.useState(0)
  const center = [42.87, 74.594]
  const zoom = 12
  const getData = () => {
    axios
      .get('https://krakenflask.herokuapp.com/readnamesfromtemp')
      .then((response) => {
        const preRecords = response.data.split('\n')
        const records1 = preRecords.filter((elem) => elem !== '')
        setRecords(records1)
      })
    axios
      .get('https://krakenflask.herokuapp.com/readdatafromtemp')
      .then((response) => {
        data = response.data
        dataBak = JSON.parse(JSON.stringify(data))
        setGlobalData(dataBak)
      })
  }

  useEffect(() => {
    if (map !== undefined) { map.remove() }
    map = L.map('map').setView(center, zoom)
    const mGroup = L.layerGroup().addTo(map)
    setMarkerGroup(mGroup)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stopSignal])
  const prepareData = (record) => {
    markerGroup.clearLayers()
    const work_data = JSON.parse(JSON.stringify(globaldata))
    const datestring = record.substring(0, 10)
    const refined_data = work_data.filter(
      (elem) => elem.sensordatavalues[0].value_type !== 'temperature'
        && elem.sensordatavalues[0].value_type !== 'humidity',
    )
    const prepared_data = refined_data.filter(
      (elem) => elem.timestamp.substring(0, 10) === datestring,
    )
    prepared_data.forEach((elem) => {
      const filtered = elem.sensordatavalues.filter(
        (elem) => elem.value_type === 'P2',
      )
      elem.sensordatavalues = filtered[0]
    })
    const pre_data_to_display = prepared_data.map((elem) => {
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
    const data_to_display = pre_data_to_display.filter((
      obj,
      index,
      self,
    ) => (
      index
        === self.findIndex((t) => t.id === obj.id)
    ))
    data_to_display.forEach((elem) => {
      const numberIcon = L.divIcon({
        className: 'number-icon',
        iconSize: [35, 35],
        popupAnchor: [3, -40],
        html: elem.value,
      })
      L.marker([parseFloat(elem.latitude), parseFloat(elem.longitude)], {
        icon: numberIcon,
      }).addTo(markerGroup)
    })
  }
  const buttons = records.map((elem) => <button type="button" key={elem} onClick={() => prepareData(elem)}>{elem}</button>)


  return (
    <PageWrapper>
      <div className="mapStat" id="map" />
      {buttons}
    </PageWrapper>
  )
}

export default Statistics
