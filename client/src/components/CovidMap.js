import React, { useState, useEffect } from 'react'
import { MapContainer, GeoJSON } from 'react-leaflet'
import LoadCountriesTask from '../tasks/LoadCountriesTask'
import 'leaflet/dist/leaflet.css'
import './CovidMap.css'

const CovidMap = ({ eventData }) => {
  const [countries, setCountries] = useState([])

  const globalData = eventData[eventData.length - 1]

  const load = () => {
    const loadCountriesTask = new LoadCountriesTask()
    loadCountriesTask.loadMapData(globalData, setCountries)
  }

  const highlight = (e) => {
    var layer = e.target
    layer.setStyle({
      dashArray: '2',
      weight: 3,
      color: 'var(--clr-white)',
    })
  }

  const unhighlight = (e) => {
    var layer = e.target
    layer.setStyle({
      weight: 1,
      dashArray: '',
      color: 'var(--clr-grey-border)',
    })
  }

  const onEachCountry = (country, layer) => {
    layer.options.fillColor = country.properties.color
    const name = country.properties.ADMIN
    const confirmedText = country.properties.confirmedText
    layer.bindPopup(`${name} ${confirmedText}`)
    layer.on({
      mouseover: highlight,
      mouseout: unhighlight,
    })
  }

  const mapStyle = {
    fillColor: 'var(--clr-white)',
    weight: 1,
    color: 'var(--clr-grey-border)',
    fillOpacity: 1,
  }

  useEffect(load, [])

  return (
    <MapContainer
      style={{ height: '40rem' }}
      zoom={2}
      maxZoom={5}
      center={[20, 100]}
    >
      <GeoJSON
        style={mapStyle}
        data={countries}
        onEachFeature={onEachCountry}
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />
    </MapContainer>
  )
}

export default CovidMap
