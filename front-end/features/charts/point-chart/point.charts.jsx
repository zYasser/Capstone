"use client";

import Chart from "react-apexcharts";

const PointChartComponent = ({ options, series }) => {
  return <Chart options={options} series={series} type="bar" height={350} />;
};

export default PointChartComponent;
