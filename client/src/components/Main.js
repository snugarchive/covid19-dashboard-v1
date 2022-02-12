import React, { useState } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  LineController,
  BarController,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Legend,
  Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import annotationPlugin from "chartjs-plugin-annotation";
import zoomPlugin from "chartjs-plugin-zoom";
import LoadFunctionsTask from "../tasks/LoadFunctionsTask";
import LoadConfigTask from "../tasks/LoadConfigTask";
import GraphList from "./GraphList";

ChartJS.register(
  LinearScale,
  CategoryScale,
  LineController,
  BarController,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Legend,
  Tooltip,
  zoomPlugin,
  annotationPlugin
);

const Main = ({ eventData }) => {
  const [
    dataTotal,
    dataLocal,
    dataAgeSex,
    dataVaccinated,
    dataGlobal,
    dataCountries,
  ] = [...Array(6).keys()].map((i) => eventData[i]);

  const loadFunctionsTask = new LoadFunctionsTask();
  const loadConfigTask = new LoadConfigTask();
  // Options

  const option_national_monthly = loadConfigTask.setDefaultOption(
    "확진자 일별 추이",
    "x",
    false,
    undefined,
    undefined,
    loadConfigTask.annotations_verticalLine(30, "x", "오늘")
  );
  const option_national_vaccinated = loadConfigTask.setDefaultOption(
    "접종 현황",
    "y",
    false,
    loadConfigTask.formatter_vaccinated,
    undefined
  );
  const option_national_tested = loadConfigTask.setDefaultOption(
    "검사 현황",
    "y",
    true,
    loadConfigTask.formatter_stacked_percentage,
    loadConfigTask.tooltip_sum
  );
  const option_national_treated = loadConfigTask.setDefaultOption(
    "확진자 상태별 현황",
    "y",
    true,
    loadConfigTask.formatter_stacked_percentage,
    loadConfigTask.tooltip_sum
  );
  const option_national_yearly = loadConfigTask.setDefaultOption(
    "확진자 월별 추이",
    "x",
    false
  );
  const option_national_age = loadConfigTask.setDefaultOption(
    "확진자 연령별 현황",
    "y",
    true,
    loadConfigTask.formatter_bar_percentage
  );
  const option_national_sex = loadConfigTask.setDefaultOption(
    "확진자 성별 현황",
    "y",
    true,
    loadConfigTask.formatter_bar_percentage
  );
  const option_national_local = loadConfigTask.setDefaultOption(
    "확진자 지역별 추이",
    "x",
    false
  );

  const option_global_country = () => {
    let options = loadConfigTask.setDefaultOption(
      "세계 누적 확진자 현황",
      "y",
      true,
      loadConfigTask.formatter_bar_percentage
    );
    const scales_x_position = { position: "top" };
    options.scales.x = { ...options.scales.x, ...scales_x_position };
    return options;
  };

  // Setup: labels & datasets

  // # 1.1 setNationalMonthlyData

  const dataLocal_By_Keys = loadFunctionsTask.groupBy(dataLocal, "gubun");
  const labels_setNationalMonthlyData = dataLocal_By_Keys["합계"]
    .map((i) => `${i.date}일`)
    .reverse();
  const datasets_setNationalMonthlyData = [
    loadConfigTask.createDataset(
      "10만명 당 확진자 수",
      dataLocal_By_Keys["합계"].map((i) => i.qurRate).reverse(),
      "line",
      false,
      "blue",
      "blue"
    ),
    loadConfigTask.createDataset(
      "확진자 수",
      dataLocal_By_Keys["합계"].map((i) => i.incDec).reverse(),
      "bar"
    ),
  ];

  // # 1.2 setNationalVaccinatedData

  const indexDataVaccinatedTotal = dataVaccinated.length - 2;
  const labels_setNationalVaccinatedData = ["1차", "2차", "3차"];
  const identifiers_setNationalVaccinatedData = [
    "firstCnt",
    "secondCnt",
    "thirdCnt",
  ];
  const datasets_setNationalVaccinatedData = [
    loadConfigTask.createDataset(
      "접종자 수",
      identifiers_setNationalVaccinatedData.map(
        identifier => dataVaccinated[indexDataVaccinatedTotal][identifier]
      )
    ),
  ];

  // # 1.3 setNationalTestedData

  const labels_setNationalTestedData = ["총 검사 수"];
  const datasets_setNationalTestedData = [
    loadConfigTask.createDataset(
      "양성",
      [dataTotal[0].decideCnt],
      "bar",
      true,
      "lightgray",
      "lightgray",
      0.1,
      "y",
      "tested"
    ),
    loadConfigTask.createDataset(
      "-",
      [dataTotal[0].nonDecideCnt],
      "bar",
      true,
      "whitesmoke",
      "whitesmoke",
      0.1,
      "y",
      "tested"
    ),
  ];

  // # 1.4 setNationalTreatedData

  const labels_setNationalTreatedData = ["확진자 수"];
  const datasets_setNationalTreatedData = [
    loadConfigTask.createDataset(
      "사망",
      [dataTotal[0].deathCnt],
      "bar",
      true,
      "lightgray",
      "lightgray",
      0.1,
      "y",
      "treated"
    ),
    loadConfigTask.createDataset(
      "-",
      [dataTotal[0].nonDeathCnt],
      "bar",
      true,
      "whitesmoke",
      "whitesmoke",
      0.1,
      "y",
      "treated"
    ),
  ];

  // # 1.5 setNationalYearlyData

  let labels_setNationalYearlyData = [...Array(12).keys()];
  let label_setNationalYearlyData = [2020, 2021, 2022];
  let datasets_setNationalYearlyData = label_setNationalYearlyData.map((year) =>
    loadConfigTask.createDataset(
      year,
      loadFunctionsTask.getDataset_2(dataTotal, year),
      "line",
      false
    )
  );
  labels_setNationalYearlyData = loadFunctionsTask.formatTime(
    labels_setNationalYearlyData,
    "월"
  );
  datasets_setNationalYearlyData[0].data = ["null", "null"].concat(
    datasets_setNationalYearlyData[0].data
  );

  const len_setNationalYearlyData = datasets_setNationalYearlyData.length;
  datasets_setNationalYearlyData[
    len_setNationalYearlyData - 1
  ].backgroundColor = "darkgray";
  datasets_setNationalYearlyData[len_setNationalYearlyData - 1].borderColor =
    "darkgray";

  // # 1.6 setNationalAgeData & # 1.7 setNationalSexData

  const [labels_setNationalAgeData, labels_setNationalSexData] = [0, 1].map(
    (item) => dataAgeSex[item].map((i) => i.gubun).reverse()
  );
  const [datasets_setNationalAgeData, datasets_setNationalSexData] = [0, 1].map(
    (item) => [
      loadConfigTask.createDataset(
        "확진자 수",
        dataAgeSex[item].map((i) => i.confCase).reverse()
      ),
    ]
  );

  // # 1.8 setNationalLocalData

  delete dataLocal_By_Keys.합계;

  const labels_setNationalLocalData = Object.keys(dataLocal_By_Keys).reverse();
  const label_setNationalLocalData = [...Array(7).keys()].map((i) => {
    return i === 0 ? "오늘" : `${i}일 전`;
  });

  const datasets_setNationalLocalData = label_setNationalLocalData
    .map((label, index) => {
      return loadConfigTask.createDataset(
        label,
        labels_setNationalLocalData.map((i) =>
          loadFunctionsTask.getDataset(dataLocal_By_Keys, i, index, "incDec")
        ),
        "bar",
        true
      );
    })
    .reverse();

  const datasetPlus_setNationalLocalData = labels_setNationalLocalData.map(
    (i) => loadFunctionsTask.getDataset(dataLocal_By_Keys, i, 0, "qurRate")
  );
  datasets_setNationalLocalData.unshift(
    loadConfigTask.createDataset(
      "10만명 당 확진자 수(오늘)",
      datasetPlus_setNationalLocalData,
      "line",
      false,
      "blue",
      "blue"
    )
  );

  datasets_setNationalLocalData[
    datasets_setNationalLocalData.length - 1
  ].backgroundColor = "darkgray";

  // # 1.9 setGlobalCountryData

  const labels_country = dataCountries.map((i) => i.Country);
  const data_country = dataCountries.map((i) => i.TotalConfirmed);

  let merged = labels_country.map((label, i) => {
    return { datapoint: data_country[i], labels: labels_country[i] };
  });
  const dataSort = merged.sort((a, b) => b.datapoint - a.datapoint);
  const db_countryData = [];
  const lab_countryData = [];

  for (let i = 0; i < dataSort.length; i++) {
    db_countryData.push(dataSort[i].datapoint);
    lab_countryData.push(dataSort[i].labels);
  }

  const labels_setGlobalCountryData = lab_countryData;
  const datasets_setGlobalCountryData = [
    loadConfigTask.createDataset("확진자 수", db_countryData),
  ];

  // Setup

  const setup = [
    {
      labels: labels_setNationalMonthlyData,
      datasets: datasets_setNationalMonthlyData,
    },
    {
      labels: labels_setNationalVaccinatedData,
      datasets: datasets_setNationalVaccinatedData,
    },
    {
      labels: labels_setNationalTestedData,
      datasets: datasets_setNationalTestedData,
    },
    {
      labels: labels_setNationalTreatedData,
      datasets: datasets_setNationalTreatedData,
    },
    {
      labels: labels_setNationalYearlyData,
      datasets: datasets_setNationalYearlyData,
    },
    {
      labels: labels_setNationalAgeData,
      datasets: datasets_setNationalAgeData,
    },
    {
      labels: labels_setNationalSexData,
      datasets: datasets_setNationalSexData,
    },
    {
      labels: labels_setNationalLocalData,
      datasets: datasets_setNationalLocalData,
    },
    {
      labels: labels_setGlobalCountryData,
      datasets: datasets_setGlobalCountryData,
    },
  ];

  const dataSetup = setup.map((i) => {
    return { labels: i.labels, datasets: i.datasets };
  });

  // setSections

  const [sections, setSections] = useState([
    {
      className: "sub-main_national",
      id: "national_monthly",
      type: "bar",
      options: option_national_monthly,
      data: dataSetup[0],
      plugins: undefined,
    },
    {
      className: "sub-main_national",
      id: "national_vaccinated",
      type: "bar",
      options: option_national_vaccinated,
      data: dataSetup[1],
      plugins: [ChartDataLabels],
    },
    // {
    //   className: "sub-main_national",
    //   id: "national_tested",
    //   type: "bar",
    //   options: option_national_tested,
    //   data: dataSetup[2],
    //   plugins: [ChartDataLabels],
    // },
    {
      className: "sub-main_national",
      id: "national_treated",
      type: "bar",
      options: option_national_treated,
      data: dataSetup[3],
      plugins: [ChartDataLabels],
    },
    {
      className: "sub-main_national",
      id: "national_yearly",
      type: "line",
      options: option_national_yearly,
      data: dataSetup[4],
      plugins: undefined,
    },
    {
      className: "sub-main_national",
      id: "national_age",
      type: "bar",
      options: option_national_age,
      data: dataSetup[5],
      plugins: [ChartDataLabels],
    },
    {
      className: "sub-main_national",
      id: "national_sex",
      type: "bar",
      options: option_national_sex,
      data: dataSetup[6],
      plugins: [ChartDataLabels],
    },
    {
      className: "sub-main_national",
      id: "national_local",
      type: "bar",
      options: option_national_local,
      data: dataSetup[7],
      plugins: undefined,
    },
    {
      className: "sub-main_global",
      id: "global_country",
      type: "bar",
      options: option_global_country(),
      data: dataSetup[8],
      plugins: [ChartDataLabels],
    },
  ]);

  return (
    <div className="main">
      <div className="sub-main_national">
        {sections && (
          <GraphList
            sections={sections.filter(
              (section) => section.className === "sub-main_national"
            )}
            title="대시보드"
          />
        )}
      </div>
      <div className="sub-main_global">
        {sections && (
          <GraphList
            sections={sections.filter(
              (section) => section.className === "sub-main_global"
            )}
          />
        )}
      </div>
    </div>
  );
};

export default Main;
