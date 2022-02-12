module.exports = {
  sendDataKoreaOverview: function (req, res, next) {
    const getDataFromPDP = require('../libs/getDataFromPDP')
    const { getDateToday } = require('../utils/utils')

    getDataFromPDP(
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
  sendDataKoreaVaccinated: function (req, res, next) {
    const getDataFromPDP2 = require('../libs/getDataFromPDP2')
    getDataFromPDP2((error, { coronastatusVaccinated } = {}) => {
      if (error) {
        console.log(error)
      }
      res.locals.data2 = coronastatusVaccinated
      next()
    })
  },
  sendDataGlobalOverview: function (req, res, next) {
    const getDataFromGlobalAPI = require('../libs/getDataFromGlobalAPI')
    getDataFromGlobalAPI((error, { coronastatusGlobal } = {}) => {
      if (error) {
        console.log(error)
      }
      res.locals.data3 = coronastatusGlobal
      next()
    })
  },
}
