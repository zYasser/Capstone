"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import { lineChartData } from "@/features/charts/line-chart/constants";
import LineChartLegend from "@/features/charts/line-chart/line.chart.legend";
import LineChartTab from "@/features/charts/line-chart/line.chart.tab";

const LineChartComponent = dynamic(
  () => import("@/features/charts/line-chart/line.chart"),
  { ssr: false }
);

export default function LineChart() {
  const [activeTab, setActiveTab] = useState("day");

  const chartData = lineChartData[activeTab];

  const options = {
    chart: {
      height: "auto",
      type: "line",
      toolbar: {
        show: false,
      },
    },
    markers: {
      size: 4, // Marker size
      colors: ["#fff"], // Marker color
      strokeColors: ["#0C359E", "#59B4C3"], // Marker stroke color
      strokeWidth: 2, // Marker stroke width
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [2],
      curve: "straight",
    },
    xaxis: {
      categories: chartData.categories,
    },
    yaxis: {
      min: 0,
      max: 100,
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
    colors: ["#0C359E", "#59B4C3"],
    legend: {
      show: false,
    },
  };

  return (
    <div className="p-4 shadow-lg border-2 border-gray-100">
      <div className="flex md:flex-row flex-col gap-3 justify-between items-center p-3">
        <LineChartLegend />
        <LineChartTab activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <LineChartComponent options={options} series={chartData.series} />
    </div>
  );
}
