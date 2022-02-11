import { useState, useEffect } from 'react'
import axios from "axios";
import { axiosInstance } from "../config.js";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const abortCont = new AbortController();

      axiosInstance
        .get(url, { signal: abortCont.signal })
        .then((res) => {
          console.log(res);
          if (res.statusText !== "OK") {
            throw Error("데이터를 가져올 수 없습니다.");
          }
          setData(res.data);
          setIsPending(false);
          setError(null);
        })
        .catch((err) => {
          console.log(err.name);
          if (err.name === "AbortError") {
            console.log("fetch aborted");
          } else {
            setIsPending(false);
            setError(err.message);
          }
        });
      return () => abortCont.abort();
    }, [url]);

    return { data, isPending, error }
}

export default useFetch
