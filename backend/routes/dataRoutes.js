const express = require('express')
const {
  sendDataKoreaOverview,
  sendDataKoreaVaccinated,
  sendDataGlobalOverview,
} = require('../middleware/dataMiddleware')

const router = express.Router()
const { getData } = require('../controllers/getData')

router
  .route('/')
  .get(
    [sendDataKoreaOverview, sendDataKoreaVaccinated, sendDataGlobalOverview],
    getData
  )

module.exports = router
