module.exports = {
  sendDataKoreaOverview: async function (req, res, next) {
    const getDataFromPDP = require('../libs/getDataFromPDP')
    const { getDateToday } = require('../utils/utils')

    await getDataFromPDP(
      '20200301',
      getDateToday(),
      (error, { coronastatus } = {}) => {
        if (error) {
          console.log(error)
        }
        res.locals.data1 = coronastatus
        next()
      }
    )
  },
  sendDataKoreaVaccinated: async function (req, res, next) {
    const getDataFromPDP2 = require('../libs/getDataFromPDP2')
    await getDataFromPDP2((error, { coronastatusVaccinated } = {}) => {
      if (error) {
        console.log(error)
      }
      res.locals.data2 = coronastatusVaccinated
      next()
    })
  },
  sendDataGlobalOverview: async function (req, res, next) {
    const getDataFromGlobalAPI = require('../libs/getDataFromGlobalAPI')
    await getDataFromGlobalAPI((error, { coronastatusGlobal } = {}) => {
      if (error) {
        console.log(error)
      }
      res.locals.data3 = coronastatusGlobal
      next()
    })
  },
}
