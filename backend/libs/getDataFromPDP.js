const {
  makeDataTotal,
  makeDataLocal,
  makeDataAgeSex,
} = require('../utils/utils')

const axios = require('axios')
require('dotenv').config()

const getDataFromPDP = async (startCreateDt, endCreateDt, callback) => {
  // 공공데이터 포털 정보
  let endpointPDP = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/'
  let identifiers = [
    'getCovid19InfStateJson',
    'getCovid19SidoInfStateJson',
    'getCovid19GenAgeCaseInfJson',
  ]
  let ServiceKeyPDP = decodeURIComponent(process.env.OPENAPI_KEY)
  const paramsPDP = {
    params: {
      ServiceKey: ServiceKeyPDP,
      pageNo: 1,
      numOfRows: 10,
      startCreateDt: startCreateDt,
      endCreateDt: endCreateDt,
    },
  }

  await Promise.all(
    identifiers.map(
      async (identifier) =>
        await axios.get(`${endpointPDP}${identifier}`, paramsPDP)
    )
  )
    .then((responses) => {
      const fetchData = () => {
        const coronastatus = []
        const usedFunctionList = [makeDataLocal, makeDataAgeSex]

        let dataTotalRaw = makeDataTotal(
          responses[0].data.response.body.items.item
        )

        const decideCntMonthly = []
        const nonDecideCnt = []
        const nonDeathCnt = []

        for (var i = 0; i < dataTotalRaw.length - 1; i++) {
          decideCntMonthly.push(
            dataTotalRaw[i].decideCnt - dataTotalRaw[i + 1].decideCnt
          )
          nonDecideCnt.push(
            dataTotalRaw[i].accExamCnt - dataTotalRaw[i].decideCnt
          )
          nonDeathCnt.push(dataTotalRaw[i].decideCnt - dataTotalRaw[i].deathCnt)
        }
        // JSON Obj에 새로운 key, value 추가하기
        dataTotalRaw.map((i, index) => {
          if (index < dataTotalRaw.length - 1) {
            i.decideCntMonthly = decideCntMonthly[index]
            i.nonDecideCnt = nonDecideCnt[index]
            i.nonDeathCnt = nonDeathCnt[index]
          } else {
            i.decideCntMonthly = 'null'
            i.nonDecideCnt = nonDecideCnt[index]
            i.nonDeathCnt = nonDeathCnt[index]
          }
        })
        coronastatus.push(dataTotalRaw)
        coronastatus.push(
          usedFunctionList[0](responses[1].data.response.body.items.item)
        )
        coronastatus.push(
          usedFunctionList[1](responses[2].data.response.body.items.item)
        )

        return callback(undefined, { coronastatus })
      }
      fetchData()
    })
    .catch((errors) => {
      console.log('error broke out: ', errors)
    })
}

module.exports = getDataFromPDP
