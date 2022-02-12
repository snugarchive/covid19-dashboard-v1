const axios = require('axios')
const { makeDataGlobal, makeDataCountries } = require('../utils/utils')

const getDataFromGlobalAPI = (callback) => {
  const fetchEvents = async () => {
    const coronastatusGlobal = []
    const res = await axios.get('https://api.covid19api.com/summary')
    const usedFunctionList = [makeDataGlobal, makeDataCountries]

    coronastatusGlobal.push(usedFunctionList[0]([res.data.Global]))
    coronastatusGlobal.push(usedFunctionList[1](res.data.Countries))

    return callback(undefined, { coronastatusGlobal })
  }

  fetchEvents()
}

module.exports = getDataFromGlobalAPI
