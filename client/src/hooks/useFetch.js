import { useState, useEffect } from 'react'
import axios from 'axios'
import { axiosInstance } from '../config.js'

const useFetch = (url) => {
  const [eventData, setEventData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      const res = await axios.get(url)
      setEventData(res.data)
      setLoading(false)
    }
    fetchEvents()
  }, [url])

  return { eventData, loading }
}

export default useFetch

/*
import { useState, useEffect } from 'react'
import axios from "axios";
import { axiosInstance } from "../config.js";

const useFetch = (url) => {
    const [eventsData, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const abortCont = new AbortController();

      axios
        .get(url, { signal: abortCont.signal })
        .then((res) => {
          if (res.statusText !== 'OK') {
            throw Error('데이터를 가져올 수 없습니다.')
          }
          setData(res.data)
          setLoading(false)
          setError(null)
        })
        .catch((err) => {
          console.log(err.name)
          if (err.name === 'AbortError') {
            console.log('fetch aborted')
          } else {
            setLoading(false)
            setError(err.message)
          }
        })
      return () => abortCont.abort();
    }, [url]);

    return { eventsData, loading, error }
}

export default useFetch
*/
