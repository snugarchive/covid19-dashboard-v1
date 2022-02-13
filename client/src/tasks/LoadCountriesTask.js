import { features } from '../data/countries.json'

class LoadCountriesTask {

  setState = null
  mapCountries = features

  load = (setState, data) => {
    this.setState = setState
    // #processCovidGlobalData(data)
  }

  // #processCovidGlobalData = (covidCountries)
}

export default LoadCountriesTask
