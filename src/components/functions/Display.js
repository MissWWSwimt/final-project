export const display = (preDataToDisplay, L, map, center, zoom) => {
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
