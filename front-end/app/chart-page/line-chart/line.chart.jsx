"use client";

import Chart from "react-apexcharts";

const LineChartComponent = ({ options, series }) => {
  return (
    <Chart
      dir="ltr"
      type="area"
      options={options}
      series={series}
      height={350}
    />
  );
};

export default LineChartComponent;
