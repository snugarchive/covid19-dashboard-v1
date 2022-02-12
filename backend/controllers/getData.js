const asyncHandler = require('express-async-handler')

const getData = asyncHandler(async (req, res) => {
  const data = res.locals.data1.concat(res.locals.data2, res.locals.data3)
  res.status(200).json(data)
})

module.exports = { getData }
