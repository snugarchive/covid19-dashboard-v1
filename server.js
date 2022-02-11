const express = require("express"),
  path = require("path"),
  middleware = require("./middleware/middleware"),
  app = express();

app.set("json spaces", 2);
app.use(express.json());
app.use(express.static(path.join(__dirname, "/client/build")));

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

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/client/build', 'index.html'))
// });

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend is running.");
});
