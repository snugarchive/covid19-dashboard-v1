import React, { useState, useEffect } from 'react'
import Loader from '../components/Loader'
import Main from '../components/Main'
import CovidMap from '../components/CovidMap'
import Legend from '../components/Legend'
import useFetch from '../hooks/useFetch'
import legendItems from "../entities/LegendItems"

const Home = () => {

  const { eventData, loading } = useFetch('/data')
  const legendItemsInReverse = [...legendItems].reverse()

  return (
    <div className='home'>
      { !loading && eventData ? (
        <>
          <Main eventData={eventData} />
          <CovidMap eventData={eventData} />
          <Legend legendItems={legendItemsInReverse} />
        </>
      ) : (
        <Loader />
      ) }
    </div>
  )
}

export default Home
