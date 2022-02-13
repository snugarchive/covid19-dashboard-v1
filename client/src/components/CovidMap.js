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

  const mapStyle = {
    fillColor: 'white',
    weight: 1,
    color: 'black',
    fillOpacity: 1,
  }

  const onEachCountry = (country, layer) => {
    layer.options.fillColor = country.properties.color
    const name = country.properties.ADMIN
    const confirmedText = country.properties.confirmedText
    layer.bindPopup(`${name} ${confirmedText}`)
  }

  useEffect(load, [])

  return (
    <MapContainer
      style={{ height: '40rem' }}
      zoom={2}
      maxZoom={5}
      center={[20, 100]}
    >
      <GeoJSON style={mapStyle} data={countries} onEachFeature={onEachCountry} />
    </MapContainer>
  )
}

export default CovidMap


