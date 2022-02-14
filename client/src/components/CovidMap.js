import React, { useState, useEffect } from 'react'
import { MapContainer, GeoJSON } from 'react-leaflet'
import LoadCountriesTask from '../tasks/LoadCountriesTask'
import 'leaflet/dist/leaflet.css'
import './CovidMap.css'

const CovidMap = ({ eventData }) => {
  const [countries, setCountries] = useState([])
  // const [onselect, setOnselect] = useState({})

  const globalData = eventData[eventData.length - 1]

  const load = () => {
    const loadCountriesTask = new LoadCountriesTask()
    loadCountriesTask.loadMapData(globalData, setCountries)
  }

  const highlightFeature = (e) => {
    var layer = e.target
    const { ADMIN, confirmed } = layer.feature.properties

    // setOnselect({
    //   country: ADMIN,
    //   confirmed: confirmed,
    // })

    layer.setStyle({
      weight: 5,
      color: 'var(--clr-white)',
      dashArray: '',
      fillOpacity: 0.7
    })

  }

  const resetHighlight = (e) => {
    // setOnselect({})
    e.target.setStyle(style(e.target.feature))
  }

  const onEachCountry = (country, layer) => {
    layer.options.fillColor = country.properties.color
    const name = country.properties.ADMIN
    const confirmedText = country.properties.confirmedText
    layer.bindPopup(`${name} ${confirmedText}`)
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
    })
  }

  const style = (feature) => {
    return {
      fillColor: feature.properties.color,
      weight: 0.5,
      opacity: 1,
      color: 'var(--clr-grey-border)',
      fillOpacity: 1,
    }
  }

  useEffect(load, [])

  return (
    <>
      <MapContainer
        style={{ height: '55vh' }}
        zoom={2}
        maxZoom={5}
        center={[20, 100]}
      >
        <GeoJSON
          data={countries}
          style={style}
          onEachFeature={onEachCountry}
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        />
      </MapContainer>
      {/* {!onselect.country && (
        <div className='census-info-hover'>
          <strong>확진자 수</strong>
          <p>?</p>
        </div>
      )}
      {onselect.country && (
        <ul className='census-info'>
          <li>
            <strong>{onselect.country}</strong>
          </li>
          <br />
          <li>Total Population:{onselect.confirmed}</li>
        </ul>
      )} */}
    </>
  )
}

export default CovidMap
