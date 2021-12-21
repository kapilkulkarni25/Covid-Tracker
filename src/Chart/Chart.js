import React, { useState, useEffect } from "react";
import { fetchdailyData } from "./index";
import { Line, Bar } from "react-chartjs-2";

const Chart = (props) => {
  const [dailyData, setDailyData] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchdailyData());
    };
    fetchAPI();
  }, []);

  // Chart.defaults.scale.gridLines.drawOnChartArea = false;
  const lineChart = dailyData ? (
    <Line
      data={{
        gridLines: {
          display: false,
          color: "#FFFFFF",
        },
        labels: dailyData.map((date) => date.date),
        display: true,
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(055, 0, 0, 0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  const barChart = (
    <Bar
      data={{
        labels: ["Confirmed", "Deaths", "Recovered"],

        datasets: [
          {
            label: "people",
            backgroundColor: ["orange", "red", "rgba(115, 226, 95, 0.835)"],
            data: [props.data.cases, props.data.deaths, props.data.recovered],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: {
          display: true,
          // text: `{props.data.country}`,
        },
      }}
    />
  );

  return (
    <div>
      <div>
        {props.data.country === undefined || props === "worldwide"
          ? lineChart
          : barChart}
      </div>
      {/* <div>{lineChart}</div> */}
    </div>
  );
};

export default Chart;
