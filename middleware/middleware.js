module.exports = {
  sendDataKorea_Overview: async function (req, res, next) {
    const utils = require("../utils/utils.js");
    const coronadataPDP = require("../coronadataPDP.js");
    await coronadataPDP(
      "20200301",
      utils.getDateToday(),
      (error, { coronastatus } = {}) => {
        if (error) {
          console.log(error);
        }
        res.locals.data1 = coronastatus;
        next();
      }
    );
  },
  sendDataKorea_Vaccinated: async function (req, res, next) {
    const coronadataPDP2 = require("../coronadataPDP2.js");
    await coronadataPDP2((error, { coronastatusVaccinated } = {}) => {
      if (error) {
        console.log(error);
      }
      res.locals.data2 = coronastatusVaccinated;
      next();
    });
  },
  sendDataGlobal: async function (req, res, next) {
    const coronadataCOVID19API = require("../coronadataCOVID19API.js");
    await coronadataCOVID19API((error, { coronastatusGlobal } = {}) => {
      if (error) {
        console.log(error);
      }
      res.locals.data3 = coronastatusGlobal;
      next();
    });
  },
};
