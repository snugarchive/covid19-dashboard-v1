const axios = require("axios");
const convert = require("xml-js");
const utils = require("./utils/utils.js");

const coronadataPDP2 = (callback) => {
  const fetchEvents = async () => {
    const res = await axios.get(
      "https://nip.kdca.go.kr/irgd/cov19stats.do?list=all"
    );
    var xmlToJson = convert.xml2json(res.data, { compact: true, spaces: 4 }); // XML 데이터 JSON으로 파싱, 이 때 res.data로 들어가서 parsing 해야 함
    var xmlToJsonStripped = JSON.parse(xmlToJson.replace(/\r?\n|\r/g, ""));
    var coronastatusVaccinated = xmlToJsonStripped.response.body.items.item.map(
      (i) => {
        return {
          dataTime: xmlToJsonStripped.response.body.dataTime._text,
          tpcd: i.tpcd._text,
          firstCnt: parseInt(i.firstCnt._text),
          secondCnt: parseInt(i.secondCnt._text),
          thirdCnt: parseInt(i.thirdCnt._text),
        };
      }
    );
    coronastatusVaccinated = [coronastatusVaccinated];
    return callback(undefined, { coronastatusVaccinated });
  };

  fetchEvents();
};

module.exports = coronadataPDP2;
