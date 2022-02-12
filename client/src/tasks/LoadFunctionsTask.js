class LoadFunctionsTask {
  getDayToday = (date) => {
    var week = ['일', '월', '화', '수', '목', '금', '토']
    var day = week[new Date(date).getDay()]
    return day
  }

  groupBy = (objectArray, property) => {
    return objectArray.reduce(function (acc, obj) {
      var key = obj[property]
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(obj)
      return acc
    }, {})
  }

  getDataset = (data, areaname, index, property) => {
    return data[areaname][index][property]
  }

  getDataset_2 = (dataset, thisyear) => {
    const arr = dataset
      .reduce((acc, cur) => {
        const year = cur.year
        const decideCntMonthly = cur.decideCntMonthly

        if (year === thisyear) {
          acc.push(decideCntMonthly)
        }
        return acc
      }, [])
      .reverse()
    return arr
  }

  formatTime = (array, unit) => {
    return array.map((i) => `${i + 1}${unit}`)
  }
}

export default LoadFunctionsTask
