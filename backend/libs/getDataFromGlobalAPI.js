const axios = require('axios')
const { makeDataGlobal, makeDataCountries } = require('../utils/utils')

const getDataFromGlobalAPI = (callback) => {
  const fetchEvents = async () => {
    const coronastatusGlobal = []
    const url = 'https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases2_v1/FeatureServer/2/query?where=1%3D1&outFields=Country_Region,Confirmed,Deaths,ISO3,Last_Update&outSR=4326&f=json'
    const res = await axios.get(url)
    const usedFunctionList = [makeDataCountries]
    console.log(res.data.features)

    coronastatusGlobal.push(usedFunctionList[0](res.data.features.map(i => i.attributes)))

    return callback(undefined, { coronastatusGlobal })
  }

  fetchEvents()
}

module.exports = getDataFromGlobalAPI
