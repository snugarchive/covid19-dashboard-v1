import React, { useState, useEffect } from 'react'
import Loader from '../components/Loader'
import Main from '../components/Main'
import CovidMap from '../components/CovidMap'
import useFetch from '../hooks/useFetch'
import LoadCountriesTask from '../tasks/LoadCountriesTask'

const Home = () => {
  const { eventData, loading } = useFetch('/data')
  const [countries, setCountries] = useState([])

  const load = () => {
    const loadCountriesTask = new LoadCountriesTask()
    loadCountriesTask.load(setCountries)
  }

  useEffect(load, [])

  return (
    <div className='home'>
      { !loading && eventData && countries ? (
        <>
          <Main eventData={eventData} />
          <CovidMap countries={countries} />
        </>
      ) : (
        <Loader />
      ) }
    </div>
  )
}

export default Home
