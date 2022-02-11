import React from 'react'
import Spinner from '../components/Spinner'
import Main from '../components/Main';
import useFetch from '../hooks/useFetch';

const Home = () => {
    const { data: dataAll, isPending, error } = useFetch("/data");

    return (
      <div className="home">
        {error && <div> {error} </div>}
        {isPending && <Spinner />}
        {dataAll && <Main dataAll={dataAll} />}
      </div>
    );
}

export default Home
