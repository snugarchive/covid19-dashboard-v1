import React from 'react'
import Loader from '../components/Loader'
import Main from '../components/Main'
import useFetch from '../hooks/useFetch'

const Home = () => {
  const { eventData, loading } = useFetch('/data')

  return (
    <div className='home'>
      { !loading && eventData ? <Main eventData={eventData} /> : <Loader /> }
    </div>
  )
}

export default Home
