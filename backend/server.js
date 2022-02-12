const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const path = require('path')

const app = express()

app.set('json spaces', 2)

app.use(express.json()) // body parser for raw json(.json)
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '../client/build')))

app.use('/api/data', require('./routes/dataRoutes'))

app.listen(port, () => console.log(`Server started on port ${port}.`))

/*
app.use(
  "/api/data",
  [
    middleware.sendDataKorea_Overview,
    middleware.sendDataKorea_Vaccinated,
    middleware.sendDataGlobal,
  ],
  (req, res) => {
    const dataAll = res.locals.data1.concat(res.locals.data2, res.locals.data3);
    res.json(dataAll);
  }
);
*/
