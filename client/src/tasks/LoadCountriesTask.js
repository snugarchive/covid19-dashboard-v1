import { features } from '../data/countries.json'
import legendItems from '../entities/LegendItems'

class LoadCountriesTask {
  setState = null
  mapCountries = features

  loadMapData = (rawData, setState) => {
    this.setState = setState

    this.#processCovidGlobalData(rawData)
  }

  #processCovidGlobalData = (covidCountries) => {
    for (let i = 0; i < this.mapCountries.length; i++) {
      const mapCountry = this.mapCountries[i]
      const covidCountry = covidCountries.find(
        (covidCountry) => covidCountry.iso3 === mapCountry.properties.ISO_A3
      )

      mapCountry.properties.confirmed = 0
      mapCountry.properties.confirmedText = '0'

      if (covidCountry != null) {
        const confirmed = Number(covidCountry.confirmed)
        mapCountry.properties.confirmed = confirmed
        mapCountry.properties.confirmedText =
          this.#formatNumberWithCommas(confirmed)
      }
      this.#setCountryColor(mapCountry)
    }

    this.setState(this.mapCountries)
  }

  #setCountryColor = (country) => {
    const legendItem = legendItems.find((item) =>
      item.isFor(country.properties.confirmed)
    )

    if (legendItem != null) country.properties.color = legendItem.color
  }

  #formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
}

export default LoadCountriesTask
